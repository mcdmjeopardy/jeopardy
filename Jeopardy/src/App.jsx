// Import Global Styles
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameCreator from "./components/admin/GameCreator";
import GameLobby from "./components/admin/GameLobby";
import GameBoard from "./components/game/GameBoard";
import SnowLayout from "./components/layout/SnowLayout";

function App() {
  return (
    <BrowserRouter>
      <SnowLayout>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<GameBoard />} />
            <Route path="/admin" element={<GameCreator />} />
            <Route path="/lobby" element={<GameLobby />} />
          </Routes>
        </div>
      </SnowLayout>
    </BrowserRouter>
  );
}

export default App;
