import Carousel from "react-material-ui-carousel";
import CarouselItem from "../homePage/CarouselItem";
import theme from "theme";

const carouselContent = [
  {
    imageURL: "/assets/flatlay1.jpg",
    headingText: "Welcome to our Shop!",
    color: theme.colors.headerGreen,
    position: "center",
    subText: "Discover a world of unique products",
    buttonText: "Explore Now",
  },
  {
    imageURL: "/assets/shop1.png",
    headingText: "Quality and Service Guaranteed",
    color: theme.colors.white,
    position: "bottom",
    subText: "We believe in providing exceptional products and service",
    buttonText: "Shop with Confidence",
  },
];

const shopCarouselContent = () => {
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
export default shopCarouselContent;
