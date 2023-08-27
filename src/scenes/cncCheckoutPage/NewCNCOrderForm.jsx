import { TextField, Typography, MenuItem } from "@mui/material";
import PrimaryButton from "components/buttons/PrimaryButton";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { emptyCart } from "state/site";
import theme from "theme";
import { useNavigate } from "react-router-dom";

const dateSchema = yup.object().shape({
  completionDate: yup.string().required("Required"),
  timeSlot: yup.string().required("Required"),
});

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const initialDateValue = {
  completionDate: tomorrow.toString(),
  timeSlot: 0,
};

const sevenDays = [new Date(tomorrow)];
for (let i = 1; i < 7; i++) {
  const nextDay = new Date(sevenDays[i - 1]);
  nextDay.setDate(nextDay.getDate() + 1);
  sevenDays.push(nextDay);
}

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

const NewCNCOrderForm = () => {
  const user = useSelector((state) => state.user);
  const localCart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderSubmit = async (values, onSubmitProps) => {
    try {
      const response = await fetch(
        `http://localhost:3001/orders/${user._id}/placenewcncorder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({
            completionDate: values.completionDate,
            promoCode: "",
            cart: localCart,
            orderType: "Click & Collect",
            timeSlot: values.timeSlot,
          }),
        }
      );
      const newOrder = await response.json();
      if (newOrder) {
        console.log(newOrder);
        dispatch(emptyCart());
        navigate(`/orderConfirmation/${newOrder._id}`, {
          state: { order: newOrder },
        });
      }
    } catch (err) {
      console.log("Error fetching Delivery Options:", err);
    }
  };
  return (
    <Formik
      initialValues={initialDateValue}
      validationSchema={dateSchema}
      onSubmit={handleOrderSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
        enableReinitialize,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Typography
              marginTop="2rem"
              marginBottom="1rem"
              variant="h5"
              color={theme.colors.siteDarkGreen}
              fontFamily="Poppins"
              fontWeight="300"
            >
              Collection Date and Time
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              sx={{
                width: "100%",
                gridColumn: { sm: "0", md: "2/4" },
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.completionDate}
              name={"completionDate"}
              error={Boolean(errors.completionDate)}
              helperText={errors.completionDate}
            >
              {sevenDays.map((date) => {
                return (
                  <MenuItem key={date} value={date.toString()}>
                    {daysOfWeek[date.getDay()] +
                      ",  " +
                      date.getDate() +
                      " " +
                      months[date.getMonth()]}
                  </MenuItem>
                );
              })}
            </TextField>
            <Typography
              marginTop="1rem"
              marginBottom="1rem"
              variant="body"
              color={theme.colors.blackGreen}
              fontFamily="Poppins"
              fontWeight="300"
            >
              Time of Collection
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              sx={{
                width: "100%",
                gridColumn: { sm: "0", md: "2/4" },
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.timeSlot}
              name={"timeSlot"}
              error={Boolean(errors.timeSlot)}
              helperText={errors.timeSlot}
            >
              <MenuItem value={0}>9am to 12pm</MenuItem>
              <MenuItem value={1}>12pm to 3pm</MenuItem>
              <MenuItem value={2}>3pm to 6pm</MenuItem>
            </TextField>
            <PrimaryButton
              sx={{ marginTop: "1rem" }}
              fullWidth={true}
              invert={true}
              disabled={!user.address[0]}
              type="submit"
            >
              {user.address[0]
                ? "Order n Pay Now"
                : "No Delivery Address Found"}
            </PrimaryButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default NewCNCOrderForm;
