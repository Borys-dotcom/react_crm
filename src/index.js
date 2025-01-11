import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router";
import reportWebVitals from "./reportWebVitals";
import Customers from "./views/Customers"
import SingleCustomer from "./views/SingleCustomer";
import HandleCustomer from "./views/HandleCustomer";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/customer/:id" element={<SingleCustomer />} />
        <Route path="/edit/:id" element={<HandleCustomer />} />
        <Route path="/add/" element={<HandleCustomer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
