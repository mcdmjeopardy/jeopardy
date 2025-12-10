import React from "react";
import styles from "./QuestionTile.module.css";
import { cn } from "../../../functions/setStyles";

const QuestionTile = ({ ms, onTileClick }) => {
  return (
    <div
      className={cn(styles, `${ms} container`, `tile`)}
      onClick={onTileClick}
    >
      100
    </div>
  );
};

export default QuestionTile;
