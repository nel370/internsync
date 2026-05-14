import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, Clock } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

function useCountdown(expiryDate) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = expiryDate - Date.now();
      if (diff <= 0) { setTimeLeft("Expired"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [expiryDate]);

  return timeLeft;
}

function CountdownBadge({ expiryDate }) {
  const timeLeft = useCountdown(expiryDate);
  return (
    <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
      <Clock className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-medium text-foreground">{timeLeft}</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-3.5 bg-muted rounded w-3/4" />
        <div className="flex justify-between">
          <div className="h-3 bg-muted rounded w-1/3" />
          <div className="h-3 bg-muted rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

function NftNewCard({ nft }) {
  return (
    <Link to={`/item-details?nftId=${nft.nftId}`} className="group block">
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={nft.nftImage}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Link
            to={nft.authorId ? `/author?author=${nft.authorId}` : "/author"}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 left-3 w-9 h-9 rounded-full border-2 border-card overflow-hidden hover:scale-110 transition-transform"
          >
            <img src={nft.authorImage} alt="Author" className="w-full h-full object-cover" />
          </Link>
          {nft.expiryDate && <CountdownBadge expiryDate={nft.expiryDate} />}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-sm truncate">{nft.title}</h3>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-sm font-bold text-primary">{nft.price} ETH</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="w-3.5 h-3.5" />
              <span className="text-xs">{nft.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function NewItems() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => setNfts(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="New Items" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : nfts.slice(0, 8).map((nft) => <NftNewCard key={nft.id} nft={nft} />)}
        </div>
      </div>
    </section>
  );
}