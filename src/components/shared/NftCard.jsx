import React from "react";
import { Link } from "react-router-dom";
import { Heart, Clock } from "lucide-react";

export default function NftCard({ nft, showCountdown = false }) {
  return (
    <Link to={`/item-details?nftId=${nft.nftId}`} className="group block">
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={nft.image}
            alt={nft.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Author badge */}
          <Link
            to={nft.authorId ? `/author?author=${nft.authorId}` : "/author"}
            className="absolute top-3 left-3 w-9 h-9 rounded-full border-2 border-card overflow-hidden hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={nft.authorImage} alt="Author" className="w-full h-full object-cover" />
          </Link>
          {showCountdown && (
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">{nft.countdown || "5h 30m 32s"}</span>
            </div>
          )}
        </div>

        {/* Info */}
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