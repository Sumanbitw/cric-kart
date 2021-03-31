import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";
import 'font-awesome/css/font-awesome.min.css';

import App from "./App";
import { CartProvider } from "./cartContext";

setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
     <App />
    </CartProvider>
  </React.StrictMode>,
  rootElement
);
