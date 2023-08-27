import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import PrimaryButton from "components/buttons/PrimaryButton";
import theme from "theme";

const cncStatusValues = [
  "Processing",
  "Ready To Collect",
  "Cancelled by Seller",
  "Collected Successfully",
];
const deliveryStatusValues = [
  "Processing",
  "Out For Delivery",
  "Cancelled by Seller",
  "Delivered Successfully",
];

const EditOrderStatus = ({ status, updateStatusHandler, isCNC }) => {
  const validationSchema = yup.object().shape({
    status: yup
      .mixed()
      .oneOf(isCNC ? cncStatusValues : deliveryStatusValues)
      .required(),
  });
  const initialValues = {
    status: status,
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    updateStatusHandler(values.status);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
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
              justifyContent="space-evenly"
              marginY="1rem"
              width="30rem"
            >
              <Typography
                variant="body"
                fontFamily="Poppins"
                color={theme.colors.darkGrey}
                paddingY="7px"
                marginY="1rem"
                width="250px"
              >
                Order Status
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                sx={{
                  width: "100%",
                  gridColumn: { sm: "0", md: "2/4" },
                  marginY: "1rem",
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name={"status"}
                error={Boolean(errors.status)}
                helperText={errors.status}
              >
                {isCNC
                  ? cncStatusValues.map((status, index) => (
                      <MenuItem key={status + index} value={status}>
                        {status}
                      </MenuItem>
                    ))
                  : deliveryStatusValues.map((status, index) => (
                      <MenuItem key={status + index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
              </TextField>
              <Box>
                <PrimaryButton
                  sx={{ marginX: "2rem" }}
                  invert={true}
                  type="submit"
                >
                  Update
                </PrimaryButton>
              </Box>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};
export default EditOrderStatus;
