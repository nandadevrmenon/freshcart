import { Box, IconButton, Rating, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrderedItems from "components/orders/OrderedItems";
import FullOrderDetails from "components/orders/FullOrderDetails";
import theme from "theme";
import PrimaryButton from "components/buttons/PrimaryButton";
import OrderRatingForm from "./OrderRatingForm";
import { useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = ({ order, backToHistoryHandler, setOrderHistory }) => {
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const [isInRatingMode, setIsInRatingMode] = useState(false);
  const [orderRating, setOrderRating] = useState(order.rating);
  const cartTotal = Object.values(order.itemList).reduce((total, item) => {
    return (
      total +
      (item.price - (item.price * item.discount) / 100).toFixed(2) * item.count
    );
  }, 0);
  const actualTotal =
    cartTotal > 50 ? cartTotal.toFixed(2) : (cartTotal + 3.49).toFixed(2);

  const updateRatingHandler = async (newRating) => {
    console.log(newRating);
    const response = await fetch(
      `http://localhost:3001/orders/${userId}/updaterating`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ _id: order._id, rating: newRating }),
      }
    );
    const respJSON = await response.json();
    if (respJSON.msg === "Rating Changed") {
      setOrderRating(newRating);
      setOrderHistory((prev) => {
        const newOrderHistory = prev.map((ord) => {
          if (ord._id === order._id) {
            return { ...ord, rating: newRating };
          }
          return ord;
        });
        return newOrderHistory;
      });
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent={"space-between"}>
        <IconButton onClick={backToHistoryHandler}>
          <KeyboardBackspaceIcon
            sx={{ color: theme.colors.borderGray }}
          ></KeyboardBackspaceIcon>
        </IconButton>
        {Boolean(orderRating) ? (
          <Rating readOnly={true} value={orderRating}></Rating>
        ) : (
          <div>
            {isInRatingMode ? (
              <OrderRatingForm
                onUpdateRating={updateRatingHandler}
              ></OrderRatingForm>
            ) : (
              <PrimaryButton
                invert={true}
                onClick={() => {
                  setIsInRatingMode(true);
                }}
              >
                Rate
              </PrimaryButton>
            )}
          </div>
        )}
      </Box>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(3,minmax(0,1fr))"
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
    </Box>
  );
};

export default OrderDetails;
