import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ItemImage from "./ItemImage";
import ShopLink from "./ShopLink";

const ItemCard = (props) => {
  const [showCartControls, setShowCartControls] = useState(true);
  const [ItemCount, setItemCount] = useState(0);

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
    <Card
      sx={{ minWidth: "20vw", maxWidth: "30vw", width: "25vw", height: "41vh" }}
    >
      <ItemImage path={props.item.imagePath} alt={props.item.altText} />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <CardContent sx={{ flexBasis: "0.5" }}>
          <Typography gutterBottom variant="body1" component="div">
            {props.item.name}
          </Typography>
          <ShopLink name={props.item.shopName} id={props.item.shopId} />
          {/* <Typography variant="body2" color="text.secondary">
            {props.item.shopName}
          </Typography> */}
        </CardContent>

        <CardContent sx={{ flexBasis: "0.5" }}>
          <Typography paddingX="10px" color="text.secondary" textAlign="right">
            €{props.item.price.toFixed(2)}
          </Typography>
          <Collapse in={showCartControls} unmountOnExit>
            <CardActions>
              <Button size="small" onClick={increaseItemCount}>
                add to cart
              </Button>
            </CardActions>
          </Collapse>
          <Collapse in={!showCartControls} unmountOnExit>
            <CardActions>
              <Box display="flex" alignItems="center" minWidth="2rem">
                <AddCircleIcon
                  color="black"
                  onClick={increaseItemCount}
                  sx={{ marginRight: "1.3rem", fontSize: "25px" }}
                />
                <Typography fontSize="18px" display="inline">
                  {ItemCount}
                </Typography>
                <RemoveCircleIcon
                  color="black"
                  onClick={decreaseItemCount}
                  sx={{ marginLeft: "1.3rem", fontSize: "25px" }}
                />
              </Box>
            </CardActions>
          </Collapse>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ItemCard;
