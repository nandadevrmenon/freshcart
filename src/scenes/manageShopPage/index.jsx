import { Box, Typography, TextField } from "@mui/material";
import PrimaryButton from "components/PrimaryButton";
import { useSelector } from "react-redux";
import * as yup from "yup";
import theme from "theme";
import ShopField from "./components/ShopField";
import AreaDropdown from "./components/AreaDropdown";
import EditCategories from "./EditCategories";

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
      <ShopField
        label="Shop Name"
        name={"name"}
        initialValue={shop.name}
        schema={{ name: yup.string().required("Required") }}
      ></ShopField>
      <ShopField
        label="Address"
        name={"address0"}
        initialValue={shop.address[0]}
        schema={{ address0: yup.string().required("Required") }}
      ></ShopField>
      <ShopField
        label="PostCode"
        name={"address1"}
        initialValue={shop.address[1]}
        schema={{ address1: yup.string().required("Required") }}
      ></ShopField>

      <AreaDropdown
        name={"address2"}
        label="Area"
        initialValue={shop.address[2]}
        schema={{ address1: yup.string().required("Required") }}
      />
      <EditCategories></EditCategories>
    </Box>
  );
};

export default ManageShopPage;
