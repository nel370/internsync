import React from "react";
import { Link } from "react-router-dom";
import { generateTopSellers } from "@/lib/nftData";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";

const sellers = generateTopSellers(12);

export default function TopSellers() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Top Sellers" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {sellers.map((seller, i) => (
            <motion.div
              key={seller.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to="/author" className="group flex items-center gap-3 bg-card border border-border/50 rounded-xl p-3 hover:border-primary/30 transition-all">
                <div className="relative flex-shrink-0">
                  <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <img
                    src={seller.image}
                    alt={seller.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{seller.name}</p>
                  <p className="text-xs text-muted-foreground">{seller.sales} ETH</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}