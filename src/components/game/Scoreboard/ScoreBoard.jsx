import {
  CryingIcon,
  MedalFirstPlaceIcon,
  MedalSecondPlaceIcon,
  MedalThirdPlaceIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "../../../functions/setStyles";
import styles from "./ScoreBoard.module.css";

import { Check, X } from "lucide-react";
import { useGames } from "../../../context/GamesContext";
import { useTeams } from "../../../context/TeamsContext";
import { AVATAR_MAP } from "../../../utils/avatarMap";

const ScoreBoard = ({ ms }) => {
  const { teams, addScore, subtractScore } = useTeams();
  const { currentQuestion, markQuestionAnswered, closeQuestion } = useGames();

  // Sort teams by score for ranking
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const getRankIcon = (teamId) => {
    // If all teams have 0 points, don't show any ranks
    if (teams.every(t => t.score === 0)) return null;

    const index = sortedTeams.findIndex(t => t._id === teamId);
    if (index === 0) return <HugeiconsIcon icon={MedalFirstPlaceIcon} size={40} color="#f0c435" strokeWidth={1.5} />;
    if (index === 1) return <HugeiconsIcon icon={MedalSecondPlaceIcon} size={40} color="#bababaff" strokeWidth={1.5} />;
    if (index === 2) return <HugeiconsIcon icon={MedalThirdPlaceIcon} size={40} color="#cc7d16ff" strokeWidth={1.5} />;
    if (index === sortedTeams.length - 1 && sortedTeams.length > 3) return <HugeiconsIcon icon={CryingIcon} size={24} color="#fa0a1a" strokeWidth={1.5} />;
    return null;
  };

  const handleCorrect = async (teamId) => {
    if (!currentQuestion) return;
    await addScore(teamId, currentQuestion.value);
    await markQuestionAnswered(currentQuestion.categoryIndex, currentQuestion.questionIndex);
    closeQuestion();
  };

  const handleIncorrect = async (teamId) => {
     if (!currentQuestion) return;
     await subtractScore(teamId, currentQuestion.value);
  };

  return (
    <div className={cn(styles, `${ms} container`)}>
      {teams.map((team) => (
        <div key={team._id} className={cn(styles, `teamcard`)}>
          <img
            src={AVATAR_MAP[team.avatar] || AVATAR_MAP.default}
            className={cn(styles, `avatar`)}
            alt={team.name}
          />
          <div className={cn(styles, `icon`)}>
            {getRankIcon(team._id)}
          </div>
          <div className={cn(styles, `names`)}>
            <h3>{team.name}</h3>
          </div>
          <div className={cn(styles, `score`)}>
            <h3>{team.score}</h3>
          </div>

          {/* Show controls only if modal is open (question active) */}
          {ms && currentQuestion && (
            <div className={styles.buttons}>
              <button className={styles.button} onClick={() => handleCorrect(team._id)}>
                <Check />
              </button>
              <button className={styles.button} onClick={() => handleIncorrect(team._id)}>
                <X />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
