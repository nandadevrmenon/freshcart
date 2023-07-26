import { Box, Typography } from "@mui/material";
import DiscountedPrice from "components/DiscountedPrice";
import theme from "theme";
import ItemCountControl from "../../components/ItemCountControl";

const ShopItem = (props) => {
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
            variant="body2"
            color={theme.colors.darkGrey}
            fontFamily="Poppins"
            fontWeight="300"
          >
            {props.item.size}
          </Typography>
        </Box>
        <Box marginRight="1rem">
          <DiscountedPrice
            price={props.item.price ? props.item.price.toFixed(2) : 0}

            discount={props.item.discount}
          />
          <ItemCountControl productID={props.item._id}></ItemCountControl>
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

export default ShopItem;
