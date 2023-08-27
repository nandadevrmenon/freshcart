import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/buttons/PrimaryButton";
import DangerButton from "components/buttons/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import { setShopName } from "state/site";

const fieldSchema = yup
  .object()
  .shape({ name: yup.string().required("Required") });

const ShopNameField = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const shopName = useSelector((state) => {
    return state.shop.name;
  });
  const shopId = useSelector((state) => {
    return state.shop._id;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });

  const initialFieldValue = { name: shopName };

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
    const responseJSON = await response.json();
    const newName = responseJSON.name;
    if (newName) {
      dispatch(setShopName({ name: newName }));
      setIsInEditMode(false);
    }
  };
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3,minmax(0,1fr))"
      marginY="2rem"
      width="90%"
      marginX="auto"
    >
      <Typography
        variant="body"
        fontFamily="Poppins"
        color={theme.colors.darkGrey}
        sx={{ gridColumn: { sm: "span 3", md: "1/2" } }}
        marginY="auto"
      >
        Shop Name
      </Typography>
      <Box sx={{ gridColumn: { sm: "0", md: "2/4" } }}>
        <Formik
          initialValues={initialFieldValue}
          validationSchema={fieldSchema}
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
                  sx={{ width: "100%" }}
                >
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    sx={{ width: "100%" }}
                    disabled={!isInEditMode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  {isInEditMode ? (
                    <>
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
                    </>
                  ) : (
                    <EditIcon
                      sx={{ marginX: "1rem" }}
                      onClick={changeEditModeHandler}
                    ></EditIcon>
                  )}
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default ShopNameField;
