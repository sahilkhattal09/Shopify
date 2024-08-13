import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";

import Login from "./Pages/LogIn";
import Header from "./Components/UI/Header/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}
