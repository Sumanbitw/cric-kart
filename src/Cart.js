import React from 'react'
import { useCart } from './cartContext'
import "./cart.css"


function ShowCart({item}){
    const { itemsInCart,setItemsInCart} = useCart()
    
    function increaseItemQuantity(items){
        setItemsInCart( itemsInCart.map(currItems => {
                if(currItems.id ===items.id ){
                    return {
                        ...currItems,
                        quantity : currItems.quantity + 1,
                    }
                }else {
                    return currItems
                }
            })
        )
    }
    function decreaseItemQuantity(items){
        setItemsInCart(itemsInCart.map(currItems => {
            if(currItems.id === items.id){
                return {
                    ...currItems,
                    quantity : currItems.quantity - 1,
                }
              }else{
                return currItems
            }
        }))
    }

    function removeItem(items){
        console.log(items)
        setItemsInCart(itemsInCart.filter(currItems => currItems.id !== items.id))
    }
    
    return (
        <>
        <div className="cart__container" key={item.id}>
            <div className="cart__list">
                <img src={item.image} alt="" />
                </div>
                <div className="cart__name">
                <span className="cart__item">{item.name}</span><br/>
                <span className="cart__price">
                    ₹
                <b>{item.price}</b>
            </span><br/>
            <div className="btn__qty">
                <button  onClick={() => increaseItemQuantity(item)}>+</button>
                <span>Quantity : {item.quantity}</span>
                <button disabled={item.quantity === 1 ? true : false} onClick={() => decreaseItemQuantity(item)}>-</button>
            </div>
                <button onClick={() => removeItem(item)} className="btn-primary">Remove</button>
                </div>
            </div>
        </>
    )
}
function Cart() {
    const {itemsInCart, setRoute} = useCart()
function getPrice(){
    let total = 0 ;
    itemsInCart.map(item => total = total +  parseInt(item.price) * parseInt(item.quantity))
    return total
}
    return (
        <div className="cart__products">
            <div className="cart__header">
            <h1>Cart : {(itemsInCart.length === 0) ? "Add items in cart" : itemsInCart.length}</h1>
           {itemsInCart.map((item) => (
           <ul>
               <ShowCart item={item}/>
            </ul>
            ))}
            </div>
            <div className="cart__checkout">
                <h1>Checkout</h1>
                <p>Price : {getPrice()}</p>
                <button onClick={() => setRoute("checkout")} className="btn-secondary">Proceed to checkout</button>
            </div>
        </div>
    )
}

export default Cart
