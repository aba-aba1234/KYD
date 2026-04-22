import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useListCaregivers, useListTopCities } from "@workspace/api-client-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaregiverCard } from "@/components/caregiver-card";
import { Search, MapPin, Filter, MessageCircle, Star, Baby, PawPrint, HeartHandshake } from "lucide-react";
import { Link } from "wouter";

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

export default function SearchPage() {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const serviceQuery = searchParams.get("service") as "baby" | "pet" | "elder" | "all" | undefined;
  const cityQuery = searchParams.get("city") || undefined;
  
  const [city, setCity] = useState(cityQuery || "");
  const [service, setService] = useState<"baby" | "pet" | "elder" | "all" | undefined>(serviceQuery);
  const [activeCity, setActiveCity] = useState(cityQuery);
  const [activeService, setActiveService] = useState(serviceQuery);

  const { data: caregivers, isLoading } = useListCaregivers({
    city: activeCity,
    service: activeService === "all" ? undefined : activeService,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveCity(city);
    setActiveService(service);
  };

  const getServiceColor = (srv: string) => {
    switch (srv) {
      case 'baby': return 'bg-primary/10 text-primary border-primary/20';
      case 'pet': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'elder': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] pt-16">
      {/* Sidebar / List */}
      <div className="w-full md:w-[40%] lg:w-[35%] flex flex-col h-full bg-background border-r z-10 shadow-xl overflow-hidden">
        <div className="p-4 border-b bg-card shrink-0">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Città (es. Milano, Roma)" 
                className="pl-9"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button 
                type="button"
                variant={service === "baby" ? "default" : "outline"} 
                className="rounded-full shrink-0"
                onClick={() => setService(service === "baby" ? undefined : "baby")}
              >
                <Baby className="h-4 w-4 mr-2" /> Baby Care
              </Button>
              <Button 
                type="button"
                variant={service === "pet" ? "default" : "outline"} 
                className="rounded-full shrink-0"
                onClick={() => setService(service === "pet" ? undefined : "pet")}
              >
                <PawPrint className="h-4 w-4 mr-2" /> Pet Care
              </Button>
              <Button 
                type="button"
                variant={service === "elder" ? "default" : "outline"} 
                className="rounded-full shrink-0"
                onClick={() => setService(service === "elder" ? undefined : "elder")}
              >
                <HeartHandshake className="h-4 w-4 mr-2" /> Elder Care
              </Button>
            </div>
            <Button type="submit" className="w-full">
              <Search className="h-4 w-4 mr-2" /> Cerca Caregiver
            </Button>
          </form>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
          <div className="mb-4 text-sm text-muted-foreground font-medium">
            {isLoading ? "Ricerca in corso..." : `${caregivers?.length || 0} caregiver trovati`}
          </div>
          
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse h-48 bg-muted/50 border-none" />
              ))
            ) : caregivers?.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Nessun caregiver trovato</h3>
                <p className="text-muted-foreground text-sm">
                  Prova a modificare i filtri o cercare in un'altra città.
                </p>
              </div>
            ) : (
              caregivers?.map((cg) => (
                <CaregiverCard key={cg.id} caregiver={cg} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="w-full md:w-[60%] lg:w-[65%] h-[50vh] md:h-full relative z-0">
        <MapContainer 
          center={[41.9, 12.5]} 
          zoom={6} 
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {caregivers?.map((cg) => (
            <Marker key={cg.id} position={[cg.lat, cg.lng]}>
              <Popup className="rounded-xl overflow-hidden shadow-lg border-none p-0">
                <div className="p-3 w-64">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-base">{cg.name}</h4>
                    <div className="font-bold text-primary">€{cg.pricePerHour}/h</div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400 mr-1" />
                    {cg.rating.toFixed(1)} ({cg.reviewCount})
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cg.services.map(s => (
                      <span key={s} className={`text-[10px] px-2 py-0.5 rounded-full ${getServiceColor(s)}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/profilo/${cg.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full h-8 text-xs">Profilo</Button>
                    </Link>
                    <Link href={`/chat/${cg.id}`} className="flex-1">
                      <Button size="sm" className="w-full h-8 text-xs bg-primary">Chatta</Button>
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
