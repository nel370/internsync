import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionHeader from "@/components/shared/SectionHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[-18px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-md"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[-18px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-md"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  dotsClass: "slick-dots !bottom-[-32px]",
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

function SkeletonCard() {
  return (
    <div className="px-3">
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden animate-pulse">
        <div className="aspect-[4/3] bg-muted" />
        <div className="relative px-4 pb-4 pt-8">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-muted border-4 border-card" />
          <div className="h-3.5 bg-muted rounded mx-auto w-3/4 mt-1" />
          <div className="h-3 bg-muted rounded mx-auto w-1/2 mt-2" />
        </div>
      </div>
    </div>
  );
}

export default function HotCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => setCollections(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Hot Collections" />
        <div className="relative px-6">
          <Slider {...sliderSettings}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : collections.map((col) => (
                  <div key={col.id} className="px-3">
                    <Link to="/explore" className="group block">
                      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={col.nftImage}
                            alt={col.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="relative px-4 pb-4 pt-8">
                          <img
                            src={col.creatorImage}
                            alt="Author"
                            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-card object-cover"
                          />
                          <h3 className="text-sm font-bold text-foreground text-center">{col.title}</h3>
                          <p className="text-xs text-muted-foreground text-center mt-1">{col.code}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}