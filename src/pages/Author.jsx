import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Copy, Check, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

function SkeletonProfile() {
  return (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="w-28 h-28 rounded-full bg-muted border-4 border-background" />
      <div className="mt-4 h-6 bg-muted rounded w-40" />
      <div className="mt-2 h-4 bg-muted rounded w-24" />
      <div className="mt-3 h-9 bg-muted rounded-full w-64" />
      <div className="mt-3 h-4 bg-muted rounded w-28" />
      <div className="mt-4 h-9 bg-muted rounded-full w-28" />
    </div>
  );
}

function NftItem({ nft }) {
  return (
    <Link to="/item-details" className="group block">
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <div className="aspect-square overflow-hidden">
          <img
            src={nft.nftImage}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
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

export default function Author() {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [following, setFollowing] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const authorId = urlParams.get("author");

  useEffect(() => {
    const url = authorId
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      : "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";
    axios.get(url).then((res) => setAuthor(res.data)).finally(() => setLoading(false));
  }, [authorId]);

  const handleCopy = () => {
    if (!author?.address) return;
    navigator.clipboard.writeText(author.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="relative h-52 sm:h-64 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {loading ? (
          <SkeletonProfile />
        ) : (
          <div className="flex flex-col items-center text-center">
            <img
              src={author?.authorImage}
              alt={author?.authorName}
              className="w-28 h-28 rounded-full border-4 border-background object-cover shadow-xl"
            />
            <h1 className="mt-4 text-2xl font-bold text-foreground">{author?.authorName}</h1>
            <p className="text-sm text-muted-foreground mt-1">@{author?.tag}</p>

            <div className="flex items-center gap-2 mt-3 bg-card border border-border/50 rounded-full px-4 py-2">
              <span className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
                {author?.address}
              </span>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-sm text-muted-foreground mt-3">{author?.followers} followers</p>

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
        )}

        {/* NFT Grid */}
        <div className="mt-12 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden animate-pulse">
                    <div className="aspect-square bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-3.5 bg-muted rounded w-3/4" />
                      <div className="flex justify-between">
                        <div className="h-3 bg-muted rounded w-1/3" />
                        <div className="h-3 bg-muted rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))
              : author?.nftCollection?.map((nft, i) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NftItem nft={nft} />
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}