import { useState } from "react";
import { Box, Typography } from "@mui/material";
import theme from "theme";
import ShopItemsTabs from "./ShopItemTabs";
import EditItemForm from "./EditItemForm";

const ShopProductsPage = () => {
  const [itemInForm, setItemInForm] = useState(null);
  const changeItemInForm = (item) => {
    console.log("item changes to", item);
    setItemInForm(item);
  };
  return (
    <Box sx={{ width: "80%", marginTop: "4rem", marginX: "auto" }}>
      <Typography
        paddingY="1rem"
        variant="h4"
        fontFamily="Poppins"
        color={theme.colors.headerGreen}
      >
        Manage Products
      </Typography>
      {/* show={Boolean(itemInForm)} */}
      <EditItemForm item={itemInForm}></EditItemForm>
      <ShopItemsTabs changeItemInForm={changeItemInForm}></ShopItemsTabs>
    </Box>
  );
};

export default ShopProductsPage;
