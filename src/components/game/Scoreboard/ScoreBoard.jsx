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

import { useEffect, useRef, useState } from "react";
import grinchImg from "../../../assets/images/grinch.webp";

const ScoreBoard = ({ ms }) => {
  const { teams, addScore, subtractScore, getAvatarUrl } = useTeams();
  const { currentQuestion, markQuestionAnswered, closeQuestion } = useGames();

  const [getGrinchActive, setGrinchActive] = useState(false);
  const grinchTimeoutRef = useRef(null);
  const [getFlashActive, setFlashActive] = useState(false);
  const flashTimeoutRef = useRef(null);

  // Sort teams by score for ranking
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const getRankIcon = (teamId) => {
    // If all teams have 0 points, don't show any ranks
    if (teams.every((t) => t.score === 0)) return null;

    const index = sortedTeams.findIndex((t) => t._id === teamId);
    if (index === 0)
      return (
        <HugeiconsIcon
          icon={MedalFirstPlaceIcon}
          size={40}
          color="#f0c435"
          strokeWidth={1.5}
        />
      );
    if (index === 1)
      return (
        <HugeiconsIcon
          icon={MedalSecondPlaceIcon}
          size={40}
          color="#bababaff"
          strokeWidth={1.5}
        />
      );
    if (index === 2)
      return (
        <HugeiconsIcon
          icon={MedalThirdPlaceIcon}
          size={40}
          color="#cc7d16ff"
          strokeWidth={1.5}
        />
      );
    if (index === sortedTeams.length - 1 && sortedTeams.length > 3)
      return (
        <HugeiconsIcon
          icon={CryingIcon}
          size={24}
          color="#fa0a1a"
          strokeWidth={1.5}
        />
      );
    return null;
  };

  // Grinch function
  const startGrinch = () => {

    // Start flash.
    startFlash()

    // Reset current Grinch.
    setGrinchActive(false);
    if (grinchTimeoutRef.current) {
      clearTimeout(grinchTimeoutRef.current);
      grinchTimeoutRef.current = null;
    }
    // Activate Grinch. Double animation frame to remove other grinch first, then start new.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setGrinchActive(true);
      });
    });
    // Automatically remove active if timer runs out.
    grinchTimeoutRef.current = setTimeout(() => {
      setGrinchActive(false);
      grinchTimeoutRef.current = null;
    }, 2500);
  };

  const startFlash = () => {
    setFlashActive(false);

    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
      flashTimeoutRef.current = null;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFlashActive(true));
    });

    flashTimeoutRef.current = setTimeout(() => {
      setFlashActive(false);
      flashTimeoutRef.current = null;
    }, 2500);
  };

  // Stop Grinch function if element is removed.
  useEffect(() => {
    return () => {
      if (grinchTimeoutRef.current) clearTimeout(grinchTimeoutRef.current);
    };
  }, []);

  const handleCorrect = async (teamId) => {
    if (!currentQuestion) return;
    await addScore(teamId, currentQuestion.value);
  };

  const handleIncorrect = async (teamId) => {
    if (!currentQuestion) return;
    await subtractScore(teamId, currentQuestion.value);

    startGrinch();
  };

  return (
    <div className={cn(styles, `${ms} container`)}>

      <div className={cn(styles, `flash ${getFlashActive ? "active" : ""}`)} />
      <div className={cn(styles, `grinch ${getGrinchActive ? "active" : ""}`)}>
        <img src={grinchImg} alt="Grinch!" />{" "}
      </div>

      {teams.map((team) => (
        <div key={team._id} className={cn(styles, `teamcard`)}>
          <img
            src={getAvatarUrl(team.image || team.avatar)}
            className={cn(styles, `avatar`)}
            alt={team.name}
          />
          <div className={cn(styles, `icon`)}>{getRankIcon(team._id)}</div>
          <div className={cn(styles, `names`)}>
            <h3>{team.name}</h3>
          </div>
          <div className={cn(styles, `score`)}>
            <h3>{team.score}</h3>
          </div>

          {/* Show controls only if modal is open (question active) */}
          {ms && currentQuestion && (
            <div className={styles.buttons}>
              <button
                className={styles.button}
                onClick={() => handleCorrect(team._id)}
              >
                <Check />
              </button>
              <button
                className={styles.button}
                onClick={() => handleIncorrect(team._id)}
              >
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
