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
        <div className={cn(styles, `columns`)}>
          {/* Temporary manual setup. It's supposed to generate a column per category from API. */}
          <CategoryColumn title="Sange" />
          <CategoryColumn title="Film" />
          <CategoryColumn title="Mad" />
          <CategoryColumn title="Julemand" />
          <CategoryColumn title="Diverse" />
        </div>
        <Button content="Test button" />
      </main>
    </div>
  );
};

export default GameBoard;
