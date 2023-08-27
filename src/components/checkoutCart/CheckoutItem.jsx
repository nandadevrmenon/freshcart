import React from "react";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "theme";
const CheckoutItem = ({ item, count, sx }) => {
  const discountedPrice = (
    item.price -
    (item.price * item.discount) / 100
  ).toFixed(2);
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginY="1rem"
      padding="1rem"
      width="95%"
      sx={{ ...sx }}
    >
      <Box>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">Size: {item.size}</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        width="25%"
      >
        <Typography
          variant="h6"
          color={
            item.discount > 0 ? theme.colors.sitePink : theme.colors.blackGreen
          }
        >
          {discountedPrice}
        </Typography>
        <CloseIcon sx={{ color: theme.colors.darkGrey }} />
        <Typography variant="h6" color={theme.colors.darkGrey}>
          {count}
        </Typography>
        <Typography variant="h6" color={theme.colors.blackGreen}>
          =
        </Typography>
        <Typography variant="h6" color={theme.colors.blackGreen}>
          {(discountedPrice * count).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CheckoutItem;
