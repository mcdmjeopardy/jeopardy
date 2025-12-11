// Import Global Styles
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameCreator from "./components/admin/GameCreator/GameCreator";
import GameLobby from "./components/admin/GameLobby/GameLobby";
import GameBoard from "./components/game/GameBoard/GameBoard";


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GameBoard />} />
          <Route path="/admin" element={<GameCreator />} />
          <Route path="/lobby" element={<GameLobby />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
