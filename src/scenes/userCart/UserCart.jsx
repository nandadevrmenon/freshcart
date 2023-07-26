import React from 'react';
import { Box, Grid, Typography, TextField, Button} from '@mui/material';
import { useSelector } from "react-redux";
import CartItem from "../../../src/components/cartItem/CartItem";

const UserCart = () => {
  const cart = useSelector((state) => state.cart);
  const itemCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

  if (Object.keys(cart).length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <Typography variant="h5">Your cart is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 14 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
          {Object.keys(cart).map((itemId) => (
        <CartItem key={itemId} item={cart[itemId]} />
      ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Have a Promo Code?
          </Typography>
          <TextField
            label="Enter code"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Typography variant="h6" gutterBottom>
            Subtotal: ${itemCount}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Delivery and Handling: \$9.99
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            margin="normal"
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserCart;

// import { useSelector } from "react-redux";
// import { Box, Typography } from "@mui/material";
// import ShopItem from "../../../src/scenes/shopPage/ShopItem";

// const UserCart = () => {
//   const cart = useSelector((state) => state.cart);

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       padding="2rem"
//     >
//       <Typography variant="h4" marginBottom="2rem">
//         Your Cart
//       </Typography>
//       {Object.keys(cart).length === 0 ? (
//         <Typography variant="h6">Your cart is empty</Typography>
//       ) : (
//         Object.keys(cart).map((itemId) => (
//           <ShopItem key={itemId} item={cart[itemId]} show={true} />
          
//         ))
//       )}
//     </Box>
//   );
// };


// export default UserCart;
