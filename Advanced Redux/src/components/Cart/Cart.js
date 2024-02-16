import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.name} 
              quantity={item.amount}
              total={item.totalPrice}
              price={item.price} 

            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
