import { Box, Typography } from "@mui/material";
import DiscountedPrice from "components/DiscountedPrice";
import theme from "theme";
import ItemCountControl from "../../components/ItemCountControl";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCart, updateCartShop } from "state/site";
import { Collapse, CardActions, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const CartItem = (props) => {
  const cart = useSelector((state) => {
    return state.cart;
  });
  const count = cart[props.item._id] || 0;

  const [show, setShow] = useState(props.show);
  const [ItemCount, setItemCount] = useState(count);

  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const updateLocalCart = () => {
      clearTimeout(timeoutRef.current); // Clear the previous timeout
      timeoutRef.current = setTimeout(() => {
        dispatch(
          updateCart({
            item: props.item._id,
            count: ItemCount,
          })
        );
      }, 600);
    };

    updateLocalCart();

    return () => {
      clearTimeout(timeoutRef.current); // Clean up the timeout when component unmounts
    };
  }, [ItemCount]); // Add ItemCount to the dependency array

  const increaseItemCount = () => {
    setItemCount((prev) => {
      return prev + 1;
    });
  };

  const decreaseItemCount = () => {
    setItemCount((prev) => {
      const updatedCount = prev - 1;
      if (updatedCount === 0) setShow(false);
      return updatedCount >= 0 ? updatedCount : 0;
    });
  };
  return (
    <Box
      display={show ? "flex" : "none"}
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
          <CardActions sx={{ margin: 0, padding: 0 }}>
            <Box display="flex" alignItems="center" minWidth="2rem">
              <RemoveCircleIcon
                color="black"
                onClick={decreaseItemCount}
                sx={{ marginRight: "1.6rem", fontSize: "25px" }}
              />
              <Typography fontSize="18px" display="inline">
                {ItemCount}
              </Typography>
              <AddCircleIcon
                color="black"
                onClick={increaseItemCount}
                sx={{ marginLeft: "1.6rem", fontSize: "25px" }}
              />
            </Box>
          </CardActions>
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

export default CartItem;
