import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import theme from "theme";
import OrderTabs from "./OrderTabs";
import OrderDetailsForShop from "./OrderDetialsForShop.jsx";

const ManageShopOrdersPage = () => {
  const shopId = useSelector((state) => {
    return state.shop._id;
  });
  const token = useSelector((state) => state.token);

  const [editOrder, setEditOrder] = useState(undefined);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const viewOrderHandler = (order) => {
    setIsInEditMode(true);
    setEditOrder(order);
  };

  const backToHistoryHandler = () => {
    setIsInEditMode(false);
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/protected/${shopId}/fetchallorders`,
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
        {!isInEditMode && orderHistory.length !== 0 && (
          <OrderTabs
            onSetEditOrder={viewOrderHandler}
            orders={orderHistory}
          ></OrderTabs>
        )}

        {isInEditMode && (
          <OrderDetailsForShop
            backToHistoryHandler={backToHistoryHandler}
            setOrderHistory={setOrderHistory}
            order={editOrder}
          ></OrderDetailsForShop>
        )}
      </Box>
    </Box>
  );
};

export default ManageShopOrdersPage;
