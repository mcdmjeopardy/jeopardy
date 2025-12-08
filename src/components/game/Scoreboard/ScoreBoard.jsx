import React from "react";
import styles from "./ScoreBoard.module.css";
import { cn } from "../../../functions/setStyles";

const ScoreBoard = ({ ms, gs }) => {
  return (
    <div className={cn(styles, `${ms} container`, `${gs}`)}>ScoreBoard</div>
  );
};

export default ScoreBoard;
