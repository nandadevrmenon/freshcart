import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import OrderDetails from "./OrderDetails";
import theme from "theme";
import UserOrderCard from "./UserOrderCard";

const UserOrdersPage = () => {
  const userId = useSelector((state) => {
    return state.user._id;
  });
  const token = useSelector((state) => state.token);

  const [orderInDetail, setOrderInDetail] = useState(undefined);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isInDetailsMode, setIsInDetailsMode] = useState(false);

  const viewOrderHandler = (order) => {
    setIsInDetailsMode(true);
    setOrderInDetail(order);
  };

  const backToHistoryHandler = () => {
    setIsInDetailsMode(false);
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/orders/${userId}/orderhistory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseJSON = await response.json();
        const history = responseJSON.orderHistory;
        if (history) {
          setOrderHistory(history);
        }
      } catch (error) {
        console.error("Error Fetching order History:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <Box paddingTop="5rem" mx="auto" width="80%">
      <Box>
        <Typography
          variant="h4"
          color={theme.colors.siteDarkGreen}
          fontFamily="Poppins"
          fontWeight="400"
          borderBottom={`solid 1px ${theme.colors.borderGray}`}
          sx={{ marginBottom: "30px" }}
        >
          Order History
        </Typography>
        {orderHistory.length === 0 && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" marginTop="20%">
              No Order History
            </Typography>
          </Box>
        )}
        {!isInDetailsMode && (
          <Box
            display="grid"
            gridTemplateColumns={{
              sm: "repeat(1,minmax(0,1fr))",
              md: "repeat(3,minmax(0,1fr))",
            }}
            gap="30px"
          >
            {orderHistory.map((order) => {
              return (
                <UserOrderCard
                  order={order}
                  viewOrderHandler={viewOrderHandler}
                ></UserOrderCard>
              );
            })}
          </Box>
        )}

        {isInDetailsMode && (
          <OrderDetails
            order={orderInDetail}
            backToHistoryHandler={backToHistoryHandler}
            setOrderHistory={setOrderHistory}
          ></OrderDetails>
        )}
      </Box>
    </Box>
  );
};

export default UserOrdersPage;
