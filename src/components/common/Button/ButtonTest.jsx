import React from "react";
import styles from "./Button.module.css";
import { cx } from "../../../functions/setStyles.jsx";

const Button = (mStyles, gStyles) => {
  return (
    <div className={cx(styles, `${mStyles} container active highlight`, `${gStyles}`)}>
      Button
    </div>
  );
};

export default Button;