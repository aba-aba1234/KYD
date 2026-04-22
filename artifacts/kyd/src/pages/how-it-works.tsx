import { Shield, Clock, Award, Star, BookOpen, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Come funziona KYD</h1>
            <p className="text-xl text-muted-foreground">
              Un processo trasparente, sicuro e progettato intorno alle esigenze della tua famiglia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-24">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Cerca il caregiver ideale</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Inserisci il servizio di cui hai bisogno (Baby, Pet o Elder care), la tua zona e le date. 
                  Il nostro algoritmo ti mostrerà subito i profili verificati più adatti, ordinati per vicinanza e recensioni.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3"><Shield className="h-5 w-5 text-primary" /> Solo profili con identità verificata</li>
                  <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> Disponibilità aggiornata in tempo reale</li>
                  <li className="flex items-center gap-3"><Star className="h-5 w-5 text-primary" /> Recensioni autentiche da altre famiglie</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Conosci e Chatta in Sicurezza</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Non affidare i tuoi cari a uno sconosciuto. Usa la nostra chat interna per fare domande, 
                  concordare i dettagli ed eventualmente fissare una chiamata conoscitiva prima di prenotare.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3"><UserCheck className="h-5 w-5 text-secondary" /> Analizza esperienze e certificazioni</li>
                  <li className="flex items-center gap-3"><Shield className="h-5 w-5 text-secondary" /> Comunicazioni protette e monitorate</li>
                  <li className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-secondary" /> Leggi i feedback dettagliati</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Prenota e Paga Senza Pensieri</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Scegli le ore, invia la richiesta e attendi la conferma. Il pagamento è gestito in modo 
                  completamente sicuro: la somma viene trattenuta e rilasciata al caregiver solo a servizio concluso.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3"><Award className="h-5 w-5 text-amber-600" /> Transazioni crittografate</li>
                  <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-amber-600" /> Zero contanti, tutto tracciabile</li>
                  <li className="flex items-center gap-3"><Star className="h-5 w-5 text-amber-600" /> Supporto clienti sempre attivo</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center bg-card border rounded-3xl p-12 shadow-sm">
            <h3 className="text-2xl font-bold mb-4">Inizia oggi stesso</h3>
            <p className="text-muted-foreground mb-8">
              Migliaia di famiglie hanno già trovato la loro persona di fiducia.
            </p>
            <Link href="/ricerca">
              <Button size="lg" className="rounded-full px-8 bg-primary">
                Trova Caregiver
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
