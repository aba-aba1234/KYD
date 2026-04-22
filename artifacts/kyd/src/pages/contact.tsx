import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  subject: z.string().min(5, "L'oggetto deve avere almeno 5 caratteri"),
  message: z.string().min(10, "Il messaggio deve avere almeno 10 caratteri"),
});

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Client-side only
    toast({
      title: "Messaggio inviato",
      description: "Grazie per averci contattato. Ti risponderemo il prima possibile.",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <section className="py-24 bg-card border-b">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Contattaci</h1>
          <p className="text-xl text-muted-foreground">
            Siamo qui per aiutarti. Che tu sia una famiglia o un caregiver, il nostro team risponde a tutte le domande.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-8">Informazioni di contatto</h2>
              <div className="space-y-6 text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p>supporto@kyd.it</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefono</h3>
                    <p>+39 02 1234 5678 (Lun-Ven 9:00-18:00)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Sede</h3>
                    <p>Via Milano 123, 20121 Milano, Italia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Inviaci un messaggio</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome e Cognome</FormLabel>
                        <FormControl>
                          <Input placeholder="Mario Rossi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="mario.rossi@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Oggetto</FormLabel>
                        <FormControl>
                          <Input placeholder="Richiesta informazioni" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Messaggio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Come possiamo aiutarti?" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-base bg-primary">Invia messaggio</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
