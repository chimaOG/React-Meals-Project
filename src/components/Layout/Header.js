import styles from './Header.module.css';
import mealsImage from "../../assets/App.jpeg";
import HeaderCartButton from "./HeaderCartButton";
import {Fragment} from 'react';

const Header =  props => {

    return (
        <Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onModalDisplay} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food"></img>
            </div>
        </Fragment>
    )
}


export default Header;