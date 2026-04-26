import { useState, useEffect, type FormEvent } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useGetCaregiver, useCreateBooking } from "@workspace/api-client-react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Shield,
  CreditCard,
  Lock,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Baby,
  PawPrint,
  HeartHandshake,
  Star,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, getInitials } from "@/hooks/use-auth";
import type { Booking } from "@workspace/api-client-react";

const COMMISSION_RATE = 0.15;

const SERVICE_LABEL: Record<string, { label: string; icon: typeof Baby }> = {
  baby: { label: "Babysitting", icon: Baby },
  pet: { label: "Pet Sitting", icon: PawPrint },
  elder: { label: "Assistenza Anziani", icon: HeartHandshake },
};

const STEPS = [
  { n: 1, label: "Dettagli" },
  { n: 2, label: "Riepilogo" },
  { n: 3, label: "Pagamento" },
  { n: 4, label: "Conferma" },
] as const;

type Step = 1 | 2 | 3 | 4;

function formatCardNumber(val: string): string {
  return val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(val: string): string {
  const clean = val.replace(/\D/g, "").slice(0, 4);
  return clean.length >= 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
}

function detectCardBrand(num: string): string {
  const n = num.replace(/\s/g, "");
  if (n.startsWith("4")) return "Visa";
  if (n.startsWith("5")) return "Mastercard";
  if (n.startsWith("34") || n.startsWith("37")) return "Amex";
  return "Carta";
}

export default function BookPage() {
  const [, params] = useRoute("/prenota/:id");
  const id = params?.id ?? "";
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { data: caregiver, isLoading } = useGetCaregiver(id);
  const createBooking = useCreateBooking();

  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<Booking | null>(null);

  const [familyName, setFamilyName] = useState(user?.name ?? "");
  const [service, setService] = useState<string>("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [hours, setHours] = useState<number>(2);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (caregiver && !service && caregiver.services?.[0]) {
      setService(caregiver.services[0]);
    }
  }, [caregiver, service]);

  useEffect(() => {
    if (user?.name && !familyName) {
      setFamilyName(user.name);
    }
  }, [user, familyName]);

  if (isLoading || !caregiver) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const subtotal = Math.round(caregiver.pricePerHour * hours * 100) / 100;
  const commission = Math.round(subtotal * COMMISSION_RATE * 100) / 100;
  const total = Math.round((subtotal + commission) * 100) / 100;
  const today = new Date().toISOString().split("T")[0];

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!familyName.trim()) e.familyName = "Inserisci il tuo nome";
    if (!service) e.service = "Seleziona il servizio";
    if (!date) e.date = "Seleziona una data";
    else if (date < today) e.date = "La data non può essere nel passato";
    if (!startTime) e.startTime = "Seleziona l'orario";
    if (hours < 1) e.hours = "Minimo 1 ora";
    if (hours > 12) e.hours = "Massimo 12 ore";
    if (!address.trim()) e.address = "Inserisci l'indirizzo del servizio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    const e: Record<string, string> = {};
    const num = cardNumber.replace(/\s/g, "");
    if (num.length < 16) e.cardNumber = "Numero carta non valido";
    if (!cardName.trim()) e.cardName = "Inserisci il nome sulla carta";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = "Formato MM/AA";
    else {
      const [mm, yy] = expiry.split("/");
      const exp = new Date(2000 + parseInt(yy), parseInt(mm) - 1, 1);
      if (exp < new Date(new Date().getFullYear(), new Date().getMonth(), 1))
        e.expiry = "Carta scaduta";
    }
    if (cvv.length < 3) e.cvv = "CVV non valido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    setErrors({});
    if (step === 1 && !validateStep1()) return;
    setStep((step + 1) as Step);
  };

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    await new Promise((r) => setTimeout(r, 1500));
    createBooking.mutate(
      {
        data: {
          caregiverId: caregiver.id,
          familyName,
          service,
          date,
          startTime,
          hours,
          address,
          notes: notes || undefined,
        },
      },
      {
        onSuccess: (data) => {
          setConfirmation(data);
          setStep(4);
        },
      }
    );
  };

  const ServiceIcon = SERVICE_LABEL[service]?.icon ?? Baby;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {step < 4 && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <Link href={`/profilo/${caregiver.id}`} className="flex items-center gap-1 hover:text-foreground transition-colors">
                <ArrowLeft className="h-3 w-3" />
                Torna al profilo
              </Link>
              <div className="flex items-center gap-1.5">
                <Lock className="h-3 w-3" />
                Pagamento sicuro · SSL 256-bit
              </div>
            </div>

            <div className="flex items-center justify-between">
              {STEPS.slice(0, 3).map((s, i) => {
                const done = step > s.n;
                const active = step === s.n;
                return (
                  <div key={s.n} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          done
                            ? "bg-emerald-500 text-white"
                            : active
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/15"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-5 w-5" /> : s.n}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium ${
                          step >= s.n ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < 2 && (
                      <div
                        className={`flex-1 h-1 mx-3 mb-6 rounded transition-all duration-500 ${
                          done ? "bg-emerald-400" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <CaregiverHeader caregiver={caregiver} />

              <Card className="border shadow-sm">
                <CardContent className="p-6 space-y-5">
                  <div>
                    <h3 className="font-serif text-xl font-bold mb-1">
                      Dettagli della prenotazione
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Compila i campi per richiedere il servizio.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="familyName">Il tuo nome</Label>
                    <Input
                      id="familyName"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      placeholder="Es. Famiglia Rossi"
                      className="h-11"
                    />
                    {errors.familyName && <FieldError text={errors.familyName} />}
                  </div>

                  <div>
                    <Label className="mb-2 block">Servizio</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {caregiver.services.map((s) => {
                        const def = SERVICE_LABEL[s];
                        const Icon = def?.icon ?? Baby;
                        const selected = service === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setService(s)}
                            className={`flex items-center gap-2 px-3 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                              selected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-background hover:border-primary/40"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {def?.label ?? s}
                          </button>
                        );
                      })}
                    </div>
                    {errors.service && <FieldError text={errors.service} />}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2 sm:col-span-1">
                      <Label htmlFor="date">Data</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="date"
                          type="date"
                          min={today}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="pl-9 h-11"
                        />
                      </div>
                      {errors.date && <FieldError text={errors.date} />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime">Inizio</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="startTime"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="pl-9 h-11"
                        />
                      </div>
                      {errors.startTime && <FieldError text={errors.startTime} />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hours">Ore</Label>
                      <Input
                        id="hours"
                        type="number"
                        min={1}
                        max={12}
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value) || 1)}
                        className="h-11"
                      />
                      {errors.hours && <FieldError text={errors.hours} />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Indirizzo del servizio</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Via Roma 12, Milano"
                        className="pl-9 h-11"
                      />
                    </div>
                    {errors.address && <FieldError text={errors.address} />}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Note per il caregiver (opzionale)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Età dei bambini, esigenze particolari, allergie, animali domestici..."
                      className="min-h-[90px]"
                    />
                  </div>

                  <Button onClick={handleNext} size="lg" className="w-full h-12">
                    Continua al riepilogo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <CaregiverHeader caregiver={caregiver} />

              <Card className="border shadow-sm overflow-hidden">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-1">
                        Riepilogo della prenotazione
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Verifica i dettagli prima di procedere al pagamento.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-primary hover:underline"
                    >
                      Modifica
                    </button>
                  </div>

                  <div className="rounded-xl border bg-muted/30 divide-y">
                    <SummaryRow
                      icon={<ServiceIcon className="h-4 w-4" />}
                      label="Servizio"
                      value={SERVICE_LABEL[service]?.label ?? service}
                    />
                    <SummaryRow
                      icon={<Calendar className="h-4 w-4" />}
                      label="Data e orario"
                      value={`${date} · ${startTime}`}
                    />
                    <SummaryRow
                      icon={<Clock className="h-4 w-4" />}
                      label="Durata"
                      value={`${hours} ${hours === 1 ? "ora" : "ore"}`}
                    />
                    <SummaryRow
                      icon={<MapPin className="h-4 w-4" />}
                      label="Indirizzo"
                      value={address}
                    />
                  </div>

                  <div className="rounded-xl border p-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Tariffa caregiver ({hours}h × €{caregiver.pricePerHour}/ora)
                      </span>
                      <span className="font-medium">€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        Commissione KYD (15%)
                        <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      </span>
                      <span className="font-medium">€{commission.toFixed(2)}</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between items-end">
                      <span className="font-semibold">Totale</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          €{total.toFixed(2)}
                        </div>
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          IVA inclusa
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-secondary/10 border border-secondary/20 p-4 flex gap-3 text-sm">
                    <Shield className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-foreground mb-1">
                        Protezione KYD inclusa
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Il pagamento è trattenuto in modo sicuro e trasferito al caregiver
                        solo a servizio completato. In caso di problemi, rimborso garantito.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="h-12">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Indietro
                    </Button>
                    <Button onClick={handleNext} size="lg" className="flex-1 h-12">
                      Procedi al pagamento
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <Card className="border shadow-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-1">
                        Dettagli di pagamento
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Inserisci i dati della tua carta. Tutto cifrato.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        Totale
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        €{total.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 text-background p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-8">
                      <CreditCard className="h-7 w-7" />
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                        {detectCardBrand(cardNumber)}
                      </span>
                    </div>
                    <div className="font-mono text-lg tracking-widest mb-4">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between text-xs uppercase tracking-wide opacity-80">
                      <div>
                        <div className="opacity-60 mb-1">Intestatario</div>
                        <div className="font-medium normal-case">
                          {cardName || "Nome Cognome"}
                        </div>
                      </div>
                      <div>
                        <div className="opacity-60 mb-1">Scadenza</div>
                        <div className="font-medium">{expiry || "MM/AA"}</div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handlePay} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numero carta</Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="4242 4242 4242 4242"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        className="h-11 font-mono"
                      />
                      {errors.cardNumber && <FieldError text={errors.cardNumber} />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nome sulla carta</Label>
                      <Input
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="MARIO ROSSI"
                        autoComplete="cc-name"
                        className="h-11"
                      />
                      {errors.cardName && <FieldError text={errors.cardName} />}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Scadenza</Label>
                        <Input
                          id="expiry"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/AA"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className="h-11"
                        />
                        {errors.expiry && <FieldError text={errors.expiry} />}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="•••"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className="h-11"
                        />
                        {errors.cvv && <FieldError text={errors.cvv} />}
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/40 border p-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3.5 w-3.5 text-emerald-600" />
                      I dati della carta sono protetti da crittografia 256-bit. Non
                      vengono mai salvati sui nostri server.
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="h-12"
                        disabled={createBooking.isPending}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Indietro
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 h-12"
                        disabled={createBooking.isPending}
                      >
                        {createBooking.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Elaborazione...
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Paga €{total.toFixed(2)}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && confirmation && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border-none shadow-2xl text-center overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex h-20 w-20 rounded-full bg-white/20 items-center justify-center"
                  >
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </motion.div>
                  <h1 className="font-serif text-3xl font-bold text-white mt-4">
                    Prenotazione confermata
                  </h1>
                  <p className="text-white/90 mt-1">
                    Pagamento ricevuto con successo
                  </p>
                </div>

                <CardContent className="p-8 text-left space-y-6">
                  <div className="text-center">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Numero prenotazione
                    </div>
                    <div className="font-mono text-2xl font-bold text-foreground mt-1">
                      {confirmation.id}
                    </div>
                  </div>

                  <div className="rounded-xl bg-muted/30 divide-y">
                    <SummaryRow
                      icon={<HeartHandshake className="h-4 w-4" />}
                      label="Caregiver"
                      value={confirmation.caregiverName}
                    />
                    <SummaryRow
                      icon={<Calendar className="h-4 w-4" />}
                      label="Data e orario"
                      value={`${confirmation.date}${confirmation.startTime ? ` · ${confirmation.startTime}` : ""}`}
                    />
                    <SummaryRow
                      icon={<Clock className="h-4 w-4" />}
                      label="Durata"
                      value={`${confirmation.hours} ${confirmation.hours === 1 ? "ora" : "ore"}`}
                    />
                    {confirmation.address && (
                      <SummaryRow
                        icon={<MapPin className="h-4 w-4" />}
                        label="Indirizzo"
                        value={confirmation.address}
                      />
                    )}
                  </div>

                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5 flex justify-between items-end">
                    <div>
                      <div className="text-sm text-muted-foreground">Totale pagato</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Subtotale €{confirmation.subtotal.toFixed(2)} + Commissione €{confirmation.commission.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      €{confirmation.total.toFixed(2)}
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm">
                    <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-amber-900">
                      Una conferma è stata inviata a {confirmation.caregiverName}.
                      Riceverai una notifica via email con tutti i dettagli.
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/chat/${caregiver.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-12">
                        Scrivi al caregiver
                      </Button>
                    </Link>
                    <Button
                      onClick={() => setLocation("/")}
                      className="flex-1 h-12"
                    >
                      Torna alla home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CaregiverHeader({ caregiver }: { caregiver: { id: string; name: string; city: string; pricePerHour: number; rating: number; reviewCount: number; avatarColor: string; verified: boolean } }) {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className="h-14 w-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ backgroundColor: caregiver.avatarColor }}
        >
          {getInitials(caregiver.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base truncate">{caregiver.name}</h2>
            {caregiver.verified && (
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            )}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-3 mt-0.5">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {caregiver.city}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {caregiver.rating.toFixed(1)} ({caregiver.reviewCount})
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-bold text-primary">
            €{caregiver.pricePerHour}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
            per ora
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <span className="text-foreground/60">{icon}</span>
        {label}
      </div>
      <div className="text-sm font-semibold text-foreground text-right max-w-[55%] truncate">
        {value}
      </div>
    </div>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
      <AlertCircle className="h-3 w-3" />
      {text}
    </p>
  );
}
