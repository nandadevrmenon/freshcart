
import React from 'react';
import { Box, Grid, Typography, TextField, Button, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const UserCart = () => {
  const items = [
    // Add your items here
    { id: 1, name: 'Demo Item', quantity: 1, price: 19.99, image: 'demo-item.jpg' },
    { id: 1, name: 'Demo Item', quantity: 1, price: 19.99, image: 'demo-item.jpg' },
  ];

  return (
    <Box sx={{ padding: 14 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map((item, index) => (
            <Card sx={{ display: 'flex', marginBottom: 2 }} key={index}>
              <CardMedia
                component="img"
                sx={{ width: 160 }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="h5" variant="h5">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    ${item.price}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 1, paddingBottom: 1 }}>
                  <IconButton aria-label="remove">
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton aria-label="add">
                    <AddIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Box>
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
            Subtotal: $59.97
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
