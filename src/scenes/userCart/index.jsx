import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import theme from "theme";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import CheckoutTotalView from "components/checkoutCart/CheckoutTotalView";

const UserCart = () => {
  const localCart = useSelector((state) => state.cart);
  const isEmptyCart = Object.keys(localCart).length === 0;
  const cartShopId = useSelector((state) => state.cartShop);
  const [deliveryOptions, setDeliveryOptions] = useState({
    cnc: false,
    ndd: false,
    deliver: false,
  });
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
      const fetchShopDeliveryOptions = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/shops/${cartShopId}/checkdeliveryoptions`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
          );
          const options = await response.json();
          setDeliveryOptions(options);
        } catch (err) {
          console.log("Error fetching Delivery Options:", err);
        }
      };

      fetchItemsInCart();
      fetchShopDeliveryOptions();
    } else {
      return;
    }
  }, []);

  const navigate = useNavigate();
  const gotToCheckOutOrderPage = () => {
    navigate("/checkout");
  };
  const goToCNCOrderPage = () => {
    navigate("/clickncollect");
  };

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

  const { cnc, delivery, ndd } = deliveryOptions;

  return (
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
      <Box sx={{ gridColumn: "7/9", paddingTop: "3.5rem" }}>
        <CheckoutTotalView cartTotal={cartTotal}></CheckoutTotalView>

        {(delivery || ndd) && (
          <PrimaryButton
            sx={{ marginY: "1rem" }}
            fullWidth={true}
            invert={true}
            onClick={gotToCheckOutOrderPage}
            disabled={isEmptyCart}
          >
            Checkout
          </PrimaryButton>
        )}
        {cnc && (
          <>
            <PrimaryButton
              fullWidth={true}
              invert={true}
              onClick={goToCNCOrderPage}
              disabled={isEmptyCart}
            >
              Click n Collect
            </PrimaryButton>
          </>
        )}

        <Box display="flex"></Box>
      </Box>
    </Box>
  );
};
export default UserCart;
