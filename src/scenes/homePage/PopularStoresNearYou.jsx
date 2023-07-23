import { Box, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import theme from "theme";
import PopularStore from "./PopularStore";

const PopularStoresNearYou = () => {
  const [shops, setShops] = useState([]);
  const userArea = useSelector((state) => {
    return state.user ? state.user.address[3] : "";
  });
  useEffect(() => {
    const fetchTopDiscountedItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/shops/popularshops",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: userArea ? JSON.stringify({ area: userArea }) : "",
          }
        );
        const items = await response.json();
        setShops(items);
      } catch (error) {
        console.error("Error fetching Popular Stores:", error);
      }
    };

    fetchTopDiscountedItems();
  }, [userArea]);

  return (
    <Fragment>
      <Box paddingTop="2rem" paddingX="5rem">
        <Typography
          pb="0.5rem"
          mb="1.5rem"
          variant="h4"
          fontFamily="Poppins"
          fontWeight="400"
          color={theme.colors.siteGreen}
          borderBottom="solid 1px #EEE9E9"
        >
          {userArea ? "Popular Stores Near You" : "Popular Stores "}
        </Typography>
      </Box>
      <Box
        mx="auto"
        width="87%"
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(2,minmax(0,1fr))"
      >
        {shops.map((shop) => {
          return <PopularStore key={shop._id + "store"} shop={shop} />;
        })}
      </Box>
    </Fragment>
  );
};

export default PopularStoresNearYou;
