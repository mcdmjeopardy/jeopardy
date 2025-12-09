import React from "react";
import styles from "./QuestionTile.module.css";
import { cn } from "../../../functions/setStyles";

const QuestionTile = ({ ms }) => {
  return <div className={cn(styles, `${ms} container tilebg`, `tile`)}>100</div>;
};

export default QuestionTile;
