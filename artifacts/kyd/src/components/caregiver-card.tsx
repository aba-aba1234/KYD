import { Link } from "wouter";
import { Star, MapPin, ShieldCheck, Baby, PawPrint, HeartHandshake } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { Caregiver } from "@workspace/api-client-react";

interface CaregiverCardProps {
  caregiver: Caregiver;
}

export function CaregiverCard({ caregiver }: CaregiverCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'baby': return 'bg-primary/10 text-primary border-primary/20';
      case 'pet': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'elder': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'baby': return <Baby className="h-3 w-3 mr-1" />;
      case 'pet': return <PawPrint className="h-3 w-3 mr-1" />;
      case 'elder': return <HeartHandshake className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };

  const getServiceLabel = (service: string) => {
    switch (service) {
      case 'baby': return 'Baby Care';
      case 'pet': return 'Pet Care';
      case 'elder': return 'Elder Care';
      default: return service;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg bg-card border-border flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
            <Avatar className="h-16 w-16 border-2 border-background shadow-sm" style={{ backgroundColor: caregiver.avatarColor }}>
              <AvatarFallback className="text-white font-medium text-lg bg-transparent">
                {getInitials(caregiver.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{caregiver.name}</h3>
                {caregiver.verified && (
                  <ShieldCheck className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {caregiver.city}
              </div>
              <div className="flex items-center mt-2 text-sm font-medium">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                <span>{caregiver.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1 font-normal">({caregiver.reviewCount} recensioni)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg text-primary">€{caregiver.pricePerHour}</span>
            <span className="text-muted-foreground text-sm">/ora</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {caregiver.services.map((service: string) => (
            <Badge key={service} variant="outline" className={`${getServiceColor(service)} font-medium`}>
              {getServiceIcon(service)}
              {getServiceLabel(service)}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {caregiver.bio}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-3">
        <Link href={`/profilo/${caregiver.id}`} className="flex-1">
          <button className="w-full py-2.5 px-4 rounded-md font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm">
            Vedi profilo
          </button>
        </Link>
        <Link href={`/prenota/${caregiver.id}`} className="flex-1">
          <button className="w-full py-2.5 px-4 rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
            Prenota
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}
