import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { useListCaregivers } from "@workspace/api-client-react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CaregiverCard } from "@/components/caregiver-card";
import {
  Search,
  MapPin,
  Star,
  Baby,
  PawPrint,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Filter,
} from "lucide-react";

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

type ServiceFilter = "baby" | "pet" | "elder" | undefined;

const SERVICE_HEX: Record<string, string> = {
  baby: "#cc6a3d",
  pet: "#6b8e6b",
  elder: "#d4a017",
};

const SERVICE_LABEL: Record<string, string> = {
  baby: "Babysitter",
  pet: "Pet-sitter",
  elder: "Badante",
};

function buildServiceIcon(service: string): L.DivIcon {
  const color = SERVICE_HEX[service] ?? SERVICE_HEX.baby;
  return L.divIcon({
    className: "kyd-pin",
    html: `
      <div style="position:relative;width:36px;height:46px;transform:translate(-50%,-100%);filter:drop-shadow(0 4px 6px rgba(0,0,0,0.25));">
        <svg viewBox="0 0 36 46" width="36" height="46" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.06 0 0 7.83 0 17.5C0 31 18 46 18 46S36 31 36 17.5C36 7.83 27.94 0 18 0Z" fill="${color}"/>
          <circle cx="18" cy="17" r="7" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [36, 46],
    iconAnchor: [0, 0],
    popupAnchor: [0, -42],
  });
}

interface MapCaregiver {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  radiusKm: number;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  services: string[];
}

function FitBounds({ caregivers }: { caregivers: MapCaregiver[] }) {
  const map = useMap();
  useEffect(() => {
    if (!caregivers || caregivers.length === 0) return;
    if (caregivers.length === 1) {
      const c = caregivers[0];
      map.setView([c.lat, c.lng], 11, { animate: true });
      return;
    }
    const bounds = L.latLngBounds(caregivers.map((c) => [c.lat, c.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12, animate: true });
  }, [caregivers, map]);
  return null;
}

export default function SearchPage() {
  const initial = useMemo(() => new URLSearchParams(window.location.search), []);
  const [city, setCity] = useState(initial.get("city") ?? "");
  const [service, setService] = useState<ServiceFilter>(
    (initial.get("service") as ServiceFilter) ?? undefined
  );
  const [maxPrice, setMaxPrice] = useState<number>(30);
  const [availableNow, setAvailableNow] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState({
    city: initial.get("city") ?? undefined,
    service: (initial.get("service") as ServiceFilter) ?? undefined,
    maxPrice: 30,
    availableNow: false,
  });

  const { data: caregivers, isLoading } = useListCaregivers({
    city: activeFilters.city || undefined,
    service: activeFilters.service,
    maxPrice: activeFilters.maxPrice,
    availableNow: activeFilters.availableNow ? true : undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveFilters({
      city: city || undefined,
      service,
      maxPrice,
      availableNow,
    });
  };

  const resetFilters = () => {
    setCity("");
    setService(undefined);
    setMaxPrice(30);
    setAvailableNow(false);
    setActiveFilters({
      city: undefined,
      service: undefined,
      maxPrice: 30,
      availableNow: false,
    });
  };

  const list = (caregivers ?? []) as MapCaregiver[];

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
      {/* Sidebar / List */}
      <aside className="w-full md:w-[44%] lg:w-[38%] xl:w-[34%] flex flex-col h-full bg-background border-r z-10 shadow-xl overflow-hidden">
        <div className="p-4 border-b bg-card shrink-0">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca per città (es. Milano, Roma)"
                className="pl-9 h-11"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              <Button
                type="button"
                variant={service === "baby" ? "default" : "outline"}
                size="sm"
                className="rounded-full shrink-0"
                onClick={() => setService(service === "baby" ? undefined : "baby")}
              >
                <Baby className="h-4 w-4 mr-1.5" /> Baby
              </Button>
              <Button
                type="button"
                variant={service === "pet" ? "default" : "outline"}
                size="sm"
                className="rounded-full shrink-0"
                onClick={() => setService(service === "pet" ? undefined : "pet")}
              >
                <PawPrint className="h-4 w-4 mr-1.5" /> Pet
              </Button>
              <Button
                type="button"
                variant={service === "elder" ? "default" : "outline"}
                size="sm"
                className="rounded-full shrink-0"
                onClick={() => setService(service === "elder" ? undefined : "elder")}
              >
                <HeartHandshake className="h-4 w-4 mr-1.5" /> Elder
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Prezzo massimo
                </Label>
                <span className="text-sm font-semibold text-foreground">€{maxPrice}/ora</span>
              </div>
              <Slider
                value={[maxPrice]}
                onValueChange={(v) => setMaxPrice(v[0] ?? 30)}
                min={8}
                max={40}
                step={1}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <Label htmlFor="availableNow" className="text-sm cursor-pointer">
                  Disponibile ora
                </Label>
              </div>
              <Switch
                id="availableNow"
                checked={availableNow}
                onCheckedChange={setAvailableNow}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 h-10">
                <Search className="h-4 w-4 mr-2" /> Cerca
              </Button>
              <Button type="button" variant="outline" onClick={resetFilters} className="h-10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              {isLoading
                ? "Ricerca in corso..."
                : `${list.length} caregiver ${list.length === 1 ? "trovato" : "trovati"}`}
            </div>
            {activeFilters.availableNow && (
              <span className="text-[10px] uppercase tracking-wide font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                Solo disponibili ora
              </span>
            )}
          </div>

          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse h-44 bg-muted/40 border-none" />
              ))
            ) : list.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-10 w-10 mx-auto text-muted-foreground opacity-40 mb-4" />
                <h3 className="text-base font-semibold mb-1">Nessun caregiver trovato</h3>
                <p className="text-muted-foreground text-sm">
                  Prova a rimuovere alcuni filtri o cercare in un'altra città.
                </p>
                <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4">
                  Azzera filtri
                </Button>
              </div>
            ) : (
              list.map((cg) => (
                <div
                  key={cg.id}
                  onMouseEnter={() => setHoveredId(cg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`transition-transform ${
                    hoveredId === cg.id ? "scale-[1.01]" : ""
                  }`}
                >
                  <CaregiverCard caregiver={cg as never} />
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Map Area */}
      <div className="w-full md:flex-1 h-[55vh] md:h-full relative z-0">
        <MapContainer
          center={[41.9, 12.5]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds caregivers={list} />

          {list.map((cg) => {
            const primary = cg.services[0] ?? "baby";
            const color = SERVICE_HEX[primary] ?? SERVICE_HEX.baby;
            const isHovered = hoveredId === cg.id;
            return (
              <div key={cg.id}>
                <Circle
                  center={[cg.lat, cg.lng]}
                  radius={(cg.radiusKm ?? 5) * 1000}
                  pathOptions={{
                    color,
                    weight: isHovered ? 2 : 1,
                    fillColor: color,
                    fillOpacity: isHovered ? 0.18 : 0.08,
                  }}
                />
                <Marker
                  position={[cg.lat, cg.lng]}
                  icon={buildServiceIcon(primary)}
                  eventHandlers={{
                    mouseover: () => setHoveredId(cg.id),
                    mouseout: () => setHoveredId(null),
                  }}
                >
                  <Popup className="kyd-popup">
                    <div className="p-1 w-64">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div>
                          <div className="font-bold text-base leading-tight">{cg.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" />
                            {cg.city} · raggio {cg.radiusKm}km
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-base">€{cg.pricePerHour}</div>
                          <div className="text-[10px] text-muted-foreground -mt-1">/ora</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold">{cg.rating.toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground">({cg.reviewCount})</span>
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 ml-auto" />
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {cg.services.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: `${SERVICE_HEX[s]}1a`,
                              color: SERVICE_HEX[s],
                            }}
                          >
                            {SERVICE_LABEL[s] ?? s}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/profilo/${cg.id}`} className="flex-1">
                          <Button size="sm" variant="outline" className="w-full h-8 text-xs">
                            Profilo
                          </Button>
                        </Link>
                        <Link href={`/chat/${cg.id}`} className="flex-1">
                          <Button size="sm" className="w-full h-8 text-xs">
                            Chatta
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}
        </MapContainer>

        {/* Map legend */}
        <div className="absolute bottom-4 left-4 z-[400] bg-background/95 backdrop-blur border rounded-lg shadow-lg p-3 text-xs space-y-1.5">
          <div className="font-semibold text-foreground mb-1">Servizi sulla mappa</div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: SERVICE_HEX.baby }} />
            Babysitter
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: SERVICE_HEX.pet }} />
            Pet-sitter
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: SERVICE_HEX.elder }} />
            Badante
          </div>
        </div>
      </div>
    </div>
  );
}
