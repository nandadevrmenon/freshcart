import React from "react";
import { useSelector } from "react-redux";
import { Box, Tabs, Tab } from "@mui/material";
import ShopOrderCard from "./ShopOrderCard";
import theme from "theme";
import { ConstructionOutlined } from "@mui/icons-material";
const OrderTabs = ({ onSetEditOrder, orders }) => {
  const [tab, setTab] = React.useState(0);

  const tabTitles = [
    "all",
    "due today",
    "due tomorrow",
    "pending",
    "completed",
  ];

  const handleChange = (event, nextTab) => {
    setTab(nextTab);
  };

  return (
    //returns all the tabs required that change the value on click
    <React.Fragment>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="item-categories"
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.colors.siteDarkGreen,
            },
          }}
          sx={{
            "& button.Mui-selected": { color: theme.colors.siteDarkGreen },
          }}
        >
          {tabTitles.map((category) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>
      </Box>
      {/* returns one item panel in which the shop items change based on the filters */}
      <Box
        paddingTop="2rem"
        display="grid"
        gridTemplateColumns={{
          sm: "repeat(1,minmax(0,1fr))",
          md: "repeat(3,minmax(0,1fr))",
        }}
        gap="30px"
      >
        {tab === 0 && //All items
          orders.map((order) => {
            return (
              <ShopOrderCard
                order={order}
                editOrderHandler={onSetEditOrder}
                key={order._id}
              ></ShopOrderCard>
            );
          })}
        {tab === 1 && //Due Today
          orders
            .filter((order) => {
              let today = new Date();
              const orderCompletion = new Date(order.completionDate);
              return orderCompletion.toDateString() === today.toDateString();
            })
            .map((order) => (
              <ShopOrderCard
                order={order}
                editOrderHandler={onSetEditOrder}
                key={order._id}
              ></ShopOrderCard>
            ))}
        {tab === 2 && //Due  Tomorrow
          orders
            .filter((order) => {
              return isTomorrow(new Date(order.completionDate));
            })
            .map((order) => (
              <ShopOrderCard
                order={order}
                editOrderHandler={onSetEditOrder}
                key={order._id}
              ></ShopOrderCard>
            ))}
        {tab === 3 && //Pending
          orders
            .filter((order) => {
              return (
                order.status !== "Collected Successfully" &&
                order.status !== "Delivered Successfully"
              );
            })
            .sort(sortByCompletionDate)
            .map((order) => (
              <ShopOrderCard
                order={order}
                editOrderHandler={onSetEditOrder}
                key={order._id}
              ></ShopOrderCard>
            ))}
        {tab === 4 && //Completed
          orders
            .filter((order) => {
              return (
                order.status === "Collected Successfully" ||
                order.status === "Delivered Successfully"
              );
            })
            .sort(reverseSortByCompletionDate)
            .map((order) => (
              <ShopOrderCard
                order={order}
                editOrderHandler={onSetEditOrder}
                key={order._id}
              ></ShopOrderCard>
            ))}
      </Box>
    </React.Fragment>
  );
};

export default OrderTabs;

function isTomorrow(date1) {
  const oneDayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Get the year, month, and day components of the dates
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  // Calculate the difference in days between the two dates
  const daysDifference = Math.abs(
    (new Date() - new Date(year1, month1, day1)) / oneDayInMillis
  );

  return daysDifference === 1;
}

function sortByCompletionDate(order1, order2) {
  if (new Date(order1.completionDate) > new Date(order2.completionDate))
    return 1;
  return -1;
}

function reverseSortByCompletionDate(order1, order2) {
  if (new Date(order1.completionDate) > new Date(order2.completionDate))
    return -1;
  return 1;
}
