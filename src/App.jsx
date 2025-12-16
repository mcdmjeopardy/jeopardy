// Import Global Styles
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel/AdminPanel";
import GameLobby from "./components/admin/GameLobby/GameLobby";
import EditProfile from "./components/admin/TeamEdit/TeamEdit";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GameBoard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/lobby" element={<GameLobby />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
