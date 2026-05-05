import { Link } from "wouter";
import { FileText, ArrowLeft, Shield } from "lucide-react";

const SEZIONI = [
  {
    titolo: "1. Accettazione dei Termini",
    contenuto: `Utilizzando la piattaforma KYD (sito web e app mobile), dichiari di aver letto, compreso e accettato integralmente questi Termini di Servizio.

Se non accetti questi termini, non puoi utilizzare la piattaforma.

KYD si riserva il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno comunicate via email con almeno 30 giorni di preavviso.`,
  },
  {
    titolo: "2. Descrizione del Servizio",
    contenuto: `KYD è una piattaforma marketplace che:

• Connette utenti che cercano servizi di assistenza (babysitting, pet-sitting, assistenza anziani) con professionisti verificati ("Caregiver")
• Fornisce strumenti per la ricerca, prenotazione e pagamento dei servizi
• Gestisce un sistema di recensioni e valutazioni
• Offre chat in tempo reale tra utenti e Caregiver

KYD NON è un datore di lavoro dei Caregiver. I Caregiver sono professionisti indipendenti. KYD agisce come intermediario tecnologico tra le parti.`,
  },
  {
    titolo: "3. Registrazione e Account",
    contenuto: `Per utilizzare KYD devi:

• Avere almeno 18 anni
• Fornire informazioni accurate e aggiornate durante la registrazione
• Mantenere la riservatezza delle credenziali di accesso
• Non creare account multipli o fittizi
• Notificarci immediatamente in caso di accesso non autorizzato

KYD si riserva il diritto di sospendere o cancellare account che violino questi termini, senza preavviso e senza rimborso.`,
  },
  {
    titolo: "4. Diventare un Caregiver",
    contenuto: `Per offrire servizi come Caregiver su KYD devi:

• Essere maggiorenne (18+)
• Superare il processo di verifica identità (5 livelli)
• Avere un certificato penale pulito
• Fornire informazioni accurate sul profilo
• Mantenere le certificazioni richieste per il servizio offerto

KYD si riserva il diritto di rifiutare o revocare l'approvazione in qualsiasi momento, senza obbligo di motivazione.

Il Caregiver è un libero professionista. È sua responsabilità gestire la propria posizione fiscale (partita IVA, regime forfettario, prestazione occasionale) in conformità alla legge italiana.`,
  },
  {
    titolo: "5. Prenotazioni e Pagamenti",
    contenuto: `5.1 PRENOTAZIONI
• L'utente richiede una prenotazione specificando data, orario e servizio
• Il Caregiver ha 15 minuti per accettare o rifiutare
• La prenotazione è confermata solo dopo l'accettazione del Caregiver

5.2 PAGAMENTI
• I pagamenti sono gestiti tramite Stripe (PCI-DSS Level 1)
• Il pagamento viene autorizzato al momento della prenotazione
• Il Caregiver riceve il pagamento entro 48h dal completamento del servizio

5.3 COMMISSIONI KYD
• Commissione standard: 15% sul totale della prenotazione
• Con abbonamento KYD PRO: 10% sul totale

5.4 CANCELLAZIONI
• Fino a 24h prima: rimborso completo all'utente
• Entro 24h: rimborso del 50% all'utente
• No show del Caregiver: rimborso completo + €10 di credito all'utente`,
  },
  {
    titolo: "6. Recensioni e Valutazioni",
    contenuto: `• Le recensioni possono essere lasciate solo dopo una prenotazione completata
• Le recensioni devono essere veritiere e non diffamatorie
• KYD si riserva il diritto di rimuovere recensioni false o offensive
• Non è consentito incentivare recensioni positive in cambio di denaro o sconti
• I Caregiver possono rispondere pubblicamente alle recensioni`,
  },
  {
    titolo: "7. Comportamento Vietato",
    contenuto: `È vietato:

• Fornire informazioni false durante la registrazione o nel profilo
• Eludere il sistema di pagamento KYD (accordi diretti fuori piattaforma)
• Contattare utenti/Caregiver fuori dalla piattaforma per le prime 3 prenotazioni
• Pubblicare contenuti offensivi, discriminatori o illegali
• Utilizzare la piattaforma per attività illegali
• Tentare di accedere ai sistemi informatici di KYD
• Creare account falsi o multipli
• Copiare o riprodurre contenuti della piattaforma

La violazione di questi divieti comporta la sospensione immediata dell'account e potenziali azioni legali.`,
  },
  {
    titolo: "8. Responsabilità",
    contenuto: `8.1 LIMITAZIONE DI RESPONSABILITÀ KYD
KYD non è responsabile per:
• Il comportamento dei Caregiver durante i servizi
• Danni causati dai Caregiver (coperti dall'assicurazione RC obbligatoria)
• Controversie tra utenti e Caregiver
• Interruzioni del servizio per manutenzione o cause tecniche

8.2 ASSICURAZIONE
Ogni servizio prenotato tramite KYD include automaticamente una copertura assicurativa RC fino a €50.000 per danni a terzi.

8.3 RESPONSABILITÀ DEL CAREGIVER
Il Caregiver è responsabile della qualità del servizio offerto, della propria posizione fiscale e del rispetto delle leggi applicabili.`,
  },
  {
    titolo: "9. Proprietà Intellettuale",
    contenuto: `Tutti i contenuti della piattaforma KYD (logo, design, testi, codice) sono di proprietà esclusiva di KYD S.r.l. e protetti da copyright.

È vietata la riproduzione, distribuzione o modifica dei contenuti senza autorizzazione scritta di KYD.

Caricando contenuti sulla piattaforma (foto, testi, video), l'utente concede a KYD una licenza non esclusiva per utilizzarli ai fini del funzionamento del servizio.`,
  },
  {
    titolo: "10. Sospensione e Cancellazione",
    contenuto: `10.1 DA PARTE DELL'UTENTE
Puoi cancellare il tuo account in qualsiasi momento dalla sezione Impostazioni > Account > Cancella account. I dati vengono eliminati entro 30 giorni (salvo obblighi di legge).

10.2 DA PARTE DI KYD
KYD può sospendere o cancellare il tuo account senza preavviso in caso di:
• Violazione di questi Termini di Servizio
• Comportamento fraudolento o illegale
• Non utilizzo per più di 24 mesi
• Richiesta delle autorità competenti`,
  },
  {
    titolo: "11. Legge Applicabile e Foro Competente",
    contenuto: `Questi Termini di Servizio sono regolati dalla legge italiana.

Per qualsiasi controversia derivante dall'utilizzo di KYD, le parti si impegnano a tentare una risoluzione amichevole.

In caso di controversia non risolta, il foro competente esclusivo è il Tribunale di Milano.

Per controversie con consumatori si applicano le disposizioni del Codice del Consumo (D.Lgs. 206/2005).`,
  },
  {
    titolo: "12. Contatti",
    contenuto: `Per informazioni su questi Termini di Servizio:

Email: legale@kyd.it
Telefono: +39 02 1234 5678
Indirizzo: Via [Indirizzo], Milano, Italia

© KYD Italia S.r.l. — P.IVA 12345678901`,
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-muted/10 pb-24">
      {/* Hero */}
      <div className="bg-secondary pt-24 pb-16 text-secondary-foreground text-center px-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-5">
          <FileText className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-4xl font-bold mb-3">Termini di Servizio</h1>
        <p className="text-secondary-foreground/80 max-w-xl mx-auto text-base leading-relaxed">
          Le regole che governano l'utilizzo della piattaforma KYD.
          Leggi con attenzione prima di registrarti.
        </p>
        <p className="mt-4 text-sm text-secondary-foreground/60">
          Ultimo aggiornamento: 1 Gennaio 2025 · Versione 2.0
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-3xl py-12">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna alla home
        </Link>

        {/* Summary box */}
        <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5 mb-10">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-secondary/90 leading-relaxed">
              <strong>In sintesi:</strong> KYD è un marketplace che mette in
              contatto famiglie e caregiver. Non siamo datori di lavoro dei
              caregiver. Ogni utente è responsabile delle informazioni fornite.
              I pagamenti sono protetti da Stripe. Ogni servizio include
              copertura assicurativa RC fino a €50.000.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {SEZIONI.map((s, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl border p-6 shadow-sm"
            >
              <h2 className="font-bold text-lg mb-3 pb-3 border-b">
                {s.titolo}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {s.contenuto}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-muted-foreground space-y-2">
          <p>
            Hai domande?{" "}
            <a
              href="mailto:legale@kyd.it"
              className="text-primary hover:underline font-medium"
            >
              legale@kyd.it
            </a>
          </p>
          <p>© {new Date().getFullYear()} KYD Italia S.r.l. — Tutti i diritti riservati.</p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/contatti" className="text-primary hover:underline">
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
