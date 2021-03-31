import React from 'react'
import "./card.css"
import { useCart } from './cartContext'

const rating = {
    1: "⭐",
    2: "⭐⭐",
    3: "⭐⭐⭐",
    4: "⭐⭐⭐⭐",
    5: "⭐⭐⭐⭐⭐"
}

function Card({id,name,image,price,ratings,fastDelivery,inStock}) {
    const {itemsInCart,setItemsInCart,wishList,setWishList,setRoute} = useCart()
    function addToCart(id){
        let inCart = false;
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
        <>
        <div className="card-body" key={id}>
            <div className="card-container">
            <img src={image} alt="" onClick={()=>setRoute("cart")}/>
            <h4>{name}</h4>
            <span>
            ₹
            <b>{price}</b><br/>
            <span>{rating[ratings]}</span><br/>
            {inStock && <p>In Stock</p>}
            {!inStock && <p>Out of Stock</p>}
            {fastDelivery ? (<div>Fast Delivery</div>) : (<div>2 days minimum</div>)}
            </span>
            </div>
            <div className="button">
                <button className="btn button-primary" onClick={()=>addToCart(id)}><i className="fa fa-shopping-cart"> Add to Bag </i></button>
                <button className=" btn button-secondary" onClick={()=> addToWishList(id)}> <i className="fa fa-heart"> Wishlist </i></button>
            </div>
        </div>
        </>
    )
}
export default Card
