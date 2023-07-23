import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateCart } from "state/site";
import { Fragment, useState, useRef, useEffect } from "react";
import { Box, Typography, Collapse, CardActions, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import theme from "theme";

const ItemCountControl = (props) => {
  const isUser = useSelector((state) => {
    return Boolean(state.user) && Boolean(state.token);
  });
  const cart = useSelector((state) => {
    return state.cart;
  });
  const { productID } = props;
  const count = cart[productID] || 0;

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
            item: productID,
            count: ItemCount,
          })
        );
      }, 1000);
    };

    updateLocalCart();

    return () => {
      clearTimeout(timeoutRef.current); // Clean up the timeout when component unmounts
    };
  }, [ItemCount]); // Add ItemCount to the dependency array

  const increaseItemCount = () => {
    setItemCount((prev) => {
      if (prev === 0) {
      }
      return prev + 1;
    });
  };

  const decreaseItemCount = () => {
    setItemCount((prev) => {
      const updatedCount = prev - 1;
      return updatedCount >= 0 ? updatedCount : 0;
    });
  };

  const promptLogin = () => {};
  return (
    <Fragment>
      <Collapse in={ItemCount === 0} unmountOnExit>
        <CardActions sx={{ margin: 0, padding: 0 }}>
          <Button
            size="small"
            variant="contained"
            onClick={isUser ? increaseItemCount : promptLogin}
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
      <Collapse in={ItemCount > 0} unmountOnExit>
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
    </Fragment>
  );
};

export default ItemCountControl;
