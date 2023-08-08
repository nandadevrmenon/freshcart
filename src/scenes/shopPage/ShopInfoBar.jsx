import { Box, Typography } from "@mui/material";
import theme from "theme";
const ShopInfoBar = (props) => {
  const shop = props.shop;
  return (
    <Box>
      <Typography
        variant="h5"
        fontFamily="Poppins"
        fontWeight="500"
        color={theme.colors.siteDarkGreen}
      >
        {shop && shop.name}
      </Typography>
      <Typography
        variant="body"
        fontFamily="Poppins"
        fontWeight="300"
        color={theme.colors.darkGrey}
      >
        {shop &&
          shop.address[0] + " " + shop.address[1] + " " + shop.address[2]}
      </Typography>
      <br />
      <Typography
        variant="body2"
        fontFamily="Poppins"
        fontWeight="300"
        color={theme.colors.darkGrey}
      >
        Delivery | Click & Collect
      </Typography>
    </Box>
  );
};

export default ShopInfoBar;