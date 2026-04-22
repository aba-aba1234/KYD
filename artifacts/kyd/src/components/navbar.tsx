import { Shield } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm" : "bg-transparent"
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

        <div className="hidden md:flex items-center gap-4">
          <Link href="/ricerca">
            <Button variant="ghost" className="text-sm font-medium">Accedi</Button>
          </Link>
          <Link href="/ricerca">
            <Button className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
              Trova un caregiver
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <Link href="/" className="flex items-center gap-2 text-primary mb-8 mt-4">
                <Shield className="h-6 w-6" />
                <span className="font-serif font-bold text-xl">KYD</span>
              </Link>
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
              <div className="mt-auto flex flex-col gap-4 pb-8">
                <Link href="/ricerca" className="w-full">
                  <Button variant="outline" className="w-full justify-center">Accedi</Button>
                </Link>
                <Link href="/ricerca" className="w-full">
                  <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90">
                    Trova un caregiver
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
