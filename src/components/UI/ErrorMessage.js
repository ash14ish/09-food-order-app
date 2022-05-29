import React from "react";

import classes from "./ErrorMessage.module.css";
import icon from "../../asssets/icon.png";

const Error = props => {
  console.log(props.message);
  return (
    <div className="error-container">
      <img src={icon} className={classes.error}></img>
      <div className={classes.message}>{props.message}</div>
    </div>
  );
};

export default Error;
