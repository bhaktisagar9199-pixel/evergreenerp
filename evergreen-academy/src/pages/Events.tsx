import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { Clock, MapPin } from "lucide-react";

export default function Events() {
  const { data } = useCmsData();
  const sortedEvents = [...data.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const monthYear = format(parseISO(event.date), "MMMM yyyy");
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, typeof sortedEvents>);

  return (
    <div className="w-full bg-background pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">School Calendar</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="space-y-16">
          {Object.entries(groupedEvents).map(([monthYear, events]) => (
            <motion.div key={monthYear} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-serif font-bold text-primary border-b-2 border-primary pb-3 mb-8">{monthYear}</h2>
              <div className="space-y-6">
                {events.map((event) => {
                  const eventDate = parseISO(event.date);
                  return (
                    <div key={event.id} className="flex flex-col md:flex-row gap-6 bg-card p-6 rounded-2xl border border-border hover:border-primary/20 transition-colors shadow-sm">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-xl w-24 h-24">
                        <span className="text-sm font-bold uppercase tracking-wider text-accent">{format(eventDate, "MMM")}</span>
                        <span className="text-4xl font-serif font-bold leading-none my-1">{format(eventDate, "dd")}</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium mb-3">
                          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{event.time}</div>
                          <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" />{event.location}</div>
                        </div>
                        <p className="text-muted-foreground text-sm">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
          {sortedEvents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No upcoming events found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
