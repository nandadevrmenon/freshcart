import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "theme";

const CheckoutAddressView = ({ address, openAddressModalHandler }) => {
  const addressExists = address[0];
  if (addressExists)
    return (
      <React.Fragment>
        <Typography
          variant="h5"
          color={theme.colors.siteGreen}
          fontFamily="Poppins"
        >
          Delivering to:
        </Typography>
        <Typography
          variant="h6"
          color={theme.colors.blackGreen}
          fontFamily="Poppins"
          display="block"
          fontWeight="400"
        >
          {address[0]}
        </Typography>
        <Typography
          variant="h6"
          color={theme.colors.blackGreen}
          fontFamily="Poppins"
          display="block"
          fontWeight="400"
        >
          {address[1]}
        </Typography>
        <Typography
          variant="body2"
          color={theme.colors.darkGrey}
          fontFamily="Poppins"
          sx={{
            textDecoration: "underline",
            ":hover": { cursor: "pointer", color: theme.colors.blackGreen },
          }}
          display="block"
          onClick={openAddressModalHandler}
        >
          Click here to change Address
        </Typography>
      </React.Fragment>
    );

  return (
    <Box>
      <Typography
        variant="h5"
        color={theme.colors.dangerRed}
        fontFamily="Poppins"
      >
        No Delivery Address
      </Typography>
      <Typography
        variant="body2"
        color={theme.colors.darkGrey}
        fontFamily="Poppins"
        sx={{
          textDecoration: "underline",
          ":hover": { cursor: "pointer", color: theme.colors.blackGreen },
        }}
        display="block"
        onClick={openAddressModalHandler}
      >
        Click here to Add Address
      </Typography>
    </Box>
  );
};

export default CheckoutAddressView;
