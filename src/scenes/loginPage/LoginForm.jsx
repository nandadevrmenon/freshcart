import { useCallback, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import theme from "theme";
import { Fragment } from "react";
import PrimaryButton from "components/PrimaryButton";
import { useDispatch } from "react-redux";
import { setLogin, setShopLogin } from "state/auth";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  phone: yup
    .string()
    .matches(/^(01[0-9]{7})|(0[1-9][0-9]{8})$/, "Phone number is not valid")
    .required("Phone Number is Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesForRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
};

const initialValuesForLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [pageType, setPageType] = useState("login");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();

  const invalidPW = loginError === "invalid pw";

  const isLoginPage = pageType === "login";
  const isShopLoginPage = pageType === "shopLogin";
  const isSignUpPage = pageType === "register";

  const changeToSignUpForm = useCallback(() => {
    setPageType("register");
  }, []);

  const changeToLoginPage = useCallback(() => {
    setPageType("login");
  }, []);

  const changeToShopLoginPage = useCallback(() => {
    setPageType("shopLogin");
  }, []);

  let buttonMessage = "Log in";

  if (isSignUpPage) buttonMessage = "Sign Up";
  if (isShopLoginPage) buttonMessage = "Log into your shop";

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const savedUser = savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser) setPageType("login");
  };

  const login = async (values, onSubmitProps, isShopLoginPage) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn.msg === "Invalid Email Password Combination.")
      setLoginError("invalid pw");
    else if (loggedIn.msg === "User Does Not Exist.") setLoginError("no user");
    else {
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
            cart: loggedIn.user.cart,
          })
        );
        navigate("/");
      }
    }
  };

  const shopLogin = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:3001/protected/shoplogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    if (loggedIn.msg === "Invalid Email Password Combination.")
      setLoginError("invalid pw");
    else if (loggedIn.msg === "User Does Not Exist.") setLoginError("no user");
    else {
      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setShopLogin({
            shop: loggedIn.shop,
            token: loggedIn.token,
          })
        );
        navigate(`/protected/${loggedIn.shop._id}/home`);
      }
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLoginPage) await login(values, onSubmitProps);
    if (isShopLoginPage) await shopLogin(values, onSubmitProps);
    if (isSignUpPage) await register(values, onSubmitProps);
  };
  return (
    <Formik
      initialValues={
        isLoginPage || isShopLoginPage
          ? initialValuesForLogin
          : initialValuesForRegister
      }
      validationSchema={
        isLoginPage || isShopLoginPage ? loginSchema : registerSchema
      }
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
              paddingTop="2rem"
              paddingBottom="1.5rem"
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
              {isSignUpPage && (
                <Fragment>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    sx={{ gridColumn: { sm: "span 4", md: "span 2" } }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    sx={{ gridColumn: { sm: "span 4", md: "span 2" } }}
                  />
                  <TextField
                    label="Irish Phone Number (eg.857111234)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Fragment>
              )}
              <TextField
                label={isShopLoginPage ? "Shop Email" : "Email"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                {loginError && (
                  <Typography
                    marginX="auto"
                    marginBottom="1rem"
                    color="red"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {invalidPW
                      ? "Invalid Email Password Combination"
                      : "User does not exist."}
                  </Typography>
                )}
                <PrimaryButton invert={true} fullWidth={true} type="submit">
                  {buttonMessage}
                </PrimaryButton>
                <Typography
                  marginX="auto"
                  marginTop="1rem"
                  color={theme.colors.grey}
                  sx={{
                    textAlign: "center",
                    textDecoration: "underline",
                    ":hover": {
                      color: theme.colors.darkGrey,
                    },
                  }}
                  onClick={
                    isSignUpPage ? changeToLoginPage : changeToSignUpForm
                  }
                >
                  {isSignUpPage
                    ? "Already Have an Account? Log in Here"
                    : "Don't Have an Account? Sign Up Here"}
                </Typography>
                <Typography
                  marginX="auto"
                  marginTop="1rem"
                  color={theme.colors.grey}
                  sx={{
                    textAlign: "center",
                    textDecoration: "underline",
                    ":hover": {
                      color: theme.colors.darkGrey,
                    },
                  }}
                  onClick={
                    isShopLoginPage ? changeToLoginPage : changeToShopLoginPage
                  }
                >
                  {isLoginPage && "Sign in as a shop owner here"}
                  {isShopLoginPage && "Log in as a shopper here"}
                </Typography>
              </Box>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
