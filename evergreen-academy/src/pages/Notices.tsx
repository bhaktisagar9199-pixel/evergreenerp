import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Pin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Notices() {
  const { data } = useCmsData();
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(data.notices.map(n => n.category)))];
  const filteredNotices = data.notices
    .filter(notice => filter === "All" || notice.category === filter)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="w-full bg-background pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Notice Board</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button key={cat} variant={filter === cat ? "default" : "outline"} onClick={() => setFilter(cat)} className={filter === cat ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-primary/5"}>
              {cat}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredNotices.map((notice, idx) => (
            <motion.div key={notice.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className={`p-8 rounded-2xl border ${notice.pinned ? 'bg-muted/50 border-accent/30 shadow-sm' : 'bg-card border-border shadow-sm hover:shadow-md'} transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {notice.pinned && <Pin className="w-5 h-5 text-accent" />}
                  <span className="text-xs font-bold text-primary uppercase tracking-wider px-3 py-1 bg-primary/10 rounded-full">{notice.category}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{format(new Date(notice.date), "MMMM d, yyyy")}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{notice.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{notice.content}</p>
            </motion.div>
          ))}
          {filteredNotices.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No notices found for this category.</div>
          )}
        </div>
      </div>
    </div>
  );
}
