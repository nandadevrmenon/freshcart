import React from "react";
import { Typography, TextField } from "@mui/material";
import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/PrimaryButton";
import DangerButton from "components/DangerButton";
import { useSelector } from "react-redux";

const passwordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Required")
    .min(5, "Cannot be less than 5 Characaters"),
  newPassword: yup
    .string()
    .required("Required")
    .min(5, "Cannot be less than 5 Characaters"),
  confirmNewPassword: yup
    .string()
    .required("Required")
    .min(5, "Cannot be less than 5 Characaters"),
});

const initialFieldValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ShopPasswordEditor = (props) => {
  const shopId = useSelector((state) => {
    return state.shop._id;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (values.newPassword !== values.confirmNewPassword) {
      onSubmitProps.setErrors({
        confirmNewPassword: "Passwords do not match",
      });
    } else {
      const response = await fetch(
        `http://localhost:3001/protected/${shopId}/changeshoppassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: shopToken,
          },
          body: JSON.stringify(values),
        }
      );
      const responseJson = await response.json();
      if (responseJson.msg === "Invalid password") {
        onSubmitProps.setErrors({
          oldPassword: "Passwords is incorrect",
        });
        onSubmitProps.setSubmitting(false);
      } else {
        onSubmitProps.resetForm();
        props.setIsInEditPasswordMode(false);
      }
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialFieldValues}
        validationSchema={passwordSchema}
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
              <Typography
                variant="h6"
                fontFamily="Poppins"
                color={theme.colors.blackGreen}
                sx={{ gridColumn: { sm: "span 3", md: "1/2" } }}
                marginBottom="1rem"
                fontWeight="300"
              >
                Change Password
              </Typography>
              <TextField
                size="small"
                sx={{ width: "100%", marginBottom: "1rem" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oldPassword}
                name="oldPassword"
                error={Boolean(errors.oldPassword)}
                helperText={errors.oldPassword}
                label="Current Password"
                type="password"
              />
              <TextField
                size="small"
                sx={{ width: "100%", marginBottom: "1rem" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPassword}
                name="newPassword"
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword}
                label="New Password"
                type="password"
              />
              <TextField
                size="small"
                sx={{ width: "100%", marginBottom: "1rem" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmNewPassword}
                name="confirmNewPassword"
                error={Boolean(errors.confirmNewPassword)}
                helperText={errors.confirmNewPassword}
                label="Confirm New Password"
                type="password"
              />
              <PrimaryButton
                sx={{ marginRight: "2rem" }}
                invert={true}
                type="submit"
              >
                Update
              </PrimaryButton>
              <DangerButton
                onClick={() => {
                  props.setIsInEditPasswordMode(false);
                }}
              >
                Cancel
              </DangerButton>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default ShopPasswordEditor;
