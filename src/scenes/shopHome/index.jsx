import React from "react";
import theme from "theme";
import { Box, Typography } from "@mui/material";
import ShopPage from "scenes/shopPage";

const ShopHome = () => {
  return (
    <React.Fragment>
      <Box
        width="100%"
        backgroundColor={theme.colors.oldLace}
        paddingY="1rem"
        marginTop="4rem"
      >
        <Box
          paddingY="1rem"
          backgroundColor="#DB6C79"
          marginX="auto"
          width="80%"
          display="flex"
          alignItems="centre"
          justifyContent="center"
        >
          <Typography
            mx="auto"
            variant="h5"
            fontFamily="Poppins"
            fontWeight="800"
            color={theme.colors.seaShellWhite}
          >
            THIS IS A PREVIEW OF YOUR SHOP
          </Typography>
        </Box>
      </Box>
      <ShopPage></ShopPage>
    </React.Fragment>
  );
};

export default ShopHome;
