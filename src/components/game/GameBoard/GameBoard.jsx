import Button from "../../common/Button/Button";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import QuestionTile from "../QuestionTile/QuestionTile";
import styles from "./GameBoard.module.css";

const GameBoard = () => {
  return (
    <div className={styles.container}>
      GameBoard
      <Button content="Test button" />
      <CategoryColumn gs="test1 test2" />
      <QuestionTile />
    </div>
  );
};

export default GameBoard;
