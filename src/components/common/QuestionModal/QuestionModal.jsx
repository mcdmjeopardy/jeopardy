import React from "react";
import styles from "./QuestionModal.module.css";
import { cn } from "../../../functions/setStyles";

const QuestionModal = ({ ms, gs, question }) => {
  return (
    <div className={cn(styles, `${ms} container`, `${gs}`)}>
      <div className={cn(styles, "counter")}>100</div>
      <div className={cn(styles, "question")}>Question</div>
      <div className={cn(styles, "line")} />
      <div className={cn(styles, "answer")}>Answer</div>
    </div>
  );
};

export default QuestionModal;
