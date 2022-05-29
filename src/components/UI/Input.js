import React from "react";

// instead of this we can also simply access the props as refs sent by the parent

const Input = React.forwardRef((props, myRef) => {
  return (
    <div className={props.class}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={myRef} {...props.input} />
    </div>
  );
});

export default Input;
