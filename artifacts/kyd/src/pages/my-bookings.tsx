import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Search,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useListRecentBookings } from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  confirmed: { label: "Confermata", className: "bg-emerald-100 text-emerald-700" },
  pending: { label: "In attesa", className: "bg-amber-100 text-amber-700" },
  completed: { label: "Completata", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "Annullata", className: "bg-destructive/10 text-destructive" },
};

export default function MyBookingsPage() {
  const [, setLocation] = useLocation();
  const { user, isFamily, loading } = useAuth();
  const { data: bookings, isLoading } = useListRecentBookings();

  useEffect(() => {
    if (!loading && !user) setLocation("/login");
  }, [loading, user, setLocation]);

  if (!user || !isFamily) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="font-serif text-xl font-bold mb-2">
              Sezione riservata alle famiglie
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Solo gli account famiglia possono vedere le proprie prenotazioni.
            </p>
            <Button onClick={() => setLocation("/")} className="w-full">
              Torna alla home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const myBookings = (bookings ?? []).filter(
    (b) => b.familyName.toLowerCase() === user.name.toLowerCase()
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-muted/10">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif text-3xl font-bold">Le mie prenotazioni</h1>
            <p className="text-muted-foreground mt-1">
              Gestisci i servizi che hai prenotato per la tua famiglia.
            </p>
          </div>
          <Link href="/ricerca">
            <Button className="gap-2">
              <Search className="h-4 w-4" />
              Trova un caregiver
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Caricamento prenotazioni...
          </div>
        ) : myBookings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">
                Nessuna prenotazione ancora
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Quando prenoterai un caregiver, lo vedrai qui.
              </p>
              <Link href="/ricerca">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Esplora i caregiver
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {myBookings.map((b) => {
              const status = STATUS_LABELS[b.status] ?? {
                label: b.status,
                className: "bg-muted text-muted-foreground",
              };
              return (
                <Card key={b.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="text-[11px] font-mono text-muted-foreground">
                            {b.id}
                          </code>
                          <Badge className={`text-[10px] ${status.className}`}>
                            {status.label}
                          </Badge>
                        </div>
                        <Link
                          href={`/profilo/${b.caregiverId}`}
                          className="text-base font-bold hover:text-primary transition-colors"
                        >
                          {b.caregiverName}
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {b.date}
                          </span>
                          {b.startTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {b.startTime} · {b.hours}h
                            </span>
                          )}
                          {b.address && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {b.address}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                        <div className="text-right">
                          <div className="text-lg font-bold">€{b.total.toFixed(2)}</div>
                          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                            Totale
                          </div>
                        </div>
                        <Link href={`/chat/${b.caregiverId}`}>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            Chat
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-2">
              <CheckCircle2 className="h-3 w-3" />
              Le ultime prenotazioni effettuate sul tuo account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
