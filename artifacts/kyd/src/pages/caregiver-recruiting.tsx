import { Shield, ShieldCheck, HeartHandshake, Baby, PawPrint, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CaregiverRecruiting() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero */}
      <section className="bg-secondary/10 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
              Trasforma la tua passione in una professione gratificante
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Unisciti alla rete KYD. Gestisci i tuoi orari, imposta le tue tariffe e aiuta le famiglie della tua zona.
            </p>
            <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 px-8 text-white h-14 text-base">
              Inizia la tua candidatura
            </Button>
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
              { title: "Profilo online", desc: "Se superi la selezione, il tuo profilo andrà online e potrai iniziare a ricevere richieste." }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start bg-background p-6 rounded-2xl border shadow-sm">
                <div className="w-12 h-12 rounded-full bg-secondary text-white font-bold flex items-center justify-center flex-shrink-0 text-xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
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
          <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 px-8 text-white h-14 text-base">
            Inizia la tua candidatura
          </Button>
        </div>
      </section>
    </div>
  );
}
