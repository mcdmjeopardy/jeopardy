import React from "react";
import styles from "./SnowLayout.module.css";
import { cn } from "../../../functions/setStyles";

const SnowLayout = ({ ms = "", gs = "" }) => {
  return (
    <div className={cn(styles, `${ms} container`, `${gs}`)}>SnowLayout</div>
  );
};

export default SnowLayout;
