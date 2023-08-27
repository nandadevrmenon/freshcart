import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "theme";
import PrimaryButton from "components/buttons/PrimaryButton";
import DangerButton from "components/buttons/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useNavigate } from "react-router-dom";
import { addnewItem } from "state/site";

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
  image: yup.string().required("Required"),
});

const initialItemValues = {
  name: "",
  category: "",
  size: "",
  price: 10,
  discount: 0,
  image: "",
};

const AddNewItemPage = (props) => {
  const categories = useSelector((state) => {
    return state.shop.categories;
  });
  const shop = useSelector((state) => {
    return state.shop;
  });
  const shopToken = useSelector((state) => {
    return state.token;
  });
  const shopName = shop.name;
  const shopId = shop._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    values.price = values.price.toFixed(2);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("imagePath", values.image.name);
    formData.append("shopName", shopName);
    const savedItemResponse = await fetch(
      `http://localhost:3001/protected/${shopId}/addnewitem`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${shopToken}`,
        },
        body: formData,
      }
    );

    const savedItem = await savedItemResponse.json();
    dispatch(addnewItem({ item: savedItem }));
    onSubmitProps.resetForm();
    backToProducts();
  };

  const backToProducts = () => {
    navigate(`/protected/${shopId}/products`);
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
                      <Box
                        sx={{
                          gridColumn: "span 4",
                          border: `1px dashed ${theme.colors.borderGray}`,
                          borderRadius: "5px",
                          padding: "1rem",
                        }}
                      >
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) => {
                            // Filter out files with other extensions
                            const validFiles = acceptedFiles.filter(
                              (file) =>
                                file.type === "image/jpeg" ||
                                file.type === "image/jpg" ||
                                file.type === "image/png"
                            );

                            // Update the state with the first valid file, if any
                            if (validFiles.length > 0) {
                              setFieldValue("image", validFiles[0]);
                            }
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              border="2px dashed black"
                              p="1rem"
                              sx={{ ":hover": { cursor: "pointer" } }}
                            >
                              <input {...getInputProps()} />
                              {!values.image ? (
                                "Insert Picture here (3:2 ratio preferred) "
                              ) : (
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography display="inline">
                                    {values.image.name}
                                  </Typography>
                                  <ModeEditOutlineIcon />
                                </Box>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                      </Box>
                      <PrimaryButton
                        invert={true}
                        fullWidth={true}
                        type="submit"
                      >
                        Add Item
                      </PrimaryButton>

                      <DangerButton
                        onClick={backToProducts}
                        invert={true}
                        fullWidth={true}
                      >
                        Cancel
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
