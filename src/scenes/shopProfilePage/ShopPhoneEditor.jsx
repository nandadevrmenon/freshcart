import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/buttons/PrimaryButton";
import DangerButton from "components/buttons/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import { setShopPhone } from "state/site";

const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^(01[0-9]{7})|(0[1-9][0-9]{8})$/, "Phone number is not valid")
    .required("Phone Number is Required"),
});

const ShopPhoneEditor = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const shopPhone = useSelector((state) => {
    return state.shop.phone;
  });
  const shopId = useSelector((state) => {
    return state.shop._id;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });

  const initialFieldValue = { phone: "" };

  const cancelEditModeHandler = (resetForm) => {
    setIsInEditMode((prev) => {
      return !prev;
    });
    resetForm();
  };

  const dispatch = useDispatch();
  const handleFormSubmit = async (values, onSubmitProps) => {
    const response = await fetch(
      `http://localhost:3001/protected/${shopId}/updateshopaccount`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: shopToken,
        },
        body: JSON.stringify(values),
      }
    );
    const responseJSON = await response.json();
    const newPhone = responseJSON.phone;
    if (newPhone) {
      dispatch(setShopPhone({ phone: newPhone }));
      setIsInEditMode(false);
    }
  };
  return (
    <Box width="60%" marginX="auto" marginBottom={"2rem"}>
      <Typography
        variant="h6"
        fontFamily="Poppins"
        color={theme.colors.blackGreen}
        sx={{ gridColumn: { sm: "span 3", md: "1/2" } }}
        marginY="auto"
        fontWeight="300"
      >
        Phone Number : {shopPhone}
      </Typography>
      {!isInEditMode ? (
        <Typography
          fontSize="12px"
          color={theme.colors.darkGrey}
          sx={{
            textDecoration: "underline",
            ":hover": { cursor: "pointer" },
          }}
          onClick={() => setIsInEditMode(true)}
        >
          Click to change phone number
        </Typography>
      ) : (
        <Box sx={{ gridColumn: { sm: "0", md: "2/4" } }}>
          <Formik
            initialValues={initialFieldValue}
            validationSchema={phoneSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize={true}
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
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: "100%", paddingTop: "0.5rem" }}
                  >
                    <TextField
                      size="small"
                      sx={{ width: "100%" }}
                      disabled={!isInEditMode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      name="phone"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone}
                      label="Phone"
                    />
                    <PrimaryButton
                      sx={{ marginX: "2rem" }}
                      invert={true}
                      type="submit"
                    >
                      Update
                    </PrimaryButton>
                    <DangerButton
                      onClick={() => {
                        cancelEditModeHandler(resetForm);
                      }}
                    >
                      Cancel
                    </DangerButton>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Box>
      )}
    </Box>
  );
};

export default ShopPhoneEditor;
