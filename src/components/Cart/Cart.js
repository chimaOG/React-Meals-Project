import React, {useContext, useState } from 'react';

import styles from "./Cart.module.css";
import Modal from "../UI/Modal"
import CartItem from "../Cart/CartItem"
import CartContext from "../../store/cart-context"
import CheckOut from "./CheckOut"


const Cart = props =>{

        const [checkedOut, setIsCheckedOut] = useState(false);

        const [isSubmitting, setIsSubmitting] = useState(false);
        const [didSubmit, setDidSubmitting] = useState(false);

        const cartCtx = useContext(CartContext);

        const totalAmount =  `$${cartCtx.totalAmount.toFixed(2)}`;
        const hasItems = cartCtx.items.length > 0 ;

        const cartItemRemoveHandler = id =>{
            cartCtx.removeItem(id);
        }

        const cartItemAddHandler = item => {
            cartCtx.addItem({...item, amount:1});
        }

        const orderHandler = () =>{
            setIsCheckedOut(true);
        }

        const submitOrderHandler = async (userData) => {

            setIsSubmitting(true);
            const response = await fetch("https://react-http-c7348-default-rtdb.firebaseio.com/orders.json", {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                }),

            });

            setIsSubmitting(false);
            setDidSubmitting(true);
            cartCtx.clearItems();
        };


        const cartItems = <ul className={styles["cart-items"]}>{
            cartCtx.items.map((item => {
            return <CartItem
            key = {item.id}
            name = {item.name}
            price = {item.price}
            amount = {item.amount}
            onRemove = {cartItemRemoveHandler.bind(null, item.id)}
            onAdd = {cartItemAddHandler.bind(null, item)}

            ></CartItem>
        }))}</ul>

        const cartModalContent = <React.Fragment>{cartItems}
                    <div className={styles.total}>
                        <span>Total</span>
                        <span>{totalAmount}</span>
                    </div>
                    {checkedOut && <CheckOut onConfirm = {submitOrderHandler} onCancel = {props.onModalHide} />}

                    {
                        !checkedOut &&
                    <div className={styles.actions}>
                        <button className={styles["button--alt"]} onClick = {props.onModalHide}>Close</button>
                        {hasItems && <button className={styles.button} onClick = {orderHandler}>Order</button>}
                    </div>}
                </React.Fragment>

        const isSubmittingModalContent = <p>Sending Order Data...</p>
        const didSubmittingModalContent = <p>Successfully sent the data!</p>

    
    return (
        <Modal onSelect = {props.onModalHide}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmittingModalContent}
        </Modal>
    )
}

export default Cart;