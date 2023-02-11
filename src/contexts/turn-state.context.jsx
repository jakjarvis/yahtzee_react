import { createContext, useState } from "react";

export const TurnStateContext = createContext({
  diceValues: [1, 2, 3, 4, 5],
  heldDice: [0, 0, 0, 0, 0],
  rollsLeft: 3,
  numbers: [0, 0, 0, 0, 0, 0],
});

export const TurnStateProvider = ({ children }) => {
  const [turnState, setTurnState] = useState({
    diceValues: [1, 2, 3, 4, 5],
    heldDice: [0, 0, 0, 0, 0],
    rollsLeft: 3,
    numbers: [0, 0, 0, 0, 0, 0],
  });
  const value = { turnState, setTurnState };

  return (
    <TurnStateContext.Provider value={value}>
      {children}
    </TurnStateContext.Provider>
  );
};
