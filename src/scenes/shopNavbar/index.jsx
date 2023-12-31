import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state/site";

const ShopNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shopId = useSelector((state) => {
    return state.shop._id;
  });

  const navigateToAdminHome = () => {
    navigate(`/protected/${shopId}/home`);
  };

  const signOut = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const goToProductsPage = () => {
    navigate(`/protected/${shopId}/products`);
  };
  const goToManageOrderPage = () => {
    navigate(`/protected/${shopId}/manageOrders`);
  };
  const goToManageShopPage = () => {
    navigate(`/protected/${shopId}/manageShop`);
  };
  const goToProfilePage = () => {
    navigate(`/protected/${shopId}/profile`);
  };

  return (
    <AppBar
      sx={{
        bgcolor: theme.colors.siteGreen,
        zIndex: (uitheme) => uitheme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth={false} style={{ padding: "0 2rem" }}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "flex", md: "none" } }} alignItems="center">
            <IconButton
              aria-label="chat"
              style={{
                border: "none",
                outline: "none",
                margin: 0,
              }}
            >
              <MenuIcon sx={{ color: theme.colors.white }} />
            </IconButton>
          </Box>
          <Button
            sx={{ mr: { xs: "auto", md: "auto" }, ml: { xs: "auto", md: "0" } }}
            onClick={navigateToAdminHome}
          >
            <Typography
              variant="h4"
              letterSpacing="1px"
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "block", color: "#fff" },
                fontFamily: "League Spartan",
                letterSpacing: "-1.5px",
                textTransform: "initial !important",
              }}
            >
              FreshCart
            </Typography>
            <Typography
              variant="h4"
              letterSpacing="1px"
              sx={{
                mx: "auto",
                display: { xs: "flex", md: "none", color: "#fff" },
                fontFamily: "League Spartan",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              FC
            </Typography>
          </Button>
          <Box display="flex" gap={2}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                <Typography
                  onClick={goToProductsPage}
                  fontFamily="Poppins"
                  variant="h6"
                  sx={{ textTransform: "initial !important" }}
                >
                  Products
                </Typography>
              </Button>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                <Typography
                  fontFamily="Poppins"
                  variant="h6"
                  sx={{ textTransform: "initial !important" }}
                  onClick={goToManageShopPage}
                >
                  Manage Shop
                </Typography>
              </Button>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                <Typography
                  fontFamily="Poppins"
                  variant="h6"
                  sx={{ textTransform: "initial !important" }}
                  onClick={goToManageOrderPage}
                >
                  Manage Orders
                </Typography>
              </Button>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="chat"
                style={{
                  border: "none",
                  outline: "none",
                }}
                onClick={goToProfilePage}
              >
                <AccountCircleIcon
                  sx={{ fontSize: "40px", color: theme.colors.white }}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={signOut}
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                <Typography
                  fontFamily="Poppins"
                  variant="h6"
                  sx={{ textTransform: "initial !important" }}
                >
                  Sign Out
                </Typography>
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ShopNavbar;
