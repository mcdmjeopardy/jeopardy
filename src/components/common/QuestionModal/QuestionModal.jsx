import React, { useState } from "react";
import styles from "./QuestionModal.module.css";
import { cn } from "../../../functions/setStyles";
import Button from "../Button/Button";

const QuestionModal = ({ question, closeModal }) => {
  const [isAnswerShown, setAnswerShown] = useState(false);
  const toggleAnswer = () => {
    setAnswerShown(!isAnswerShown);
  };

  return (
    <div className={cn(styles, `${isAnswerShown && "answerShown"} container`)}>
      <div className={cn(styles, "top")}>
        <div className={cn(styles, "counter")}>100</div>
        <div className={styles.btns}>
          <Button
            content={isAnswerShown ? "Hide answer" : "Reveal answer"}
            ms="modal"
            func={toggleAnswer}
          />
          <Button content="Close" ms="modal" func={closeModal} />
        </div>
      </div>

      <div className={cn(styles, "question")}>Question</div>
      <div className={cn(styles, "line")} />
      <div className={cn(styles, "answer")}>Answer</div>
    </div>
  );
};

export default QuestionModal;
