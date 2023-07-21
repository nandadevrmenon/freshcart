import React from "react";
import HeroCarousel from "./HeroCarousel";
import TinyBanner from "./TinyBanner";
import TopDiscountedCarousel from "./TopDisCountCarousel";
import PopularStoresNearYou from "./PopularStoresNearYou";

const HomePage = () => {
  return (
    <React.Fragment>
      <HeroCarousel />
      <TinyBanner />
      <TopDiscountedCarousel></TopDiscountedCarousel>
      <PopularStoresNearYou></PopularStoresNearYou>
    </React.Fragment>
  );
};

export default HomePage;
