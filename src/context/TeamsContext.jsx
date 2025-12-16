import { createContext, useContext, useEffect, useState } from "react";
import { teamsApi } from "../api";
import { APP_ID, useGames } from "./GamesContext";

/*
 * TEAMS CONTEXT
 *
 * This file manages all team-related data for our Jeopardy app.
 *
 * What it does:
 * - Stores the list of teams we've created
 * - Stores the avatar images teams can choose from
 * - Handles score updates (adding/subtracting points)
 *
 * How to use in a component:
 *   import { useTeams } from "../context";
 *   const { teams, teamImages, addScore } = useTeams();
 */

// ===========================================
// THE CONTEXT
// ===========================================
const TeamsContext = createContext(null);

export function TeamsProvider({ children }) {
  // --- Our state (data that can change) ---
  const [allTeams, setAllTeams] = useState([]); // All teams we've created
  const [teamImages, setTeamImages] = useState([]); // Avatar images to pick from
  const [currentTeam, setCurrentTeam] = useState(null); // Currently selected team (for editing)
  const [loading, setLoading] = useState(false); // True while loading from API
  const [error, setError] = useState(null); // Error message if something breaks

  // We need access to games to know which teams are playing
  const { games } = useGames();

  // ===========================================
  // FILTER TEAMS
  // ===========================================
  // We have two team lists:
  // - allTeams: Every team we've ever created (for the team picker)
  // - teams: Only teams that are in one of our games (for the scoreboard)

  // Get all team IDs that are assigned to any of our games
  function getOurTeamIds() {
    const ids = new Set();
    games.forEach((game) => {
      game.teams?.forEach((teamId) => {
        if (typeof teamId === "string") {
          ids.add(teamId);
        }
      });
    });
    return ids;
  }

  // Teams that are actually playing in one of our games
  // Use this for the scoreboard during gameplay
  const teams = allTeams.filter((team) => getOurTeamIds().has(team._id));

  // ===========================================
  // FETCH TEAMS FROM API
  // ===========================================

  // Load all teams from the database
  async function fetchAllTeams() {
    try {
      setLoading(true);
      setError(null);

      const response = await teamsApi.getTeams();
      const allTeamsData = response.data || response;

      // Only keep teams that belong to us (or old teams without appId)
      const ourTeams = allTeamsData.filter(
        (team) => team.appId === APP_ID || !team.appId
      );

      setAllTeams(ourTeams);
      return ourTeams;
    } catch (err) {
      console.error("Failed to fetch teams", err);
      setError(err.message || "Kunne ikke hente hold");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Load available avatar images
  // These are preset images teams can choose as their profile picture
  async function fetchTeamImages() {
    try {
      // Note: This endpoint returns an array directly, not { data: [...] }
      const images = await teamsApi.getTeamImages();
      setTeamImages(images);
      return images;
    } catch (err) {
      console.error("Failed to fetch team images", err);
      throw err;
    }
  }

  // Load a single team by ID
  async function fetchTeamById(id) {
    try {
      setLoading(true);
      const response = await teamsApi.getTeam(id);
      const team = response.data || response;
      setCurrentTeam(team);
      return team;
    } catch (err) {
      console.error("Failed to fetch team", err);
      setError(err.message || "Kunne ikke hente hold");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // ===========================================
  // CREATE, UPDATE, DELETE TEAMS
  // ===========================================

  // Create a new team
  async function createTeam(teamData) {
    // Add our APP_ID so the team belongs to us
    const dataWithAppId = { ...teamData, appId: APP_ID };
    const response = await teamsApi.createTeam(dataWithAppId);
    const newTeam = response.data || response;

    // Add to our list
    setAllTeams((prev) => [...prev, newTeam]);
    return newTeam;
  }

  // Update a team (change name, avatar, etc.)
  async function updateTeam(id, teamData) {
    const dataWithAppId = { ...teamData, appId: APP_ID };
    const response = await teamsApi.updateTeam(id, dataWithAppId);
    const updatedTeam = response.data || response;

    // Update it in our list
    setAllTeams((prev) =>
      prev.map((t) => (t._id === id ? { ...t, ...updatedTeam } : t))
    );

    if (currentTeam?._id === id) {
      setCurrentTeam((prev) => ({ ...prev, ...updatedTeam }));
    }
    return updatedTeam;
  }

  // Delete a team
  async function deleteTeam(id) {
    await teamsApi.deleteTeam(id);
    setAllTeams((prev) => prev.filter((t) => t._id !== id));

    if (currentTeam?._id === id) {
      setCurrentTeam(null);
    }
  }

  // ===========================================
  // SCORE FUNCTIONS
  // ===========================================
  // These are used during gameplay to update team scores

  // Helper: update a team in our state after score change
  function updateTeamInState(updatedTeam) {
    setAllTeams((prev) =>
      prev.map((t) =>
        t._id === updatedTeam._id ? { ...t, ...updatedTeam } : t
      )
    );
    if (currentTeam?._id === updatedTeam._id) {
      setCurrentTeam((prev) => ({ ...prev, ...updatedTeam }));
    }
  }

  // Add points to a team's score
  // Use this when a team answers correctly!
  // Example: await addScore(teamId, 200)  // Adds 200 points
  async function addScore(teamId, points) {
    const response = await teamsApi.updateScore(teamId, `+${points}`);
    const updatedTeam = response.data || response;
    updateTeamInState(updatedTeam);
    return updatedTeam;
  }

  // Subtract points from a team's score
  // Use this to penalize wrong answer
  // Example: await subtractScore(teamId, 100)  // Removes 100 points
  async function subtractScore(teamId, points) {
    const response = await teamsApi.updateScore(teamId, `-${points}`);
    const updatedTeam = response.data || response;
    updateTeamInState(updatedTeam);
    return updatedTeam;
  }

  // Set score to a specific number
  // Use this to reset score to 0 at the start of a game
  // Example: await setScore(teamId, 0)
  async function setScore(teamId, newScore) {
    const response = await teamsApi.updateScore(teamId, newScore);
    const updatedTeam = response.data || response;
    updateTeamInState(updatedTeam);
    return updatedTeam;
  }

  // ===========================================
  // OTHER
  // ===========================================

  function clearError() {
    setError(null);
  }

  // Load teams and images when the app starts
  useEffect(() => {
    fetchAllTeams();
    fetchTeamImages();
  }, []);

  // ===========================================
  // WHAT WE SHARE WITH COMPONENTS
  // ===========================================
  // Everything in "value" can be used by any component with useTeams()

  const value = {
    // Data
    teams, // Teams in our games (use for scoreboard)
    allTeams, // All teams we've created (use for team picker)
    teamImages, // Avatar images: [{ id, url, label }, ...]
    currentTeam, // Currently selected team (for editing)
    loading, // True while loading
    error, // Error message (or null)

    // Actions
    clearError,
    refresh: fetchAllTeams,
    fetchAllTeams,
    fetchTeamById,
    fetchTeamImages,
    setCurrentTeam,
    createTeam,
    updateTeam,
    deleteTeam,

    // Score functions
    addScore, // Add points (correct answer)
    subtractScore, // Remove points (wrong answer)
    setScore, // Set to specific number (reset)
  };

  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
}

// ===========================================
// THE HOOK
// ===========================================
// This is what you import in your components
// Example: const { teams, addScore } = useTeams();

export function useTeams() {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error("useTeams must be used inside AppProvider");
  }
  return context;
}
