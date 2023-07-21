import React from 'react';
import { Box, Grid, Typography, TextField, Button, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "state/auth";
import ItemCountControl from '../../components/ItemCountControl'; // Import the ItemCountControl component

const UserCart = () => {
  const dispatch = useDispatch();
//   const cart = useSelector((state) => state.auth.cart);
const cart = useSelector((state) => state.auth ? state.auth.cart : []);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box sx={{ padding: 14 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
          {cart.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', marginBottom: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="h5" variant="h5">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    ${item.price}
                  </Typography>
                </CardContent>
                <ItemCountControl productID={item.id} /> {/* Use the ItemCountControl component */}
              </Box>
            </Card>
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
            Delivery and Handling: $9.99
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
