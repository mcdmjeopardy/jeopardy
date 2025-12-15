/**
 * API Client for Jeopardy Game
 *
 * This file contains all the functions to communicate with the backend API.
 * Each function corresponds to an API endpoint (URL) on the server.
 *
 * Structure:
 * - authApi: Login/authentication
 * - teamsApi: Create, read, update, delete teams
 * - gamesApi: Create, read, update, delete games
 */

// Base URL for the API - uses environment variable or falls back to localhost
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3042";

/**
 * Creates headers for API requests.
 * Includes the auth token from localStorage if the user is logged in.
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Same as getAuthHeaders but without Content-Type.
 * Used for FormData uploads (like images).
 */
export const getAuthHeadersForFormData = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Handles API responses.
 * - If successful: returns the JSON data
 * - If error: throws an error with the message from the server
 */
export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "Request failed",
    }));
    throw new Error(
      error.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
};

// Auth API
export const authApi = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },
};

// ============================================================
// TEAMS API
// Endpoints for managing teams (players in the game)
// ============================================================
export const teamsApi = {
  // GET /teams - Fetch all teams from the database
  async getTeams() {
    const res = await fetch(`${API_BASE_URL}/teams`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // GET /teams/images - Fetch available team avatar images
  async getTeamImages() {
    const res = await fetch(`${API_BASE_URL}/teams/images`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // GET /team/:id - Fetch a single team by its ID
  async getTeam(id) {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // POST /team - Create a new team
  async createTeam(teamData) {
    const res = await fetch(`${API_BASE_URL}/team`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(teamData),
    });
    return handleResponse(res);
  },

  // PUT /team/:id - Update an existing team
  async updateTeam(id, teamData) {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(teamData),
    });
    return handleResponse(res);
  },

  // DELETE /team/:id - Delete a team
  async deleteTeam(id) {
    const res = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // PATCH /team/:id/score - Update a team's score
  async updateScore(id, score) {
    const res = await fetch(`${API_BASE_URL}/team/${id}/score`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ score }),
    });
    return handleResponse(res);
  },
};

// ============================================================
// GAMES API
// Endpoints for managing Jeopardy games
// ============================================================
export const gamesApi = {
  // GET /games - Fetch all games from the database
  async getGames() {
    const res = await fetch(`${API_BASE_URL}/games`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // GET /game/:id - Fetch a single game by its ID
  async getGame(id) {
    const res = await fetch(`${API_BASE_URL}/game/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // POST /game - Create a new game
  async createGame(gameData) {
    const res = await fetch(`${API_BASE_URL}/game`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(gameData),
    });
    return handleResponse(res);
  },

  // PUT /game/:id - Update an existing game
  async updateGame(id, gameData) {
    const res = await fetch(`${API_BASE_URL}/game/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(gameData),
    });
    return handleResponse(res);
  },

  // DELETE /game/:id - Delete a game
  async deleteGame(id) {
    const res = await fetch(`${API_BASE_URL}/game/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // POST /game/:id/add-teams - Add teams to a game
  async addTeamsToGame(gameId, teamIds) {
    const res = await fetch(`${API_BASE_URL}/game/${gameId}/add-teams`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ teamIds }),
    });
    return handleResponse(res);
  },
};
