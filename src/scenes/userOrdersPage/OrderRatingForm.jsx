import { Box, Typography, Rating } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import PrimaryButton from "components/buttons/PrimaryButton";

const ratingSchema = yup.object().shape({
  rating: yup
    .number()
    .integer("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
});

const initialRating = {
  rating: 0,
};

const OrderRatingForm = ({ onUpdateRating }) => {
  const handleFormSubmit = (values, onSubmitProps) => {
    onUpdateRating(values.rating);
  };

  return (
    <Formik
      initialValues={initialRating}
      validationSchema={ratingSchema}
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
        enableReinitialize,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <div>
                <Rating
                  name="rating"
                  value={values.rating}
                  onChange={(event, newValue) => {
                    setFieldValue("rating", newValue);
                  }}
                  precision={1}
                  sx={{ marginRight: "1rem" }}
                />
                <Typography display={"block"} variant="caption" color="error">
                  {errors.rating}
                </Typography>
              </div>
              <PrimaryButton type={"submit"} invert={"true"}>
                Submit
              </PrimaryButton>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default OrderRatingForm;
