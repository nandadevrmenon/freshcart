import React from "react";
import { Typography, Box } from "@mui/material";

const CheckoutTotalView = ({ cartTotal }) => {
  const actualTotal =
    cartTotal > 50 ? cartTotal.toFixed(2) : (cartTotal + 3.49).toFixed(2);
  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" display="inline">
          Subtotal:
        </Typography>
        <Typography variant="h6" display="inline">
          €{cartTotal.toFixed(2)}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" display="inline">
          Delivery and Handling:
        </Typography>
        <Typography
          variant="h6"
          display="inline"
          sx={{ textDecoration: cartTotal > 50 && "line-through" }}
        >
          €3.49
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" display="inline">
          Total:
        </Typography>
        <Typography variant="h6" display="inline">
          €{actualTotal}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default CheckoutTotalView;
