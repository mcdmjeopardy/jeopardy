import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGames } from "../../../context/GamesContext";
import { cn } from "../../../functions/setStyles";
import QuestionModal from "../../common/QuestionModal/QuestionModal";
import CategoryColumn from "../CategoryColumn/CategoryColumn";
import ScoreBoard from "../Scoreboard/ScoreBoard";
import styles from "./GameBoard.module.css";

const GameBoard = () => {
  const {
    currentGame,
    currentQuestion,
    setCurrentQuestion,
    closeQuestion
  } = useGames();

  const navigate = useNavigate();

  // If no game is selected, go back to lobby
  useEffect(() => {
    if (!currentGame) {
      navigate("/");
    }
  }, [currentGame, navigate]);

  if (!currentGame) return null;

  const handleTileClick = (categoryIndex, questionIndex) => {
    const question = currentGame.categories[categoryIndex].questions[questionIndex];
    if (!question.answered) {
      setCurrentQuestion({ categoryIndex, questionIndex, ...question });
    }
  };

  return (
    <div className={cn(styles, ``, "container")}>
      {currentQuestion ? (
        <QuestionModal question={currentQuestion} closeModal={closeQuestion} />
      ) : (
        <>
          <header>
            <h1 className={styles.gameTitle}>Christmas Jeopardy</h1>
          </header>
          <main>
            <div className={cn(styles, `columns`)}>
              {currentGame.categories.map((category, index) => (
                <CategoryColumn
                  key={index}
                  category={category}
                  onTileClick={(qIndex) => handleTileClick(index, qIndex)}
                />
              ))}
            </div>
          </main>
        </>
      )}

      <ScoreBoard ms={currentQuestion && "modal"} />
    </div>
  );
};

export default GameBoard;
