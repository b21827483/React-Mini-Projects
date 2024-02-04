import { useContext } from "react";

import classes from "./MangaItem.module.css"
import MangaItemForm from "./MangaItemForm";
import CartContext from "../../store/CartContext";

const MangaItem = (props) => {

  const cartContext = useContext(CartContext);
  
  const price = `$${props.price.toFixed(2)}` 
  
  const addToCart = amount => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  }

  return (
    <li className={classes.manga}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MangaItemForm id={props.id} onAddToCart={addToCart} />
      </div>
    </li>
  );
};

export default MangaItem;