import { Box, Typography } from "@mui/material";
import theme from "theme";
import ItemCountText from "./ItemCountText";
import OrderCardField from "./OrderCardField";
import PrimaryButton from "components/buttons/PrimaryButton";
const UserOrderCard = ({ order, viewOrderHandler }) => {
  const total = Object.values(order.itemList).reduce((total, item) => {
    return (
      total +
      (item.price - (item.price * item.discount) / 100).toFixed(2) * item.count
    );
  }, 0);
  const actualTotal = total > 50 ? total.toFixed(2) : (total + 3.49).toFixed(2);

  return (
    <Box
      display="grid"
      gridTemplateRows="repeat(5,minmax(0,1fr))"
      padding="1rem"
      sx={{
        border: `1px solid ${theme.colors.lightBorderGray}`,
        borderRadius: "12px",
        gridColumn: "span 1",
      }}
      minHeight="27rem"
    >
      <Box
        sx={{ gridRow: "1/2" }}
        borderBottom={`1px solid ${theme.colors.lightBorderGray}`}
        paddingBottom="0.5rem"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h6"
            margin={0}
            fontFamily="Poppins"
            fontWeight="400"
            color={theme.colors.blackGreen}
          >
            {order.shop.name}
          </Typography>

          <Typography variant="body" fontFamily="Poppins" fontWeight="500">
            {order.status}
          </Typography>
        </Box>
        <Typography
          variant="body"
          fontFamily="Poppins"
          fontWeight="400"
          color={theme.colors.blackGreen}
        >
          {order.shop.address[2]}
        </Typography>
      </Box>
      <Box sx={{ gridRow: "2/5" }} paddingTop="0.5rem">
        <OrderCardField label={"ORDER NUMBER"}>{order.number}</OrderCardField>
        <OrderCardField label={"TOTAL AMOUNT"}>€ {actualTotal}</OrderCardField>
        <OrderCardField label={"ITEMS PURCHASED"}></OrderCardField>
        <Box sx={{ marginBottom: "0.8rem" }}>
          <ItemCountText itemList={order.itemList}></ItemCountText>
        </Box>
        <OrderCardField label={"ORDERED ON"}>
          {new Date(order.createdAt).toString().substring(0, 15)}
        </OrderCardField>

        {Boolean(order.rating) && (
          <OrderCardField label={"RATING: "}>{order.rating}</OrderCardField>
        )}
      </Box>
      <Box display="flex" alignItems="end" justifyContent="end">
        <PrimaryButton
          invert={true}
          onClick={() => {
            viewOrderHandler(order);
          }}
        >
          View Details
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default UserOrderCard;
