import React from "react";
import Cart from "./Cart"
import Navbar from "./Navbar"
import Checkout from "./Checkout"
import "./styles.css";
import ProductListing from "./ProductListing";
import WishList from "./WishList"
import { useCart } from "./cartContext";


export default function App() {
  const {route} = useCart()
  return (
    <div className="app">
        <Navbar />
        <div className="app__body">
        {route==="cart" && <Cart/>}
        {route==="products" && <ProductListing/>}
        {route==="wishlist" && <WishList/>}
        {route==="checkout" && <Checkout/>}
        </div>
    </div>
  );

}
