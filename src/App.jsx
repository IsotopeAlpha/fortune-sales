import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/home";
import Profile from "./pages/profile";
import OrderPage from "./pages/order";
import ProductDetails from "./pages/productDetails";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<Profile />} path="/profile" />
      <Route element={<OrderPage />} path="/checkout" />
      <Route element={<ProductDetails />} path="/product" />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
