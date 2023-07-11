import { Box, Typography } from "@mui/material";
import theme from "theme";
import ItemCard from "components/ItemCard/ItemCard";
import { useEffect, useState } from "react";

const TopDiscountedCarousel = () => {
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

  return (
    <Box paddingY="2rem" paddingX="5rem">
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
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default TopDiscountedCarousel;
