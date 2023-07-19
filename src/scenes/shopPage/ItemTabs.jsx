import * as React from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import theme from "theme";
import ShopItem from "./ShopItem";

const ItemTabs = (props) => {
  const [category, setCategory] = React.useState(0);
  const handleChange = (event, newCat) => {
    setCategory(newCat);
  };
  const cart = useSelector((state) => {
    return state.cart;
  });
  const items = props.items;
  const categories = props.categories;
  return (
    //returns all the tabs required that change the value on click
    <Box sx={{ width: "100%" }}>
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
        {items.map((item, index) => {
          return (
            <ShopItem
              item={item}
              key={item._id}
              show={
                category === 0
                  ? true
                  : item.category === categories[category - 1]
              }
            ></ShopItem>
          );
        })}
      </ItemsPanel>
    </Box>
  );
};

export default ItemTabs;

function ItemsPanel(props) {
  const { children } = props;

  return <Box sx={{ m: 5, width: "100%", marginX: "auto" }}>{children}</Box>;
}
