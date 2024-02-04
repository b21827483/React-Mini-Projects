import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const addItemToCart = item => {
    cartContext.addItem({...item, amount: 1});
  }

  const removeItemFromCart = id => {
    cartContext.removeItem(id);
  }


  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((manga) => (
        <CartItem
          key={manga.id}
          name={manga.name}
          amount={manga.amount}
          price={manga.price}
          onRemove={removeItemFromCart.bind(null, manga.id)}
          onAdd={addItemToCart.bind(null, manga)}
        />
      ))}
    </ul>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
        {cartContext.items.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
