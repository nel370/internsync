import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/lib/nftData";
import SectionHeader from "@/components/shared/SectionHeader";

export default function BrowseByCategory() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" data-aos-duration="600"><SectionHeader title="Browse by Category" /></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <div key={cat.name} data-aos="zoom-in-up" data-aos-delay={i * 80} data-aos-duration="600">
              <Link
                to="/explore"
                className="group flex flex-col items-center gap-3 bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-medium text-foreground">{cat.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}