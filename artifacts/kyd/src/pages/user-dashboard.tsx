import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import {
  Search,
  Calendar,
  MessageCircle,
  Heart,
  Star,
  Settings,
  HeartHandshake,
  ShieldCheck,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

const ACTION_CARDS = [
  {
    href: "/ricerca",
    icon: Search,
    title: "Trova un Caregiver",
    desc: "Cerca babysitter, pet-sitter o badanti verificati nella tua zona",
    accent: "border-primary/20 hover:border-primary bg-primary/5",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    href: "/le-mie-prenotazioni",
    icon: Calendar,
    title: "Le mie Prenotazioni",
    desc: "Gestisci prenotazioni passate, future e in corso",
    accent: "border-amber-200 hover:border-amber-400 bg-amber-50/50",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    href: "/ricerca",
    icon: MessageCircle,
    title: "Messaggi",
    desc: "Chatta con i caregiver, ricevi risposte e organizza i servizi",
    accent: "border-secondary/20 hover:border-secondary bg-secondary/5",
    iconBg: "bg-secondary/10 text-secondary",
  },
  {
    href: "/ricerca",
    icon: Heart,
    title: "Preferiti",
    desc: "I caregiver che hai salvato per prenotarli velocemente",
    accent: "border-rose-200 hover:border-rose-400 bg-rose-50/50",
    iconBg: "bg-rose-100 text-rose-600",
  },
  {
    href: "/ricerca",
    icon: Star,
    title: "Le mie Recensioni",
    desc: "Vedi e gestisci le recensioni che hai lasciato ai caregiver",
    accent: "border-violet-200 hover:border-violet-400 bg-violet-50/50",
    iconBg: "bg-violet-100 text-violet-600",
  },
  {
    href: "/",
    icon: Settings,
    title: "Impostazioni",
    desc: "Modifica profilo, password e preferenze del tuo account",
    accent: "border-border hover:border-muted-foreground/40 bg-muted/20",
    iconBg: "bg-muted text-muted-foreground",
  },
];

export default function UserDashboardPage() {
  const [, setLocation] = useLocation();
  const { user, isFamily, isCaregiver, isPending, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) setLocation("/login");
  }, [loading, user, setLocation]);

  if (!user || !isFamily) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="font-serif text-xl font-bold mb-2">
              Sezione riservata agli utenti
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Accedi con un account utente per vedere la tua area personale.
            </p>
            <Button onClick={() => setLocation("/")} className="w-full">
              Torna alla home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-muted/10 pb-24">
      {/* Hero header */}
      <div className="bg-primary pt-24 pb-16 text-primary-foreground px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/15 flex items-center justify-center text-2xl font-bold shrink-0">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold">
                Ciao, {firstName}
              </h1>
              <p className="text-primary-foreground/75 mt-1 text-sm">
                Bentornato su KYD — cosa vuoi fare oggi?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl -mt-6">
        {/* Caregiver upsell — for family-only users */}
        <div className="mb-8 rounded-2xl border border-secondary/20 bg-white shadow-sm p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-bold text-foreground">
              Diventa anche tu un Caregiver su KYD
            </div>
            <div className="text-sm text-muted-foreground mt-0.5">
              Guadagna con flessibilità aiutando famiglie nella tua zona.
              Commissione solo 15%.
            </div>
          </div>
          <Link href="/caregiver" className="shrink-0">
            <Button
              variant="outline"
              className="border-secondary/30 text-secondary hover:bg-secondary/5 hover:text-secondary"
            >
              Inizia ora
            </Button>
          </Link>
        </div>

        {/* Action grid */}
        <h2 className="font-serif text-xl font-bold mb-5 text-foreground">
          Le tue attività
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {ACTION_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href + card.title} href={card.href}>
                <div
                  className={`rounded-2xl border-2 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer h-full ${card.accent}`}
                >
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 ${card.iconBg}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick links */}
        <h2 className="font-serif text-xl font-bold mb-4 text-foreground">
          Scopri KYD
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/ricerca?service=baby", label: "Trova Babysitter", icon: "👶" },
            { href: "/ricerca?service=pet", label: "Trova Pet-sitter", icon: "🐾" },
            { href: "/ricerca?service=elder", label: "Trova Badante", icon: "🤝" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="rounded-xl border bg-card hover:border-primary/30 hover:bg-primary/5 transition-colors p-4 flex items-center gap-3 cursor-pointer">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
