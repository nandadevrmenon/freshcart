import { Box, Typography } from "@mui/material";
import theme from "theme";
const DiscountedPrice = (props) => {
  if (props.discount > 0) {
    const discountedPrice = (
      props.price -
      (props.price * props.discount) / 100
    ).toFixed(2);
    return (
      <Box>
        <Typography
          paddingLeft="15px"
          paddingRight="5px"
          textAlign="right"
          display="inline-block"
          color={theme.colors.headerRed}
        >
          €{discountedPrice}
        </Typography>
        <Typography
          paddingRight="10px"
          paddingLeft="10px"
          color="text.secondary"
          textAlign="right"
          display="inline-block"
          sx={{ textDecoration: "line-through" }}
        >
          {props.price}
        </Typography>
      </Box>
    );
  }
  return (
    <Typography paddingX="10px" color="text.secondary" textAlign="right">
      €{props.price}
    </Typography>
  );
};

export default DiscountedPrice;
