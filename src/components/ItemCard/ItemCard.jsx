import { Card, Typography, CardContent, Box } from "@mui/material";
import ItemImage from "./ItemImage";
import ShopLink from "./ShopLink";
import DiscountedPrice from "components/DiscountedPrice";
import ItemCountControl from "components/ItemCountControl";

const ItemCard = (props) => {
  return (
    <Card
      sx={{
        minWidth: "20vw",
        maxWidth: "30vw",
        width: "25vw",
        height: "94%",
        minHeight: "fit-content",
        marginBottom: "1rem",
      }}
    >
      <ItemImage path={props.item.imagePath} alt={props.item.altText} />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <CardContent sx={{ flexBasis: "0.5" }}>
          <Typography gutterBottom variant="body1" component="div">
            {props.item.name}
          </Typography>
          <ShopLink name={props.item.shopName} id={props.item.shopId} />
        </CardContent>
        <CardContent sx={{ flexBasis: "0.5" }}>
          <DiscountedPrice
            price={props.item.price.toFixed(2)}
            discount={props.item.discount}
          />
          <ItemCountControl
            productID={props.item._id}
            shopId={props.item.shopId}
          ></ItemCountControl>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ItemCard;
