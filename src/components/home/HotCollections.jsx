import React from "react";
import { Link } from "react-router-dom";
import { generateCollections } from "@/lib/nftData";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";

const collections = generateCollections(4);

export default function HotCollections() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Hot Collections" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/explore" className="group block">
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative px-4 pb-4 pt-8">
                    <img
                      src={col.authorImage}
                      alt="Author"
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-card object-cover"
                    />
                    <h3 className="text-sm font-bold text-foreground text-center">{col.title}</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">{col.code}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}