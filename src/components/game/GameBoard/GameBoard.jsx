import { useState } from "react";
import { cn } from "../../../functions/setStyles";
import QuestionModal from "../../common/QuestionModal/QuestionModal";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import styles from "./GameBoard.module.css";
import ScoreBoard from "../Scoreboard/ScoreBoard";

const GameBoard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tile, setTile] = useState(0);

  const openModal = () => {
    setModalOpen(true);
    setTile(1); // test idea to set a variable to the tile's question ID
  };

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={cn(styles, ``, "container")}>
      {isModalOpen ? (
        <QuestionModal question={tile} closeModal={closeModal} />
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

      <ScoreBoard />
    </div>
  );
};

export default GameBoard;
