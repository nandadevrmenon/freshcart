import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/PrimaryButton";
import DangerButton from "components/DangerButton";
import { useSelector } from "react-redux";

const ShopNameField = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const shopName = useSelector((state) => {
    return state.shop.name;
  });
  const fieldSchema = yup
    .object()
    .shape({ name: yup.string().required("Required") });
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

  const handleFormSubmit = () => {};
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
                      <PrimaryButton sx={{ marginX: "2rem" }} invert={true}>
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
