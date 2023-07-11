import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";
import theme from "theme";

const carouselContent = [
  {
    imageURL: "assets/flatlay1.jpg",
    headingText: "GET 20% OFF ON YOUR FIRST ORDER!",
    color: theme.colors.headerGreen,
    position: "bottom",
    subText: "Use Code FIRST20",
    buttonText: "Sign Up to get a discount",
    buttonBG: "",
    buttonColor: "",
  },
  {
    imageURL: "assets/beers2.jpg",
    headingText: "GET 10% OFF ON BOTTLED BEER FROM DUNNES STORE!",
    color: theme.colors.white,
    position: "bottom",
    buttonText: "Sign Up to get a discount",
    buttonBG: "",
    buttonColor: "",
  },
  {
    imageURL: "assets/flatlay3.jpg",
    headingText: "BACK TO SCHOOL SALE IS ON!",
    color: theme.colors.lightGreen,
    position: "center",
    subText: "Get up to 50% off on select items",
    buttonText: "SHOP NOW",
    buttonBG: "",
    buttonColor: "",
  },
];

const HeroCarousel = () => {
  return (
    <Carousel height="70vh">
      {carouselContent.map((item, i) => {
        return (
          <CarouselItem
            key={i}
            headingText={item.headingText}
            imageURL={item.imageURL}
            color={item.color}
            position={item.position}
            buttonText={item.buttonText}
            subText={item.subText}
          />
        );
      })}
    </Carousel>
  );
};
export default HeroCarousel;
