import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, Typography, TextField, Modal } from "@mui/material";
import PrimaryButton from "components/buttons/PrimaryButton";
import CheckoutCart from "components/checkoutCart";
import CheckoutTotalView from "components/checkoutCart/CheckoutTotalView";
import CheckoutAddressView from "scenes/checkoutPage/CheckoutAddressView";
import EditAddress from "components/editFields/EditAddress";
import theme from "theme";
import NewOrderForm from "scenes/checkoutPage/NewOrderForm";
import NewCNCOrderForm from "./NewCNCOrderForm";

const promoCodeSchema = yup.object().shape({
  promoCode: yup.string(),
});

const CNCCheckoutPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const localCart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [offersDelivery, setOffersDelivery] = useState(false);
  const cartShopId = useSelector((state) => state.cartShop);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          if (!options.cnc) navigate(`/cart/${user._id}`);
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

  const handlePromoCodeFormSubmit = (values, onSubmitProps) => {
    console.log(values);
  };

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
          variant="h4"
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
        <Formik
          initialValues={{ promoCode: "" }}
          validationSchema={promoCodeSchema}
          onSubmit={handlePromoCodeFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
            enableReinitialize,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="h6"
                  color={theme.colors.siteDarkGreen}
                  fontFamily="Poppins"
                  fontWeight="400"
                >
                  Have a Promo Code?
                </Typography>
                <Box
                  display="flex"
                  alignItems="start"
                  justifyContent="space-between"
                  flexDirection="row"
                >
                  <TextField
                    label="Enter code"
                    variant="filled"
                    fullWidth
                    sx={{ marginBottom: "1rem", marginRight: "1rem" }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.promoCode}
                    name="promoCode"
                    error={Boolean(errors.promoCode)}
                    helperText={errors.promoCode}
                    size="small"
                  />
                  <PrimaryButton invert={true} type="submit">
                    Apply
                  </PrimaryButton>
                </Box>
              </form>
            );
          }}
        </Formik>
        <CheckoutTotalView cnc={true} cartTotal={cartTotal}></CheckoutTotalView>
        <NewCNCOrderForm></NewCNCOrderForm>
      </Box>
    </Box>
  );
};

export default CNCCheckoutPage;
