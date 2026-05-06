import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from "lucide-react";

export default function Admission() {
  const { data } = useCmsData();
  const ad = data.admission;

  return (
    <div className="w-full bg-background pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{ad.title}</h1>
          <p className="text-xl text-accent font-medium mb-6">{ad.subtitle}</p>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-16">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{ad.intro}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-primary text-primary-foreground p-10 rounded-3xl">
            <h2 className="text-2xl font-serif font-bold mb-6 text-accent">Requirements</h2>
            <ul className="space-y-4">
              {ad.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-primary-foreground/90">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-muted rounded-3xl p-10">
            <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Important Dates</h2>
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-5 border border-border">
                <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-1">Application Deadline</p>
                <p className="text-foreground font-medium">{ad.deadline}</p>
              </div>
              <div className="bg-background rounded-xl p-5 border border-border">
                <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-1">Tuition & Fees</p>
                <p className="text-foreground text-sm leading-relaxed">{ad.fees}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Application Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ad.process.map((step, idx) => (
              <div key={idx} className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-serif font-bold mx-auto mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-primary text-primary-foreground rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Apply?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">Contact our Admissions Team today to begin your journey at Evergreen Academy.</p>
          <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-semibold rounded-full px-8 h-12 gap-2">
            <Mail className="w-5 h-5" />
            <a href={`mailto:${ad.contactEmail}`}>{ad.contactEmail}</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
