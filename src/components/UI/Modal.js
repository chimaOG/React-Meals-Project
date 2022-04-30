import styles from "./Modal.module.css"
import {Fragment} from "react";
import ReactDOM from "react-dom";


const Backdrop = props =>{

        return(
            <div className={styles.backdrop} onClick = {props.onSelect}></div>
        )
};

const ModalOverlay = props => {
    return(
        <div className={styles.modal} onClick = {props.onSelect}> 
            <div className= {styles.content}>{props.children}</div>
        </div>
    )
}



const Modal = props =>{

    const portal = document.getElementById("overlays");
    
        return(
            <Fragment>
                {ReactDOM.createPortal(<Backdrop onSelect={props.onSelect}/>, portal)}
                {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portal)}
            </Fragment>
        )

}

export default Modal;