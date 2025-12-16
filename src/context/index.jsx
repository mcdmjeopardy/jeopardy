import { GamesProvider, useGames } from "./GamesContext";
import { TeamsProvider, useTeams } from "./TeamsContext";

// AppProvider - wrap your app with this in main.jsx
function AppProvider({ children }) {
  return (
    <GamesProvider>
      <TeamsProvider>{children}</TeamsProvider>
    </GamesProvider>
  );
}

export { AppProvider, useGames, useTeams };
