import React from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function ItemDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop"
              alt="Rainbow Style #194"
              className="w-full aspect-square object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="outline" className="text-primary border-primary/30">Art</Badge>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 100</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> 74</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Rainbow Style #194</h1>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          <Separator className="my-6 bg-border/50" />

          {/* Owner & Creator */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Owner</p>
              <Link to="/author" className="flex items-center gap-3 group">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                  alt="Owner"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Monica Lucas</span>
              </Link>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Creator</p>
              <Link to="/author" className="flex items-center gap-3 group">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                  alt="Creator"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Monica Lucas</span>
              </Link>
            </div>
          </div>

          <Separator className="my-6 bg-border/50" />

          {/* Price */}
          <div className="bg-card border border-border/50 rounded-2xl p-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Current Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">1.85</span>
              <span className="text-lg font-semibold text-primary">ETH</span>
              <span className="text-sm text-muted-foreground ml-2">($3,142.72)</span>
            </div>
            <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full h-12 text-base">
              <ShoppingCart className="w-5 h-5" />
              Buy Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}