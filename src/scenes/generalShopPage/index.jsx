import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, TextField, Button } from "@mui/material";
import theme from "theme";
import PopularStore from "scenes/homePage/PopularStore";
import PrimaryButton from "components/buttons/PrimaryButton";

const GeneralShopPage = () => {
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userArea = useSelector((state) =>
    state.user ? state.user.address[3] : ""
  );

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/shops/fetchallshops",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const shops = await response.json();
        setShops(shops);
      } catch (error) {
        console.error("Error fetching All Stores:", error);
      }
    };

    fetchStores();
  }, [userArea]);

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <Box paddingTop="5rem">
        <Box paddingTop="2rem" paddingX="5rem">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ borderBottom: "solid 1px #EEE9E9" }}
            marginBottom="1rem"
          >
            <Typography
              variant="h3"
              fontFamily="Poppins"
              fontWeight="400"
              color={theme.colors.siteGreen}
            >
              All Stores
            </Typography>
            <Box display="flex" alignItems="center" paddingBottom="0.5rem">
              <TextField
                label="Search By Store Name"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginRight: "1rem", width: "300px" }}
              />
              <PrimaryButton invert={true} onClick={() => setSearchQuery("")}>
                Clear
              </PrimaryButton>
            </Box>
          </Box>
        </Box>
        <Box
          mx="auto"
          width="87%"
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(2,minmax(0,1fr))"
        >
          {filteredShops.map((shop) => {
            return <PopularStore key={shop._id + "store"} shop={shop} />;
          })}
        </Box>
      </Box>
    </Fragment>
  );
};

export default GeneralShopPage;
