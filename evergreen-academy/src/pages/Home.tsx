import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Pin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export default function Home() {
  const { data } = useCmsData();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        {data.hero.backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img src={data.hero.backgroundImage} alt="" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
              {data.hero.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-primary-foreground/90 font-medium leading-relaxed">
              {data.hero.subtitle}
            </p>
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 font-semibold rounded-full px-8 h-14 text-base" asChild>
              <Link href="/about">{data.hero.cta}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background relative -mt-10 rounded-t-[3rem] z-20 shadow-xl border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {data.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center p-6"
              >
                <span className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.value}</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-3">Welcome to {data.school.name}</h2>
              <h3 className="text-4xl font-serif font-bold text-foreground mb-6">A Tradition of Excellence</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {data.about.history.substring(0, 250)}...
              </p>
              <Button variant="outline" className="rounded-full group" asChild>
                <Link href="/about">
                  Read Our Story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {data.gallery[0] && (
                <img src={data.gallery[0].image} alt={data.gallery[0].title} className="rounded-2xl h-64 w-full object-cover shadow-md" />
              )}
              {data.gallery[1] && (
                <img src={data.gallery[1].image} alt={data.gallery[1].title} className="rounded-2xl h-64 w-full object-cover shadow-md translate-y-8" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News & Notices */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-2">Stay Updated</h2>
              <h3 className="text-4xl font-serif font-bold text-foreground">Latest from Campus</h3>
            </div>
            <Link href="/news" className="hidden md:flex items-center text-primary font-semibold hover:text-accent transition-colors">
              View All News <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {data.news.filter(n => n.featured).slice(0, 1).map(news => (
                <Card key={news.id} className="overflow-hidden border-none shadow-lg group rounded-3xl h-full">
                  <div className="relative h-[400px]">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <div className="mb-3">
                        <span className="bg-accent text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Featured</span>
                        <span className="ml-3 text-sm opacity-80">{format(new Date(news.date), 'MMMM d, yyyy')}</span>
                      </div>
                      <h4 className="text-3xl font-serif font-bold mb-3">{news.title}</h4>
                      <p className="text-white/80 line-clamp-2 max-w-xl">{news.summary}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-muted rounded-3xl p-8 shadow-inner">
              <h4 className="font-serif font-bold text-2xl mb-6 flex items-center gap-2">
                <Pin className="w-5 h-5 text-accent" /> Important Notices
              </h4>
              <div className="space-y-6">
                {data.notices.filter(n => n.pinned).slice(0, 3).map(notice => (
                  <div key={notice.id} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">{notice.category}</span>
                      <span className="text-xs text-muted-foreground">{format(new Date(notice.date), 'MMM d')}</span>
                    </div>
                    <h5 className="font-bold text-foreground mb-2 leading-tight">{notice.title}</h5>
                    <p className="text-sm text-muted-foreground line-clamp-2">{notice.content}</p>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-6 text-primary" asChild>
                <Link href="/notices">View Notice Board</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-2">What's On</h2>
              <h3 className="text-4xl font-serif font-bold">Upcoming Events</h3>
            </div>
            <Link href="/events" className="hidden md:flex items-center font-semibold hover:text-accent transition-colors">
              Full Calendar <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.events.slice(0, 3).map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="text-accent text-sm font-bold uppercase tracking-wider mb-2">
                  {format(new Date(event.date), "MMMM d, yyyy")}
                </div>
                <h4 className="font-serif font-bold text-xl mb-2">{event.title}</h4>
                <p className="text-primary-foreground/70 text-sm mb-3">{event.description}</p>
                <div className="text-xs text-primary-foreground/60 font-medium">{event.time} · {event.location}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
