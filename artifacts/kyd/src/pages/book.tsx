import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useGetCaregiver, useCreateBooking } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Clock, MapPin, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Booking } from "@workspace/api-client-react/src/generated/api.schemas";

const formSchema = z.object({
  familyName: z.string().min(2, "Richiesto"),
  service: z.string().min(1, "Seleziona un servizio"),
  date: z.string().min(1, "Seleziona una data"),
  hours: z.coerce.number().min(1, "Minimo 1 ora").max(24, "Massimo 24 ore"),
  notes: z.string().optional(),
});

export default function Book() {
  const [match, params] = useRoute("/prenota/:id");
  const id = params?.id || "";
  const { data: caregiver, isLoading } = useGetCaregiver(id);
  const createBooking = useCreateBooking();
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      familyName: "",
      service: "",
      date: "",
      hours: 2,
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createBooking.mutate({
      data: {
        caregiverId: id,
        ...values
      }
    }, {
      onSuccess: (data) => {
        setSuccessBooking(data);
      }
    });
  };

  if (isLoading || !caregiver) return <div className="pt-24 text-center">Caricamento...</div>;

  if (successBooking) {
    return (
      <div className="min-h-screen pt-24 bg-muted/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border-none shadow-xl">
          <CardContent className="pt-12 pb-8 px-8 flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Prenotazione Confermata</h1>
            <p className="text-muted-foreground mb-8">
              La tua richiesta è stata inviata a {successBooking.caregiverName}. Riceverai una notifica non appena accetterà.
            </p>
            
            <div className="bg-muted w-full p-4 rounded-xl text-left space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID Prenotazione</span>
                <span className="font-mono text-sm">{successBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium">{successBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ore</span>
                <span className="font-medium">{successBooking.hours}</span>
              </div>
              <div className="pt-3 border-t flex justify-between font-bold text-lg">
                <span>Totale Stimato</span>
                <span className="text-primary">€{successBooking.total}</span>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <Link href={`/chat/${caregiver.id}`} className="flex-1">
                <Button variant="outline" className="w-full">Scrivi in chat</Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-primary">Torna alla home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hours = form.watch("hours");
  const estimatedTotal = hours * caregiver.pricePerHour;

  return (
    <div className="min-h-screen pt-24 bg-muted/10 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-serif font-bold mb-8">Richiedi una prenotazione</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-sm">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="familyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Il tuo Nome e Cognome</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. Famiglia Rossi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Servizio Richiesto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleziona un servizio" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {caregiver.services.map(s => (
                                  <SelectItem key={s} value={s}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)} Care
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="hours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ore necessarie</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} max={24} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Note per il caregiver (opzionale)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Fornisci dettagli su età, esigenze particolari, ecc." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-base h-14 bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={createBooking.isPending}
                    >
                      {createBooking.isPending ? "Invio in corso..." : "Invia Richiesta di Prenotazione"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden" style={{ backgroundColor: caregiver.avatarColor }}>
                    <span className="font-bold text-white text-xl">
                      {caregiver.name.substring(0,2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{caregiver.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {caregiver.city}
                    </div>
                  </div>
                </div>

                <h3 className="font-bold mb-4">Riepilogo costi</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tariffa oraria</span>
                    <span>€{caregiver.pricePerHour}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ore stimate</span>
                    <span>{hours} h</span>
                  </div>
                  <div className="pt-3 border-t flex justify-between font-bold text-lg">
                    <span>Totale Stimato</span>
                    <span className="text-primary">€{estimatedTotal}</span>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl flex gap-3 items-start text-sm">
                  <Shield className="h-5 w-5 text-primary shrink-0" />
                  <p className="text-muted-foreground">
                    Non ti verrà addebitato alcun importo finché il caregiver non accetta la richiesta.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
