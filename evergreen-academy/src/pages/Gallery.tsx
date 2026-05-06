import { useCmsData } from "@/hooks/useCmsData";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Gallery() {
  const { data } = useCmsData();
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", ...Array.from(new Set(data.gallery.map(g => g.category)))];
  const filteredGallery = data.gallery.filter(item => filter === "All" || item.category === filter);

  return (
    <div className="w-full bg-background pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Photo Gallery</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button key={cat} variant={filter === cat ? "default" : "outline"} onClick={() => setFilter(cat)} className={filter === cat ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-primary/5"}>
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-muted cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No images found for this category.</div>
        )}
      </div>
    </div>
  );
}
