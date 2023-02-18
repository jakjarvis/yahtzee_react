import "./App.css";

import { Routes, Route } from "react-router-dom";

import Game from "./components/game/game.component";

function App() {
  return (
    <Routes>
      <Route path="/game/:id" element={<Game />} />
    </Routes>
  );
}

export default App;
