import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";

export default function About() {
  const { data } = useCmsData();

  return (
    <div className="w-full bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">About Our School</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">Our History</h2>
            <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{data.about.history}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-3xl overflow-hidden shadow-2xl h-[400px]">
            <img src={data.about.historyImage || "https://picsum.photos/800/600?random=18"} alt="School history" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-primary text-primary-foreground p-10 rounded-3xl">
            <h2 className="text-2xl font-serif font-bold mb-4 text-accent">Our Mission</h2>
            <p className="text-lg leading-relaxed text-primary-foreground/90 whitespace-pre-line">{data.about.mission}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-muted p-10 rounded-3xl">
            <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Our Vision</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{data.about.vision}</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-serif font-bold text-center mb-16 text-foreground">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.team.map((member, idx) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group">
                <div className="rounded-2xl overflow-hidden mb-4 h-72">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">{member.role}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
