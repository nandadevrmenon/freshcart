import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";

import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/buttons/PrimaryButton";
import DangerButton from "components/buttons/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import { setShopEmail } from "state/site";

const emailSchema = yup.object().shape({
  email: yup.string().required("Required").email("Not a valid email"),
});

const ShopEmailEditor = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const shopEmail = useSelector((state) => {
    return state.shop.email;
  });
  const shopId = useSelector((state) => {
    return state.shop._id;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });

  const initialFieldValue = { email: "" };

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
    const newEmail = responseJSON.email;
    if (newEmail) {
      dispatch(setShopEmail({ email: newEmail }));
      setIsInEditMode(false);
    }
  };
  return (
    <Box width="60%" marginX="auto" marginBottom={"2rem"}>
      <Typography
        variant="h6"
        fontFamily="Poppins"
        color={theme.colors.blackGreen}
        marginY="auto"
        fontWeight="300"
      >
        Email : {shopEmail}
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
          Click to change email
        </Typography>
      ) : (
        <Box>
          <Formik
            initialValues={initialFieldValue}
            validationSchema={emailSchema}
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
                      value={values.email}
                      name="email"
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      label="New Email"
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

export default ShopEmailEditor;
