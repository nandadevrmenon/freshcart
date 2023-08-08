import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/PrimaryButton";
import DangerButton from "components/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import { setShopName, setUserEmail } from "state/site";

const fieldSchema = yup.object().shape({
  email: yup.string().email("Not a valid email").required("Required"),
});

const EditUserEmail = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const user = useSelector((state) => {
    return state.user;
  });
  const { email } = user;

  const userId = useSelector((state) => {
    return state.user._id;
  });
  const token = useSelector((state) => {
    return state.token;
  });

  const initialFieldValue = { email };

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
      `http://localhost:3001/users/${userId}/updateuserinfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(values),
      }
    );
    const responseJSON = await response.json();
    const newEmail = responseJSON.email;
    if (newEmail) {
      dispatch(setUserEmail({ email: newEmail }));
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
        Email
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
                  justifyContent="center"
                  sx={{ width: "100%" }}
                >
                  <TextField
                    size="small"
                    sx={{ width: "100%", marginRight: "1rem" }}
                    disabled={!isInEditMode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    label="email"
                  />

                  {isInEditMode ? (
                    <>
                      <PrimaryButton
                        sx={{ marginX: "2rem", height: "2.5rem" }}
                        invert={true}
                        type="submit"
                      >
                        Update
                      </PrimaryButton>
                      <DangerButton
                        sx={{ height: "2.5rem" }}
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
                      sx={{ marginX: "1rem", marginY: "0.5rem" }}
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

export default EditUserEmail;
