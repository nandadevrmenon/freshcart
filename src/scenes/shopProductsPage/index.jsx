import { useState } from "react";
import { Box, Typography } from "@mui/material";
import theme from "theme";
import ShopItemsTabs from "./ShopItemTabs";
import EditItemForm from "./EditItemForm";
import PrimaryButton from "components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopProductsPage = () => {
  const [itemInForm, setItemInForm] = useState(null);
  const shopId = useSelector((state) => {
    return state.shop._id;
  });
  const navigate = useNavigate();

  const changeItemInForm = (item) => {
    setItemInForm(item);
  };

  const addNewItemHandler = () => {
    navigate(`/protected/${shopId}/addnewItem`);
  };
  return (
    <Box sx={{ width: "80%", marginTop: "4rem", marginX: "auto" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          paddingY="1rem"
          variant="h4"
          fontFamily="Poppins"
          color={theme.colors.headerGreen}
        >
          Manage Products
        </Typography>
        <Box paddingTop="0.5rem">
          <PrimaryButton invert={true} onClick={addNewItemHandler}>
            Add new Item
          </PrimaryButton>
        </Box>
      </Box>
      {itemInForm ? (
        <EditItemForm
          item={itemInForm}
          changeItemInForm={changeItemInForm}
        ></EditItemForm>
      ) : (
        ""
      )}
      <ShopItemsTabs
        updateInProgress={Boolean(itemInForm)}
        changeItemInForm={changeItemInForm}
      ></ShopItemsTabs>
    </Box>
  );
};

export default ShopProductsPage;
