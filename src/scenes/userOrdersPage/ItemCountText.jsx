import React from "react";
import { Typography } from "@mui/material";
import theme from "theme";

const ItemCountText = ({ itemList }) => {
  return itemList.map((item, index) => {
    return (
      <React.Fragment key={item._id}>
        <Typography
          variant="body"
          fontFamily="Poppins"
          fontWeight="400"
          display="inline"
          sx={{ marginBottom: "0.8rem" }}
          color={theme.colors.blackGreen}
        >
          {item.name.toUpperCase()}
        </Typography>
        <Typography
          variant="body"
          fontFamily="Poppins"
          fontWeight="400"
          display="inline"
          sx={{ marginBottom: "0.8rem" }}
          color={theme.colors.darkGrey}
        >
          {" x "}
        </Typography>
        <Typography
          variant="body"
          fontFamily="Poppins"
          fontWeight="400"
          display="inline"
          sx={{ marginBottom: "0.8rem" }}
          color={theme.colors.blackGreen}
        >
          {index === itemList.length - 1 ? item.count : item.count + ", "}
        </Typography>
      </React.Fragment>
    );
  });
};

export default ItemCountText;
