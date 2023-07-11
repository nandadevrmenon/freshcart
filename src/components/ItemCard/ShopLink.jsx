import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShopLink = (props) => {
  const navigate = useNavigate();

  const gotoShopPage = () => {
    navigate(`/shops/${props.id}`);
  };

  return (
    <Typography
      onClick={gotoShopPage}
      variant="body2"
      color="text.secondary"
      display="inline-block"
      sx={{ textDecoration: "underline", ":hover": { cursor: "pointer" } }}
    >
      {props.name}
    </Typography>
  );
};

export default ShopLink;
