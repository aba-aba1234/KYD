import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  User,
  MapPin,
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Users,
  HeartHandshake,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

type RegisterRole = "family" | "caregiver";

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

export default function RegisterPage() {
  const { register } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<RegisterRole>("family");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pickRole = (r: RegisterRole) => {
    setRole(r);
    setStep(2);
  };

  const validate = (): string | null => {
    if (!name.trim()) return "Inserisci nome e cognome";
    if (!email.includes("@")) return "Email non valida";
    if (password.length < 6) return "La password deve avere almeno 6 caratteri";
    if (password !== confirm) return "Le password non coincidono";
    if (!city) return "Seleziona la tua città";
    if (!accept) return "Devi accettare i termini per continuare";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = register({ name, email, password, role, city });
    setLoading(false);
    if (result.success) {
      if (role === "caregiver") {
        setLocation("/caregiver");
      } else {
        setLocation("/");
      }
    } else {
      setError(result.error ?? "Registrazione non riuscita");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-2 text-primary mb-6">
          <Shield className="h-7 w-7" />
          <span className="font-serif font-bold text-2xl tracking-tight">KYD</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Crea il tuo account
          </h1>
          <p className="text-muted-foreground">
            Gratis, senza carta di credito
          </p>
        </div>

        <div className="bg-card border rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-center mb-6">
                Come vuoi usare KYD?
              </h2>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => pickRole("family")}
                  className="w-full text-left rounded-2xl border-2 border-border p-5 transition-all hover:border-primary hover:bg-primary/5 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                        Sono una Famiglia
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cerco babysitter, pet-sitter o badanti verificati
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => pickRole("caregiver")}
                  className="w-full text-left rounded-2xl border-2 border-border p-5 transition-all hover:border-secondary hover:bg-secondary/5 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                      <HeartHandshake className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-foreground group-hover:text-secondary transition-colors">
                        Sono un Caregiver
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Offro assistenza. Compilerai il profilo nel passo successivo.
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full whitespace-nowrap">
                      Verifica 24h
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Hai già un account?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Accedi
                </Link>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Cambia tipo di account
              </button>

              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  role === "family"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary/10 text-secondary"
                }`}
              >
                {role === "family" ? (
                  <Users className="h-3.5 w-3.5" />
                ) : (
                  <HeartHandshake className="h-3.5 w-3.5" />
                )}
                {role === "family" ? "Famiglia" : "Caregiver"}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome e cognome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mario@esempio.it"
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Città</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Seleziona la tua città</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 caratteri"
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Conferma</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm"
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Ripeti"
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Accetto i{" "}
                  <a href="#" className="text-primary hover:underline">
                    Termini di Servizio
                  </a>{" "}
                  e la{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full h-11">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creazione account...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Crea account gratis
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
