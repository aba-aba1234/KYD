import { Shield, ShieldCheck, FileCheck, Award, HeartPulse, Lock } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Safety() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">La sicurezza non è un optional</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Lasciare entrare qualcuno in casa propria richiede un'enorme dose di fiducia. 
            Abbiamo costruito KYD attorno al protocollo di verifica più severo in Italia.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">La nostra Verifica a 5 Livelli</h2>
            <p className="text-muted-foreground">Solo il 12% dei candidati supera tutti i nostri controlli e viene ammesso sulla piattaforma.</p>
          </div>

          <div className="space-y-12 relative">
            <div className="hidden md:block absolute left-[39px] top-8 bottom-8 w-0.5 bg-border" />
            
            {[
              {
                icon: ShieldCheck,
                title: "Livello 1: Identità",
                desc: "Verifica incrociata di carta d'identità, passaporto e codice fiscale attraverso sistemi bancari. Scartiamo profili con documenti scaduti, incongruenti o sospetti."
              },
              {
                icon: FileCheck,
                title: "Livello 2: Casellario Giudiziale",
                desc: "Richiediamo il certificato del casellario giudiziale e dei carichi pendenti. Tolleranza zero per qualsiasi reato."
              },
              {
                icon: Lock,
                title: "Livello 3: Referenze tracciabili",
                desc: "Contattiamo telefonicamente almeno due precedenti datori di lavoro. Non accettiamo referenze scritte, vogliamo parlare direttamente con chi ha già lavorato con il candidato."
              },
              {
                icon: HeartPulse,
                title: "Livello 4: Colloquio Attitudinale",
                desc: "Un'intervista di 45 minuti con il nostro team HR specializzato per valutare empatia, capacità di problem solving e gestione dello stress."
              },
              {
                icon: Award,
                title: "Livello 5: Formazione e Certificazioni",
                desc: "Verifichiamo i diplomi, i corsi di Primo Soccorso (obbligatori per Baby e Elder care) e le certificazioni professionali dichiarate."
              }
            ].map((level, i) => (
              <div key={i} className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <level.icon className="h-8 w-8" />
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold mb-3">{level.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent/30 py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Cerchi qualcuno di cui fidarti?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Tutti i caregiver che vedi sulla piattaforma hanno superato questi 5 livelli di controllo.
          </p>
          <Link href="/ricerca">
            <Button size="lg" className="rounded-full bg-primary text-white px-8 h-14 text-base">
              Trova un Caregiver Verificato
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
