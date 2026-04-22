import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="py-24 bg-card text-center border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Piani trasparenti per i caregiver</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Per le famiglie, KYD applica solo una commissione del 10% sul servizio prenotato.
            Se sei un caregiver, scegli il piano adatto alle tue esigenze.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Base Plan */}
            <Card className="flex flex-col border-2 border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold mb-2">Piano Base</CardTitle>
                <p className="text-muted-foreground">Perfetto per iniziare o per chi cerca lavoretti saltuari.</p>
                <div className="mt-6 mb-2">
                  <span className="text-5xl font-bold">Gratis</span>
                </div>
                <p className="text-sm text-muted-foreground">Per sempre</p>
              </CardHeader>
              <CardContent className="flex-1 mt-6">
                <ul className="space-y-4">
                  {[
                    "Profilo verificato visibile",
                    "Ricevi prenotazioni",
                    "Chat con le famiglie",
                    "Pagamenti sicuri",
                    "Fino a 3 prenotazioni al mese"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Link href="/caregiver" className="w-full">
                  <Button variant="outline" className="w-full h-12 text-base">Inizia gratis</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="flex flex-col border-2 border-primary shadow-lg relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
              <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                CONSIGLIATO
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold mb-2">Piano Premium</CardTitle>
                <p className="text-muted-foreground">Per i professionisti che lavorano a tempo pieno.</p>
                <div className="mt-6 mb-2">
                  <span className="text-5xl font-bold">€19<span className="text-3xl">,90</span></span>
                </div>
                <p className="text-sm text-muted-foreground">al mese</p>
              </CardHeader>
              <CardContent className="flex-1 mt-6">
                <ul className="space-y-4">
                  {[
                    "Tutto ciò che è nel Piano Base",
                    "Prenotazioni illimitate",
                    "Profilo in evidenza nelle ricerche",
                    "Supporto prioritario 24/7",
                    "Statistiche avanzate del profilo",
                    "Assicurazione professionale base inclusa"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-8 pt-0">
                <Link href="/caregiver" className="w-full">
                  <Button className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-white">Scegli Premium</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
