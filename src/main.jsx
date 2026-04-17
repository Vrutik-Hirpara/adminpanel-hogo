import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
<<<<<<< HEAD

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <App />
=======
import { DataProvider } from "./context/DataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
>>>>>>> 887504232e7413403b246f7238ba850bb75f8c89
  </BrowserRouter>
);
