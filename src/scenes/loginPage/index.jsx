import { Box } from "@mui/material";
import theme from "theme";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      minWidth="100%"
      minHeight="100%"
      sx={{ backgroundColor: theme.colors.seaShellWhite }}
    >
      <Box width="47vw">
        <LoginForm></LoginForm>
      </Box>
    </Box>
  );
};

export default LoginPage;
