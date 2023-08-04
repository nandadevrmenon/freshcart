import { useState } from "react";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik";
import theme from "theme";
import * as yup from "yup";
import PrimaryButton from "components/PrimaryButton";
import DangerButton from "components/DangerButton";

const AreaDropdown = (props) => {
  const areaCodes = [];
  for (let i = 1; i < 25; i++) {
    areaCodes[i - 1] = "Dublin " + i;
  }
  console.log(areaCodes);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const fieldSchema = yup.object().shape(props.schema);
  const initialFieldValue = {};
  initialFieldValue[props.name] = props.initialValue;

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
        {props.label}
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
                    select
                    fullWidth
                    size="small"
                    disabled={!isInEditMode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[props.name]}
                    name={props.name}
                    error={Boolean(errors[props.name])}
                    helperText={errors[props.name]}
                  >
                    {areaCodes.map((area, index) => (
                      <MenuItem key={area + index} value={area}>
                        {area}
                      </MenuItem>
                    ))}
                  </TextField>
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

export default AreaDropdown;
