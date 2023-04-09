import { render, waitFor } from "@testing-library/react";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import ScoreTable from "./score-table.component";

import {
  GameStateProvider,
  GameStateContext,
} from "../../contexts/game-state.context";
import { ScoresProvider, ScoresContext } from "../../contexts/scores.context";
import {
  TurnStateProvider,
  TurnStateContext,
} from "../../contexts/turn-state.context";

jest.mock("../../functions/fetch.functions.jsx");
jest.mock("../../functions/refresh.functions.jsx");

const TestScoreTable = ({ active_player, turns_remaining, final_scores }) => {
  const { setGameState } = useContext(GameStateContext);
  const { setScoresState } = useContext(ScoresContext);
  useEffect(() => {
    setGameState({
      active_player: active_player,
      turns_remaining: turns_remaining,
    });
    setScoresState({
      /* Top score fields */
      ones: [3, 3],
      twos: [6, 6],
      threes: [9, 9],
      fours: [12, 12],
      fives: [15, 15],
      sixes: [18, 18],

      /* Bottom score fields */
      three_kind: [25, 25],
      four_kind: [25, 25],
      full_house: [25, 25],
      short_straight: [30, 30],
      long_straight: [40, 40],
      yahtzee: [50, 50],
      chance: [25, 25],

      /* Total score fields */
      top_score: [63, 63],
      bonus: [35, 35],
      top_total: [98, 98],
      bottom_total: [220, 220],
      grand_total: final_scores,
    });
  }, []);
  return <ScoreTable className="testScoreTable" />;
};

const setupTestDom = ({ active_player, turns_remaining, final_scores }) => {
  return (
    <BrowserRouter>
      <GameStateProvider>
        <TurnStateProvider>
          <ScoresProvider>
            <TestScoreTable
              active_player={active_player}
              turns_remaining={turns_remaining}
              final_scores={final_scores}
            />
          </ScoresProvider>
        </TurnStateProvider>
      </GameStateProvider>
    </BrowserRouter>
  );
};

describe("<ScoreTable />", () => {
  it("highlights active player name", () => {
    const active_player = "player1";
    render(
      setupTestDom({
        active_player: active_player,
        turns_remaining: 26,
        final_scores: [0, 0],
      })
    );
    waitFor(() =>
      expect(document.querySelector(`.${active_player}_name`)).toHaveClass(
        "active"
      )
    );
  });
  it("calls relevent table function on click of score field", () => {
    render(
      setupTestDom({
        active_player: "player1",
        turns_remaining: 26,
        final_scores: [0, 0],
      })
    );

    const scoreNumber = jest.fn();
    const onesP1Field = document.querySelector(".onesP1");
    onesP1Field.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    waitFor(() => expect(scoreNumber).toHaveBeenCalledTimes(1));
  });
  it("calls calculateScores function when there are 0 turns remaining", () => {
    const calculateScores = jest.fn();
    render(
      setupTestDom({
        active_player: "player1",
        turns_remaining: 0,
        final_scores: [50, 45],
      })
    );
    waitFor(() => expect(calculateScores).toHaveBeenCalledTimes(1));
  });
});
