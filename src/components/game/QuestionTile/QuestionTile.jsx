import React from "react";
import styles from "./QuestionTile.module.css";
import { cn } from "../../../functions/setStyles";

const QuestionTile = ({ ms, gs }) => {
  return (
    <div className={cn(styles, `${ms} container`, `${gs}`)}>QuestionTile</div>
  );
};

export default QuestionTile;
