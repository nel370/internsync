import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart, Eye, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function SkeletonDetails() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 animate-pulse">
      <div className="rounded-3xl overflow-hidden bg-card border border-border/50 aspect-square bg-muted" />
      <div className="flex flex-col gap-4">
        <div className="h-5 bg-muted rounded w-24" />
        <div className="h-9 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-px bg-muted my-2" />
        <div className="grid grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="h-4 bg-muted rounded w-24" />
            </div>
          ))}
        </div>
        <div className="h-px bg-muted my-2" />
        <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
          <div className="h-4 bg-muted rounded w-28" />
          <div className="h-9 bg-muted rounded w-40" />
          <div className="h-12 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function ItemDetails() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const nftId = urlParams.get("nftId");

  useEffect(() => {
    const url = nftId
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      : "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";
    axios.get(url).then((res) => setItem(res.data)).finally(() => setLoading(false));
  }, [nftId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {loading ? (
        <SkeletonDetails />
      ) : (
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div data-aos="fade-right">
            <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50">
              <img
                src={item?.nftImage}
                alt={item?.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setLiked((v) => !v)}
                  className={`w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors ${liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
                >
                  <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
                </button>
                <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div data-aos="fade-left" data-aos-delay="150" className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1">#{item?.tag}</span>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {item?.views ?? 0}</span>
                <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {item?.likes ?? 0}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{item?.title}</h1>

            <p className="mt-4 text-muted-foreground leading-relaxed">{item?.description}</p>

            <Separator className="my-6 bg-border/50" />

            {/* Owner & Creator */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Owner</p>
                <Link
                  to={item?.ownerId ? `/author?author=${item.ownerId}` : "/author"}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={item?.ownerImage}
                    alt={item?.ownerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item?.ownerName}
                  </span>
                </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Creator</p>
                <Link
                  to={item?.creatorId ? `/author?author=${item.creatorId}` : "/author"}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={item?.creatorImage}
                    alt={item?.creatorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item?.creatorName}
                  </span>
                </Link>
              </div>
            </div>

            <Separator className="my-6 bg-border/50" />

            {/* Price */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Current Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{item?.price}</span>
                <span className="text-lg font-semibold text-primary">ETH</span>
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full h-12 text-base">
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}