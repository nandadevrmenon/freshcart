import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import theme from "theme";
import CategoryBox from "./components/CategoryBox";

const EditCategories = (props) => {
  const categories = useSelector((state) => {
    return state.shop.categories;
  });

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        fontFamily="Poppins"
        paddingY="1rem"
        color={theme.colors.siteDarkGreen}
        borderBottom={`1px solid ${theme.colors.borderGray}`}
      >
        Product Categories
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="start"
        flexDirection={{ sm: "column", md: "row" }}
      >
        {categories.map((cat) => {
          return <CategoryBox name={cat} />;
        })}
      </Box>
    </React.Fragment>
  );
};

export default EditCategories;
