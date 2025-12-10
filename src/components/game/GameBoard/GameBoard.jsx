import { useState } from "react";
import { cn } from "../../../functions/setStyles";
import Button from "../../common/Button/Button";
import QuestionModal from "../../common/QuestionModal/QuestionModal";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import styles from "./GameBoard.module.css";

const GameBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tile, setTile] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
    setTile(1);
  };

  return (
    <div className={cn(styles, ``, "container")}>
      {isModalOpen ? (
        <QuestionModal question={tile} />
      ) : (
        <>
          <header>
            <h1> Jeopardy</h1>
          </header>
          <main>
            <div className={cn(styles, `columns`)}>
              {/* Temporary manual setup. It's supposed to generate a column per category from API. */}
              <CategoryColumn title="Sange" onTileClick={openModal} />
              <CategoryColumn title="Film" onTileClick={openModal} />
              <CategoryColumn title="Mad" onTileClick={openModal} />
              <CategoryColumn title="Julemand" onTileClick={openModal} />
              <CategoryColumn title="Diverse" onTileClick={openModal} />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default GameBoard;
