import React, { useState } from "react";
import { generateNfts } from "@/lib/nftData";
import NftCard from "@/components/shared/NftCard";
import { Button } from "@/components/ui/button";
import { Copy, Check, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const authorNfts = generateNfts(8);

export default function Author() {
  const [copied, setCopied] = useState(false);
  const [following, setFollowing] = useState(false);

  const walletAddress = "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Banner */}
      <div className="relative h-52 sm:h-64 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Profile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
            alt="Monica Lucas"
            className="w-28 h-28 rounded-full border-4 border-background object-cover shadow-xl"
          />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Monica Lucas</h1>
          <p className="text-sm text-muted-foreground mt-1">@monicaaaa</p>

          {/* Wallet */}
          <div className="flex items-center gap-2 mt-3 bg-card border border-border/50 rounded-full px-4 py-2">
            <span className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
              {walletAddress}
            </span>
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-sm text-muted-foreground mt-3">573 followers</p>

          <Button
            onClick={() => setFollowing(!following)}
            className={`mt-4 rounded-full px-6 gap-2 ${
              following
                ? "bg-secondary text-foreground hover:bg-secondary/80"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            {following ? "Following" : "Follow"}
          </Button>
        </div>

        {/* NFT Grid */}
        <div className="mt-12 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {authorNfts.map((nft, i) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NftCard nft={nft} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}