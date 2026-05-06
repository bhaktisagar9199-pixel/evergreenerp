import { Link, useLocation } from "wouter";
import { useAdmin } from "@/hooks/useAdmin";
import { useCmsData } from "@/hooks/useCmsData";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function Navbar() {
  const [location] = useLocation();
  const { isAdmin } = useAdmin();
  const { data } = useCmsData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/admission", label: "Admissions" },
    { href: "/notices", label: "Notices" },
    { href: "/news", label: "News" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const logo = data.design.logoText || "EA";

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-background/95 backdrop-blur-md border-border py-3 shadow-sm" : "bg-transparent border-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-xl group-hover:bg-accent group-hover:text-primary transition-colors">
              {logo}
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight text-foreground">{data.school.name}</span>
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Est. {data.school.founded}</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/5",
                  location === link.href ? "text-primary bg-primary/5" : "text-foreground/80 hover:text-primary"
                )}
              >{link.label}</Link>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <Link href={isAdmin ? "/admin/dashboard" : "/admin"}>
              <Button size="sm" variant={isAdmin ? "default" : "outline"} className={cn("gap-2 rounded-full text-xs", isAdmin ? "bg-accent text-primary hover:bg-accent/90" : "")}>
                <LayoutDashboard className="w-3.5 h-3.5" />
                {isAdmin ? "Dashboard" : "Admin"}
              </Button>
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className={cn("px-4 py-3 rounded-md text-sm font-medium transition-colors", location === link.href ? "text-primary bg-primary/5" : "text-foreground hover:bg-primary/5")}
              >{link.label}</Link>
            ))}
            <div className="h-px bg-border my-1" />
            <Link href={isAdmin ? "/admin/dashboard" : "/admin"} onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-primary/5 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              {isAdmin ? "Admin Dashboard" : "Admin Login"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
