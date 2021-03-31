import React, { useReducer } from 'react'
import { useEffect} from "react";
import Card from "./Card"
import axios from "axios";
import "./styles.css";
import { useCart } from './cartContext';

function ProductListing() {
    const {products,setProducts} = useCart()
    useEffect(() => {
        (async function () {
          try {
            const result = await axios.get("/api/products");
            setProducts(result.data.products);
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);

      const [{showInventoryAll,showFastDeliveryOnly,sortBy}, dispatch] = useReducer(function reducer(state,action){
        switch(action.type){
          case "TOGGLE_INVENTORY":
            return (state = {
              ...state,
              showInventoryAll : !state.showInventoryAll
            })
            case "TOGGLE_DELIVERY" :
              return (state = {
                ...state,
                showFastDeliveryOnly : !state.showFastDeliveryOnly
              })
          case "sort":
            return {
              ...state,
              sortBy : action.payload
            }
            default :
            return state
        }
      },{
        showInventoryAll : true,
        showFastDeliveryOnly: false,
        sortBy : null
      })

      function getSortedData(products,sortBy){
        if(sortBy && sortBy === "PRICE_LOW_TO_HIGH"){
          return products.sort((a,b) => a["price"] - b["price"])
        }
        if(sortBy && sortBy === "PRICE_HIGH_TO_LOW"){
          return products.sort((a,b) => b["price"] - a["price"])
        }
        return products
      }

      function getFilteredData(products , {showFastDeliveryOnly, showInventoryAll}){
        return products.filter(({fastDelivery}) => 
          showFastDeliveryOnly ? fastDelivery : true 
          )
          .filter(({inStock}) => 
          showInventoryAll ? true : inStock
          )
      }
      const sortedData = getSortedData(products,sortBy)
      const filteredData = getFilteredData(sortedData, {showFastDeliveryOnly, showInventoryAll})
    return (
        // <div className="app">
            <div className="app-component">
              <div className="page-wrap">
              <div className="app-sidebar">
                  <legend style={{borderBottom:"1px solid grey",margin :"1rem 0", paddingBottom:"1rem",fontSize:"1.6rem"}}>Sort By</legend>
                  <label style={{fontSize:"1.2rem"}}>
                    <input style={{margin:"0 1rem"}} type="radio" name="sort" checked={sortBy && sortBy ==="PRICE_LOW_TO_HIGH"} onChange={() => dispatch({type:"sort",payload:"PRICE_LOW_TO_HIGH"})}/>
                      Price - Low to High
                  </label> <br/>

                  <label style={{fontSize:"1.2rem"}}>
                    <input style={{margin: " 0 1rem"}} type="radio" name="sort" checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"} onChange={() =>dispatch({type:"sort",payload:"PRICE_HIGH_TO_LOW"})}/>
                      Price - High to Low
                  </label>
                
              
                  <legend style={{margin:"2rem 0",borderBottom:"1px solid grey",fontSize:"1.6rem", paddingBottom:"1rem"}}>Filter</legend>
                  <label style={{fontSize:"1.2rem"}}>
                    <input style={{margin : "0 1rem"}} type="checkbox" checked={showInventoryAll} onChange={() => dispatch({type:"TOGGLE_INVENTORY"})}/>
                    Include out of stock
                  </label><br/>

                 
                  <label style={{fontSize:"1.2rem",marginLeft:"-3.4rem"}}>
                    <input style={{margin:"0 1rem"}} type="checkbox" checked={showFastDeliveryOnly} onChange={() => dispatch({type:"TOGGLE_DELIVERY"})}/>
                    Fast Delivery
                  </label>
              </div>
          </div>
            <div className="app-cart">
                {filteredData.map((item) => (
                <Card 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                price={item.price}
                ratings={item.ratings}
                inStock={item.inStock}
                fastDelivery={item.fastDelivery}
                />
                  ))}
              </div>
            </div>
        // </div>
    )
}

export default ProductListing
