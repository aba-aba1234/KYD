import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  HeartHandshake,
  Baby,
  PawPrint,
  Star,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  User,
  Award,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  useCreateCaregiver,
  type Caregiver,
  type CreateCaregiverInputServicesItem,
} from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";

const CITIES = [
  "Milano",
  "Roma",
  "Torino",
  "Bologna",
  "Firenze",
  "Napoli",
  "Verona",
  "Genova",
  "Venezia",
  "Bari",
  "Palermo",
];

const SERVICE_OPTIONS = [
  { value: "baby", label: "Babysitter", icon: Baby, color: "primary" },
  { value: "pet", label: "Pet-sitter", icon: PawPrint, color: "secondary" },
  { value: "elder", label: "Badante", icon: HeartHandshake, color: "amber" },
];

type Step = 1 | 2 | 3 | 4;

export default function CaregiverRecruitingPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const createCaregiver = useCreateCaregiver();

  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdProfile, setCreatedProfile] = useState<Caregiver | null>(null);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(user?.city ?? "");
  const [services, setServices] = useState<string[]>([]);
  const [yearsExperience, setYearsExperience] = useState<number>(2);
  const [pricePerHour, setPricePerHour] = useState<number>(15);
  const [radiusKm, setRadiusKm] = useState<number>(8);
  const [bio, setBio] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certInput, setCertInput] = useState("");

  const toggleService = (s: string) => {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const addCertification = () => {
    const v = certInput.trim();
    if (!v || certifications.includes(v)) return;
    setCertifications((prev) => [...prev, v]);
    setCertInput("");
  };

  const removeCertification = (v: string) => {
    setCertifications((prev) => prev.filter((c) => c !== v));
  };

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 3) e.name = "Inserisci nome e cognome";
    if (!email.includes("@")) e.email = "Email non valida";
    if (phone.replace(/\D/g, "").length < 8) e.phone = "Inserisci un numero valido";
    if (!city) e.city = "Seleziona la tua città";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {};
    if (services.length === 0) e.services = "Seleziona almeno un servizio";
    if (yearsExperience < 0) e.yearsExperience = "Valore non valido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    const e: Record<string, string> = {};
    if (bio.trim().length < 60)
      e.bio = "Scrivi una bio di almeno 60 caratteri (raccontaci di te)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    setErrors({});
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      handleSubmit();
      return;
    }
    setStep((step + 1) as Step);
  };

  const handleSubmit = () => {
    createCaregiver.mutate(
      {
        data: {
          name,
          email,
          phone,
          city,
          services: services as CreateCaregiverInputServicesItem[],
          yearsExperience,
          pricePerHour,
          radiusKm,
          bio,
          certifications,
        },
      },
      {
        onSuccess: (data) => {
          setCreatedProfile(data);
          setStep(4);
        },
      }
    );
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {step < 4 && (
            <div className="mb-10">
              <button
                type="button"
                onClick={() => {
                  if (step === 1) {
                    setShowForm(false);
                  } else {
                    setStep((step - 1) as Step);
                  }
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="h-3 w-3" />
                {step === 1 ? "Torna alla pagina" : "Indietro"}
              </button>
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((n, i) => {
                  const done = step > n;
                  const active = step === n;
                  const labels = ["Chi sei", "Servizi", "Profilo"];
                  return (
                    <div key={n} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            done
                              ? "bg-emerald-500 text-white"
                              : active
                              ? "bg-secondary text-white shadow-lg shadow-secondary/30 ring-4 ring-secondary/15"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {done ? <CheckCircle2 className="h-5 w-5" /> : n}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= n ? "text-foreground" : "text-muted-foreground"}`}>
                          {labels[i]}
                        </span>
                      </div>
                      {i < 2 && (
                        <div className={`flex-1 h-1 mx-3 mb-6 rounded transition-all ${done ? "bg-emerald-400" : "bg-muted"}`} />
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
                key="cg-step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="border shadow-sm">
                  <CardContent className="p-6 space-y-5">
                    <div>
                      <h2 className="font-serif text-2xl font-bold mb-1">
                        Iniziamo a conoscerti
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Le famiglie vogliono sapere chi le accoglierà a casa.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nome e cognome</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sara Martinelli" className="pl-9 h-11" />
                      </div>
                      {errors.name && <FieldError text={errors.name} />}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sara@esempio.it" className="pl-9 h-11" />
                        </div>
                        {errors.email && <FieldError text={errors.email} />}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefono</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+39 333 123 4567" className="pl-9 h-11" />
                        </div>
                        {errors.phone && <FieldError text={errors.phone} />}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Città di lavoro</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <select
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full h-11 rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Seleziona una città</option>
                          {CITIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.city && <FieldError text={errors.city} />}
                    </div>

                    <Button onClick={handleNext} size="lg" className="w-full h-12 bg-secondary hover:bg-secondary/90">
                      Continua
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="cg-step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="border shadow-sm">
                  <CardContent className="p-6 space-y-5">
                    <div>
                      <h2 className="font-serif text-2xl font-bold mb-1">
                        Cosa offri e a quanto?
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Imposta tariffa e raggio operativo. Puoi cambiarli quando vuoi.
                      </p>
                    </div>

                    <div>
                      <Label className="mb-2 block">Servizi che offri</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {SERVICE_OPTIONS.map((opt) => {
                          const Icon = opt.icon;
                          const selected = services.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => toggleService(opt.value)}
                              className={`flex flex-col items-center gap-2 px-3 py-4 rounded-lg border-2 text-sm font-medium transition-all ${
                                selected
                                  ? "border-secondary bg-secondary/10 text-secondary"
                                  : "border-border bg-background hover:border-secondary/40"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && <FieldError text={errors.services} />}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Anni di esperienza</Label>
                        <span className="text-sm font-semibold">
                          {yearsExperience} {yearsExperience === 1 ? "anno" : "anni"}
                        </span>
                      </div>
                      <Slider value={[yearsExperience]} onValueChange={(v) => setYearsExperience(v[0] ?? 0)} min={0} max={30} step={1} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Tariffa oraria</Label>
                        <span className="text-sm font-semibold text-primary">
                          €{pricePerHour}/ora
                        </span>
                      </div>
                      <Slider value={[pricePerHour]} onValueChange={(v) => setPricePerHour(v[0] ?? 12)} min={8} max={40} step={1} />
                      <p className="text-xs text-muted-foreground">
                        Tariffa media KYD: €14/ora baby · €11/ora pet · €16/ora elder
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Raggio operativo</Label>
                        <span className="text-sm font-semibold">
                          {radiusKm} km da {city || "casa tua"}
                        </span>
                      </div>
                      <Slider value={[radiusKm]} onValueChange={(v) => setRadiusKm(v[0] ?? 5)} min={2} max={25} step={1} />
                    </div>

                    <Button onClick={handleNext} size="lg" className="w-full h-12 bg-secondary hover:bg-secondary/90">
                      Continua
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="cg-step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="border shadow-sm">
                  <CardContent className="p-6 space-y-5">
                    <div>
                      <h2 className="font-serif text-2xl font-bold mb-1">
                        Racconta chi sei
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        La tua bio è il primo contatto con le famiglie. Sii autentico.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">La tua bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Es. Studentessa magistrale in Scienze dell'Educazione. 3 anni di esperienza con bambini 0-10. Paziente, creativa, organizzo attività ludiche personalizzate..."
                        className="min-h-[140px]"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{bio.length} / 60+ caratteri</span>
                        {bio.length >= 60 && (
                          <span className="text-emerald-600 font-medium">Perfetto</span>
                        )}
                      </div>
                      {errors.bio && <FieldError text={errors.bio} />}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cert">
                        Certificazioni e formazione (opzionale)
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cert"
                            value={certInput}
                            onChange={(e) => setCertInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addCertification();
                              }
                            }}
                            placeholder="Es. Primo Soccorso Pediatrico"
                            className="pl-9 h-11"
                          />
                        </div>
                        <Button type="button" variant="outline" onClick={addCertification} className="h-11">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {certifications.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {certifications.map((c) => (
                            <span
                              key={c}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full"
                            >
                              <ShieldCheck className="h-3 w-3" />
                              {c}
                              <button
                                type="button"
                                onClick={() => removeCertification(c)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="w-full h-12 bg-secondary hover:bg-secondary/90"
                      disabled={createCaregiver.isPending}
                    >
                      {createCaregiver.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Pubblicazione in corso...
                        </>
                      ) : (
                        <>
                          Pubblica il mio profilo
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>

                    {createCaregiver.isError && (
                      <FieldError text="Si è verificato un errore. Riprova." />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 4 && createdProfile && (
              <motion.div
                key="cg-step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-none shadow-2xl text-center overflow-hidden">
                  <div className="bg-gradient-to-br from-secondary to-secondary/80 py-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="inline-flex h-20 w-20 rounded-full bg-white/20 items-center justify-center"
                    >
                      <Sparkles className="h-12 w-12 text-white" />
                    </motion.div>
                    <h1 className="font-serif text-3xl font-bold text-white mt-4">
                      Benvenuto in KYD
                    </h1>
                    <p className="text-white/90 mt-1">
                      Il tuo profilo è ora online
                    </p>
                  </div>

                  <CardContent className="p-8 text-left space-y-6">
                    <div className="rounded-2xl border-2 p-5 flex items-center gap-4">
                      <div
                        className="h-16 w-16 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                        style={{ backgroundColor: createdProfile.avatarColor }}
                      >
                        {createdProfile.name
                          .split(" ")
                          .slice(0, 2)
                          .map((p: string) => p[0]?.toUpperCase())
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg">{createdProfile.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {createdProfile.city} · raggio {createdProfile.radiusKm}km
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {createdProfile.services.map((s: string) => (
                            <span
                              key={s}
                              className="text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          €{createdProfile.pricePerHour}
                        </div>
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                          / ora
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm">
                      <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-amber-900">
                        Il tuo profilo è in fase di verifica. Riceverai una mail entro
                        24 ore con i prossimi passi (controllo documenti, intervista).
                        Nel frattempo è già visibile alle famiglie.
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href={`/profilo/${createdProfile.id}`} className="flex-1">
                        <Button variant="outline" className="w-full h-12">
                          Vedi il mio profilo
                        </Button>
                      </Link>
                      <Button onClick={() => setLocation("/ricerca")} className="flex-1 h-12 bg-secondary hover:bg-secondary/90">
                        Esplora la rete KYD
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

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-secondary/10 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold mb-6">
                <HeartHandshake className="h-3.5 w-3.5" />
                Stiamo cercando caregiver in tutta Italia
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                Trasforma la tua passione in una professione gratificante
              </h1>
              <p className="text-xl text-muted-foreground mb-10">
                Unisciti alla rete KYD. Decidi tu i tuoi orari, le tue tariffe e i servizi
                che vuoi offrire alle famiglie della tua zona.
              </p>
              <Button
                size="lg"
                onClick={() => setShowForm(true)}
                className="rounded-full bg-secondary hover:bg-secondary/90 px-8 text-white h-14 text-base"
              >
                Inizia la tua candidatura
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Solo 3 minuti · Profilo online subito
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vantaggi */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Perché lavorare con KYD?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tu decidi tutto</h3>
              <p className="text-muted-foreground">
                Scegli tu i servizi che offri, le tue tariffe orarie e i tuoi orari di disponibilità. Nessun vincolo.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pagamenti sicuri e garantiti</h3>
              <p className="text-muted-foreground">
                Il pagamento è trattenuto in modo sicuro prima del servizio e trasferito automaticamente sul tuo conto alla fine.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Costruisci la tua reputazione</h3>
              <p className="text-muted-foreground">
                Ricevi recensioni autentiche dopo ogni servizio per costruire il tuo profilo e attirare sempre più famiglie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Il Processo */}
      <section className="bg-card py-24 border-y">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16">Il processo di selezione</h2>
          <div className="space-y-8">
            {[
              { title: "Candidatura online", desc: "Compila il form con i tuoi dati, la tua esperienza e i servizi che vuoi offrire." },
              { title: "Verifica documenti", desc: "Carica il tuo documento d'identità, codice fiscale e certificazioni rilevanti." },
              { title: "Controllo referenze e fedina penale", desc: "Effettuiamo i controlli di sicurezza standard previsti dal nostro protocollo." },
              { title: "Intervista conoscitiva", desc: "Una breve videochiamata con il nostro team per valutare le tue attitudini." },
              { title: "Profilo online", desc: "Se superi la selezione, il tuo profilo andrà online e potrai iniziare a ricevere richieste." },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 items-start bg-background p-6 rounded-2xl border shadow-sm">
                <div className="w-12 h-12 rounded-full bg-secondary text-white font-bold flex items-center justify-center flex-shrink-0 text-xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-6">Pronto per iniziare?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stiamo cercando babysitter, pet-sitter e badanti appassionati per espandere la nostra rete in tutta Italia.
          </p>
          <Button
            size="lg"
            onClick={() => setShowForm(true)}
            className="rounded-full bg-secondary hover:bg-secondary/90 px-8 text-white h-14 text-base"
          >
            Inizia la tua candidatura
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>
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
