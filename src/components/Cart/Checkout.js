import React, { useState, useRef } from "react";
import classes from "./Checkout.module.css";
import Input from "../UI/Input";

const Checkout = props => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = value => value.trim() === "";
  const isSixChars = value => value.trim().length === 6;

  const confirmHandler = event => {
    event.preventDefault();

    const nameEntry = nameInputRef.current.value;
    const streetEntry = streetInputRef.current.value;
    const postalCodeEntry = postalCodeInputRef.current.value;
    const cityEntry = cityInputRef.current.value;

    const validName = !isEmpty(nameEntry);
    const validStreet = !isEmpty(streetEntry);
    const validCity = !isEmpty(cityEntry);
    const validPostalCode = isSixChars(postalCodeEntry);

    setInputValidity({
      name: validName,
      street: validStreet,
      city: validCity,
      postalCode: validPostalCode,
    });

    const formIsValid =
      validName && validStreet && validCity && validPostalCode;

    if (!formIsValid) {
      return;
    }

    props.onOrder({
      name: nameEntry,
      street: streetEntry,
      postalCode: postalCodeEntry,
      city: cityEntry,
    });

    // props.onCancel();
  };

  const nameClass = `${classes.control} ${
    inputValidity.name ? "" : classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    inputValidity.street ? "" : classes.invalid
  }`;
  const postalCodeClass = `${classes.control} ${
    inputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    inputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <Input
        label="Your Name"
        class={nameClass}
        input={{ id: "name", type: "text" }}
        ref={nameInputRef}
      />
      {!inputValidity.name && <p>Please enter a valid name</p>}

      <Input
        label="Street"
        class={streetClass}
        input={{ id: "street", type: "text" }}
        ref={streetInputRef}
      />
      {!inputValidity.street && <p>Please enter a valid street</p>}

      <Input
        label="Postal Code"
        class={postalCodeClass}
        input={{ id: "postal", type: "text" }}
        ref={postalCodeInputRef}
      />
      {!inputValidity.postalCode && (
        <p>Please enter a valid postal code (6 digits)</p>
      )}

      <Input
        label="City"
        class={cityClass}
        input={{ id: "city", type: "text" }}
        ref={cityInputRef}
      />
      {!inputValidity.city && <p>Please enter a valid city</p>}

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
