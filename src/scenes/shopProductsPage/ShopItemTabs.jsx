import React from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import theme from "theme";
import EditableItem from "./EditableItem";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const ShopItemsTabs = (props) => {
  const [category, setCategory] = React.useState(0);
  const allItems = useSelector((state) => {
    return state.items;
  });
  const shop = useSelector((state) => {
    return state.shop;
  });
  const categories = shop.categories;

  const handleChange = (event, newCat) => {
    setCategory(newCat);
  };

  return (
    //returns all the tabs required that change the value on click
    <React.Fragment>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={category}
          onChange={handleChange}
          aria-label="item-categories"
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.colors.siteDarkGreen,
            },
          }}
          sx={{
            "& button.Mui-selected": { color: theme.colors.siteDarkGreen },
          }}
        >
          <Tab label={"All Items"}></Tab>
          {categories &&
            categories.map((category) => (
              <Tab key={category} label={category} />
            ))}
        </Tabs>
      </Box>
      {/* returns one item panel in which the shop items change based on the filters */}
      <ItemsPanel category={category}>
        {allItems.map((item, index) => {
          return (
            <EditableItem
              item={item}
              key={item._id}
              show={
                category === 0
                  ? true
                  : item.category === categories[category - 1]
              }
              changeItemInForm={props.changeItemInForm}
              updateInProgress={props.updateInProgress}
            ></EditableItem>
          );
        })}
      </ItemsPanel>
    </React.Fragment>
  );
};

export default ShopItemsTabs;

function ItemsPanel(props) {
  const { children } = props;

  return <Box sx={{ m: 5, width: "100%", marginX: "auto" }}>{children}</Box>;
}
