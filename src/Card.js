import React, { useState } from 'react'
import "./card.css"
import { useCart } from './cartContext'
import {AiOutlineHeart} from "react-icons/ai"

function Card({id,name,image,price,ratings,fastDelivery,inStock,discount, actualPrice}) {
    const {itemsInCart,setItemsInCart,wishList,setWishList,setRoute} = useCart()
    const [isAdded, setIsAdded] = useState(true)
    function addToCart(id){
        console.log("clicked")
        let inCart = false;
        setIsAdded(prev => !prev)
        setItemsInCart(itemsInCart.map(currItems => {
            if(currItems.id===id) {
                inCart = true
                return {
                    ...currItems,
                    quantity: currItems.quantity+1
                }
            }
            return currItems
        }))
        if(!inCart){
            setItemsInCart([...itemsInCart,{id,name,image,price, quantity:1}])
        }
    }

    function addToWishList(id){
        let inCart = false
        setWishList(wishList.map(currItem => {
            if(currItem.id===id){
                inCart = true
                return { 
                    ...currItem,
                    quantity: currItem.quantity + 1
                }
            }
            return currItem
        }))
        if(!inCart){
            setWishList([...wishList,{id,name,image,price,quantity:1}])
        }
    }
    return (
          <div className="card__container" key={id}>
                <img src={image} alt="" onClick={()=>setRoute("cart")}/>
            <div className="card__details">
                <p className="name">{name}</p>
                <p className="price"><span><b>₹ {price}</b></span>
                <span style={{color:"red"}}>({discount}% OFF)</span>
                
                <span style={{color:"grey",textDecoration:"line-through"}}>₹ {actualPrice}</span></p>
                
                <div className="wishList__icon"><AiOutlineHeart size={30} onClick={()=> addToWishList(id)}/></div>
                
                <div className="card__ratings"> {ratings}⭐</div>
                {inStock && <p style={{color:"orange"}}>Ony few Left! </p>}
                {!inStock && <p>Out of Stock</p>}
                <span style={{display:"inline-flex"}}>Delivery : {fastDelivery ?(<div>Fast Delivery</div>) : (<div>2 days minimum</div>)}</span>
            
                <div>{isAdded ? <button className="btn button-primary" onClick={()=>addToCart(id)}><i className="fa fa-shopping-cart"> Add to Cart </i></button> : <button className="btn button-primary" onClick={()=>setRoute("cart")}><i className="fa fa-shopping-cart"> Go to Cart </i></button>}</div> 

            </div>       
          </div>
        
    )
}
export default Card
