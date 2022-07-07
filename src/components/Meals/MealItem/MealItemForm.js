import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import React, { useRef } from "react";
import InputClasses from "../../UI/Input.module.css";

const MealItemForm = props => {
  const amountInputRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +amountInputRef.current.value;

    if (
      enteredAmount.trim().length < 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        class={InputClasses.input}
        input={{
          id: "amount_" + props.id,
          type: "Number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
