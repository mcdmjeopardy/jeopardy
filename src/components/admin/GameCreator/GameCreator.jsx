import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGames } from "../../../context/GamesContext";
import { useTeams } from "../../../context/TeamsContext";
import { cn } from "../../../functions/setStyles";
import Button from "../../common/Button/Button";
import TeamItem from "../TeamItem/TeamItem";
import styles from "./GameCreator.module.css";
import InfoCard from "./InfoCard";

const GameCreator = () => {
  const [topic, setTopic] = useState("CHRISTMAS");
  const [selectedTeamIds, setSelectedTeamIds] = useState(new Set());

  const { allTeams, fetchAllTeams } = useTeams();
  const { createGame, selectGame } = useGames();
  const navigate = useNavigate();

  // Load teams and select all by default
  useEffect(() => {
    if (allTeams.length > 0) {
        const ids = new Set(allTeams.map(t => t._id));
        setSelectedTeamIds(ids);
    }
  }, [allTeams]);

  function toggleTeam(id) {
    const newSet = new Set(selectedTeamIds);
    if (newSet.has(id)) {
        newSet.delete(id);
    } else {
        newSet.add(id);
    }
    setSelectedTeamIds(newSet);
  }

  async function startGame() {
    if (selectedTeamIds.size < 1) {
      alert("Vælg mindst ét hold for at starte spillet.");
      return;
    }

    try {
        // Create a new game
        // In a real app, we might ask for categories. Here we'll just clone the christmas one's structure or create a generic one.
        // For now, let's assume creating a new game uses the standard Seed Categories (mocked in backend/service) or we just pass the name.
        // The service needs to handle "default categories" if none provided.
        // I'll update the component to pass the "Christmas" categories from the seed if needed,
        // OR simpler: Just navigate to the key game.
        // But this is "GameCreator". It should probably create a NEW game.

        // Let's create a game with the topic name.
        // Note: Our service currently expects us to provide categories or it might be empty.
        // I'll clone the categories from the existing "Christmas Jeopardy" seed if possible, or just hardcode them here for safety since we want it to work "out of the box".

         const defaultCategories = [
            {
              name: "Sange",
              questions: [
                { value: 100, question: "Question 100", answer: "Answer", answered: false },
                { value: 200, question: "Question 200", answer: "Answer", answered: false },
                { value: 300, question: "Question 300", answer: "Answer", answered: false },
                { value: 400, question: "Question 400", answer: "Answer", answered: false },
                { value: 500, question: "Question 500", answer: "Answer", answered: false },
              ],
            },
            { name: "Film", questions: Array(5).fill({ value: 100, question: "Q", answer: "A", answered: false }).map((q, i) => ({ ...q, value: (i+1)*100 })) },
            { name: "Mad", questions: Array(5).fill({ value: 100, question: "Q", answer: "A", answered: false }).map((q, i) => ({ ...q, value: (i+1)*100 })) },
            { name: "Julemand", questions: Array(5).fill({ value: 100, question: "Q", answer: "A", answered: false }).map((q, i) => ({ ...q, value: (i+1)*100 })) },
            { name: "Diverse", questions: Array(5).fill({ value: 100, question: "Q", answer: "A", answered: false }).map((q, i) => ({ ...q, value: (i+1)*100 })) },
         ];

        const newGame = await createGame({
            name: topic,
            teams: Array.from(selectedTeamIds),
            categories: defaultCategories
        });

        selectGame(newGame);
        navigate("/game");
    } catch (e) {
        console.error(e);
        alert("Kunne ikke starte spil");
    }
  }

  // Helper to match TeamItem interface
  // TeamItem expects { id, name, active, ... }
  // Our teams have _id.
  const displayTeams = allTeams.map(t => ({
      ...t,
      id: t._id,
      active: selectedTeamIds.has(t._id),
      icon: AVATAR_MAP[t.avatar] || AVATAR_MAP.default
  }));

  return (
    <div className={styles.gameSettingsContainer}>
      <div className={cn(styles, "content2", `banner`)}>
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
            {displayTeams.map((team) => (
              <TeamItem key={team.id} team={team} toggleTeam={() => toggleTeam(team.id)} />
            ))}
          </ul>
        </aside>

        <main>
          <InfoCard
            topic={topic}
            setTopic={setTopic}
            participantsCount={selectedTeamIds.size}
          />
          <div onClick={startGame} style={{ cursor: 'pointer' }}>
             <Button content={"START GAME ▶"} link={null} />{/* Setup Button to accept onClick if link is null, or wrap it */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GameCreator;
