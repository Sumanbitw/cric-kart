import React from 'react'
import { useCart } from './cartContext'
import "./cart.css"
import {GiShoppingCart} from "react-icons/gi"


function ShowCart({item}){
    const { itemsInCart,setItemsInCart,wishList,setWishList} = useCart()
    
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
    function wishListToCart(items){
        let inCart = false
        setWishList(wishList.map(currItems => {
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
            setWishList([...wishList,{...item,quantity:1}])
        )
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
                <button  onClick={() => increaseItemQuantity(item)} style={{marginRight:"10px",padding:"3px 5px"}}>+</button>
                <span>Quantity : {item.quantity}</span>
                <button disabled={item.quantity === 1 ? true : false} onClick={() => decreaseItemQuantity(item)} style={{marginLeft:"10px",padding:"3px 5px"}}>-</button>
            </div>
            <div className="buttons">
                <button onClick={() => removeItem(item)} className="btn-primary">Remove</button>
                <button onClick={() => wishListToCart(item)} className="btn-primary">Add to wishList</button>
            </div>

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
            <h1> {(itemsInCart.length === 0) ? <div className="cart__items"><GiShoppingCart size={100} color="#3F8F74"/><p>Add items in cart</p></div> : <p>My Cart :{itemsInCart.length}</p> }</h1><br/>
            <div className="cart__header">
           {itemsInCart.map((item) => (
           <ul>
               <ShowCart item={item}/>
            </ul>
            ))}
            </div>
            {itemsInCart.length!==0 &&
            <div className="cart__checkout">
                <h1>Checkout</h1>
                <p>Price : {getPrice()}</p>
                <button onClick={() => setRoute("checkout")} className="btn-secondary">Proceed to checkout</button> 
            </div>
}
        </div>
    )
}

export default Cart
