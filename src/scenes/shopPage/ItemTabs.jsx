import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import theme from "theme";
import ShopItem from "./ShopItem";
import { useMemo } from "react";

const ItemTabs = (props) => {
  const [category, setCategory] = React.useState(0);
  const handleChange = (event, newCat) => {
    setCategory(newCat);
  };

  const cart = props.cart;
  const items = props.items;

  const itemCountArray = useMemo(() => {
    return items.map((item) => cart[item] || 0);
  }, [cart, items]);

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
          {props.categories &&
            props.categories.map((category) => (
              <Tab key={category} label={category} />
            ))}
        </Tabs>
      </Box>
      <ItemsPanel category={category}>
        {items.map((item, index) => {
          return (
            <ShopItem
              item={item}
              key={item._id}
              count={itemCountArray[index]}
              show={
                category === 0
                  ? true
                  : item.category === props.categories[category - 1]
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
