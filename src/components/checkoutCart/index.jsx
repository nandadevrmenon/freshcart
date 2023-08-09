import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import theme from "theme";
import CheckoutItem from "./CheckoutItem";

const CheckoutCart = ({ cartItems }) => {
  const localCart = useSelector((state) => state.cart);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      maxHeight="70vh"
      overflow="scroll"
      sx={{
        overflowX: "hidden",
        borderBottom: `1px solid ${theme.colors.borderGray}`,
      }}
    >
      {cartItems &&
        cartItems.map((item) => {
          return (
            <CheckoutItem
              count={localCart[item._id]}
              item={item}
              key={item._id}
              show={true}
            ></CheckoutItem>
          );
        })}
    </Box>
  );
};
export default CheckoutCart;
