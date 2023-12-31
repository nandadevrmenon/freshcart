import { Box, Typography, Button } from "@mui/material";
import theme from "theme";
import PriceView from "./PriceView";
import PrimaryButton from "components/buttons/PrimaryButton";

const EditableItem = (props) => {
  const updateEditItemForm = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    props.changeItemInForm(props.item);
  };
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
          {props.updateInProgress ? (
            <Button variant="contained" disabled>
              Update In Progress
            </Button>
          ) : (
            <PrimaryButton
              invert={true}
              fullWidth={true}
              onClick={updateEditItemForm}
            >
              Edit Item
            </PrimaryButton>
          )}
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
