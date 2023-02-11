import { createContext, useState } from "react";

export const ScoresContext = createContext({
  /* Top score fields */
  ones: [null, null],
  twos: [null, null],
  threes: [null, null],
  fours: [null, null],
  fives: [null, null],
  sixes: [null, null],

  /* Bottom score fields */
  kind3: [null, null],
  kind4: [null, null],
  house: [null, null],
  short: [null, null],
  long: [null, null],
  yahtzee: [null, null],
  chance: [null, null],

  /* Total score fields */
  topInitial: [null, null],
  topBonus: [null, null],
  topTotal: [null, null],
  topTotalRepeat: [null, null],
  bottomTotal: [null, null],
  grandTotal: [null, null],
});

export const ScoresProvider = ({ children }) => {
  const [scoreState, setScoreState] = useState({
    /* Top score fields */
    ones: [null, null],
    twos: [null, null],
    threes: [null, null],
    fours: [null, null],
    fives: [null, null],
    sixes: [null, null],

    /* Bottom score fields */
    kind3: [null, null],
    kind4: [null, null],
    house: [null, null],
    short: [null, null],
    long: [null, null],
    yahtzee: [null, null],
    chance: [null, null],

    /* Total score fields */
    topInitial: [null, null],
    topBonus: [null, null],
    topTotal: [null, null],
    topTotalRepeat: [null, null],
    bottomTotal: [null, null],
    grandTotal: [null, null],
  });
  const value = { scoreState, setScoreState };

  return (
    <ScoresContext.Provider value={value}>{children}</ScoresContext.Provider>
  );
};
