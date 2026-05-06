import { useCmsData } from "@/hooks/useCmsData";
import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { data } = useCmsData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-serif font-bold text-2xl">
                  EA
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl leading-tight">{data.school.name}</span>
                  <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">Est. {data.school.founded}</span>
                </div>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs">
              {data.school.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/news" className="hover:text-accent transition-colors">Latest News</Link></li>
              <li><Link href="/events" className="hover:text-accent transition-colors">School Calendar</Link></li>
              <li><Link href="/notices" className="hover:text-accent transition-colors">Notice Board</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-accent">Admissions</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="#" className="hover:text-accent transition-colors">Prospectus</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Apply Online</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Fees & Scholarships</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Open Days</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">International Students</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>{data.school.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>{data.school.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>{data.school.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>&copy; {currentYear} {data.school.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">Safeguarding</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
