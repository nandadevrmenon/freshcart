import { Box, Typography, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import theme from "theme";
import CategoryBox from "./components/CategoryBox";
import PrimaryButton from "components/PrimaryButton";

const initialValues = { category: "" };
const validationSchema = yup
  .object()
  .shape({ category: yup.string().required("Cannot be empty") });
const EditCategories = (props) => {
  const categories = useSelector((state) => {
    return state.shop.categories;
  });

  const handleFormSubmit = (values, onSubmitProps) => {
    console.log(values);
  };

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        fontFamily="Poppins"
        paddingY="1rem"
        color={theme.colors.siteDarkGreen}
        borderBottom={`1px solid ${theme.colors.borderGray}`}
      >
        Product Categories
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="start"
        flexDirection={{ sm: "column", md: "row" }}
      >
        {categories.map((cat) => {
          return <CategoryBox key={cat} name={cat} />;
        })}
      </Box>
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
                marginY="1rem"
                width="100%"
                marginX="auto"
                justifyContent="start"
                alignItems="start"
              >
                <TextField
                  id="outlined-size-small"
                  size="small"
                  sx={{
                    marginY: "1rem",
                    marginLeft: "2rem",
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  label="Category"
                  name="category"
                  error={Boolean(errors.category)}
                  helperText={errors.category}
                />
                <PrimaryButton
                  invert={true}
                  sx={{
                    height: "40px",
                    marginY: "1rem",
                    maxWidth: "300px",
                    marginLeft: "1.4rem",
                  }}
                  type="submit"
                >
                  Add New Category
                </PrimaryButton>
              </Box>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default EditCategories;
