import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import CheckoutPage from "scenes/checkoutPage";
import NavBar from "scenes/navbar";
import Footer from "scenes/footer";
import { useSelector } from "react-redux";
import ShopNavbar from "scenes/shopNavbar";
import ShopHome from "scenes/shopHome";
import ShopPage from "scenes/shopPage";
import UserCart from "scenes/userCart/UserCart";

function App() {
  const isShop = useSelector((state) => {
    return Boolean(state.shop) && Boolean(state.token);
  });

  return (
    <div className="app">
      <BrowserRouter>
        {isShop ? <ShopNavbar /> : <NavBar />}
        <Routes>
          <Route path="/protected/:id/home" element={<ShopHome />} />
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile/:userId" element={<ProfilePage />}></Route>
          <Route path="/checkout/:userId" element={<CheckoutPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/shops/:id" element={<ShopPage />}></Route>
          <Route path="/cart/:id" element={<UserCart />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
