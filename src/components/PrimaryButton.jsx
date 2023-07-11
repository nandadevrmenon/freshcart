import theme from "theme";
import { Button } from "@mui/material";

const PrimaryButton = (props) => {
  return (
    <Button
      fullWidth={props.fullWidth}
      type={props.type}
      onClick={props.onClick}
      sx={[
        {
          px: "1rem",
          py: "0.5rem",
          backgroundColor: props.invert
            ? theme.colors.siteGreen
            : theme.colors.white,
          color: props.invert ? theme.colors.white : theme.colors.headerGreen,
          ":hover": {
            bgcolor: props.invert
              ? theme.colors.siteDarkGreen
              : theme.colors.siteGreen,
            color: "white",
          },
        },
        props.style && props.style,
      ]}
      variant="contained"
    >
      {" "}
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
