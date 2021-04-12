import React  from "react"
import { createContext, useContext,useState } from "react";

export const CartContext = createContext()

export function CartProvider({children}){
    const [itemsInCart , setItemsInCart] = useState([])
    const [route,setRoute] = useState("products")
    const [wishList,setWishList] = useState([])
    const [products,setProducts] = useState([])

 
    return (
        <>
        <CartContext.Provider 
        value={{
            itemsInCart,
            setItemsInCart,
            products,
            wishList,
            setWishList,
            setProducts,
            route,
            setRoute
            }}
            >
            {children}
        </CartContext.Provider>
        </>
    )
}

export function useCart(){
    return useContext(CartContext)
}