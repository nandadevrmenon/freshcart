import { useEffect } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import theme from "theme";
import PrimaryButton from "components/PrimaryButton";
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
  category: "",
  size: "",
  price: 0,
  discount: 0,
};
// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [pageType, setPageType] = useState("login");
//   const [loginError, setLoginError] = useState("");
//   const [signUpError, setSignUpError] = useState(false);
//   const dispatch = useDispatch();

//   const login = async (values, onSubmitProps, isShopLoginPage) => {
//     const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });
//     const loggedIn = await loggedInResponse.json();
//     if (loggedIn.msg === "Invalid Email Password Combination.")
//       setLoginError("invalid pw");
//     else if (loggedIn.msg === "User Does Not Exist.") setLoginError("no user");
//     else {
//       onSubmitProps.resetForm();
//       if (loggedIn) {
//         dispatch(
//           setLogin({
//             user: loggedIn.user,
//             token: loggedIn.token,
//             cart: loggedIn.user.cart,
//           })
//         );
//         navigate("/");
//       }
//     }
//   };

const EditItemForm = (props) => {
  const { item } = props;

  const shop = useSelector((state) => {
    return state.shop;
  });
  const categories = shop.categories;

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("formSubmiteed");
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
                marginBottom="1rem"
                paddingY="2rem"
                paddingX="1rem"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  backgroundColor: theme.colors.white,
                  border: `1px solid ${theme.colors.borderGray}`,
                  boxShadow: "5px 5px 7px -5px rgba(0,0,0,0.3)",
                  borderRadius: "5px",
                }}
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
                  error={Boolean(errors.price)}
                  helperText={errors.price}
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
                  sx={{ gridColumn: { sm: "span 4", md: "span 1" } }}
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
                  value={values.price - (values.price * values.discount) / 100}
                  sx={{ gridColumn: { sm: "span 4", md: "span 2" } }}
                />
                <PrimaryButton invert={true} fullWidth={true} type="submit">
                  Update Item
                </PrimaryButton>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditItemForm;
