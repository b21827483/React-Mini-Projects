import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Mangas from "./components/Mangas/Mangas";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const [isCartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  }

  const hideCartHandler = () => {
    setCartShown(false); 
  }

  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} />
      {isCartShown && <Cart hideCart={hideCartHandler} />}
      <main>
        <Mangas></Mangas>
      </main>
    </CartProvider>
  );
}

export default App;
