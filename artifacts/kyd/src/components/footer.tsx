import { Link } from "wouter";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Shield className="h-6 w-6" />
              <span className="font-serif font-bold text-xl tracking-tight">KYD</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Affida chi ami a chi si prende cura con il cuore. La piattaforma italiana leader per babysitter, pet-sitter e badanti.
            </p>
            <div className="flex flex-col gap-2 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>supporto@kyd.it</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+39 02 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Milano, Italia</span>
              </div>
            </div>
          </div>

          {/* Per famiglie */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Per le Famiglie</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/come-funziona" className="hover:text-primary transition-colors">Come funziona</Link>
              <Link href="/sicurezza" className="hover:text-primary transition-colors">Sicurezza e Verifiche</Link>
              <Link href="/ricerca?service=baby" className="hover:text-primary transition-colors">Trova Babysitter</Link>
              <Link href="/ricerca?service=pet" className="hover:text-primary transition-colors">Trova Pet-sitter</Link>
              <Link href="/ricerca?service=elder" className="hover:text-primary transition-colors">Trova Badante</Link>
            </div>
          </div>

          {/* Per caregiver */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Per i Caregiver</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/caregiver" className="hover:text-primary transition-colors">Diventa Caregiver</Link>
              <Link href="/prezzi" className="hover:text-primary transition-colors">Piani e Prezzi</Link>
              <Link href="/come-funziona" className="hover:text-primary transition-colors">Linee guida</Link>
              <Link href="/sicurezza" className="hover:text-primary transition-colors">Standard di qualità</Link>
            </div>
          </div>

          {/* Azienda */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Azienda</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/chi-siamo" className="hover:text-primary transition-colors">Chi siamo</Link>
              <Link href="/contatti" className="hover:text-primary transition-colors">Contatti</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/termini" className="hover:text-primary transition-colors">Termini di Servizio</Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KYD Italia S.r.l. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4">
            <span>Fatto con amore in Italia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
