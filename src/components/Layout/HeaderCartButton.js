import {useContext, useEffect, useState} from 'react';

import CartContext from "../../store/cart-context"

import CartIcon from "../Cart/CartIcon"
import styles from "./HeaderCartButton.module.css"


const HeaderCartButton = props =>{
    const [btnAnimation, setBtnAnimation] = useState(false);

    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const numCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    const btnClasses = `${styles.button} ${btnAnimation? styles.bump : ""}`;
    

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnAnimation(true);

        const timer = setTimeout(() => {setBtnAnimation(false)},300);

        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return(
        <button className={btnClasses} onClick={props.onClick}> 
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;