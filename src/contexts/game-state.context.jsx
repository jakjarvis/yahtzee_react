import { createContext, useState } from "react";

export const GameStateContext = createContext({
  player1: "Player 1",
  player2: "Player 2",
  scores1: 1,
  scores2: 2,
  activePlayer: 1,
  turnsRemaining: 26,
});

export const GameStateProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    player1: "Player 1",
    player2: "Player 2",
    scores1: 1,
    scores2: 2,
    activePlayer: 1,
    turnsRemaining: 26,
  });
  const value = { gameState, setGameState };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
