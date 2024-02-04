import { useReducer } from "react";
import CartContext from "./CartContext";
import { act } from "react-dom/test-utils";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newTotalAmount =
      state.totalAmount + (action.item.amount * action.item.price);

    const itemIndexInCart = state.items.findIndex(item => 
      item.id === action.item.id
    );
    let newItems;

    if (itemIndexInCart >= 0) {
      const updatedItem = {
        ...state.items[itemIndexInCart],
        amount: state.items[itemIndexInCart].amount + action.item.amount
      };
      newItems = [...state.items ];
      newItems[itemIndexInCart] = updatedItem;
    } else {
      newItems = state.items.concat(action.item);
    }

    return {
      items: newItems,
      totalAmount: newTotalAmount,
    };
  }
  if (action.type ==="REMOVE_ITEM") {

    const indexOfDeletedItem = state.items.findIndex(item => item.id === action.id);
    const deletedItem = state.items[indexOfDeletedItem];

    const newTotalAmount =
      state.totalAmount - deletedItem.price;
    
    let newItems;

    if (deletedItem.amount === 1) {
      newItems = state.items.filter(item => item.id !== deletedItem.id);

    } else {
      const newItem = {
        ...deletedItem,
        amount: deletedItem.amount - 1
      }
      newItems = [...state.items];
      newItems[indexOfDeletedItem] = newItem;
    }

    return {
      items: newItems,
      totalAmount: newTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
