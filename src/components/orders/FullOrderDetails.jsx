import { Box, Typography } from "@mui/material";
import theme from "theme";

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

const FullOrderDetails = ({
  status,
  type,
  user,
  cartTotal,
  actualTotal,
  completionDate,
  timeSlot,
}) => {
  const isDelivery = type === "Delivery";
  const isComplete =
    status === "Collected Successfully" || status === "Delivered Successfully";
  const isCancalled =
    status === "Cancelled" || status === "Cancelled by Seller";
  return (
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
        display="inline"
      >
        Status:
      </Typography>
      <Typography
        variant="h4"
        color={
          isComplete
            ? theme.colors.celadon
            : isCancalled
            ? theme.colors.darkDangerRed
            : theme.colors.darkGrey
        }
        fontFamily="Poppins"
        fontWeight="400"
        display="inline"
      >
        {status}
      </Typography>
      {isDelivery && (
        <>
          <Typography
            variant="h6"
            color={theme.colors.blackGreen}
            fontFamily="Poppins"
            fontWeight="400"
          >
            Delivery Address:{" "}
          </Typography>
          <Typography
            variant="body"
            color={theme.colors.darkGrey}
            fontFamily="Poppins"
            fontWeight="400"
          >
            {user.address[0] + " " + user.address[1]}
          </Typography>
        </>
      )}
      <Typography
        variant="h6"
        color={theme.colors.blackGreen}
        fontFamily="Poppins"
        fontWeight="400"
        borderTop={`1px solid ${theme.colors.borderGray}`}
        marginTop="0.5rem"
        paddingTop="0.5rem"
      >
        {isDelivery ? "Delivery Date and Time: " : "Collection Date and Time"}
      </Typography>
      <Typography
        variant="body"
        display="block"
        color={theme.colors.darkGrey}
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
        color={theme.colors.darkGrey}
        fontFamily="Poppins"
        fontWeight="400"
      >
        {"Time: "}
      </Typography>
      <Typography
        variant="body"
        color={theme.colors.darkGrey}
        fontFamily="Poppins"
        fontWeight="400"
      >
        {isDelivery ? "Delivery between 8am and 12pm" : timeSlots[timeSlot]}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderTop={`1px solid ${theme.colors.borderGray}`}
        paddingTop="0.5rem"
        marginTop="0.5em"
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
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
            textDecoration: (cartTotal > 50 || !isDelivery) && "line-through",
          }}
          fontWeight="400"
          fontFamily="Poppins"
        >
          €3.49
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
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
          €{isDelivery ? actualTotal : cartTotal.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default FullOrderDetails;
