import { createContext, useState } from "react";

export const GameStateContext = createContext({
  active_player: null,
  player1_name: null,
  player2_name: null,
  scores1_id: null,
  scores2_id: null,
  turns_remaining: null,
});

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    active_player: null,
    player1_name: null,
    player2_name: null,
    scores1_id: null,
    scores2_id: null,
    turns_remaining: null,
  });
  const value = { gameState, setGameState };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
