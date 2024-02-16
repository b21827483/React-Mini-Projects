import { uiSlice, uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux'
import classes from './CartButton.module.css';

const CartButton = (props) => {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cart.totalAmount}</span>
    </button>
  );
};

export default CartButton;
