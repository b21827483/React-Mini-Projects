import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setCheckout] = useState(false);
  const [waitingSubmit, setWaitingSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const addItemToCart = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const removeItemFromCart = (id) => {
    cartContext.removeItem(id);
  };

  const clearCart = () => {
    cartContext.clearCart();
  };

  const orderCheckoutForm = () => {
    setCheckout(true);
  };

  const confirmSubmittedForm = async (userInfo) => {
    setWaitingSubmit(true);
    // const {name, email, address, creditNu} = form;
    await fetch(
      "https://custom-hook-ea362-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userInfo, items: cartContext.items }),
      }
    );

    setWaitingSubmit(false);
    setDidSubmit(true);
    clearCart();
  };

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

  const cartModal = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.hideCart}>
            Close
          </button>
          {cartContext.items.length > 0 && (
            <button className={classes.button} onClick={orderCheckoutForm}>
              Order
            </button>
          )}
        </div>
      )}
      {isCheckout && (
        <Checkout onConfirm={confirmSubmittedForm} hideForm={props.hideCart} />
      )}
    </Fragment>
  );

  const waitingModal = <p>Your purchase is getting sended, please wait.</p>;

  const submittedModal = (
    <Fragment>
      <p>Your purchase is successful.</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {!didSubmit && !waitingSubmit && cartModal}
      {waitingSubmit && !didSubmit && waitingModal}
      {!waitingSubmit && didSubmit && submittedModal}
    </Modal>
  );
};

export default Cart;
