
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, List, ListItem, ListItemText, Typography } from "@mui/material";

const UserCart = () => {
    const cartItems = useSelector((state) => state.cartItems);
    const totalPrice = useSelector((state) => state.totalPrice);

    return (
        <Container maxWidth={false} style={{ padding: "0 2rem" }}>
            <Typography variant="h4">Your Shopping Cart</Typography>
            <List>
                {cartItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={item.name}
                            secondary={`Price: $${item.price}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6">Total Price: ${totalPrice}</Typography>
        </Container>
    );
};

export default UserCart;
=======
import { Box, Typography } from "@mui/material";

const UserCart = () => {
  return (
    <Box marginTop="5rem">
      <Typography variant="h1" fontWeight="500" fontFamily="Poppins">
        This is the cart page{" "}
      </Typography>
    </Box>
  );
};
export default UserCart;

