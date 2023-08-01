import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "theme";
import PrimaryButton from "components/PrimaryButton";

import DangerButton from "components/DangerButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

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

const initialItemValues = {
  name: "",
  categories: "",
  size: "",
  price: 10,
  discount: 0,
};

const AddNewItemPage = (props) => {
  const categories = useSelector((state) => {
    return state.shop.categories;
  });
  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
  };

  return (
    <Box paddingTop="5rem">
      <Box width="60%" mx="auto">
        <Typography marginTop="2rem" marginBottom="1rem" variant="h3">
          Add New Item
        </Typography>
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
                      paddingY="1rem"
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
                      <PrimaryButton
                        invert={true}
                        fullWidth={true}
                        type="submit"
                      >
                        Update Item
                      </PrimaryButton>

                      <DangerButton invert={true} fullWidth={true}>
                        Cancel Update
                      </DangerButton>
                    </Box>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewItemPage;
