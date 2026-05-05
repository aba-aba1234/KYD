import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { CaregiverCard } from "@/components/caregiver-card";
import { 
  ShieldCheck, Star, Users, ArrowRight, HeartHandshake, Baby, PawPrint, Search, Calendar, Check
} from "lucide-react";
import { 
  useGetStatsOverview, 
  useListCaregivers, 
  useListFeaturedReviews 
} from "@workspace/api-client-react";
import useEmblaCarousel from "embla-carousel-react";

const FALLBACK_REVIEWS = [
  { id: "1", rating: 5, comment: "Ho trovato la babysitter perfetta in 10 minuti. Mio figlio l'ha adorata e ora la prenoto sempre tramite KYD. Il video di presentazione mi ha fatta sentire subito al sicuro.", authorName: "Claudia M.", city: "Milano", authorRole: "Mamma di Tommaso, 4 anni" },
  { id: "2", rating: 5, comment: "Finalmente posso viaggiare senza sensi di colpa. Il pet-sitter mandava foto di Rocky che giocava ogni giorno. Servizio perfetto, lo consiglio a tutti!", authorName: "Marco T.", city: "Roma", authorRole: "Proprietario di Rocky" },
  { id: "3", rating: 5, comment: "Mia madre ha 82 anni e necessita di compagnia. Ho trovato un'assistente con certificazione OSS. Il sistema di recensioni mi ha aiutato tantissimo nella scelta.", authorName: "Giulia F.", city: "Torino", authorRole: "Figlia di paziente anziana" },
  { id: "4", rating: 5, comment: "Check-in, chat e report in tempo reale. Sai sempre cosa sta succedendo. Un livello di tranquillità che non avevo mai avuto con nessun altro servizio.", authorName: "Laura P.", city: "Firenze", authorRole: "Mamma di Emma e Sofia" },
  { id: "5", rating: 5, comment: "Ho usato la prenotazione last minute e in 15 minuti avevo conferma. Incredibile come funziona tutto così bene.", authorName: "Davide S.", city: "Bologna", authorRole: "Proprietario di Milo" },
] as const;

export default function Home() {
  const { data: stats } = useGetStatsOverview();
  const { data: caregivers } = useListCaregivers();
  const { data: reviews } = useListFeaturedReviews();
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Più di 50.000 famiglie ci scelgono</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-[1.1]"
              {...fadeIn}
            >
              Affida chi ami a chi si prende cura <span className="text-primary italic">con il cuore</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Trova babysitter, pet-sitter e badanti verificati in meno di 3 minuti. 
              Tranquillità per te, attenzioni di qualità per loro.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/ricerca">
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                  Trova un caregiver
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/caregiver">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 rounded-full border-border hover:bg-accent">
                  Diventa caregiver
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex -space-x-2 mr-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-accent border-2 border-background flex items-center justify-center text-xs">👤</div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="ml-1 text-foreground">4.9/5</span> da 12.847 recensioni
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">I nostri servizi</h2>
            <p className="text-muted-foreground">Scegli il livello di assistenza ideale per la tua famiglia.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Baby className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Baby Care</h3>
                <p className="text-muted-foreground mb-6">Assistenza qualificata per i tuoi bambini, dal doposcuola al weekend.</p>
                <div className="mt-auto">
                  <span className="text-sm text-muted-foreground">A partire da</span>
                  <div className="text-xl font-bold text-primary">€12/ora</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <PawPrint className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pet Care</h3>
                <p className="text-muted-foreground mb-6">Amore e cure per i tuoi amici a quattro zampe quando non ci sei.</p>
                <div className="mt-auto">
                  <span className="text-sm text-muted-foreground">A partire da</span>
                  <div className="text-xl font-bold text-secondary">€10/ora</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                  <HeartHandshake className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Elder Care</h3>
                <p className="text-muted-foreground mb-6">Supporto delicato e professionale per gli anziani della tua famiglia.</p>
                <div className="mt-auto">
                  <span className="text-sm text-muted-foreground">A partire da</span>
                  <div className="text-xl font-bold text-amber-600">€15/ora</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Come funziona KYD</h2>
            <p className="text-muted-foreground">Un processo semplice e sicuro in tre passi.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border border-dashed border-t-2" />
            
            {[
              { icon: Search, title: "1. Cerca", desc: "Esplora i profili dei caregiver verificati nella tua zona, filtra per servizi e recensioni." },
              { icon: Users, title: "2. Scegli", desc: "Chatta in modo sicuro, organizza un colloquio conoscitivo e scegli la persona giusta." },
              { icon: Calendar, title: "3. Prenota", desc: "Pianifica le ore necessarie e paga in modo sicuro tramite la piattaforma." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-primary/20 text-primary flex items-center justify-center shadow-lg mb-6 relative">
                  <step.icon className="h-10 w-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center border-2 border-background">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why KYD */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Perché KYD è la scelta più sicura
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                La sicurezza della tua famiglia è la nostra priorità assoluta. Abbiamo costruito il sistema di verifica più rigoroso in Italia.
              </p>
              
              <div className="space-y-6">
                {[
                  "Verifica a 5 livelli (Identità, Fedina Penale, Referenze, Intervista, Formazione)",
                  "Recensioni 100% certificate da prenotazioni reali",
                  "Pagamento sicuro e tracciato sulla piattaforma",
                  "Trasparenza totale su tariffe e disponibilità"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link href="/sicurezza">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary rounded-full h-12 px-6">
                    Scopri di più sulla sicurezza
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: stats?.families ?? 50000, label: "Famiglie Soddisfatte" },
                  { value: stats?.caregivers ?? 3200, label: "Caregiver Verificati" },
                  { value: stats?.successRate ?? 98, label: "Tasso di Successo", format: (v: number) => `${v}%` },
                  { value: stats?.reviews ?? 12847, label: "Recensioni Positive" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      <AnimatedCounter value={item.value} format={item.format} />
                    </div>
                    <div className="text-primary-foreground/80 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Caregivers */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">Caregiver in evidenza</h2>
              <p className="text-muted-foreground max-w-2xl">Professionisti eccezionali che stanno già aiutando le famiglie KYD.</p>
            </div>
            <Link href="/ricerca">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                Vedi tutti <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caregivers?.slice(0, 3).map(cg => (
              <CaregiverCard key={cg.id} caregiver={cg} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card border-y overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">Cosa dicono le famiglie</h2>
            <p className="text-muted-foreground">Storie reali di chi ha trovato la persona giusta con KYD.</p>
          </div>
          
          <div className="relative max-w-5xl mx-auto" key={reviews ? "loaded" : "loading"}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {(reviews ?? FALLBACK_REVIEWS).map((review) => (
                  <div key={review.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4">
                    <Card className="h-full border-none shadow-md bg-background">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex text-amber-500 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted stroke-muted"}`} />
                          ))}
                        </div>
                        <p className="text-muted-foreground italic mb-6 flex-1">"{review.comment}"</p>
                        <div>
                          <p className="font-bold">{review.authorName}</p>
                          <p className="text-sm text-muted-foreground">{review.city} • {review.authorRole}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-multiply pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Pronto a vivere più sereno?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Unisciti alle migliaia di famiglie che ogni giorno affidano i propri cari ai professionisti di KYD.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ricerca">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                Trova un caregiver
              </Button>
            </Link>
            <Link href="/caregiver">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-base">
                Diventa caregiver
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
