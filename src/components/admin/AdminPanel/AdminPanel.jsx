import { useState } from "react";
import { useGames } from "../../../context/GamesContext";
import { cn } from "../../../functions/setStyles";
import styles from "./AdminPanel.module.css";


const AdminPanel = () => {
  const { games, currentGame, updateGame, loading } = useGames();
  const [activeTab, setActiveTab] = useState("questions"); // "questions" or "categories"

  // Editing State
  const [editingCategory, setEditingCategory] = useState(null); // { index, name }
  const [editingQuestion, setEditingQuestion] = useState(null); // { questionId, ...data }

  // Resolve which game to manage
  // PRIMARY: Env Logic via GamesContext
  const gameToManage = currentGame || games[0];

  // ==========================
  // HANDLERS
  // ==========================

  const handleEditCategory = (index) => {
    if (!gameToManage) return;
    const cat = gameToManage.categories[index];
    setEditingCategory({ index, name: cat.name });
  };

  const handleSaveCategory = async () => {
    if (!editingCategory || !gameToManage) return;

    // Create deep copy of categories
    const newCategories = [...gameToManage.categories];
    newCategories[editingCategory.index] = {
        ...newCategories[editingCategory.index],
        name: editingCategory.name
    };

    await updateGame(gameToManage._id, { categories: newCategories });
    setEditingCategory(null);
  };

  const handleEditQuestion = (questionData) => {
    // questionData comes from flat map: { ..., categoryName, id: "catIdx-qIdx" }
    // We need to parse indices.
    const [catIdx, qIdx] = questionData.id.split('-').map(Number);

    setEditingQuestion({
        ...questionData,
        catIdx,
        qIdx
    });
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion || !gameToManage) return;

    const { catIdx, qIdx, question, answer, value } = editingQuestion;

    // Deep copy categories
    const newCategories = [...gameToManage.categories];
    // Update specific question
    newCategories[catIdx].questions[qIdx] = {
        ...newCategories[catIdx].questions[qIdx],
        question,
        answer,
        value: Number(value)
    };

    await updateGame(gameToManage._id, { categories: newCategories });
    setEditingQuestion(null);
  };


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
                <button
                    className={cn(styles, `button-question`)}
                    onClick={() => handleEditCategory(idx)}
                >
                    Edit
                </button>
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
          <td style={{display: 'flex', gap: '10px'}}>
             <button
                className={cn(styles, `button-question`)}
                style={{width: 'auto', paddingInline: '15px'}}
                onClick={() => handleEditQuestion(q)}
            >
              Edit
            </button>
            <button className={cn(styles, `button-status`)} style={{ backgroundColor: q.answered ? '#666' : 'var(--xmas-green)', width: 'auto', paddingInline: '15px' }}>
              {q.answered ? "Used" : "Active"}
            </button>
          </td>
        </tr>
    ));
  };


  return (
    <div className={cn(styles, ``, "")}>
      <header>
        <h1> Questions & Categories </h1>
      </header>

      {/* Main tag for global layout, inner div for Admin styles */}
      <main>
        <div className={cn(styles, `admin-main`)}>
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
                    <th className={cn(styles, `Status-tag`)}>Actions</th>
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
        </div>
      </main>

      {/* MODALS */}

      {/* Category Edit Modal */}
      {editingCategory && (
        <div className={styles.modalBackground} onClick={() => setEditingCategory(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    Edit Category
                    <button className={styles.closeBtn} onClick={() => setEditingCategory(null)}>×</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.formGroup}>
                        <label>Category Name</label>
                        <input
                            className={styles.input}
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        />
                    </div>
                    <button className={styles.saveBtn} onClick={handleSaveCategory}>SAVE CHANGES</button>
                </div>
            </div>
        </div>
      )}

      {/* Question Edit Modal */}
      {editingQuestion && (
        <div className={styles.modalBackground} onClick={() => setEditingQuestion(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    Edit Question
                    <button className={styles.closeBtn} onClick={() => setEditingQuestion(null)}>×</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.formGroup}>
                        <label>Question Text</label>
                        <textarea
                            className={cn(styles, 'input', 'textarea')}
                            value={editingQuestion.question}
                            onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Answer</label>
                        <textarea
                            className={cn(styles, 'input', 'textarea')}
                            value={editingQuestion.answer}
                            onChange={(e) => setEditingQuestion({...editingQuestion, answer: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Value (Points)</label>
                        <input
                            type="number"
                            className={styles.input}
                            value={editingQuestion.value}
                            onChange={(e) => setEditingQuestion({...editingQuestion, value: e.target.value})}
                        />
                    </div>
                    <button className={styles.saveBtn} onClick={handleSaveQuestion}>SAVE CHANGES</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
