import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/buttons/PrimaryButton";
import { useSelector } from "react-redux";
import * as yup from "yup";
import theme from "theme";
import ShopNameField from "./components/ShopNameField";
import EditCategories from "./EditCategories";
import EditAddress from "../../components/editFields/EditAddress";
import EditDelivery from "./EditDelivery";

const ManageShopPage = (props) => {
  const shop = useSelector((state) => {
    return state.shop;
  });

  return (
    <Box sx={{ width: "80%", paddingTop: "5rem", marginX: "auto" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: `1px solid ${theme.colors.borderGray}` }}
      >
        <Typography
          paddingY="1rem"
          variant="h4"
          fontFamily="Poppins"
          color={theme.colors.headerGreen}
        >
          Manage Shop
        </Typography>
        <Box>
          <PrimaryButton invert={true}>Add new Item</PrimaryButton>
        </Box>
      </Box>
      <ShopNameField
        label="Shop Name"
        name={"name"}
        initialValue={shop.name}
        schema={{ name: yup.string().required("Required") }}
      ></ShopNameField>
      <EditAddress isShop={true} />
      <EditCategories />
      <EditDelivery />
    </Box>
  );
};

export default ManageShopPage;
