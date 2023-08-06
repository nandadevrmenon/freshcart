import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import DangerButton from "components/DangerButton";
import theme from "theme";
import ShopEmailEditor from "./ShopEmailEditor";
import ShopPhoneEditor from "./ShopPhoneEditor";
import ShopPasswordEditor from "./ShopPasswordEditor";

const ShopProfilePage = (props) => {
  const [isInEditPasswordMode, setIsInEditPasswordMode] = useState(false);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);
  const shop = useSelector((state) => {
    return state.shop;
  });

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
            {isInEditPasswordMode ? (
              <ShopPasswordEditor
                setIsInEditPasswordMode={setIsInEditPasswordMode}
              ></ShopPasswordEditor>
            ) : (
              <DangerButton
                sx={{ marginBottom: "2rem" }}
                onClick={() => setIsInEditPasswordMode(true)}
              >
                Change Password
              </DangerButton>
            )}
            <br />
            <DangerButton>Delete Account</DangerButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopProfilePage;
