import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import PrimaryButton from "components/PrimaryButton";
import theme from "theme";
import CartItem from "./CartItem";

const UserCart = () => {
  const localCart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      const fetchItemsInCart = async () => {
        try {
          const response = await fetch(`http://localhost:3001/items/incart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(localCart),
          });
          const itemsInCart = await response.json();
          setCartItems(itemsInCart);
        } catch (error) {
          console.log("Error fetching details: ", error);
        }
      };

      fetchItemsInCart();
    } else {
      return;
    }
  }, []);

  const cartTotal = Object.values(cartItems).reduce((total, item) => {
    if (localCart[item._id]) {
      return (
        total +
        (item.price - (item.price * item.discount) / 100).toFixed(2) *
          localCart[item._id]
      );
    } else {
      return total;
    }
  }, 0);

  return (
    // <Box sx={{ padding: 14 }}>
    //   <Grid container spacing={4}>
    //     <Grid item xs={12} md={8}>
    //       <Typography variant="h4" gutterBottom>
    //         Your Cart
    //       </Typography>
    //       {Object.keys(cart).map((itemId) => (
    //         <CartItem key={itemId} item={cart[itemId]} />
    //       ))}
    //     </Grid>
    //     <Grid item xs={12} md={4}>
    //       <Typography variant="h4" gutterBottom>
    //         Have a Promo Code?
    //       </Typography>
    //
    //     </Grid>
    //   </Grid>
    // </Box>
    <Box
      paddingTop="5rem"
      mx="auto"
      width="90%"
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(8,minmax(0,1fr))"
    >
      <Box sx={{ gridColumn: "1/7", gridRow: "auto" }}>
        <Typography
          variant="h3"
          color={theme.colors.siteDarkGreen}
          fontFamily="Poppins"
          fontWeight="400"
          borderBottom={`solid 1px ${theme.colors.borderGray}`}
        >
          Your Cart
        </Typography>
        {Object.keys(localCart).length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" marginTop="20%">
              Your cart is empty.
            </Typography>
          </Box>
        ) : (
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
            {cartItems.map((item) => {
              return (
                <CartItem item={item} key={item._id} show={true}></CartItem>
              );
            })}
          </Box>
        )}
      </Box>
      <Box sx={{ gridColumn: "7/9" }}>
        <Typography
          paddingTop="3.5rem"
          variant="h6"
          color={theme.colors.siteDarkGreen}
          fontFamily="Poppins"
          fontWeight="400"
        >
          Have a Promo Code?
        </Typography>
        <TextField
          label="Enter code"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Typography variant="h6" gutterBottom>
          Subtotal:€{cartTotal.toFixed(2)}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Delivery and Handling: €3.49
        </Typography>
        <PrimaryButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          margin="normal"
          invert={true}
        >
          Place Order
        </PrimaryButton>
        <Box display="flex"></Box>
      </Box>
    </Box>
  );
};
export default UserCart;
