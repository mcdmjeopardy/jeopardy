import React, { useState } from "react";
import styles from "./GameCreator.module.css";
import { cn } from "../../../functions/setStyles";
import { initialTeams } from "./data";
import TeamItem from "../TeamItem/TeamItem";
import Button from "../../common/Button/Button";
import InfoCard from "./InfoCard";

const GameCreator = () => {
  const [topic, setTopic] = useState("CHRISTMAS");
  const [teams, setTeams] = useState(initialTeams);
  const test = "test"

  const participantsCount = teams.filter((t) => t.active).length;

  function toggleTeam(id) {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  }

  function startGame() {
    const activeTeams = teams.filter((t) => t.active);
    if (activeTeams.length < 1) {
      alert("Vælg mindst ét aktivt team for at starte spillet.");
      return;
    }
    console.log("Starter spil med:", {
      topic,
      teams: activeTeams.map((t) => t.name),
    });
  }

  return (
    <div className={styles.gameSettingsContainer}>
      <div className={cn(styles, "content2", `banner ${test}`)}>
        <div className="decor-row">
          <span>🎄</span>
          <span>🎁</span>
          <span>✨</span>
          <span>🎀</span>
        </div>
        <h2>GAME Settings</h2>
      </div>

      <div className={styles.content}>
        <aside>
          <h3>Teams</h3>
          <ul className="team-list">
            {teams.map((team) => (
              <TeamItem key={team.id} team={team} toggleTeam={toggleTeam} />
            ))}
          </ul>
        </aside>

        <main>
          <InfoCard
            topic={topic}
            setTopic={setTopic}
            participantsCount={participantsCount}
          />
          <Button content={"START GAME ▶"} link={"/"} />
        </main>
      </div>
    </div>
  );
};

export default GameCreator;
