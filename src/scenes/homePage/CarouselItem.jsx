import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/buttons/PrimaryButton";

const CarouselItem = (props) => {
  return (
    <Box
      marginTop="4rem"
      width="100%"
      height="100%"
      sx={{
        backgroundImage: `url("${props.imageURL}")`,
        backgroundRepeat: "none",
        backgroundSize: "cover",
        backgroundPosition: props.position,
      }}
      display="flex"
      alignItems="center"
      justifyContent="start"
    >
      <Box
        width="50%"
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="start"
        marginX="3rem"
        justifyContent="center"
      >
        <Typography
          marginBottom={props.subText ? "0.8rem" : "1.5rem"}
          variant="h2"
          fontFamily="Poppins"
          fontWeight="800"
          color={props.color}
        >
          {props.headingText}{" "}
        </Typography>
        {props.subText ? (
          <Typography
            marginBottom="1rem"
            variant="h5"
            fontFamily="Poppins"
            fontWeight="800"
            color={props.color}
          >
            {props.subText}
          </Typography>
        ) : (
          ""
        )}
        <PrimaryButton>{props.buttonText}</PrimaryButton>
      </Box>
    </Box>
  );
};

export default CarouselItem;
