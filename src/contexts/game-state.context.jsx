import { createContext, useState } from "react";

export const GameStateContext = createContext({
  active_player: "player1",
  player1_name: null,
  player2_name: null,
  scores1_id: null,
  scores2_id: null,
  turns_remaining: 26,
});

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    active_player: "player1",
    player1_name: null,
    player2_name: null,
    scores1_id: null,
    scores2_id: null,
    turns_remaining: 26,
  });
  const value = { gameState, setGameState };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
