import { Fragment } from "react";
import { Typography } from "@mui/material";
import theme from "theme";

const OrderCardField = ({ label, children }) => {
  return (
    <Fragment>
      <Typography
        variant="body2"
        display="block"
        fontFamily="Poppins"
        fontWeight="400"
        color={theme.colors.darkGrey}
      >
        {label}
      </Typography>
      {children && (
        <Typography
          variant="body"
          fontFamily="Poppins"
          fontWeight="400"
          display="block"
          color={theme.colors.blackGreen}
          sx={{ marginBottom: "0.8rem" }}
        >
          {children}
        </Typography>
      )}
    </Fragment>
  );
};

export default OrderCardField;
