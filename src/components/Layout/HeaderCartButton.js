import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);
  const [isBtnBumping, setIsBtnBumping] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const bumpClass = `${classes.button} ${isBtnBumping ? classes.bump : ""}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    const timer = setIsBtnBumping(true);
    setTimeout(() => setIsBtnBumping(false), 300);

    return clearTimeout(timer);
  }, [cartCtx.items]);

  return (
    <button onClick={props.onClick} className={bumpClass}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.text}>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
