import {
  Shield,
  Menu,
  LogOut,
  Users,
  HeartHandshake,
  Search,
  MessageCircle,
  Calendar,
  LayoutDashboard,
  Plus,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth, getInitials } from "@/hooks/use-auth";

interface NavLink {
  href: string;
  label: string;
  icon?: typeof Search;
}

const GUEST_LINKS: NavLink[] = [
  { href: "/come-funziona", label: "Come funziona" },
  { href: "/famiglie", label: "Famiglie" },
  { href: "/caregiver", label: "Diventa Caregiver" },
  { href: "/sicurezza", label: "Sicurezza" },
];

const FAMILY_LINKS: NavLink[] = [
  { href: "/area-personale", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ricerca", label: "Trova caregiver", icon: Search },
  { href: "/le-mie-prenotazioni", label: "Prenotazioni", icon: Calendar },
];

const CAREGIVER_LINKS: NavLink[] = [
  { href: "/dashboard-caregiver", label: "Dashboard", icon: LayoutDashboard },
  { href: "/prenotazioni-ricevute", label: "Prenotazioni", icon: Calendar },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isFamily, isCaregiver, isPending, isAnyCaregiver } =
    useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const navLinks: NavLink[] = !user
    ? GUEST_LINKS
    : isFamily
    ? FAMILY_LINKS
    : isAnyCaregiver
    ? CAREGIVER_LINKS
    : [];

  const userInitials = user ? getInitials(user.name) : "";

  const badge = isFamily
    ? { label: "Utente", className: "bg-primary/10 text-primary", Icon: Users }
    : isCaregiver
    ? {
        label: "Caregiver",
        className: "bg-emerald-100 text-emerald-700",
        Icon: ShieldCheck,
      }
    : isPending
    ? {
        label: "In verifica",
        className: "bg-amber-100 text-amber-700",
        Icon: Clock,
      }
    : null;

  const roleAccent = isAnyCaregiver
    ? "bg-secondary/10 text-secondary"
    : "bg-primary/10 text-primary";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity"
          >
            <Shield className="h-6 w-6" />
            <span className="font-serif font-bold text-xl tracking-tight">
              KYD
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {badge && (
                  <span
                    className={`hidden lg:inline-flex items-center gap-1 text-[11px] uppercase tracking-wide font-bold px-2.5 py-1 rounded-full ${badge.className}`}
                  >
                    <badge.Icon className="h-3 w-3" />
                    {badge.label}
                  </span>
                )}

                {isFamily && (
                  <Link href="/caregiver">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-medium border-secondary/30 text-secondary hover:bg-secondary/5 hover:text-secondary"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Diventa caregiver
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border bg-card hover:border-primary/50 transition-colors"
                    >
                      <div
                        className={`h-8 w-8 rounded-full ${roleAccent} flex items-center justify-center text-xs font-bold`}
                      >
                        {userInitials}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold leading-tight">
                          {user.name.split(" ")[0]}
                        </div>
                        {badge && (
                          <div className="text-[10px] uppercase tracking-wide text-muted-foreground leading-tight">
                            {badge.label}
                          </div>
                        )}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {user.email}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isFamily && (
                      <>
                        <Link href="/area-personale">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <LayoutDashboard className="h-4 w-4" />
                            La mia area personale
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/le-mie-prenotazioni">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Calendar className="h-4 w-4" />
                            Le mie prenotazioni
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    {isAnyCaregiver && (
                      <>
                        <Link href="/dashboard-caregiver">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/prenotazioni-ricevute">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Calendar className="h-4 w-4" />
                            Prenotazioni ricevute
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Esci
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-sm font-medium">
                    Accedi
                  </Button>
                </Link>
                <Link href="/registrati">
                  <Button className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                    Registrati gratis
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Apri menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-primary mb-8 mt-4"
                >
                  <Shield className="h-6 w-6" />
                  <span className="font-serif font-bold text-xl">KYD</span>
                </Link>

                {user && (
                  <div className="mb-6 flex items-center gap-3 rounded-xl border bg-card p-3">
                    <div
                      className={`h-10 w-10 rounded-full ${roleAccent} flex items-center justify-center text-sm font-bold`}
                    >
                      {userInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">
                        {user.name}
                      </div>
                      {badge && (
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full ${badge.className}`}
                        >
                          <badge.Icon className="h-3 w-3" />
                          {badge.label}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 text-base font-medium px-3 py-2.5 rounded-lg transition-colors ${
                          location === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto flex flex-col gap-3 pb-8">
                  {user ? (
                    <>
                      {isFamily && (
                        <Link href="/caregiver" className="w-full">
                          <Button
                            variant="outline"
                            className="w-full justify-center gap-2 border-secondary/30 text-secondary"
                          >
                            <Plus className="h-4 w-4" />
                            Diventa caregiver
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full justify-center gap-2"
                      >
                        <LogOut className="h-4 w-4" /> Esci
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full justify-center"
                        >
                          Accedi
                        </Button>
                      </Link>
                      <Link href="/registrati" className="w-full">
                        <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90">
                          Registrati gratis
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Pending caregiver banner */}
      {isPending && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="container mx-auto px-4 py-2.5 flex items-center gap-3">
            <Clock className="h-4 w-4 text-amber-600 shrink-0" />
            <div className="flex-1 text-sm">
              <span className="font-semibold text-amber-900">
                Profilo in fase di verifica.
              </span>{" "}
              <span className="text-amber-700 hidden sm:inline">
                Riceverai una notifica entro 24-48 ore con i prossimi passi.
              </span>
            </div>
            <Link
              href="/dashboard-caregiver"
              className="text-xs font-bold text-amber-800 hover:underline shrink-0"
            >
              Vedi stato
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
