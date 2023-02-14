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
  three_kind: [null, null],
  four_kind: [null, null],
  full_house: [null, null],
  short_straight: [null, null],
  long_straight: [null, null],
  yahtzee: [null, null],
  chance: [null, null],

  /* Total score fields */
  top_score: [null, null],
  bonus: [null, null],
  top_total: [null, null],
  bottom_total: [null, null],
  grand_total: [null, null],
});

export const ScoresProvider = ({ children }) => {
  const [scoresState, setScoresState] = useState({
    /* Top score fields */
    ones: [null, null],
    twos: [null, null],
    threes: [null, null],
    fours: [null, null],
    fives: [null, null],
    sixes: [null, null],

    /* Bottom score fields */
    three_kind: [null, null],
    four_kind: [null, null],
    full_house: [null, null],
    short_straight: [null, null],
    long_straight: [null, null],
    yahtzee: [null, null],
    chance: [null, null],

    /* Total score fields */
    top_score: [null, null],
    bonus: [null, null],
    top_total: [null, null],
    bottom_total: [null, null],
    grand_total: [null, null],
  });
  const value = { scoresState, setScoresState };

  return (
    <ScoresContext.Provider value={value}>{children}</ScoresContext.Provider>
  );
};
