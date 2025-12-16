// Import Global Styles
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel";
import GameLobby from "./components/admin/GameLobby/GameLobby";
import EditProfile from "./components/admin/TeamEdit/TeamEdit";
import GameBoard from "./components/game/GameBoard/GameBoard";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/game" element={<GameBoard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<GameLobby />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
