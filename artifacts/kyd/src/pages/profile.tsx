import { useRoute, Link, useLocation } from "wouter";
import { useGetCaregiver, useListCaregiverReviews } from "@workspace/api-client-react";
import { MapContainer, TileLayer, Marker, Circle, Tooltip } from "react-leaflet";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Award,
  MessageCircle,
  LayoutDashboard,
  UserCircle2,
  Lock,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

export default function Profile() {
  const [, params] = useRoute("/profilo/:id");
  const [, setLocation] = useLocation();
  const id = params?.id || "";
  const { user, isFamily, isCaregiver, isPending, isAnyCaregiver, isGuest } = useAuth();

  const { data: caregiver, isLoading: isCaregiverLoading } = useGetCaregiver(id);
  const { data: reviews, isLoading: isReviewsLoading } = useListCaregiverReviews(id);

  if (isCaregiverLoading || !caregiver) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        Caricamento...
      </div>
    );
  }

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  const getServiceLabel = (service: string) => {
    switch (service) {
      case "baby":
        return "Baby Care";
      case "pet":
        return "Pet Care";
      case "elder":
        return "Elder Care";
      default:
        return service;
    }
  };

  const isMyProfile = user?.caregiverId === caregiver.id;
  const firstName = caregiver.name.split(" ")[0];

  return (
    <div className="min-h-screen pt-16 bg-muted/10 pb-24">
      <div className="h-48 md:h-64 bg-primary/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card p-8 rounded-3xl border shadow-sm flex flex-col md:flex-row gap-8 items-start">
              <Avatar
                className="h-32 w-32 border-4 border-background shadow-md shrink-0"
                style={{ backgroundColor: caregiver.avatarColor }}
              >
                <AvatarFallback className="text-white text-4xl font-bold bg-transparent">
                  {getInitials(caregiver.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      {caregiver.name}
                      {caregiver.verified && (
                        <ShieldCheck className="h-6 w-6 text-primary" />
                      )}
                    </h1>
                    <div className="flex items-center text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {caregiver.city} • Disponibile ora:{" "}
                      {caregiver.availableNow ? "Sì" : "No"}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-3xl font-bold text-primary">
                      €{caregiver.pricePerHour}
                    </div>
                    <div className="text-sm text-muted-foreground">all'ora</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {caregiver.services.map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="px-3 py-1 text-sm font-medium"
                    >
                      {getServiceLabel(s)}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm font-medium border-t pt-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-amber-500 mb-1">
                      <Star className="h-5 w-5 fill-current mr-1" />
                      <span className="text-lg text-foreground">
                        {caregiver.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {caregiver.reviewCount} recensioni
                    </span>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="flex flex-col items-center">
                    <span className="text-lg text-foreground font-bold mb-1">
                      {caregiver.yearsExperience}
                    </span>
                    <span className="text-muted-foreground">Anni esp.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-3xl border shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Chi sono</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {caregiver.bio}
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" /> Certificazioni
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caregiver.certifications.map((cert, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl"
                  >
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-8 rounded-3xl border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 text-amber-500" /> Recensioni
              </h2>
              {isReviewsLoading ? (
                <div className="animate-pulse h-32 bg-muted/50 rounded-xl" />
              ) : reviews && reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-bold">{review.authorName}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.date}
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-current"
                                  : "text-muted stroke-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Nessuna recensione ancora.</p>
              )}
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6 lg:mt-8">
            <Card className="border-primary/20 shadow-lg sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">€{caregiver.pricePerHour}</span>
                    <span className="text-muted-foreground">/ora</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    + €{(caregiver.pricePerHour * 0.15).toFixed(2)} commissione KYD (15%)
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    caregiver.availableNow
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      caregiver.availableNow ? "bg-emerald-500" : "bg-muted-foreground/40"
                    }`}
                  />
                  {caregiver.availableNow ? "Disponibile ora" : "Non disponibile"}
                </div>

                {/* Role-aware actions */}
                {isGuest && (
                  <div className="space-y-3 pt-2">
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
                      <p className="text-xs text-primary font-medium">
                        Registrati gratis per prenotare
                      </p>
                    </div>
                    <Button
                      onClick={() => setLocation("/registrati")}
                      size="lg"
                      className="w-full h-12 bg-primary hover:bg-primary/90"
                    >
                      Registrati gratis
                    </Button>
                    <Button
                      onClick={() => setLocation("/login")}
                      variant="outline"
                      size="lg"
                      className="w-full h-12"
                    >
                      Hai già un account? Accedi
                    </Button>
                  </div>
                )}

                {isFamily && (
                  <div className="space-y-3 pt-2">
                    <Link href={`/prenota/${caregiver.id}`} className="block">
                      <Button
                        size="lg"
                        disabled={!caregiver.availableNow}
                        className="w-full h-12 bg-primary hover:bg-primary/90"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Prenota ora
                      </Button>
                    </Link>
                    <Link href={`/chat/${caregiver.id}`} className="block">
                      <Button variant="outline" size="lg" className="w-full h-12">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Scrivi a {firstName}
                      </Button>
                    </Link>
                  </div>
                )}

                {isMyProfile && (
                  <div className="space-y-3 pt-2">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-center">
                      <p className="text-sm font-semibold text-emerald-700 flex items-center justify-center gap-1.5">
                        <UserCircle2 className="h-4 w-4" />
                        Questo è il tuo profilo
                      </p>
                    </div>
                    <Link href="/dashboard-caregiver" className="block">
                      <Button
                        size="lg"
                        className="w-full h-12 bg-primary hover:bg-primary/90"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Vai alla dashboard
                      </Button>
                    </Link>
                    <Link href={`/chat/${caregiver.id}`} className="block">
                      <Button variant="outline" size="lg" className="w-full h-12">
                        <MessageCircle className="mr-2 h-4 w-4" />I tuoi messaggi
                      </Button>
                    </Link>
                  </div>
                )}

                {isCaregiver && !isMyProfile && (
                  <div className="rounded-xl bg-muted/50 border p-4 text-center space-y-1 mt-2">
                    <Lock className="h-5 w-5 text-muted-foreground mx-auto" />
                    <p className="text-sm font-medium text-foreground">
                      Solo le famiglie possono prenotare
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sei loggato come caregiver.
                    </p>
                  </div>
                )}

                {isPending && !isMyProfile && (
                  <div className="space-y-3 pt-2">
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
                      <Clock className="h-4 w-4 text-amber-600 mx-auto mb-1" />
                      <p className="text-xs font-medium text-amber-800">
                        Profilo in verifica · puoi solo chattare
                      </p>
                    </div>
                    <Link href={`/chat/${caregiver.id}`} className="block">
                      <Button variant="outline" size="lg" className="w-full h-12">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contatta {firstName}
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" /> Disponibilità
                  </h3>
                  <div className="space-y-2">
                    {caregiver.availability.map((dayObj) => (
                      <div
                        key={dayObj.day}
                        className="flex justify-between items-center text-xs"
                      >
                        <span className="font-medium">{dayObj.day}</span>
                        <div className="flex gap-1">
                          {dayObj.slots.map((slot, idx) => (
                            <div
                              key={idx}
                              className={`w-5 h-5 rounded flex items-center justify-center text-[9px] ${
                                slot.free
                                  ? "bg-primary/20 text-primary font-bold"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              title={`${slot.hour} - ${slot.free ? "Libero" : "Occupato"}`}
                            >
                              {slot.hour.split(":")[0]}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" /> Area coperta
                  </h3>
                  <div className="h-40 rounded-xl overflow-hidden border">
                    <MapContainer
                      center={[caregiver.lat, caregiver.lng]}
                      zoom={11}
                      style={{ height: "100%", width: "100%" }}
                      zoomControl={false}
                      dragging={false}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Circle
                        center={[caregiver.lat, caregiver.lng]}
                        radius={caregiver.radiusKm * 1000}
                        pathOptions={{
                          color: "hsl(var(--primary))",
                          fillColor: "hsl(var(--primary))",
                          fillOpacity: 0.15,
                        }}
                      />
                      <Marker position={[caregiver.lat, caregiver.lng]}>
                        <Tooltip permanent direction="top" className="text-xs">
                          {caregiver.city} entro {caregiver.radiusKm}km
                        </Tooltip>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
