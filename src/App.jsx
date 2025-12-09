// Import Global Styles
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameCreator from "./components/admin/GameCreator/GameCreator";
import GameLobby from "./components/admin/GameLobby/GameLobby";
import GameBoard from "./components/game/GameBoard/GameBoard";
import EditProfile from "./components/admin/GameCreator/TeamEdit/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GameBoard />} />
          <Route path="/admin" element={<GameCreator />} />
          <Route path="/lobby" element={<GameLobby />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
