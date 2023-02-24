import "./App.css";

import { Routes, Route } from "react-router-dom";

import TitleBar from "./routes/title-bar/title-bar.route";
import Game from "./routes/game/game.route";
import Setup from "./routes/setup/setup.route";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TitleBar />}>
        <Route path="game/:id" element={<Game />} />
        <Route path="setup" element={<Setup />} />
      </Route>
    </Routes>
  );
};

export default App;
