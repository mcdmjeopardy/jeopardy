import Button from "../../common/Button/Button";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import styles from "./GameBoard.module.css";

const GameBoard = () => {
  return (
    <div className={styles.container}>
      GameBoard
      <Button mStyles="test" gStyles="test" content="Test button" />
      <CategoryColumn gs="test1 test2" />
    </div>
  );
};

export default GameBoard;
