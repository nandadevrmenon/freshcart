import { Box, Typography } from "@mui/material";
import theme from "theme";
import PriceView from "./PriceView";

const EditableItem = (props) => {
  return (
    <Box
      display={props.show ? "flex" : "none"}
      overflow="hidden"
      width="90%"
      marginX="auto"
      flexDirection="row"
      flexWrap="nowrap"
      justifyContent="space-between"
      alignItems="start"
      marginY="1rem"
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="start"
        justifyContent="space-between"
        paddingY="1rem"
      >
        <Box
          width="auto"
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="start"
        >
          <Typography
            display="inline-block"
            variant="h6"
            color={theme.colors.darkGrey}
            fontFamily="Poppins"
            fontWeight="300"
          >
            {props.item.name}
          </Typography>
          <Typography
            display="inline-block"
            variant="body"
            color={theme.colors.darkGrey}
            fontFamily="Poppins"
            fontWeight="300"
          >
            Quantity: {props.item.size}
          </Typography>
          <Typography
            display="inline-block"
            variant="body"
            color={theme.colors.darkGrey}
            fontFamily="Poppins"
            fontWeight="300"
          >
            Category: {props.item.category}
          </Typography>
        </Box>
        <Box marginRight="1rem">
          <PriceView price={props.item.price} discount={props.item.discount} />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          component="img"
          sx={{
            aspectRatio: "1/1",
            height: "10rem",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          src={`http://localhost:3001/assets/${props.item.imagePath}`}
        ></Box>
      </Box>
    </Box>
  );
};

export default EditableItem;
