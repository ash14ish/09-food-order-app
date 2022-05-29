import React from "react";

import classes from "./Spinner.module.css";
import icons from "../../asssets/icon.jpg";

const LoadingSpinner = () => {
  return <img src={icons} className={classes.spinner}></img>;
};

export default LoadingSpinner;
