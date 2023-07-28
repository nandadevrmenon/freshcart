import theme from "theme";
import { Button } from "@mui/material";

const DangerButton = (props) => {
  return (
    <Button
      fullWidth={props.fullWidth}
      type={props.type}
      onClick={props.onClick}
      sx={[
        {
          px: "1rem",
          py: "0.5rem",
          backgroundColor: theme.colors.dangerRed,
          color: theme.colors.white,
          ":hover": {
            bgcolor: theme.colors.darkDangerRed,
          },
          fontFamily: "League Spartan",
        },
      ]}
      variant="contained"
    >
      {props.children}
    </Button>
  );
};

export default DangerButton;
