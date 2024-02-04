import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const [bump, setBump] = useState(false);
  const ctx = useContext(CartContext);

  const buttonClasses = `${classes.button} ${bump ? classes.bump : ""}`;

  const { items } = ctx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBump(true);

    const timer = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numCartItems = items.reduce((cur, item) => cur + item.amount, 0);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
