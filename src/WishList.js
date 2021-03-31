import React from 'react'
import { useCart } from './cartContext'
import "./cart.css"


function ShowWishList({item}){
    console.log({item})
    const {itemsInCart,setItemsInCart, wishList,setWishList} = useCart()
function wishListToCart(items){
    let inCart = false
    setItemsInCart(itemsInCart.map(currItems => {
        if(currItems.id === items.id){
            inCart = true
            return {
                ...currItems,
                quantity: currItems.quantity + 1
            }
        }else{
            return currItems
        }
    }))
    if(!inCart)(
        setItemsInCart([...itemsInCart,{...item,quantity:1}])
    )
}

function removeItemsFromWishList(items){
    setWishList(wishList.filter(currItems => currItems.id !== items.id))
    }
    return (
        <div>
            <div className="cart__list">
                <div>
                <img src={item.image} alt="" />
                </div>
                <div className="cart__name">
                <span className="cart__item">{item.name}</span><br/>
                <span className="cart__price">
                    ₹
                <b>{item.price}</b>
            </span><br/>
            <div className="btn__wishList">
                <button className="btn-primary" onClick={() => wishListToCart(item) } ><i className="fa fa-shopping-cart"> Add to Bag </i></button>
                <button onClick={() => removeItemsFromWishList(item)} className="btn-primary">Remove</button>
                </div>
                </div>
                </div>
        </div>
    )
}
function WishList() {
    const {wishList} = useCart()
    return (
        <div>
            <div>
            <h1>WishList : {(wishList.length) === 0 ? "WishList is empty" : (wishList.length) }</h1>
            {wishList.map(item => (
                <ul>
                    <ShowWishList item={item}/>
                </ul>
            ))}
            </div>
        </div>
    )
}

export default WishList
