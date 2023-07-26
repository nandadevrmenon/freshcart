import React from "react";
import { Box, Typography } from "@mui/material";
import DiscountedPrice from "../DiscountedPrice";
import ItemCountControl from "../ItemCountControl";

const CartItem = ({ item }) => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginY="1rem"
        padding="1rem"
        border="1px solid #ccc"
        borderRadius="5px"
      >
        <Box>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">Size: {item.size}</Typography>
          <DiscountedPrice price={item.price ? item.price.toFixed(2) : 0} discount={item.discount} />
        </Box>
        <Box display="flex" alignItems="center">
          <img
            src={`http://localhost:3001/assets/${item.imagePath}`}
            alt={item.name}
            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
          />
          <ItemCountControl productID={item._id} />
        </Box>
      </Box>
    );
  };
  
  export default CartItem;