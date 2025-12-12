import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./QuestionModal.module.css";
import { cn } from "../../../functions/setStyles";
import Button from "../Button/Button";

const QuestionModal = ({ question, closeModal }) => {
  const [isAnswerShown, setAnswerShown] = useState(false);
  const toggleAnswer = () => {
    setAnswerShown(!isAnswerShown);
  };

  const [shiftY, setShiftY] = useState(0);

  const refQuestion = useRef(null);
  const refLine = useRef(null);

  useLayoutEffect(() => {
    const getHeight = (elmt) => {
      if (!elmt) return 0;
      const css = window.getComputedStyle(elmt);
      const mt = parseFloat(css.marginTop);
      const mb = parseFloat(css.marginBottom);
      const rect = elmt.getBoundingClientRect();
      return rect.height + mt + mb;
    };
    const combineHeights = () => {
      const hQuestion = getHeight(refQuestion.current);
      const hLine = getHeight(refLine.current);
      setShiftY(hQuestion / 2 + hLine / 2);
    };

    combineHeights();
  }, []);

  return (
    <main
      className={cn(styles, `${!isAnswerShown && "answerHidden"} container`)}
    >
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

      <div className={cn(styles, "center")}>
        <div
          ref={refQuestion}
          style={{ transform: `translateY(${isAnswerShown ? 0 : shiftY}px)` }}
          className={cn(styles, "question")}
        >
          Question
        </div>
        <div ref={refLine} className={cn(styles, "line")} />
        <div className={cn(styles, "answer")}>Answer</div>
      </div>
    </main>
  );
};

export default QuestionModal;
