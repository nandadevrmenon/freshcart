import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/buttons/PrimaryButton";
import StarsIcon from "@mui/icons-material/Stars";
import theme from "theme";
import { useNavigate } from "react-router-dom";

const PopularStore = (props) => {
  const { shop } = props;
  const navigate = useNavigate();

  const goToShopPage = () => {
    navigate(`/shops/${shop._id}`);
  };

  let categoryString = "";
  for (let i = 0; i < shop.categories.length; i++) {
    let category =
      shop.categories[i].charAt(0).toUpperCase() + shop.categories[i].slice(1);
    categoryString += category + " ";
  }

  let clickncollect = shop.cnc;
  let nextDayDelivery = shop.ndd;
  let delivery = shop.delivery;

  return (
    <Box
      height="30rem"
      display="grid"
      gridTemplateColumns="repeat(3,minmax(0,1fr))"
      gap="10px"
    >
      <Box gridColumn={"span 2"}>
        <Typography
          margin={0}
          marginTop="8px"
          variant="h4"
          fontFamily="Poppins"
          fontWeight="400"
          color={theme.colors.darkGrey}
        >
          {shop.name}
        </Typography>
        <Box display="flex" alignItems="center" marginBottom="0.5rem">
          <StarsIcon
            sx={{ mr: "0.7rem", color: "#F1D30B", fontSize: "27px" }}
          ></StarsIcon>
          <Typography
            display="inline-block"
            variant="body"
            fontFamily="Poppins"
            fontWeight="500"
            color={theme.colors.darkGrey}
          >
            {shop.rating + "/5"}
          </Typography>
          <Typography
            marginLeft="12px"
            display="inline"
            variant="body2"
            fontFamily="Poppins"
            fontWeight="500"
            color={theme.colors.grey}
          >
            {"(" + shop.ratingCount + ")"}
          </Typography>
        </Box>
        <Typography
          margin={0}
          variant="body1"
          fontFamily="Poppins"
          fontWeight="400"
          color={theme.colors.grey}
        >
          {categoryString}
        </Typography>
        <Box
          marginY="5px"
          paddingY="0.4rem"
          sx={{
            borderTop: "1px solid #f2f2f2",
            borderBottom: "1px solid #f2f2f2",
          }}
        >
          <Typography
            variant="body"
            fontFamily="Poppins"
            fontWeight="500"
            color={theme.colors.darkGrey}
            display="inline"
          >
            {"| "}
          </Typography>
          {clickncollect && (
            <Typography
              variant="body"
              fontFamily="Poppins"
              fontWeight="500"
              color={theme.colors.darkGrey}
              display="inline"
            >
              {"Click And Collect "}
            </Typography>
          )}
          {delivery && !nextDayDelivery && (
            <Typography
              variant="body"
              fontFamily="Poppins"
              fontWeight="500"
              color={theme.colors.darkGrey}
              display="inline"
            >
              {"| Delivery "}
            </Typography>
          )}
          {nextDayDelivery && (
            <Typography
              variant="body"
              fontFamily="Poppins"
              fontWeight="500"
              color={theme.colors.darkGrey}
              display="inline"
            >
              {"| Next Day Delivery "}
            </Typography>
          )}
          <Typography
            variant="body"
            fontFamily="Poppins"
            fontWeight="500"
            color={theme.colors.darkGrey}
            display="inline"
          >
            {"|"}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "7px" }}>
          <PrimaryButton onClick={goToShopPage} invert={true}>
            Shop Here
          </PrimaryButton>
        </Box>
      </Box>
      <Box
        marginY="0.7rem"
        sx={{
          gridColumn: "span 1",
          backgroundImage: `url("http://localhost:3001/assets/${shop.bannerPath}")`,
          backgroundRepeat: "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { sm: "9rem", md: "12rem" },
          borderRadius: "12px",
        }}
        alt="The house from the offer."
        src=""
      ></Box>
    </Box>
  );
};

export default PopularStore;
