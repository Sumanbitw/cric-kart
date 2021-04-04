import React from "react"
import { useCart } from "./cartContext"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { BiSearch} from "react-icons/bi"
import {AiOutlineHeart} from "react-icons/ai"
import "./navbar.css"

export default function Navbar (){
    const { itemsInCart,wishList,setRoute} = useCart()
    return (

        <header>
          <nav>
                <p onClick={() => setRoute("products")} className="navbar__header">Crickart</p>
    
                <input type = "text" placeholder="Search for products, brands and more"  className="navbar__input"/>
                <BiSearch className="search__icon" size={20}/>
            
              <ul>
                <li  onClick={()=>setRoute("cart")}><AiOutlineShoppingCart size={30} cursor="pointer"/><span className="cart__icon"><b> {itemsInCart.length}</b></span></li>
                <li  onClick={()=>setRoute("wishlist")}><AiOutlineHeart size={30} cursor="pointer"/><span className="cart__icon"><b>{wishList.length}</b></span></li> 
              </ul>  
          </nav>
        </header>  
        
    )
}