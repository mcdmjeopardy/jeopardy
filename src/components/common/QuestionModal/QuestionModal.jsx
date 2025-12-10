import React from "react";
import styles from "./QuestionModal.module.css";
import { cn } from "../../../functions/setStyles";

const QuestionModal = ({ ms, gs, question }) => {
  return (
    <div className={cn(styles, `${ms} container`, `${gs}`)}>QuestionModal {question}</div>
  );
};

export default QuestionModal;
