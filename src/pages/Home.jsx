import React from "react";
import HeroLanding from "@/components/home/HeroLanding";
import LandingIntro from "@/components/home/LandingIntro";
import HotCollections from "@/components/home/HotCollections";
import NewItems from "@/components/home/NewItems";
import TopSellers from "@/components/home/TopSellers";
import BrowseByCategory from "@/components/home/BrowseByCategory";

export default function Home() {
  return (
    <>
      <HeroLanding />
      <LandingIntro />
      <HotCollections />
      <NewItems />
      <TopSellers />
      <BrowseByCategory />
    </>
  );
}