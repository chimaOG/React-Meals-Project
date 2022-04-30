import { useState} from "react";

import CartProvider from "./store/CartProvider"
import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals"
import Cart from "./components/Cart/Cart"


function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCart = () =>{
    setCartIsShown(true);
    console.log("Gimme a Modal");
  }

  const hideCart = () => {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
        {cartIsShown && <Cart onModalHide = {hideCart}/>}
        <Header onModalDisplay = {showCart}></Header>
        <main>
          <Meals />
        </main>
    </CartProvider>
  );
}

export default App;
