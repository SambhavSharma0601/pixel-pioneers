import Login from "./Components/LoginUser/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Components/seller/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import SignUp from "./Components/LoginUser/SignUp";
import Home from "./Components/Home";
import Header from "./Components/Header";
import LogOut from "./Components/LoginUser/LogOut";
import Foooter from "./Components/Foooter";
import CreateListing from "./Components/ListingProducts/CreateListing";
import Listing from "./Components/ListingProducts/Listing";
import ProductDetail from "./Components/ListingProducts/ProductDetail";
import YourListing from "./Components/ListingProducts/YourListing";
import About from "./Components/About";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/list" element={<CreateListing />} />
            <Route path="/listing/:id" element={<ProductDetail />} />
           {/* // <Route path="/yourListing" element={<YourListing />} /> */}
            <Route path="/product-detail/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
        <Foooter />
      </BrowserRouter>
    </>
  );
}

export default App;
