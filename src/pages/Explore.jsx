import React, { useState, useMemo } from "react";
import { generateNfts } from "@/lib/nftData";
import NftCard from "@/components/shared/NftCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const allNfts = generateNfts(16);

export default function Explore() {
  const [filter, setFilter] = useState("default");
  const [visibleCount, setVisibleCount] = useState(8);

  const sortedNfts = useMemo(() => {
    const nfts = [...allNfts];
    if (filter === "price_low") nfts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (filter === "price_high") nfts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    if (filter === "most_liked") nfts.sort((a, b) => b.likes - a.likes);
    return nfts;
  }, [filter]);

  return (
    <>
      {/* Sub Header */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <h1 className="relative text-3xl sm:text-4xl font-bold text-foreground">Explore</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        <div className="flex justify-end mb-8">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-52 bg-card border-border">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price_low">Price, Low to High</SelectItem>
              <SelectItem value="price_high">Price, High to Low</SelectItem>
              <SelectItem value="most_liked">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedNfts.slice(0, visibleCount).map((nft, i) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <NftCard nft={nft} showCountdown />
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < sortedNfts.length && (
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