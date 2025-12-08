import { cn } from "../../../functions/setStyles";
import Button from "../../common/Button/Button";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import styles from "./GameBoard.module.css";

const GameBoard = () => {
  return (
    <div className={cn(styles, ``, "container")}>
      <header>
        <h1> GameBoard</h1>
      </header>
      <aside>
        <h2>subtitle</h2>
        <Button content="Click me" />
      </aside>
      <main>
        <h2>subtitle</h2>
        <CategoryColumn gs="test1 test2" />
        <Button content="Test button" />
      </main>
    </div>
  );
};

export default GameBoard;
