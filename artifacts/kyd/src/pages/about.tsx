import { HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <HeartHandshake className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Chi siamo</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            KYD (Keep Your Dear ones safe) nasce dall'esigenza reale di due genitori italiani 
            che cercavano disperatamente un modo sicuro per trovare persone affidabili per 
            i propri figli e per i genitori anziani.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto prose-p:text-muted-foreground prose-headings:font-serif">
            <h2>La nostra missione</h2>
            <p>
              Vogliamo portare serenità nelle case delle famiglie italiane, semplificando 
              il processo di ricerca e selezione del personale di cura, elevando gli standard 
              di sicurezza e garantendo pagamenti e condizioni trasparenti.
            </p>
            
            <h2>Perché l'abbiamo creato</h2>
            <p>
              Il passaparola non è sempre sufficiente, e i social network non offrono 
              nessuna garanzia sull'identità e sulle competenze delle persone. Abbiamo 
              creato KYD per essere l'intermediario di fiducia che noi stessi avremmo 
              voluto usare.
            </p>

            <h2>I nostri valori</h2>
            <ul>
              <li><strong>Fiducia:</strong> È la base di tutto ciò che facciamo. Senza fiducia, la nostra piattaforma non ha valore.</li>
              <li><strong>Sicurezza:</strong> Non scendiamo a compromessi sui controlli. Meglio un caregiver in meno che un controllo saltato.</li>
              <li><strong>Trasparenza:</strong> Niente costi nascosti, recensioni reali e condizioni chiare per tutti.</li>
              <li><strong>Umanità:</strong> La tecnologia ci aiuta, ma al centro ci sono le persone e le relazioni di cura.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
