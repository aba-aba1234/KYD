import { Shield, Clock, Award, Star, UserCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useListRecentBookings } from "@workspace/api-client-react";

export default function Families() {
  const { data: recentBookings } = useListRecentBookings();

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Perché le famiglie ci scelgono</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Affidarsi a qualcuno non è mai facile. Ecco perché abbiamo costruito il sistema più sicuro d'Italia.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tranquillità prima di tutto</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Sappiamo che stai cercando non solo competenza, ma anche empatia e affidabilità. 
                Ogni caregiver su KYD passa attraverso rigorosi controlli.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong className="block text-foreground">Identità verificata</strong> Documenti e codici fiscali controllati manualmente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong className="block text-foreground">Certificazioni</strong> Controlliamo i diplomi di pronto soccorso, educazione e assistenza.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span><strong className="block text-foreground">Interviste</strong> Conosciamo i nostri caregiver prima di approvarli sulla piattaforma.</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/ricerca">
                  <Button size="lg" className="rounded-full bg-primary">Inizia la ricerca</Button>
                </Link>
              </div>
            </div>
            <div className="bg-accent/30 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Ultime prenotazioni completate</h3>
              <div className="space-y-4">
                {recentBookings?.slice(0, 4).map((booking) => (
                  <div key={booking.id} className="bg-background p-4 rounded-xl shadow-sm border flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm">{booking.service.charAt(0).toUpperCase() + booking.service.slice(1)} Care</p>
                      <p className="text-xs text-muted-foreground">{booking.caregiverName} ha aiutato la famiglia {booking.familyName}</p>
                    </div>
                    <div className="text-amber-500 flex items-center">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-xs font-medium ml-1">5.0</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
