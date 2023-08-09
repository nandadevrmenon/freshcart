import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Box, Typography, TextField, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import theme from "theme";
import { useNavigate } from "react-router-dom";
import CheckoutCart from "components/checkoutCart";
import CheckoutTotalView from "components/CheckoutTotalView";
import CheckoutAddressView from "./CheckoutAddressView";
import EditAddress from "components/editFields/EditAddress";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const localCart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [offersDelivery, setOffersDelivery] = useState(false);
  const cartShopId = useSelector((state) => state.cartShop);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("check out pge ");
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      if (Object.keys(localCart).length === 0) {
        navigate(`/cart/${user._id}`);
      }
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
          if (!options.delivery) navigate(`/cart/${user._id}`);
          setOffersDelivery(options.delivery);
        } catch (err) {
          console.log("Error fetching Delivery Options:", err);
        }
      };

      fetchItemsInCart();
      fetchShopDeliveryOptions();
    }
  }, []);

  const cartTotal = Object.values(cartItems).reduce((total, item) => {
    if (localCart[item._id]) {
      const count = localCart[item._id];
      return (
        total +
        (item.price - (item.price * item.discount) / 100).toFixed(2) * count
      );
    } else {
      return total;
    }
  }, 0);

  return (
    <Box
      paddingTop="5rem"
      mx="auto"
      width="90%"
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(8,minmax(0,1fr))"
    >
      <Box sx={{ gridColumn: "1/6", gridRow: "auto" }}>
        <Typography
          variant="h3"
          color={theme.colors.siteDarkGreen}
          fontFamily="Poppins"
          fontWeight="400"
          borderBottom={`solid 1px ${theme.colors.borderGray}`}
        >
          Checkout
        </Typography>
        <CheckoutCart cartItems={cartItems}></CheckoutCart>
      </Box>
      <Box sx={{ gridColumn: "6/9", paddingTop: "3.5rem" }}>
        <CheckoutAddressView
          address={user.address}
          openAddressModalHandler={handleOpen}
        ></CheckoutAddressView>
        <Typography
          marginTop="1rem"
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
          sx={{ marginBottom: "1rem" }}
        />

        <CheckoutTotalView cartTotal={cartTotal}></CheckoutTotalView>
        <PrimaryButton
          sx={{ marginTop: "1rem" }}
          fullWidth={true}
          invert={true}
        >
          Order n Pay Now
        </PrimaryButton>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: theme.colors.seaShellWhite,
              width: "50vw",
              borderRadius: "12px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <EditAddress inEditMode={true}></EditAddress>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
