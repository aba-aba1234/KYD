import { Link } from "wouter";
import { Lock, ArrowLeft, Mail, Shield } from "lucide-react";

const SEZIONI = [
  {
    titolo: "1. Chi siamo",
    contenuto: `KYD S.r.l. (di seguito "KYD", "noi" o "la piattaforma") è una società italiana con sede in Italia, che gestisce la piattaforma marketplace KYD accessibile tramite il sito web e l'applicazione mobile. KYD connette utenti che cercano servizi di assistenza (babysitting, pet-sitting, assistenza anziani) con professionisti verificati (i "Caregiver").

Titolare del trattamento dei dati: KYD S.r.l.
Email privacy: privacy@kyd.it`,
  },
  {
    titolo: "2. Dati che raccogliamo",
    contenuto: `Raccogliamo i seguenti tipi di dati personali:

• Dati di registrazione: nome, cognome, email, password (criptata), numero di telefono
• Dati del profilo: foto, bio, preferenze, lingua
• Dati di localizzazione: città, provincia, coordinate GPS (solo se autorizzato)
• Dati di utilizzo: pagine visitate, ricerche effettuate, interazioni con la piattaforma
• Dati di comunicazione: messaggi della chat in-app (cifrati)
• Dati di pagamento: gestiti da Stripe (non conserviamo dati della carta)
• Dati per caregiver: documenti di identità, certificato penale, certificazioni, CV
• Dati tecnici: indirizzo IP, tipo di browser, sistema operativo, cookie`,
  },
  {
    titolo: "3. Come utilizziamo i tuoi dati",
    contenuto: `Utilizziamo i tuoi dati personali per:

• Creare e gestire il tuo account
• Fornire i servizi della piattaforma (ricerca, prenotazione, pagamento)
• Verificare l'identità dei Caregiver (documenti, certificato penale)
• Inviare notifiche su prenotazioni e messaggi
• Migliorare la piattaforma tramite analisi di utilizzo
• Adempiere ad obblighi legali e fiscali
• Prevenire frodi e garantire la sicurezza
• Inviare comunicazioni di marketing (solo con consenso esplicito)`,
  },
  {
    titolo: "4. Base giuridica del trattamento",
    contenuto: `Il trattamento dei tuoi dati si basa su:

• Esecuzione del contratto: per fornire i servizi richiesti
• Obbligo legale: per adempiere a normative fiscali e di sicurezza
• Legittimo interesse: per migliorare la piattaforma e prevenire frodi
• Consenso: per comunicazioni di marketing e cookie non essenziali`,
  },
  {
    titolo: "5. Condivisione dei dati",
    contenuto: `Condividiamo i tuoi dati solo nei seguenti casi:

• Con altri utenti: le informazioni del profilo pubblico sono visibili agli utenti registrati
• Con Stripe: per processare i pagamenti in modo sicuro
• Con i nostri fornitori cloud: per l'archiviazione sicura dei dati (server in Europa)
• Con autorità competenti: solo se richiesto dalla legge
• Non vendiamo mai i tuoi dati a terze parti per scopi commerciali`,
  },
  {
    titolo: "6. Conservazione dei dati",
    contenuto: `Conserviamo i tuoi dati per:

• Account attivi: per tutta la durata del rapporto contrattuale
• Dopo cancellazione account: 30 giorni (poi eliminazione definitiva)
• Dati fiscali e contabili: 10 anni (obbligo di legge)
• Messaggi della chat: 12 mesi dalla data del messaggio
• Documenti di verifica identità: 5 anni dalla verifica (obbligo antiriciclaggio)

Puoi richiedere la cancellazione anticipata dei tuoi dati tramite privacy@kyd.it`,
  },
  {
    titolo: "7. I tuoi diritti (GDPR)",
    contenuto: `In conformità al Regolamento UE 2016/679 (GDPR), hai il diritto di:

• Accesso: richiedere una copia di tutti i tuoi dati personali
• Rettifica: correggere dati inesatti o incompleti
• Cancellazione: richiedere la cancellazione dei tuoi dati ("diritto all'oblio")
• Portabilità: ricevere i tuoi dati in formato leggibile da macchina
• Opposizione: opporti al trattamento per finalità di marketing
• Limitazione: richiedere la limitazione del trattamento in certi casi
• Revoca consenso: in qualsiasi momento, senza pregiudicare il trattamento precedente

Per esercitare questi diritti: privacy@kyd.it
Hai anche il diritto di presentare reclamo al Garante Privacy (www.garanteprivacy.it)`,
  },
  {
    titolo: "8. Cookie",
    contenuto: `Utilizziamo i seguenti tipi di cookie:

• Cookie essenziali: necessari per il funzionamento della piattaforma (non disattivabili)
• Cookie di sessione: per mantenere l'accesso durante la navigazione
• Cookie analitici: per capire come viene utilizzata la piattaforma (con consenso)
• Cookie di marketing: per pubblicità pertinente (con consenso esplicito)

Puoi gestire le preferenze cookie in qualsiasi momento dal banner cookie o dalle impostazioni del browser.`,
  },
  {
    titolo: "9. Sicurezza dei dati",
    contenuto: `Proteggiamo i tuoi dati con:

• Crittografia SSL/TLS per tutte le trasmissioni
• Crittografia AES-256 per i dati a riposo
• Autenticazione a due fattori (opzionale)
• Server in Europa (Frankfurt, Germania)
• Accesso ai dati limitato al personale autorizzato
• Monitoraggio continuo per rilevare accessi non autorizzati
• Audit di sicurezza periodici`,
  },
  {
    titolo: "10. Modifiche alla Privacy Policy",
    contenuto: `Ci riserviamo il diritto di aggiornare questa Privacy Policy. In caso di modifiche significative ti invieremo una notifica via email e mostreremo un banner informativo sulla piattaforma.

La data dell'ultima modifica è sempre indicata in fondo a questa pagina. Continuando ad utilizzare KYD dopo le modifiche, accetti la nuova Privacy Policy.`,
  },
  {
    titolo: "11. Contatti",
    contenuto: `Per qualsiasi domanda sulla privacy:

Email: privacy@kyd.it
Telefono: 800 593 593
Indirizzo: Via [Indirizzo], Milano, Italia

Data Protection Officer (DPO): dpo@kyd.it`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-muted/10 pb-24">
      {/* Hero */}
      <div className="bg-primary pt-24 pb-16 text-primary-foreground text-center px-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-5">
          <Lock className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-4xl font-bold mb-3">Privacy Policy</h1>
        <p className="text-primary-foreground/80 max-w-xl mx-auto text-base leading-relaxed">
          Come KYD raccoglie, utilizza e protegge i tuoi dati personali.
          La tua privacy è la nostra priorità.
        </p>
        <p className="mt-4 text-sm text-primary-foreground/60">
          Ultimo aggiornamento: 1 Gennaio 2025 · Versione 2.0
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-3xl py-12">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Torna alla home
        </Link>

        {/* Summary box */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 mb-10">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-primary/90 leading-relaxed">
              <strong>In sintesi:</strong> raccogliamo solo i dati necessari per
              fornire il servizio, non vendiamo mai i tuoi dati a terzi, puoi
              richiedere la cancellazione in qualsiasi momento e utilizziamo
              crittografia bancaria per proteggerti.
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
              href="mailto:privacy@kyd.it"
              className="text-primary hover:underline font-medium"
            >
              privacy@kyd.it
            </a>
          </p>
          <p>© {new Date().getFullYear()} KYD Italia S.r.l. — Tutti i diritti riservati.</p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/termini-di-servizio" className="text-primary hover:underline">
              Termini di Servizio
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
