/**
 * Real API Service matching Postman Collection
 */

export const API_BASE_URL = "https://jeopardy-gkiyb.ondigitalocean.app";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    // Add Authorization if needed later
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
};

export const teamsApi = {
    async getTeams() {
      const res = await fetch(`${API_BASE_URL}/teams`, { headers: getHeaders() });
      return handleResponse(res);
    },
    async getTeamImages() {
      const res = await fetch(`${API_BASE_URL}/teams/images`, { headers: getHeaders() });
      return handleResponse(res);
    },
    async getTeam(id) {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, { headers: getHeaders() });
      return handleResponse(res);
    },
    async createTeam(data) {
      // Body: { name, image }
      const res = await fetch(`${API_BASE_URL}/team`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    async updateTeam(id, data) {
      // Postman: PUT /team, Body: { id, name, image }
      const res = await fetch(`${API_BASE_URL}/team`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ id, ...data }),
      });
      return handleResponse(res);
    },
    async deleteTeam(id) {
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return handleResponse(res);
    },
    async updateScore(id, score) {
      // Postman: PATCH /team/:id, Body: { score }
      const res = await fetch(`${API_BASE_URL}/team/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ score }),
      });
      return handleResponse(res);
    },
};

export const gamesApi = {
    async getGames() {
      const res = await fetch(`${API_BASE_URL}/games`, { headers: getHeaders() });
      return handleResponse(res);
    },
    async getGame(id) {
      const res = await fetch(`${API_BASE_URL}/game/${id}`, { headers: getHeaders() });
      return handleResponse(res);
    },
    async createGame(data) {
      // Body: { name, teams: [ids], categories: [...] }
      const res = await fetch(`${API_BASE_URL}/game`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    async updateGame(id, data) {
      // Postman: PUT /game, Body: { id, name, teams, categories }
      const res = await fetch(`${API_BASE_URL}/game`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ id, ...data }),
      });
      return handleResponse(res);
    },
    async deleteGame(id) {
      const res = await fetch(`${API_BASE_URL}/game/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return handleResponse(res);
    },
    async addTeamsToGame(gameId, teamIds) {
      // Postman: POST /game/:id/add-teams, Body: { teamIds: [] }
      const res = await fetch(`${API_BASE_URL}/game/${gameId}/add-teams`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ teamIds }),
      });
      return handleResponse(res);
    },
};
