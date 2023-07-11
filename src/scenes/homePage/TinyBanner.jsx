import { Box, Typography } from "@mui/material";
import theme from "theme";

const TinyBanner =(props)=>{
  return (
    <Box width="100%" backgroundColor={theme.colors.oldLace} paddingY="2rem">
      <Box paddingY="2rem" backgroundColor="#DB6C79" marginX="auto" width="80%" display="flex" alignItems="centre" justifyContent="center">
          <Typography mx="auto" variant="h5" fontFamily="Poppins" fontWeight="800" color={theme.colors.seaShellWhite}>ORDER NOW TO EARN POINTS AND REDEEM REWARDS</Typography>
      </Box>
    </Box>
  );
}

export default TinyBanner;