import { Box, Typography } from "@mui/material";
import CheckoutItem from "components/checkoutCart/CheckoutItem";
import theme from "theme";

const OrderedItems = ({ itemList }) => {
  return (
    <Box
      sx={{
        gridColumn: { xs: "span 3", sm: "span 3", md: "span 2" },
      }}
    >
      <Typography
        variant="h5"
        color={theme.colors.siteDarkGreen}
        fontFamily="Poppins"
        fontWeight="400"
      >
        Items Ordered
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        sx={{
          overflowX: itemList.length > 6 ? "scroll" : "hidden",
        }}
      >
        {itemList.map((item) => {
          return (
            <CheckoutItem
              count={item.count}
              item={item}
              key={item._id}
              show={true}
              sx={{ marginY: "0" }}
            ></CheckoutItem>
          );
        })}
      </Box>
    </Box>
  );
};

export default OrderedItems;
