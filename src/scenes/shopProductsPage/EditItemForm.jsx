import { useEffect, useState } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "theme";
import PrimaryButton from "components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import DangerButton from "components/buttons/DangerButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateShopItem, deleteShopItem } from "state/site";

const itemSchema = yup.object().shape({
  name: yup.string().required("Required"),
  category: yup.string().default(""),
  size: yup.string().required("Required"),
  price: yup.number().required("Required"),
  discount: yup
    .number()
    .integer("Has to be Integer")
    .min(0)
    .max(99)
    .required("Required"),
});

const EditItemForm = (props) => {
  const item = props.item;
  const initialItemValues = {
    name: item.name,
    category: item.category,
    size: item.size,
    price: item.price,
    discount: item.discount,
  };
  const shop = useSelector((state) => {
    return state.shop;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });

  const categories = shop.categories;
  const dispatch = useDispatch();
  const handleFormSubmit = async (values, onSubmitProps) => {
    updateItem(values, onSubmitProps);
  };

  const cancelUpdateHandler = () => {
    props.changeItemInForm(null);
  };

  const promptDeletionModal = async () => {
    const deleteItem = await fetch(
      `http://localhost:3001/protected/${shop._id}/${item._id}/deleteitem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${shopToken}`,
        },
      }
    );
    const deletedItem = await deleteItem.json();
    cancelUpdateHandler();
    dispatch(
      deleteShopItem({
        itemId: deletedItem._id,
      })
    );
  };

  const updateItem = async (values, onSubmitProps) => {
    values.price = values.price.toFixed(2);
    const changesInItem = {};
    for (const [key, value] of Object.entries(values)) {
      if (value !== item[key]) {
        changesInItem[key] = value;
      }
    }

    if (Object.keys(changesInItem).length !== 0) {
      const newItem = await fetch(
        `http://localhost:3001/protected/${shop._id}/${item._id}/updateItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${shopToken}`,
          },
          body: JSON.stringify(changesInItem),
        }
      );
      const updatedItem = await newItem.json();
      cancelUpdateHandler();
      onSubmitProps.resetForm();
      dispatch(
        updateShopItem({
          item: updatedItem,
        })
      );
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialItemValues}
        validationSchema={itemSchema}
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
                sx={{
                  backgroundColor: theme.colors.white,
                  border: `1px solid ${theme.colors.borderGray}`,
                  boxShadow: "5px 5px 7px -5px rgba(0,0,0,0.3)",
                  borderRadius: "5px",
                }}
              >
                <Box
                  position="relative"
                  display="flex"
                  flexDirection="row"
                  flexWrap="nowrap"
                  alignItems="center"
                  justifyContent="end"
                >
                  <DeleteIcon
                    sx={{
                      padding: "0.5rem",
                      margin: "0.5rem",
                      color: theme.colors.blackGreen,
                      ":hover": { cursor: "pointer" },
                    }}
                    onClick={promptDeletionModal}
                  ></DeleteIcon>
                </Box>
                <Box
                  marginBottom="1rem"
                  paddingBottom="1rem"
                  paddingX="1rem"
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4,minmax(0,1fr))"
                >
                  <TextField
                    label="Product Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    sx={{ gridColumn: { sm: "span 4", md: "span 2" } }}
                  />
                  <TextField
                    label="Price"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    name="price"
                    error={Boolean(errors.price)}
                    helperText={errors.price}
                    sx={{ gridColumn: { sm: "span 4", md: "span 1" } }}
                  />
                  <TextField
                    label="Discount"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discount}
                    name="discount"
                    min="0"
                    max="99"
                    error={Boolean(errors.discount)}
                    helperText={errors.discount}
                    sx={{ gridColumn: { sm: "span 4", md: "span 1" } }}
                  />
                  <TextField
                    label="Size"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.size}
                    name="size"
                    error={Boolean(errors.size)}
                    helperText={errors.size}
                    sx={{ gridColumn: { sm: "span 4", md: "span 2" } }}
                  />
                  <TextField
                    select
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={Boolean(errors.category)}
                    helperText={errors.category}
                    sx={{
                      gridColumn: { sm: "span 4", md: "span 1" },
                    }}
                  >
                    <MenuItem value=""> No Specific Category</MenuItem>
                    {categories.map((cat) => {
                      return <MenuItem value={cat}>{cat}</MenuItem>;
                    })}
                  </TextField>
                  <TextField
                    label="Discounted Price"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(
                      values.price -
                      (values.price * values.discount) / 100
                    ).toFixed(2)}
                    sx={{ gridColumn: { sm: "span 4", md: "span 1" } }}
                  />
                  <PrimaryButton invert={true} fullWidth={true} type="submit">
                    Update Item
                  </PrimaryButton>

                  <DangerButton
                    invert={true}
                    fullWidth={true}
                    onClick={cancelUpdateHandler}
                  >
                    Cancel Update
                  </DangerButton>
                </Box>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditItemForm;
