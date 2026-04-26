import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import {
  ShieldCheck,
  Clock,
  Calendar,
  Star,
  MessageCircle,
  UserCircle2,
  Euro,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useGetCaregiver,
  useListRecentBookings,
} from "@workspace/api-client-react";
import { useAuth, getInitials } from "@/hooks/use-auth";

export default function CaregiverDashboardPage() {
  const [, setLocation] = useLocation();
  const { user, isCaregiver, isPending, isAnyCaregiver, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) setLocation("/login");
  }, [loading, user, setLocation]);

  const caregiverId = user?.caregiverId ?? "";
  const { data: caregiver } = useGetCaregiver(caregiverId);
  const { data: bookings } = useListRecentBookings();

  if (!user || !isAnyCaregiver) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="font-serif text-xl font-bold mb-2">
              Sezione riservata ai caregiver
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Accedi con un account caregiver per vedere la dashboard.
            </p>
            <Button onClick={() => setLocation("/")} className="w-full">
              Torna alla home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const myBookings = caregiverId
    ? (bookings ?? []).filter((b) => b.caregiverId === caregiverId)
    : [];
  const totalEarnings = myBookings.reduce((sum, b) => sum + b.subtotal, 0);
  const upcoming = myBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-muted/10">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold">
              Ciao {user.name.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isPending
                ? "Il tuo profilo è in fase di verifica."
                : "Ecco il riepilogo della tua attività su KYD."}
            </p>
          </div>
          <div>
            {isCaregiver ? (
              <Badge className="bg-emerald-100 text-emerald-700 border-0 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                Profilo verificato
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700 border-0 px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                In verifica
              </Badge>
            )}
          </div>
        </div>

        {/* Verification status */}
        {isPending && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-amber-900 text-sm mb-3">
                    Stato della verifica
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-amber-900">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Candidatura ricevuta
                    </li>
                    <li className="flex items-center gap-2 text-amber-900">
                      <Clock className="h-4 w-4 text-amber-600" />
                      Verifica documenti in corso
                    </li>
                    <li className="flex items-center gap-2 text-amber-700/70">
                      <div className="h-4 w-4 rounded-full border-2 border-amber-300" />
                      Intervista conoscitiva
                    </li>
                    <li className="flex items-center gap-2 text-amber-700/70">
                      <div className="h-4 w-4 rounded-full border-2 border-amber-300" />
                      Profilo pubblicato
                    </li>
                  </ul>
                  <p className="text-xs text-amber-700 mt-4">
                    Riceverai una mail entro 24-48 ore con i prossimi passi.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                  Prenotazioni
                </span>
              </div>
              <div className="text-2xl font-bold">{myBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-9 w-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Euro className="h-4 w-4" />
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                  Guadagni
                </span>
              </div>
              <div className="text-2xl font-bold">€{totalEarnings.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                  Rating
                </span>
              </div>
              <div className="text-2xl font-bold">
                {caregiver?.rating?.toFixed(1) ?? "—"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                Il tuo profilo
              </h3>
              {caregiver ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="h-14 w-14 rounded-full text-white font-bold flex items-center justify-center"
                      style={{ backgroundColor: caregiver.avatarColor }}
                    >
                      {getInitials(caregiver.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold truncate">{caregiver.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {caregiver.city} · €{caregiver.pricePerHour}/ora
                      </div>
                    </div>
                  </div>
                  <Link href={`/profilo/${caregiver.id}`}>
                    <Button variant="outline" className="w-full gap-2">
                      <UserCircle2 className="h-4 w-4" />
                      Vedi profilo pubblico
                    </Button>
                  </Link>
                </>
              ) : caregiverId ? (
                <p className="text-sm text-muted-foreground">
                  Caricamento profilo...
                </p>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Nessun profilo collegato. Completa la candidatura su{" "}
                  <Link href="/caregiver" className="text-primary font-semibold hover:underline">
                    Diventa Caregiver
                  </Link>
                  .
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">
                  Prossime prenotazioni
                </h3>
                <Link
                  href="/prenotazioni-ricevute"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Vedi tutte
                </Link>
              </div>
              {upcoming.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  Nessuna prenotazione in arrivo.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcoming.slice(0, 5).map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm truncate">
                          {b.familyName}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {b.date}
                          </span>
                          {b.startTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {b.startTime}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-sm">
                          €{b.subtotal.toFixed(2)}
                        </div>
                        <Link
                          href={`/chat/${b.caregiverId}`}
                          className="text-[11px] text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <MessageCircle className="h-3 w-3" />
                          Chat
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
