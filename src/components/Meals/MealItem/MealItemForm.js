import {useRef, useState} from 'react';

import styles from "./MealItemForm.module.css"
import Input from "../../UI/Input" 

const MealItemForm = props => {

    const amountRef = useRef();
    const [invalidInput, setInvalidInput] = useState(false);

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = (amountRef.current.value);
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 0 || enteredAmountNumber > 5){
            setInvalidInput(true)
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }


    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <Input 
            ref={amountRef}
            label = "Amount" 
            input = {{
                id: "amount_" + props.id,
                type: "Number",
                min: "1",
                max: "5",
                step: "1",
                defaultValue: "1"
            }} />
            <button>+ Add</button>
            {invalidInput && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
}

export default MealItemForm;