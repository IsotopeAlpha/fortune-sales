import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import HomePage from "./pages/home";
import './App.css'; 


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route element={<HomePage />} path="/home" />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
