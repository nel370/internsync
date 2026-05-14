import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

function ExploreCard({ nft }) {
  const timeLeft = useCountdown(nft.expiryDate);
  return (
    <Link to="/item-details" className="group block">
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
          {nft.expiryDate && (
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">{timeLeft}</span>
            </div>
          )}
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

const FILTER_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price_low_to_high", label: "Price, Low to High" },
  { value: "price_high_to_low", label: "Price, High to Low" },
  { value: "likes_high_to_low", label: "Most Liked" },
];

export default function Explore() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("default");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setLoading(true);
    setVisibleCount(8);
    const url =
      filter === "default"
        ? "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`;
    axios
      .get(url)
      .then((res) => setNfts(res.data))
      .finally(() => setLoading(false));
  }, [filter]);

  const sortedNfts = nfts;

  return (
    <>
      <div className="relative h-48 sm:h-56 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Explore</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-8">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-52 bg-card border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : sortedNfts.slice(0, visibleCount).map((nft, i) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ExploreCard nft={nft} />
                </motion.div>
              ))}
        </div>

        {!loading && visibleCount < sortedNfts.length && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => setVisibleCount((v) => Math.min(v + 4, sortedNfts.length))}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </>
  );
}