import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const { data } = useCmsData();

  return (
    <div className="w-full bg-background pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Contact Us</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
          <p className="mt-8 text-muted-foreground text-lg max-w-2xl mx-auto">
            We welcome inquiries from prospective parents, alumni, and community members.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="bg-primary text-primary-foreground p-10 rounded-3xl h-full shadow-lg">
              <h2 className="text-2xl font-serif font-bold mb-8 text-accent">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full shrink-0"><MapPin className="w-6 h-6 text-accent" /></div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Address</h3>
                    <p className="text-primary-foreground/80 leading-relaxed">{data.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full shrink-0"><Phone className="w-6 h-6 text-accent" /></div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-primary-foreground/80">{data.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full shrink-0"><Mail className="w-6 h-6 text-accent" /></div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-primary-foreground/80">{data.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full shrink-0"><Clock className="w-6 h-6 text-accent" /></div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                    <p className="text-primary-foreground/80 whitespace-pre-line">{data.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-card p-10 rounded-3xl border border-border shadow-lg">
            <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <Input id="subject" placeholder="General Inquiry" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <Textarea id="message" placeholder="How can we help you?" rows={5} className="resize-none" />
              </div>
              <Button type="submit" className="w-full h-12 text-base font-semibold">Send Message</Button>
            </form>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 h-[400px] bg-muted rounded-3xl overflow-hidden border border-border relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/400?grayscale&blur=2')] opacity-50 bg-cover bg-center" />
          <div className="relative z-10 flex flex-col items-center p-6 bg-background/80 backdrop-blur-sm rounded-xl">
            <MapPin className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-bold text-lg mb-1">{data.school.name}</h3>
            <p className="text-muted-foreground text-sm">{data.contact.address}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
