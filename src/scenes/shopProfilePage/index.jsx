import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DangerButton from "components/buttons/DangerButton";
import theme from "theme";
import ShopEmailEditor from "./ShopEmailEditor";
import ShopPhoneEditor from "./ShopPhoneEditor";
import PasswordEditor from "components/editFields/PasswordEditor";

const ShopProfilePage = (props) => {
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);

  return (
    <Box
      paddingTop="5rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="70%">
        <Typography
          variant="h5"
          fontFamily="Poppins"
          color={theme.colors.siteDarkGreen}
          sx={{ borderBottom: `1px solid ${theme.colors.borderGray}` }}
        >
          Your Account
        </Typography>
        <Box padding="2rem">
          <ShopEmailEditor></ShopEmailEditor>
          <ShopPhoneEditor></ShopPhoneEditor>
          <Box width="60%" marginX="auto">
            <PasswordEditor isShop={true}></PasswordEditor>
            <br />
            <DangerButton sx={{ marginTop: "2rem" }}>
              Delete Account
            </DangerButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopProfilePage;
