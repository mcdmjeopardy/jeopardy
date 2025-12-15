import { useState } from "react";
import { useGames } from "../../../context/GamesContext";
import { cn } from "../../../functions/setStyles";
import styles from "./AdminPanel.module.css";


const AdminPanel = () => {
  const { games, currentGame, loading } = useGames();
  const [activeTab, setActiveTab] = useState("questions"); // "questions" or "categories"

  // Resolve which game to manage
  // Strict: only show "Ultimate"
  const gameToManage = currentGame?.name === "Ultimate" ? currentGame : games.find(g => g.name === "Ultimate");

  // Flatten questions helper
  const getAllQuestions = () => {
    if (!gameToManage?.categories) return [];

    // Safely map
    try {
        return gameToManage.categories.flatMap((cat, catIdx) =>
            (cat.questions || []).map((q, qIdx) => ({
              ...q,
              categoryName: cat.name,
              id: `${catIdx}-${qIdx}`
            }))
        );
    } catch (e) {
        console.error("Error flattening questions", e);
        return [];
    }
  };

  const allQuestions = getAllQuestions();

  // Helper to render table body content to keep JSX clean
  const renderTableBody = () => {
    // 1. Loading state (if no game yet, but loading)
    if (loading && !gameToManage) {
        return (
            <tr><td colSpan="4" style={{textAlign: "center", padding: 20}}>Loading game data...</td></tr>
        );
    }

    // 2. No game found
    if (!gameToManage) {
        return (
            <tr><td colSpan="4" style={{textAlign: "center", padding: 20}}>No games found. Please create one in the lobby.</td></tr>
        );
    }

    // 3. Categories Tab
    if (activeTab === "categories") {
        if (!gameToManage.categories || gameToManage.categories.length === 0) {
            return <tr><td colSpan="3" style={{textAlign: "center"}}>No categories found.</td></tr>;
        }
        return gameToManage.categories.map((cat, idx) => (
            <tr key={idx}>
              <td>{cat.name}</td>
              <td>{cat.questions ? cat.questions.length : 0} Questions</td>
              <td>
                <button className={cn(styles, `button-question`)}>Edit</button>
              </td>
            </tr>
        ));
    }

    // 4. Questions Tab (Default)
    if (allQuestions.length === 0) {
        return <tr><td colSpan="4" style={{textAlign: "center"}}>No questions found in this game.</td></tr>;
    }

    return allQuestions.map((q, idx) => (
        <tr key={`${q.id}-${idx}`}>
          <td>
            {q.question} <br/>
            <small style={{opacity: 0.7}}>A: {q.answer}</small>
          </td>
          <td>{q.categoryName}</td>
          <td>{q.value}</td>
          <td>
            <button className={cn(styles, `button-status`)} style={{ backgroundColor: q.answered ? '#666' : 'var(--xmas-green)' }}>
              {q.answered ? "Used" : "Active"}
            </button>
          </td>
        </tr>
    ));
  };


  return (
    <div className={cn(styles, ``, "container")}>
      <header>
        <h1> Questions & Categories </h1>
      </header>

      {/* Main tag for global layout, inner div for Admin styles */}
      <main>

            <h2 className={cn(styles, `heading`)}>
            {gameToManage ? `Managing: ${gameToManage.name}` : "Admin Panel"}
            </h2>

            <div className={cn(styles, `radio-inputs`)}>
            <label className={cn(styles, `radio`)}>
                <input
                name="radio"
                type="radio"
                checked={activeTab === "questions"}
                onChange={() => setActiveTab("questions")}
                />
                <span className={cn(styles, `name`)}>Questions</span>
            </label>
            <label className={cn(styles, `radio`)}>
                <input
                name="radio"
                type="radio"
                checked={activeTab === "categories"}
                onChange={() => setActiveTab("categories")}
                />
                <span className={cn(styles, `name`)}>Categories</span>
            </label>
            </div>

            <table className={cn(styles, `Zebra-table`)}>
            <thead>
                <tr className={cn(styles, `category-table-header`)}>
                {activeTab === "questions" ? (
                    <>
                    <th className={cn(styles, `Question-tag`)}>Question</th>
                    <th className={cn(styles, `Category`)}>Category</th>
                    <th className={cn(styles, `Status-tag`)}>Value</th>
                    <th className={cn(styles, `Status-tag`)}>Status</th>
                    </>
                ) : (
                    <>
                    <th className={cn(styles, `Category`)}>Category Name</th>
                    <th className={cn(styles, `Status-tag`)}>Question Count</th>
                    <th className={cn(styles, `Status-tag`)}>Actions</th>
                    </>
                )}
                </tr>
            </thead>
            <tbody>
                {renderTableBody()}
            </tbody>
            </table>

      </main>
    </div>
  );
};

export default AdminPanel;
