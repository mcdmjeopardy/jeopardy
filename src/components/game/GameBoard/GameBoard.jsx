import { cn } from "../../../functions/setStyles";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import styles from "./GameBoard.module.css";

const GameBoard = () => {
  return (
    <div className={cn(styles, ``, "container")}>
      <header>
        <h1> Jeopardy</h1>
      </header>
      <main>
        <div className={cn(styles, `columns`)}>
          {/* Temporary manual setup. It's supposed to generate a column per category from API. */}
          <CategoryColumn title="Sange" />
          <CategoryColumn title="Film" />
          <CategoryColumn title="Mad" />
          <CategoryColumn title="Julemand" />
          <CategoryColumn title="Diverse" />
        </div>
      </main>
    </div>
  );
};

export default GameBoard;
