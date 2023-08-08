import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/PrimaryButton";
import DangerButton from "components/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import { setUserPhone } from "state/site";

const fieldSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^(01[0-9]{7})|(0[1-9][0-9]{8})$/, "Phone number is not valid")
    .required("Phone Number is Required"),
});

const EditUserPhone = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const user = useSelector((state) => {
    return state.user;
  });
  const { phone } = user;

  const userId = useSelector((state) => {
    return state.user._id;
  });
  const token = useSelector((state) => {
    return state.token;
  });

  const initialFieldValue = { phone };

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
    const newPhone = responseJSON.phone;
    if (newPhone) {
      dispatch(setUserPhone({ phone: newPhone }));
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
        Phone Number
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
                    value={values.phone}
                    name="phone"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                    label="phone"
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

export default EditUserPhone;
