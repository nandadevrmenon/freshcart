import { CardMedia } from "@mui/material";

const ItemImage = (props) => {
  return (
    <CardMedia
      component="img"
      sx={{ height: "220px", objectFit: "cover" }}
      image={`http://localhost:3001/assets/${props.path}`}
      title={props.alt}
    />
  );
};

export default ItemImage;
