import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Rating, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrderedItems from "components/orders/OrderedItems";
import FullOrderDetails from "components/orders/FullOrderDetails";
import EditOrderStatus from "./EditOrderStatus";
import theme from "theme";

const OrderDetailsForShop = ({
  order,
  backToHistoryHandler,
  setOrderHistory,
}) => {
  const shopId = useSelector((state) => state.shop._id);
  const token = useSelector((state) => state.token);

  const [status, setStatus] = useState(order.status);
  const [orderComplete, setOrderComplete] = useState(
    status === "Collected Successfully" || status === "Delivered Successfully"
  );

  const cartTotal = Object.values(order.itemList).reduce((total, item) => {
    return (
      total +
      (item.price - (item.price * item.discount) / 100).toFixed(2) * item.count
    );
  }, 0);
  const actualTotal =
    cartTotal > 50 ? cartTotal.toFixed(2) : (cartTotal + 3.49).toFixed(2);

  const updateStatusHandler = async (newStatus) => {
    const response = await fetch(
      `http://localhost:3001/protected/${shopId}/orders/updatestatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          _id: order._id,
          status: newStatus,
        }),
      }
    );
    const respJSON = await response.json();
    if (respJSON.msg === "Status Changed") {
      setStatus(newStatus);
      setOrderHistory((prev) => {
        const newOrderHistory = prev.map((ord) => {
          if (ord._id === order._id) {
            return { ...ord, status: newStatus };
          }
          return ord;
        });
        return newOrderHistory;
      });
      setOrderComplete(
        newStatus === "Collected Successfully" ||
          newStatus === "Delivered Successfully"
      );
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
        {Boolean(order.rating) ? (
          <Box display="flex" alignItems="center">
            <span>Rating : </span>
            <Rating readOnly={true} value={order.rating}></Rating>
          </Box>
        ) : (
          <div>No Rating Yet</div>
        )}
        {!Boolean(orderComplete) && (
          <EditOrderStatus
            status={status}
            setStatus={setStatus}
            updateStatusHandler={updateStatusHandler}
            isCNC={order.type === "Click & Collect"}
          ></EditOrderStatus>
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
          status={status}
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

export default OrderDetailsForShop;
