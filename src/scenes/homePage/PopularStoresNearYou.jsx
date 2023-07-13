import { Box, Typography, Button } from "@mui/material";
import { Fragment } from "react";
import theme from "theme";

const PopularStoresNearYou = () => {
  return (
    <Fragment>
      <Box paddingTop="2rem" paddingX="5rem">
        <Typography
          pb="0.5rem"
          mb="1.5rem"
          variant="h4"
          fontFamily="Poppins"
          fontWeight="400"
          color={theme.colors.siteGreen}
          borderBottom="solid 1px #EEE9E9"
        >
          Popular Stores Near You
        </Typography>
      </Box>
      <Box
        mx="auto"
        width="87%"
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(2,minmax(0,1fr))"
      >
        <Box
          height="30rem"
          display="grid"
          gap="15px"
          gridColumn="span 1"
          gridRow="span 1"
          gridTemplateColumns="repeat(7,minmax(0,1fr))"
          gridTemplateRows="repeat(5,minmax(0,1fr))"
        >
          <Box
            sx={{
              gridColumn: "1/8",
              gridRow: "1/3",
              backgroundImage: `url("http://localhost:3001/assets/tonicwater.jpg")`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            alt="The house from the offer."
            src=""
          ></Box>
          <Box sx={{ gridColumn: "1/8", gridRow: "3/5" }}>
            <Typography
              margin={0}
              variant="h4"
              fontFamily="Poppins"
              fontWeight="400"
              color={theme.colors.darkGrey}
            >
              {" "}
              Dunnes Store
            </Typography>
            <Typography
              margin={0}
              variant="body1"
              fontFamily="Poppins"
              fontWeight="400"
              color={theme.colors.grey}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque ducimus voluptatem so
            </Typography>
            <Typography
              marginY="5px"
              paddingY="0.4rem"
              variant="body"
              fontFamily="Poppins"
              fontWeight="500"
              color={theme.colors.grey}
              sx={{
                borderTop: "1px solid #0E0E0E",
                borderBottom: "1px solid #0E0E0E",
              }}
              display="block"
            >
              Click And Collect Available | Next Day Delivery Available
            </Typography>
          </Box>
          <Box sx={{ gridColumn: "span 8", gridRow: "5/6" }}>
            <Button>Hello</Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default PopularStoresNearYou;
