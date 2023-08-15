import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutItem from "components/checkoutCart/CheckoutItem";
import theme from "theme";
import CheckoutTotalView from "components/checkoutCart/CheckoutTotalView";
import PrimaryButton from "components/buttons/PrimaryButton";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const timeSlots = ["9am to 12pm", "12pm to 3pm", "3pm to 6pm"];

const OrderConfirmation = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state.order;
  console.log(order);
  const isDelivery = order.type === "Delivery";
  const completionDate = new Date(order.completionDate);
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
        <Box
          sx={{
            gridColumn: { sm: "span 3", md: "span 2" },
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
              overflowX: "hidden",
            }}
          >
            {order.itemList.map((item) => {
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
        <Box
          sx={{
            paddingTop: "0.5rem",
            gridColumn: { sm: "span 3", md: "span 1" },
          }}
        >
          <Typography
            variant="h4"
            color={theme.colors.blackGreen}
            fontFamily="Poppins"
            fontWeight="400"
          >
            Status: {order.status}
          </Typography>
          {isDelivery && (
            <>
              <Typography
                variant="h6"
                color={theme.colors.siteDarkGreen}
                fontFamily="Poppins"
                fontWeight="400"
              >
                Delivery Address:{" "}
              </Typography>
              <Typography
                variant="body"
                color={theme.colors.blackGreen}
                fontFamily="Poppins"
                fontWeight="400"
              >
                {order.user.address[0] + " " + order.user.address[1]}
              </Typography>
            </>
          )}
          <Typography
            variant="h6"
            color={theme.colors.siteDarkGreen}
            fontFamily="Poppins"
            fontWeight="400"
          >
            {isDelivery
              ? "Delivery Date and Time: "
              : "Collection Date and Time"}
          </Typography>
          <Typography
            variant="body"
            display="block"
            color={theme.colors.blackGreen}
            fontFamily="Poppins"
            fontWeight="400"
          >
            {daysOfWeek[completionDate.getDay()] +
              ",  " +
              completionDate.getDate() +
              " " +
              months[completionDate.getMonth()]}
          </Typography>
          <Typography
            variant="body"
            color={theme.colors.blackGreen}
            fontFamily="Poppins"
            fontWeight="500"
          >
            Time:{" "}
          </Typography>
          <Typography
            variant="body"
            color={theme.colors.blackGreen}
            fontFamily="Poppins"
            fontWeight="500"
          >
            {isDelivery
              ? "Will be delivered between 8am and 12pm"
              : timeSlots[order.timeSlot]}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="body"
              display="inline"
              fontWeight="400"
              fontFamily="Poppins"
            >
              Subtotal:
            </Typography>
            <Typography
              variant="body"
              display="inline"
              fontWeight="400"
              fontFamily="Poppins"
            >
              €{cartTotal.toFixed(2)}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="body"
              display="inline"
              fontWeight="400"
              fontFamily="Poppins"
            >
              Delivery and Handling:
            </Typography>
            <Typography
              variant="body"
              display="inline"
              sx={{
                textDecoration:
                  (cartTotal > 50 || !isDelivery) && "line-through",
              }}
              fontWeight="400"
              fontFamily="Poppins"
            >
              €3.49
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="body"
              display="inline"
              fontWeight="500"
              fontFamily="Poppins"
            >
              Total:
            </Typography>
            <Typography
              variant="body"
              display="inline"
              fontWeight="500"
              fontFamily="Poppins"
            >
              €{isDelivery ? actualTotal.toFixed(2) : cartTotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>
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
