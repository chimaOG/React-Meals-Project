import { useReducer } from "react";

import CartContext from "./cart-context";


const defaultCart = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type  === "ADD"){

        const updatedTotalAmount = state.totalAmount + (action.item.amount * action.item.price);

        const existingCartitemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartitemIndex]

        let updatedItems 

        if(existingCartItem){
            

            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingCartitemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === "REMOVE"){
        const existingCartitemIndex = state.items.findIndex(item => item.id === action.id);
        const cartItem = state.items[existingCartitemIndex];
        const updatedTotalAmount = state.totalAmount - (cartItem.price);
        let newStateItems;

        if (cartItem.amount > 1){

            const newCartItem = {...cartItem, amount: cartItem.amount -1}

            newStateItems = [...state.items];
            newStateItems[existingCartitemIndex] = newCartItem;

        } else if (cartItem.amount === 1){

            newStateItems = state.items.filter(item => item.id !== action.id);
            //newStateItems.splice(existingCartitemIndex,1)

            console.log(newStateItems);
        }

        return {
            items: newStateItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === "CLEAR"){
        return defaultCart;
    }

    return defaultCart
}


const CartProvider = props => {

    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCart);

    const addItemHandler = (item) =>{
        
        dispatchCartState({
            type: "ADD",
            item: item
        })
    }

    const removeItemHandler = (id) => {
        dispatchCartState({
            type: "REMOVE",
            id: id
        })
    }

    const clearItems = () =>{
        dispatchCartState({
            type: "CLEAR",
           
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearItems: clearItems
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;