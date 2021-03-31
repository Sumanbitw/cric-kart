import React from "react"
import { useCart } from "./cartContext"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BiUserCircle, BiSearch, BiHome} from "react-icons/bi"
import {FaRegHeart} from "react-icons/fa"
import "./navbar.css"

export default function Navbar (){
    const { itemsInCart,wishList,setRoute} = useCart()
    return (
        <>
        <div className="navbar">
            <div className="navbar__header">
                <span onClick={() => setRoute("products")}>Cric-kart</span>
            </div>
            <div className="navbar__input">
                <input type = "text" placeholder="Search for products, brands and more" />
                <BiSearch className="search__icon" size={20}/>
                
            </div>
            <div className="navbar__right">
                <button style={{backgroundColor:"#FCD34D",border:"1px solid #FCD34D", outline:"none",margin:"0 1.5rem"}} onClick={()=>setRoute("products")}><BiUserCircle size={30}/><b></b></button>
                <button style={{backgroundColor:"#FCD34D",border:"1px solid #FCD34D",outline:"none",margin:"0 1.5rem"}} onClick={()=>setRoute("cart")}><AiOutlineShoppingCart size={30}/><b className="cart__length"> {itemsInCart.length}</b></button>
                <button style={{backgroundColor:"#FCD34D",border:"1px solid #FCD34D",outline:"none",margin:"0 1.5rem"}} onClick={()=>setRoute("wishlist")}><FaRegHeart size={24}/><b className="wishlist__length">{wishList.length}</b></button>   
            </div>
        </div>  
        </>
    )
}