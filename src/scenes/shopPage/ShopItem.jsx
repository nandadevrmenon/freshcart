import { useState } from "react";
import { Box, Typography, Collapse, CardActions, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DiscountedPrice from "components/DiscountedPrice";
import theme from "theme";
const ShopItem = (props) => {
  const [showCartControls, setShowCartControls] = useState(props.count === 0);
  const [ItemCount, setItemCount] = useState(props.count);

  const toggleCartControls = () => {
    setShowCartControls((prev) => !prev);
  };

  const increaseItemCount = (num) => {
    setItemCount((prev) => {
      if (prev === 0) {
        toggleCartControls();
      }
      return prev + 1;
    });
  };

  const decreaseItemCount = (num) => {
    setItemCount((prev) => {
      if (prev === 1) {
        toggleCartControls();
      }
      return prev - 1;
    });
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
            price={props.item.price.toFixed(2)}
            discount={props.item.discount}
          />
          <Collapse in={showCartControls} unmountOnExit>
            <CardActions sx={{ margin: 0, padding: 0 }}>
              <Button
                size="small"
                variant="contained"
                onClick={increaseItemCount}
                sx={{
                  backgroundColor: theme.colors.siteDarkGreen,
                  ":hover": {
                    backgroundColor: theme.colors.siteGreen,
                  },
                }}
              >
                add to cart
              </Button>
            </CardActions>
          </Collapse>
          <Collapse in={!showCartControls} unmountOnExit>
            <CardActions sx={{ margin: 0, padding: 0 }}>
              <Box display="flex" alignItems="center" minWidth="2rem">
                <AddCircleIcon
                  color="black"
                  onClick={increaseItemCount}
                  sx={{ marginRight: "1.6rem", fontSize: "25px" }}
                />
                <Typography fontSize="18px" display="inline">
                  {ItemCount}
                </Typography>
                <RemoveCircleIcon
                  color="black"
                  onClick={decreaseItemCount}
                  sx={{ marginLeft: "1.6rem", fontSize: "25px" }}
                />
              </Box>
            </CardActions>
          </Collapse>
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
