import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PrimaryButton from "components/buttons/PrimaryButton";
import DangerButton from "components/buttons/DangerButton";
import theme from "theme";
import { setShopAddress, setUserAddress } from "state/site";

const validationSchema = yup.object().shape({
  address0: yup
    .string()
    .required("Required")
    .min(5, "Must be at least 5 characters")
    .max(50, "Must be less than 50 characters"),
  address1: yup
    .string()
    .required("Required")
    .min(7, "Must be 7 characters")
    .max(7, "Must be 7 characters"),
  address2: yup
    .string()
    .required("Required")
    .matches(/^Dublin [0-9]+$/),
});

const areaCodes = [];
for (let i = 1; i < 25; i++) {
  areaCodes[i - 1] = "Dublin " + i;
}

const EditAddress = (props) => {
  const { isShop } = props;
  const address = useSelector((state) => {
    return isShop ? state.shop.address : state.user.address;
  });
  const userId = useSelector((state) => {
    return isShop ? state.shop._id : state.user._id;
  });
  const token = useSelector((state) => {
    return state.token;
  });

  const initialValues = {
    address0: address[0],
    address1: address[1],
    address2: address[2],
  };

  const [isInEditMode, setIsInEditMode] = useState(props.inEditMode);
  const changeEditModeHandler = () => {
    setIsInEditMode((prev) => {
      return !prev;
    });
  };
  const cancelEditModeHandler = (resetForm) => {
    setIsInEditMode((prev) => {
      return !prev;
    });
    resetForm();
  };

  const dispatch = useDispatch();
  const handleFormSubmit = async (values, onSubmitProps) => {
    const address = [values.address0, values.address1, values.address2];
    const response = await fetch(
      isShop
        ? `http://localhost:3001/protected/${userId}/updateshopdetails`
        : `http://localhost:3001/users/${userId}/updateuserinfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ address: address }),
      }
    );
    const responseJSON = await response.json();
    const newAddress = responseJSON.address;
    if (newAddress) {
      isShop
        ? dispatch(setShopAddress({ address: address }))
        : dispatch(setUserAddress({ address: address }));
      setIsInEditMode(false);
    }
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
              justifyContent="space-between"
              borderBottom={`1px solid ${theme.colors.borderGray}`}
            >
              <Typography
                variant="h5"
                fontFamily="Poppins"
                paddingY="1rem"
                color={theme.colors.siteDarkGreen}
                display="inline"
              >
                {isShop ? "Shop Address" : "Your Delivery Address"}
              </Typography>
              {isInEditMode ? (
                <Box>
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
                    {" "}
                    Cancel
                  </DangerButton>
                </Box>
              ) : (
                <EditIcon
                  sx={{ marginX: "1rem" }}
                  onClick={changeEditModeHandler}
                ></EditIcon>
              )}
            </Box>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3,minmax(0,1fr))"
              marginY="1rem"
              width="90%"
              marginX="auto"
            >
              <Typography
                variant="body"
                fontFamily="Poppins"
                color={theme.colors.darkGrey}
                paddingY="7px"
                marginY="1rem"
                sx={{ gridColumn: { sm: "span 3", md: "1/2" } }}
              >
                Address
              </Typography>
              <TextField
                size="small"
                sx={{
                  width: "100%",
                  gridColumn: { sm: "0", md: "2/4" },
                  marginY: "1rem",
                }}
                disabled={!isInEditMode}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address0}
                name="address0"
                error={Boolean(errors.address0)}
                helperText={errors.address0}
              />

              <Typography
                variant="body"
                fontFamily="Poppins"
                color={theme.colors.darkGrey}
                paddingY="7px"
                marginY="1rem"
                sx={{ gridColumn: { sm: "span 3", md: "1/2" } }}
              >
                Postcode
              </Typography>
              <TextField
                size="small"
                sx={{
                  width: "100%",
                  gridColumn: { sm: "0", md: "2/4" },
                  marginY: "1rem",
                }}
                disabled={!isInEditMode}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={Boolean(errors.address1)}
                helperText={errors.address1}
              />
              <Typography
                variant="body"
                fontFamily="Poppins"
                color={theme.colors.darkGrey}
                paddingY="7px"
                marginY="1rem"
                sx={{ gridColumn: { sm: "span 3", md: "1/2" } }}
              >
                Area
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
                disabled={!isInEditMode}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name={"address2"}
                error={Boolean(errors.address2)}
                helperText={errors.address2}
              >
                {areaCodes.map((area, index) => (
                  <MenuItem key={area + index} value={area}>
                    {area}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditAddress;
