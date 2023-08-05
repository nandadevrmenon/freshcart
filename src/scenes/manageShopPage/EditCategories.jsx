import { Box, Typography, TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import theme from "theme";
import CategoryBox from "./components/CategoryBox";
import PrimaryButton from "components/PrimaryButton";
import { setShopCategories } from "state/site";

const initialValues = { category: "" };
const validationSchema = yup.object().shape({
  category: yup
    .string()
    .required("Cannot be empty")
    .max(20, "Cannot be longer than 20 characters"),
});
const EditCategories = (props) => {
  const categories = useSelector((state) => {
    return state.shop.categories;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });
  const shopId = useSelector((state) => {
    return state.shop._id;
  });

  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const updateCategoriesIndDB = () => {
      clearTimeout(timeoutRef.current); // Clear the previous timeout
      timeoutRef.current = setTimeout(() => {
        const sendNewCategories = async () => {
          try {
            await fetch(
              `http://localhost:3001/protected/${shopId}/updateshopdetails`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${shopToken}`,
                },
                body: JSON.stringify({ categories }),
              }
            );
          } catch (error) {
            console.error("Error Updating the cart:", error);
          }
        };
        sendNewCategories();
      }, 2000);
    };

    updateCategoriesIndDB();
    return () => {
      clearTimeout(timeoutRef.current); // Clean up the timeout when component unmounts
    };
  }, [categories]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const newCatList = [...categories, values.category];
    dispatch(setShopCategories({ categories: newCatList }));
    onSubmitProps.resetForm();
  };

  const isAtLimit = categories.length >= 8;

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
                <Box>
                  <PrimaryButton
                    invert={true}
                    sx={{
                      height: "40px",
                      marginY: "1rem",
                      maxWidth: "300px",
                      marginLeft: "1.4rem",
                    }}
                    type="submit"
                    disabled={isAtLimit}
                  >
                    Add New Category
                  </PrimaryButton>
                  {isAtLimit && (
                    <Typography display="block" variant="caption" color="error">
                      You cannot have more then 8 categories
                    </Typography>
                  )}
                </Box>
              </Box>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default EditCategories;
