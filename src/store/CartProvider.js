import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItem = state.items?.find(
      item => item.id === action.item.id
    );

    let updatedItems;

    if (!existingCartItem) {
      updatedItems = state.items.concat(action.item);
    } else {
      updatedItems = state.items.map(item => {
        if (item.id === existingCartItem.id) {
          return {
            ...item,
            amount: item.amount + action.item.amount,
          };
        } else return { ...item };
      });
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const existingCartItem = state.items?.find(item => item.id === action.id);

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => {
        return item.id !== action.id;
      });
    } else {
      updatedItems = state.items.map(item => {
        if (item.id === existingCartItem.id) {
          return {
            ...item,
            amount: existingCartItem.amount - 1,
          };
        } else return { ...item };
      });
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartContextProvider = props => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = item => {
    dispatchCartState({ type: "ADD", item });
  };

  const removeItemHandler = id => {
    dispatchCartState({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCartState({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
