import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import LoadingSpinner from "../UI/Spinner";
import OrderPlacedIcon from "../../asssets/food-cart.png";
import EmptyCartIcon from "../../asssets/empty-cart.png";

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${+cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const userDataHandler = userData => {
    setIsSubmitting(true);

    fetch("https://foodifite-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
    });

    setTimeout(() => {
      setIsSubmitting(false);
      cartCtx.clearCart();
    }, 2000);

    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => {
            cartItemRemoveHandler(item.id);
          }}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(!isCheckout);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!hasItems && (
        <>
          <img src={EmptyCartIcon} className={classes["empty-cart"]} />
          <div className={classes.message}>Cart is empty</div>
        </>
      )}
      {isCheckout && (
        <Checkout onOrder={userDataHandler} onCancel={orderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingLoader = (
    <>
      <LoadingSpinner />
      <p className={classes.message}>Confirming Order</p>
    </>
  );

  const checkoutMessage = (
    <>
      <span className={classes.success}>
        <img
          src={OrderPlacedIcon}
          alt="Empty-Cart"
          className={classes["order-icon"]}
        />
        <p>Order Placed.</p>
      </span>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingLoader}
      {!isSubmitting && didSubmit && checkoutMessage}
    </Modal>
  );
};

export default Cart;
