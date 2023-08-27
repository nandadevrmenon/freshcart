import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import CheckoutPage from "scenes/checkoutPage";
import NavBar from "scenes/navbar";
import Footer from "scenes/footer";
import ShopNavbar from "scenes/shopNavbar";
import ShopHome from "scenes/shopHome";
import ShopPage from "scenes/shopPage";
import NoAccess from "scenes/NoAccessPage";
import UserCart from "scenes/userCart";
import ShopProductsPage from "scenes/shopProductsPage";
import AddNewItemPage from "scenes/addNewItemPage";
import ManageShopPage from "scenes/manageShopPage";
import ShopProfilePage from "scenes/shopProfilePage";
import OrderConfirmation from "scenes/orderConfirmation";
import CNCCheckoutPage from "scenes/cncCheckoutPage";
import UserOrdersPage from "scenes/userOrdersPage";
import HomeShopPage from "scenes/homeShopPage";
import ManageShopOrdersPage from "scenes/manageShopOrdersPage";
import DeleteCartModalProvider from "components/DeleteCartModalProvider.jsx/DeleteCartModalProvider";
import { Delete } from "@mui/icons-material";

function App() {
  const isShop = useSelector((state) => {
    return Boolean(state.shop) && Boolean(state.token);
  });

  const userId = useSelector((state) => {
    return state.user && state.user._id;
  });
  const userToken = useSelector((state) => {
    return state.token;
  });
  const cart = useSelector((state) => {
    return state.cart;
  });

  const isInitialRender = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const updateCartInDB = () => {
      clearTimeout(timeoutRef.current); // Clear the previous timeout
      timeoutRef.current = setTimeout(() => {
        const sendNewCart = async () => {
          try {
            await fetch(`http://localhost:3001/users/${userId}/updatecart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              body: JSON.stringify({ cart }),
            });
          } catch (error) {
            console.error("Error Updating the cart:", error);
          }
        };
        sendNewCart();
      }, 2000);
    };

    updateCartInDB();

    return () => {
      clearTimeout(timeoutRef.current); // Clean up the timeout when component unmounts
    };
  }, [cart]); // Add ItemCount to the dependency array

  return (
    <div className="app">
      <BrowserRouter>
        {isShop ? <ShopNavbar /> : <NavBar />}
        <Routes>
          <Route path="/protected">
            {isShop ? (
              <React.Fragment>
                <Route
                  path="/protected/:id/home"
                  element={<ShopHome />}
                ></Route>
                <Route
                  path="/protected/:id/products"
                  element={<ShopProductsPage />}
                ></Route>
                <Route
                  path="/protected/:id/addnewitem"
                  element={<AddNewItemPage />}
                ></Route>
                <Route
                  path="/protected/:id/manageShop"
                  element={<ManageShopPage />}
                ></Route>
                <Route
                  path="/protected/:id/profile"
                  element={<ShopProfilePage />}
                ></Route>
                <Route
                  path="/protected/:id/manageOrders"
                  element={<ManageShopOrdersPage />}
                />
              </React.Fragment>
            ) : (
              <Route
                path="/protected/*"
                element={<NoAccess></NoAccess>}
              ></Route>
            )}
          </Route>

          <Route
            path="/"
            element={
              <DeleteCartModalProvider>
                <HomePage />
              </DeleteCartModalProvider>
            }
          />
          <Route
            path="/shops/:id"
            element={
              <DeleteCartModalProvider>
                <ShopPage />
              </DeleteCartModalProvider>
            }
          />

          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/clickncollect" element={<CNCCheckoutPage />} />
          <Route
            path="/orderConfirmation/:id"
            element={<OrderConfirmation />}
          />
          <Route path={"/orders/:id"} element={<UserOrdersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart/:id" element={<UserCart />} />
          {/* <Route path="/shop" element={<HomeShopPage />} /> */}
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
