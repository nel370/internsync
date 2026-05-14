import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { generateCollections } from "@/lib/nftData";
import SectionHeader from "@/components/shared/SectionHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

const collections = generateCollections(8);

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

export default function HotCollections() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Hot Collections" />
        <div className="relative px-6">
          <Slider {...sliderSettings}>
            {collections.map((col) => (
              <div key={col.id} className="px-3">
                <Link to="/explore" className="group block">
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={col.image}
                        alt={col.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="relative px-4 pb-4 pt-8">
                      <img
                        src={col.authorImage}
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