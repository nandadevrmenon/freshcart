import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ShopPage = (props) => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    const fetchShallowShopDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/shops/shallowshopdetails/${id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const shopDetails = await response.json();
        setShop(shopDetails);
      } catch (error) {
        console.log("Error fetching details: ", error);
      }
    };
    const fetchAllItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/items/inshop/${id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        const items = await response.json();
        setItemsList(items);
      } catch (error) {
        console.error("Error fetching top discounted items:", error);
      }
    };
    fetchShallowShopDetails();
    fetchAllItems();
  }, []);
  const bannerPath = shop ? shop.bannerPath : "";
  return (
    <Box paddingTop="3.5rem" width="100%" height="auto">
      <Box
        marginX="auto"
        width="80vw"
        height="30vh"
        borderLeft="1px solid grey"
        borderRight="1px solid grey"
        sx={{
          backgroundImage: `url("http://localhost:3001/assets/${bannerPath}")`,
          backgroundRepeat: "none",
          backgroundSize: "cover",
        }}
      ></Box>
      <Box
        marginX="auto"
        width="80vw"
        borderLeft="1px solid grey"
        borderRight="1px solid grey"
        height={"100vh"}
      ></Box>
    </Box>
  );
};

export default ShopPage;
