import { Box, Paper, IconButton, InputBase, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import theme from "theme";
import ItemTabs from "./ItemTabs";
import ShopInfoBar from "./ShopInfoBar";
import shopCarouselContent from "./shopCarouselContent";

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

  // if (error404) {
  //   return (
  //     <Box paddingY="7rem" width="100%" height="auto">
  //       <Typography
  //         variant="h5"
  //         fontFamily="Poppins"
  //         fontWeight="500"
  //         color={theme.colors.siteDarkGreen}
  //         textAlign="center"
  //       >
  //         This Shop Page Does Not Exist
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box marginX="auto" width="80vw" height={"100vh"}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        alignItems="centre"
        justifyContent="space-between"
        paddingY="1rem"
        paddingTop="5rem"
      >
        <ShopInfoBar shop={shop}></ShopInfoBar>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            height: 50,
            marginY: "auto",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: theme.colors.darkGrey }}
            placeholder="Search Shop"
            inputProps={{ "aria-label": "Search Shop" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <ItemTabs
        categories={shop ? shop.categories : []}
        items={itemsList ? itemsList : []}
      ></ItemTabs>
    </Box>
  );
};

export default ShopPage;
