import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "theme";
import EditIcon from "@mui/icons-material/Edit";
import PrimaryButton from "components/PrimaryButton";
import DangerButton from "components/DangerButton";
import { setShopDelivery, setShopName } from "state/site";

const validationSchema = yup
  .object()
  .shape({ cnc: yup.bool(), delivery: yup.bool(), ndd: yup.bool() });

const EditDelivery = (props) => {
  const shop = useSelector((state) => {
    return state.shop;
  });
  const shopId = useSelector((state) => {
    return state.shop._id;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });
  const initialValues = {
    cnc: shop.cnc,
    delivery: shop.delivery,
    ndd: shop.ndd,
  };

  const [isInEditMode, setIsInEditMode] = useState(false);
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
    if (values.cnc || values.delivery || values.ndd) {
      const response = await fetch(
        `http://localhost:3001/protected/${shopId}/updateshopdetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: shopToken,
          },
          body: JSON.stringify(values),
        }
      );
      const newDeliveryDetails = await response.json();
      if (newDeliveryDetails) {
        dispatch(setShopDelivery(newDeliveryDetails));
        setIsInEditMode(false);
      }
    }
  };

  return (
    <Formik
      enableReinitialize={true}
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
                Shop Services
              </Typography>
              {isInEditMode ? (
                <Box>
                  <PrimaryButton
                    sx={{ marginX: "2rem" }}
                    invert={true}
                    type="submit"
                    disabled={!values.cnc && !values.delivery && !values.ndd}
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
              <FormGroup>
                <FormControl>
                  <FormControlLabel
                    error={Boolean(errors.cnc)}
                    control={
                      <Checkbox
                        name="cnc"
                        checked={values.cnc}
                        onChange={handleChange}
                        disabled={!isInEditMode}
                        onBlur={handleBlur}
                      />
                    }
                    label="Click & Collect"
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="delivery"
                      checked={values.delivery}
                      onChange={handleChange}
                      disabled={!isInEditMode}
                      onBlur={handleBlur}
                    />
                  }
                  label="Home Delivery"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="ndd"
                      checked={values.ndd}
                      onChange={handleChange}
                      disabled={!isInEditMode}
                      onBlur={handleBlur}
                    />
                  }
                  label="Next Day Delivery"
                />
                {!values.cnc && !values.delivery && !values.ndd ? (
                  <Typography variant="caption" color="error">
                    One of them has to be selected
                  </Typography>
                ) : null}
              </FormGroup>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditDelivery;
