// Import Global Styles
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameCreator from "./components/admin/GameCreator/GameCreator";
import GameLobby from "./components/admin/GameLobby/GameLobby";
import EditProfile from "./components/admin/TeamEdit/TeamEdit";
import GameBoard from "./components/game/GameBoard/GameBoard";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/game" element={<GameBoard />} />
          <Route path="/newgame" element={<GameCreator />} />
          <Route path="/" element={<GameLobby />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
