import { createContext, useContext, useEffect, useState } from "react";
import { gamesApi } from "../api";

// GAMES CONTEXT
// Manages games, question modal state, and persistence.



// ===========================================
// LOCALSTORAGE
// ===========================================
// localStorage lets us save data in the browser.
// When you refresh the page, this data is still there.
// We use it to remember which game you were playing.

const STORAGE_KEYS = {
  SELECTED_GAME_ID: "jeopardy_selectedGameId", // Which game is selected
  CURRENT_QUESTION: "jeopardy_currentQuestion", // Which question tile is open
};

// Save something to localStorage
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }
}

// Load something from localStorage
function loadFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    return null;
  }
}

// Remove something from localStorage
function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn("Could not remove from localStorage:", err);
  }
}

// ===========================================
// THE CONTEXT
// ===========================================
const GamesContext = createContext(null);

export function GamesProvider({ children }) {
  // --- Our state (data that can change) ---
  const [games, setGames] = useState([]); // All our games
  const [currentGame, setCurrentGame] = useState(null); // The game we're playing now
  const [loading, setLoading] = useState(false); // True while loading from API
  const [error, setError] = useState(null); // Error message if something breaks

  // Which question tile is clicked open
  // Format: { categoryIndex: 0, questionIndex: 2, showAnswer: false }
  const [currentQuestion, setCurrentQuestionState] = useState(() => {
    // On first load, check if there was a question open before refresh
    return loadFromStorage(STORAGE_KEYS.CURRENT_QUESTION);
  });

  // ===========================================
  // QUESTION MODAL FUNCTIONS
  // ===========================================
  // These control the popup that shows when you click a tile

  // Open a question tile (called when clicking a tile on the board)
  function setCurrentQuestion(question) {
    setCurrentQuestionState(question);
    if (question) {
      saveToStorage(STORAGE_KEYS.CURRENT_QUESTION, question);
    } else {
      removeFromStorage(STORAGE_KEYS.CURRENT_QUESTION);
    }
  }

  // Toggle between showing/hiding the answer
  function toggleShowAnswer() {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        showAnswer: !currentQuestion.showAnswer,
      });
    }
  }

  // Close the question modal
  function closeQuestion() {
    setCurrentQuestion(null);
  }

  // Get the actual question data (text, answer, points) from the current game
  // Returns: { question: "...", answer: "...", value: 200, answered: false }
  function getQuestionData() {
    if (!currentQuestion || !currentGame) return null;

    const { categoryIndex, questionIndex } = currentQuestion;
    const category = currentGame.categories?.[categoryIndex];
    return category?.questions?.[questionIndex] || null;
  }

  // ===========================================
  // FETCH GAMES FROM API
  // ===========================================

  // Load games from the database
  async function fetchGames() {
    try {
      setLoading(true);
      setError(null);

      const ultimateGameId = import.meta.env.VITE_ULTIMATE_GAME_ID;

      if (ultimateGameId) {
        // PRIMARY: Use specific game ID from environment (VITE_ULTIMATE_GAME_ID)
        // This is the main way to filter the game.
        const response = await gamesApi.getGame(ultimateGameId);
        const game = response.data || response;

        // Wrap in array for consistency
        setGames([game]);
        setCurrentGame(game);
        saveToStorage(STORAGE_KEYS.SELECTED_GAME_ID, game._id);

      } else {
        // FALLBACK LOGIC: Check name "Ultimate" only if no ID in env.
        // This is legacy behavior to prevent crashes during dev without env vars.
        const response = await gamesApi.getGames();
        const allGames = response.data || response;

        // STRICT Filtering: Only show the game called "Ultimate"
        const ourGames = allGames.filter(g => g.name === "Ultimate");

        setGames(ourGames);

        // Force selection of "Ultimate" game if found
        const ultimateGame = ourGames.find(g => g.name === "Ultimate");

        if (ultimateGame) {
           setCurrentGame(ultimateGame);
           saveToStorage(STORAGE_KEYS.SELECTED_GAME_ID, ultimateGame._id);
        } else {
            setCurrentGame(null);
            removeFromStorage(STORAGE_KEYS.SELECTED_GAME_ID);
        }
      }
    } catch (err) {
      console.error("Failed to fetch games", err);
      // For a smoother UX, we might not want to show a hard error if it's just missing
      // but if the API fails, we should know.
      setError(err.message || "Kunne ikke hente spil");
      setGames([]);
      setCurrentGame(null);
    } finally {
      setLoading(false);
    }
  }

  // Load a single game by its ID
  async function fetchGameById(id) {
    try {
      setLoading(true);
      setError(null);

      const response = await gamesApi.getGame(id);
      const game = response.data || response;



      setCurrentGame(game);
      saveToStorage(STORAGE_KEYS.SELECTED_GAME_ID, game._id);
      return game;
    } catch (err) {
      console.error("Failed to fetch game", err);
      setError(err.message || "Kunne ikke hente spil");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // ===========================================
  // SELECT GAME
  // ===========================================

  // Choose a game to play (call this when clicking on a game in the list)
  function selectGame(game) {
    setCurrentGame(game);
    if (game) {
      saveToStorage(STORAGE_KEYS.SELECTED_GAME_ID, game._id);
    } else {
      removeFromStorage(STORAGE_KEYS.SELECTED_GAME_ID);
      closeQuestion(); // Also close any open question
    }
  }

  // ===========================================
  // CREATE, UPDATE, DELETE GAMES
  // ===========================================

  // Create a new game
  async function createGame(gameData) {

    const response = await gamesApi.createGame(gameData);
    const newGame = response.data || response;

    // Add to our list
    setGames((prev) => [...prev, newGame]);
    return newGame;
  }

  // Update an existing game (change name, categories, etc.)
  async function updateGame(id, gameData) {
    const response = await gamesApi.updateGame(id, gameData);
    const updatedGame = response.data || response;

    // Update it in our list
    setGames((prev) =>
      prev.map((g) => (g._id === id ? { ...g, ...updatedGame } : g))
    );

    // Also update currentGame if that's the one we changed
    if (currentGame?._id === id) {
      setCurrentGame((prev) => ({ ...prev, ...updatedGame }));
    }
    return updatedGame;
  }

  // Delete a game
  async function deleteGame(id) {


    await gamesApi.deleteGame(id);

    // Remove from our list
    setGames((prev) => prev.filter((g) => g._id !== id));

    // If we deleted the current game, clear it
    if (currentGame?._id === id) {
      setCurrentGame(null);
    }
  }

  // ===========================================
  // ADD TEAMS TO GAME
  // ===========================================

  // Add teams to a game (before starting)
  async function addTeamsToGame(gameId, teamIds) {
    const response = await gamesApi.addTeamsToGame(gameId, teamIds);
    const updatedGame = response.data || response;

    setGames((prev) =>
      prev.map((g) => (g._id === gameId ? { ...g, ...updatedGame } : g))
    );
    if (currentGame?._id === gameId) {
      setCurrentGame((prev) => ({ ...prev, ...updatedGame }));
    }
    return updatedGame;
  }

  // ===========================================
  // GAMEPLAY: MARK QUESTION AS ANSWERED
  // ===========================================

  // Call this when a question is done - it grays out the tile
  async function markQuestionAnswered(categoryIndex, questionIndex) {
    if (!currentGame) return;

    // Create updated categories with this question marked answered
    const updatedCategories = currentGame.categories.map((category, catIdx) => {
      if (catIdx !== categoryIndex) return category;

      return {
        ...category,
        questions: category.questions.map((question, qIdx) => {
          if (qIdx !== questionIndex) return question;
          return { ...question, answered: true };
        }),
      };
    });

    // Save to database
    return await updateGame(currentGame._id, {
      ...currentGame,
      categories: updatedCategories,
    });
  }

  // ===========================================
  // OTHER
  // ===========================================

  function clearError() {
    setError(null);
  }

  // Load games when the app starts
  useEffect(() => {
    fetchGames();
  }, []);

  // ===========================================
  // WHAT WE SHARE WITH COMPONENTS
  // ===========================================
  // Everything in "value" can be used by any component with useGames()

  const value = {
    // Data
    games, // Array of all our games
    currentGame, // The game we're playing (or null)
    loading, // True while loading
    error, // Error message (or null)

    // Question modal state
    currentQuestion, // { categoryIndex, questionIndex, showAnswer } or null
    setCurrentQuestion,
    toggleShowAnswer,
    closeQuestion,
    getQuestionData, // Returns the question object { question, answer, value }

    // Actions
    clearError,
    refresh: fetchGames,
    fetchGameById,
    selectGame,
    setCurrentGame,
    createGame,
    updateGame,
    deleteGame,
    addTeamsToGame,
    markQuestionAnswered,
  };

  return (
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
}

// ===========================================
// THE HOOK
// ===========================================
// This is what you import in your components
// Example: const { games, selectGame } = useGames();

export function useGames() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGames must be used inside AppProvider");
  }
  return context;
}
