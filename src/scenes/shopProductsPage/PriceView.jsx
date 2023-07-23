import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "theme";

const PriceView = (props) => {
  const { price, discount } = props;
  const reducedPrice = price - ((price * discount) / 100.0).toFixed(2);
  return (
    <React.Fragment>
      <Typography
        variant="body"
        fontFamily="Poppins"
        textAlign="right"
        display="block"
      >
        Discount: {discount}%
      </Typography>
      <Typography
        variant="body"
        fontFamily="Poppins"
        display="block"
        textAlign="right"
      >
        RRP : €{price}
      </Typography>
      <Typography
        variant="body"
        fontFamily="Poppins"
        display="block"
        textAlign="right"
        color={theme.colors.headerRed}
      >
        Selling Price : €{reducedPrice}
      </Typography>
    </React.Fragment>
  );
};

export default PriceView;
