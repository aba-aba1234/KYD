import { Shield, Menu, LogOut, Users, HeartHandshake } from "lucide-react";
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

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/come-funziona", label: "Come funziona" },
    { href: "/famiglie", label: "Famiglie" },
    { href: "/caregiver", label: "Diventa Caregiver" },
    { href: "/sicurezza", label: "Sicurezza" },
  ];

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const userInitials = user ? getInitials(user.name) : "";
  const roleLabel = user?.role === "caregiver" ? "Caregiver" : "Famiglia";
  const RoleIcon = user?.role === "caregiver" ? HeartHandshake : Users;
  const roleAccent =
    user?.role === "caregiver" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
          <Shield className="h-6 w-6" />
          <span className="font-serif font-bold text-xl tracking-tight">KYD</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className={`h-8 w-8 rounded-full ${roleAccent} flex items-center justify-center text-xs font-bold`}>
                    {userInitials}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold leading-tight">
                      {user.name.split(" ")[0]}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground leading-tight">
                      {roleLabel}
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-muted-foreground font-normal">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <RoleIcon className="h-4 w-4" />
                  <span>{roleLabel}</span>
                  {user.city && <span className="ml-auto text-xs text-muted-foreground">{user.city}</span>}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Esci
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Link href="/" className="flex items-center gap-2 text-primary mb-8 mt-4">
                <Shield className="h-6 w-6" />
                <span className="font-serif font-bold text-xl">KYD</span>
              </Link>

              {user && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border bg-card p-3">
                  <div className={`h-10 w-10 rounded-full ${roleAccent} flex items-center justify-center text-sm font-bold`}>
                    {userInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{roleLabel}</div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pb-8">
                {user ? (
                  <Button variant="outline" onClick={handleLogout} className="w-full justify-center gap-2">
                    <LogOut className="h-4 w-4" /> Esci
                  </Button>
                ) : (
                  <>
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full justify-center">
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
  );
}
