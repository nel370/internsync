import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroLanding() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div data-aos="fade-right" data-aos-duration="800">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Ultraverse Market</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Create, sell or collect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                digital items.
              </span>
            </h1>
            <p className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg">
              Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/explore">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full px-8">
                  Explore <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-border hover:bg-secondary">
                Create
              </Button>
            </div>
          </div>

          {/* Right — Featured NFT */}
          <div data-aos="zoom-in" data-aos-delay="300" data-aos-duration="900" className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative bg-card border border-border/50 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop"
                  alt="Featured NFT"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">Pinky Ocean #001</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                        alt="Creator"
                        className="w-7 h-7 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">Monica Lucas</span>
                    </div>
                    <span className="text-sm font-bold text-primary">3.08 ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}