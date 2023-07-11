import React from "react";
import HeroCarousel from "./HeroCarousel";
import TinyBanner from "./TinyBanner";
import TopDiscountedCarousel from "./TopDisCountCarousel";

const HomePage = () => {
  return (
    <React.Fragment>
      <HeroCarousel />
      <TinyBanner />
      <TopDiscountedCarousel></TopDiscountedCarousel>
      {/* <PopularShopsNearYou></PopularShopsNearYou> */}
    </React.Fragment>
  );
};

export default HomePage;
