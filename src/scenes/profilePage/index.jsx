import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state/site";
import { Box, Typography, TextField } from "@mui/material";
import EditAddress from "components/editFields/EditAddress";
import DangerButton from "components/buttons/DangerButton";
import EditIcon from "@mui/icons-material/Edit";
import theme from "theme";
import PasswordEditor from "components/editFields/PasswordEditor";
import PrimaryButton from "components/buttons/PrimaryButton";
import EditUserName from "./EditUserName";
import EditUserEmail from "./EditUserEmail";
import EditUserPhone from "./EditUserPhone";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInEditMode = "true";
  const logOutHandler = () => {
    dispatch(setLogout());
    navigate("/");
  };
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

        <EditUserName></EditUserName>
        <EditUserEmail></EditUserEmail>
        <EditUserPhone></EditUserPhone>
        <EditAddress isShop={false}></EditAddress>

        <Box
          padding="2rem"
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="space-between"
          sx={{ borderTop: `1px solid ${theme.colors.borderGray}` }}
        >
          <PasswordEditor isShop={false}></PasswordEditor>
        </Box>
        <Box
          padding="2rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ borderTop: `1px solid ${theme.colors.borderGray}` }}
        >
          <PrimaryButton invert={true} onClick={logOutHandler}>
            Log Out
          </PrimaryButton>{" "}
          <DangerButton>Delete Account</DangerButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
