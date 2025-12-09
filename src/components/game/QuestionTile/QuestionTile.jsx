import React from "react";
import styles from "./QuestionTile.module.css";
import { cn } from "../../../functions/setStyles";

const QuestionTile = ({ ms }) => {

  

  const clickEvent = () => {

  }

  return (
    <div className={cn(styles, `${ms} container`, `tile`)} onClick={clickEvent}>100</div>
  );
};

export default QuestionTile;
