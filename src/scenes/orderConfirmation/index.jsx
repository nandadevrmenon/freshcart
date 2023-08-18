import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItem from "components/checkoutCart/CheckoutItem";
import theme from "theme";
import CheckoutTotalView from "components/checkoutCart/CheckoutTotalView";
import PrimaryButton from "components/buttons/PrimaryButton";
import OrderedItems from "components/orders/OrderedItems";
import FullOrderDetails from "components/orders/FullOrderDetails";

const OrderConfirmation = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state.order;

  const cartTotal = Object.values(order.itemList).reduce((total, item) => {
    return (
      total +
      (item.price - (item.price * item.discount) / 100).toFixed(2) * item.count
    );
  }, 0);
  const actualTotal =
    cartTotal > 50 ? cartTotal.toFixed(2) : (cartTotal + 3.49).toFixed(2);

  const backToHome = () => navigate("/");
  return (
    <Box paddingTop={"5rem"}>
      <Box
        paddingY="1rem"
        backgroundColor={theme.colors.sitePink}
        marginX="auto"
        width="95%"
        display="flex"
        alignItems="centre"
        justifyContent="center"
      >
        <Typography
          mx="auto"
          fontFamily="Poppins"
          fontWeight="400"
          letterSpacing={1.5}
          color={theme.colors.seaShellWhite}
        >
          Your order has been placed successfully!
        </Typography>
      </Box>

      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(3,minmax(0,1fr))"
        width="80%"
        mx="auto"
        marginY="2rem"
      >
        <OrderedItems itemList={order.itemList}></OrderedItems>
        <FullOrderDetails
          status={order.status}
          type={order.type}
          user={order.user}
          cartTotal={cartTotal}
          actualTotal={actualTotal}
          completionDate={new Date(order.completionDate)}
          timeSlot={order.timeSlot}
        ></FullOrderDetails>
      </Box>
      <Box
        paddingY="1rem"
        marginX="auto"
        width="80%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <PrimaryButton invert={true} onClick={backToHome}>
          Back to Shopping
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
