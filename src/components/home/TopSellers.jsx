import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SectionHeader from "@/components/shared/SectionHeader";

function SkeletonSeller() {
  return (
    <div className="flex items-center gap-3 bg-card border border-border/50 rounded-xl p-3 animate-pulse">
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-full bg-muted" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

export default function TopSellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => setSellers(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-right" data-aos-duration="600"><SectionHeader title="Top Sellers" /></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonSeller key={i} />)
            : sellers.map((seller, i) => (
                <div key={seller.id} data-aos="fade-up" data-aos-delay={i * 50} data-aos-duration="500">
                  <Link
                    to="/author"
                    className="group flex items-center gap-3 bg-card border border-border/50 rounded-xl p-3 hover:border-primary/30 transition-all"
                  >
                    <div className="relative flex-shrink-0">
                      <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <img
                        src={seller.authorImage}
                        alt={seller.authorName}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{seller.authorName}</p>
                      <p className="text-xs text-muted-foreground">{seller.price} ETH</p>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}