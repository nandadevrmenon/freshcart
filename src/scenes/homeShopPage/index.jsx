import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, TextField, Button } from "@mui/material";
import theme from "theme";
import PopularStore from "scenes/homePage/PopularStore";

const HomeShopPage = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userArea = useSelector((state) => state.user ? state.user.address[3] : "");

  useEffect(() => {
    const fetchTopDiscountedItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/shops/popularshops", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userArea ? JSON.stringify({ area: userArea }) : "",
        });
        const items = await response.json();
        setShops(items);
      } catch (error) {
        console.error("Error fetching Popular Stores:", error);
      }
    };

    fetchTopDiscountedItems();
  }, [userArea]);

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <Box paddingTop="5rem" paddingX="5rem">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="1.5rem"
        >
          <Typography
            variant="h4"
            fontFamily="Poppins"
            fontWeight="400"
            color={theme.colors.siteGreen}
            borderBottom="solid 2px #EEE9E9"
          >
            {userArea ? "Popular Stores Near You" : "Search All Shops"}
          </Typography>
          <Box display="flex" alignItems="center">
            <TextField
              label="Search Shops"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: "1rem" }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          </Box>
        </Box>
        <Box
          mx="1rem"
          width="85%"
          display="grid"
          gap="50px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        >
          {filteredShops.map((shop) => (
            <PopularStore key={shop._id + "store"} shop={shop} />
          ))}
        </Box>
      </Box>
    </Fragment>
  );
};

export default HomeShopPage;
