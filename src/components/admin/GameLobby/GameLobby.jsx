import {
  AddCircleIcon,
  CircleArrowRight01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lobby from "../../../assets/videos/Lobby.mp4";
import { useGames } from "../../../context/GamesContext";
import { useTeams } from "../../../context/TeamsContext";
import { cn } from "../../../functions/setStyles";
import { AVATAR_MAP } from "../../../utils/avatarMap";
import TeamEdit from "../TeamEdit/TeamEdit";
import styles from "./GameLobby.module.css";

const GameLobby = () => {
  const { teams, createTeam, setCurrentTeam } = useTeams();
  const { games, selectGame, currentGame, addTeamsToGame } = useGames();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);

  const handleStartGame = () => {
    // Use the loaded game directly
    const game = currentGame || games[0];
    if (game) {
      selectGame(game);
      navigate("/game");
    } else {
      alert("Ingen spil fundet! Tjek miljøvariabel VITE_ULTIMATE_GAME_ID.");
    }
  };

  const handleEditTeam = (team) => {
    setCurrentTeam(team);
    setShowEditModal(true);
  };

  const handleAddTeam = () => {
    setCurrentTeam({
      name: "",
      avatar: "default",
      isNew: true
    });
    setShowEditModal(true);
  };

  const handleTeamSaved = async (savedTeam) => {
      if (currentGame && savedTeam) {
           const currentTeamIds = currentGame.teams || [];
           if (!currentTeamIds.includes(savedTeam._id)) {
               await addTeamsToGame(currentGame._id, [...currentTeamIds, savedTeam._id]);
           }
      }
      setShowEditModal(false);
  };

  return (
    <>
      <video
        className={cn(styles, `backgroundvideo`)}
        preload="auto"
        autoPlay
        loop
        muted
      >
        <source src={lobby} type="video/mp4" />
      </video>
      <footer className={cn(styles, ``, "footer")}>
        <div className={cn(styles, `container`, "")}>
          <div className={cn(styles, `teams`, "")}>
            {teams.map((team) => (
              <div key={team._id} className={cn(styles, `teamcard`)}>
                <button
                  className={cn(styles, `setting-icon`)}
                  onClick={() => handleEditTeam(team)}
                >
                  <HugeiconsIcon
                    icon={Settings02Icon}
                    size={22}
                    color="#ffffff"
                    strokeWidth={1.5}
                  />
                </button>
                <img
                  src={AVATAR_MAP[team.avatar] || AVATAR_MAP.default}
                  className={cn(styles, `avatar`)}
                  alt={team.name}
                />
                 {/* Rank/Status icons could go here if needed, keeping it simple for Lobby */}
                <div className={cn(styles, `names`)}>
                  <h3>{team.name}</h3>
                </div>
              </div>
            ))}

            <button className={cn(styles, `startbutton`)} onClick={handleAddTeam}>
              <HugeiconsIcon
                icon={AddCircleIcon}
                size={50}
                color="#ffffff"
                strokeWidth={1.5}
              />
            </button>
          </div>
          <button className={cn(styles, `startbutton`)} onClick={handleStartGame}>
            START GAME{" "}
            <HugeiconsIcon
              icon={CircleArrowRight01Icon}
              size={50}
              color="#ffffff"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </footer>


       {showEditModal && (
        <div style={{ position: "absolute", zIndex: 100, inset: 0 }}>
             <TeamEdit
                onClose={() => setShowEditModal(false)}
                onSave={handleTeamSaved}
             />
        </div>
       )}
    </>
  );
};

export default GameLobby;
