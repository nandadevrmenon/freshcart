import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "theme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state/site";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => {
    return Boolean(state.user) && Boolean(state.token);
  });
  const cart = useSelector((state) => {
    return state.cart;
  });
  const userID = useSelector((state) => {
    return state.user ? state.user._id : "";
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const signOut = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const goToCart = () => {
    navigate(`/cart/${userID}`);
  };

  const promptLogin = () => {};

  return (
    <AppBar
      sx={{
        bgcolor: "#44AF69",
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
            onClick={navigateToHome}
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
            {!isLoggedIn && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  onClick={navigateToLogin}
                >
                  <Typography
                    fontFamily="Poppins"
                    variant="h6"
                    sx={{ textTransform: "initial !important" }}
                  >
                    Sign In
                  </Typography>
                </Button>
              </Box>
            )}
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
                >
                  Shop
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
                >
                  Profile
                </Typography>
              </Button>
            </Box>
            {isLoggedIn && (
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
            )}

            <Box display="flex" alignItems="center">
              <IconButton
                onClick={isLoggedIn ? goToCart : promptLogin}
                aria-label="chat"
                style={{
                  border: "none",
                  outline: "none",
                }}
              >
                <Badge
                  badgeContent={Object.keys(cart).length}
                  sx={{ color: theme.colors.white }}
                >
                  <LocalMallIcon sx={{ color: theme.colors.white }} />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
