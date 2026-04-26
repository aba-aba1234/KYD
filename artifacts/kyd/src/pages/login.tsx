import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  ArrowRight,
  Users,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

const DEMO_ACCOUNTS = [
  {
    key: "family",
    label: "Famiglia",
    email: "famiglia@demo.it",
    description: "Può prenotare caregiver",
    Icon: Users,
    accent: "border-primary/30 hover:border-primary text-primary",
  },
  {
    key: "caregiver",
    label: "Caregiver",
    email: "caregiver@demo.it",
    description: "Profilo verificato attivo",
    Icon: ShieldCheck,
    accent: "border-emerald-300 hover:border-emerald-500 text-emerald-700",
  },
  {
    key: "pending",
    label: "In verifica",
    email: "pending@demo.it",
    description: "Profilo in attesa",
    Icon: Clock,
    accent: "border-amber-300 hover:border-amber-500 text-amber-700",
  },
] as const;

export default function LoginPage() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password);
    setLoading(false);
    if (result.success && result.user) {
      const role = result.user.role;
      if (role === "caregiver" || role === "caregiver_pending") {
        setLocation("/dashboard-caregiver");
      } else {
        setLocation("/");
      }
    } else {
      setError(result.error ?? "Accesso non riuscito");
    }
  };

  const fillDemo = (accountEmail: string) => {
    setEmail(accountEmail);
    setPassword("demo123");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-primary mb-6"
        >
          <Shield className="h-7 w-7" />
          <span className="font-serif font-bold text-2xl tracking-tight">KYD</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Bentornato a casa
          </h1>
          <p className="text-muted-foreground">
            Accedi al tuo account per continuare
          </p>
        </div>

        <div className="bg-card border rounded-2xl shadow-xl p-8">
          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-primary mb-3">
              Account demo per esplorare
            </p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.Icon;
                return (
                  <button
                    key={acc.key}
                    type="button"
                    onClick={() => fillDemo(acc.email)}
                    className={`w-full text-left p-3 rounded-lg bg-background border-2 transition-all flex items-center gap-3 ${acc.accent}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-foreground">
                        {acc.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {acc.email}
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground hidden sm:block">
                      {acc.description}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              Clicca un account per compilare automaticamente
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="La tua password"
                  className="pl-9 h-11"
                />
              </div>
            </div>

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
                  Accesso in corso...
                </>
              ) : (
                <>
                  Accedi
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            Non hai ancora un account?{" "}
            <Link
              href="/registrati"
              className="font-semibold text-primary hover:underline"
            >
              Registrati gratis
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
