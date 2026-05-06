import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function News() {
  const { data } = useCmsData();
  const sortedNews = [...data.news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredNews = sortedNews.find(n => n.featured) || sortedNews[0];
  const regularNews = sortedNews.filter(n => n.id !== featuredNews?.id);

  return (
    <div className="w-full bg-background pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Latest News</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        {featuredNews && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-16">
            <div className="rounded-3xl overflow-hidden bg-card border border-border shadow-xl grid lg:grid-cols-2 group">
              <div className="h-[300px] lg:h-auto relative overflow-hidden">
                <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-accent text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Featured</span>
                  <span className="text-muted-foreground text-sm font-medium">{format(new Date(featuredNews.date), "MMMM d, yyyy")}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">{featuredNews.title}</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{featuredNews.summary}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors group/link cursor-pointer">
                    Read Full Story <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularNews.map((article, idx) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
              <Card className="h-full flex flex-col overflow-hidden border-border hover:shadow-lg transition-shadow group">
                <div className="h-56 relative overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-muted-foreground text-sm font-medium mb-3">{format(new Date(article.date), "MMMM d, yyyy")}</div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 text-sm">{article.summary}</p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors text-sm cursor-pointer">
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
