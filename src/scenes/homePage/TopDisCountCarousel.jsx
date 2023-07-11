import { Box, Typography } from "@mui/material";
import theme from "theme";
import ItemCard from "components/ItemCard/ItemCard";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TopDiscountedCarousel = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTopDiscountedItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/items/topdiscounts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching top discounted items:", error);
      }
    };

    fetchTopDiscountedItems();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 900 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 900, min: 0 },
      items: 1,
    },
  };

  return (
    <React.Fragment>
      <Box paddingTop="2rem" paddingX="5rem">
        <Typography
          pb="0.5rem"
          mb="1.5rem"
          variant="h6"
          fontFamily="Poppins"
          fontWeight="400"
          color={theme.colors.siteGreen}
          borderBottom="solid 1px #EEE9E9"
        >
          Top Discounted Products
        </Typography>
      </Box>
      <Box paddingX="5vw">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          renderButtonGroupOutside={true}
          centerMode={true}
        >
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </Carousel>
      </Box>
    </React.Fragment>
  );
};

export default TopDiscountedCarousel;
