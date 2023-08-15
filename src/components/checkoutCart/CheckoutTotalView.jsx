import React from "react";
import { Typography, Box } from "@mui/material";

const CheckoutTotalView = ({ cnc, cartTotal }) => {
  console.log(cartTotal);

  let actualTotal =
    cartTotal > 50 ? cartTotal.toFixed(2) : (cartTotal + 3.49).toFixed(2);
  if (cnc) actualTotal = cartTotal.toFixed(2);
  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          display="inline"
          fontWeight="400"
          fontFamily="Poppins"
        >
          Subtotal:
        </Typography>
        <Typography
          variant="h6"
          display="inline"
          fontWeight="400"
          fontFamily="Poppins"
        >
          €{cartTotal.toFixed(2)}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          display="inline"
          fontWeight="400"
          fontFamily="Poppins"
        >
          Delivery and Handling:
        </Typography>
        <Typography
          variant="h6"
          display="inline"
          sx={{ textDecoration: (cartTotal > 50 || cnc) && "line-through" }}
          fontWeight="400"
          fontFamily="Poppins"
        >
          €3.49
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="h6"
          display="inline"
          fontWeight="500"
          fontFamily="Poppins"
        >
          Total:
        </Typography>
        <Typography
          variant="h6"
          display="inline"
          fontWeight="500"
          fontFamily="Poppins"
        >
          €{actualTotal}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default CheckoutTotalView;
