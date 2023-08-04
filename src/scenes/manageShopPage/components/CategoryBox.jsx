import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "theme";
import DeleteIcon from "@mui/icons-material/Delete";
const CategoryBox = (props) => {
  const { name } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginX="2rem"
      marginY="1rem"
      paddingY="1rem"
      paddingX="2rem"
      sx={{
        backgroundColor: theme.colors.siteGreen,
        opacity: 0.8,
        borderRadius: "12px",
      }}
    >
      <Typography variant="body" color={theme.colors.white}>
        {name}
      </Typography>
      <DeleteIcon sx={{ marginLeft: "1rem" }}></DeleteIcon>
    </Box>
  );
};

export default CategoryBox;
