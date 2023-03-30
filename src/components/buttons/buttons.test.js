import { render, waitFor, screen } from "@testing-library/react";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  GameStateProvider,
  GameStateContext,
} from "../../contexts/game-state.context";
import { ScoresProvider } from "../../contexts/scores.context";
import {
  TurnStateProvider,
  TurnStateContext,
} from "../../contexts/turn-state.context";

import Buttons from "./buttons.component";

jest.mock("../../functions/dice.functions.jsx");
jest.mock("../../functions/fetch.functions.jsx");

const TestButtons = (turns_remaining, rollsLeft) => {
  const { setGameState } = useContext(GameStateContext);
  const { setTurnState } = useContext(TurnStateContext);
  useEffect(() => {
    setGameState({ turns_remaining: turns_remaining });
    setTurnState({ rollsLeft: rollsLeft });
  }, []);
  return <Buttons />;
};

const setupTestDOM = (turns_remaining, rollsLeft) => {
  return (
    <BrowserRouter>
      <GameStateProvider>
        <TurnStateProvider>
          <ScoresProvider>
            <TestButtons
              turns_remaining={turns_remaining}
              rollsLeft={rollsLeft}
            />
          </ScoresProvider>
        </TurnStateProvider>
      </GameStateProvider>
    </BrowserRouter>
  );
};

describe("<Buttons />", () => {
  it("hides replay button when turns remaining > 0", () => {
    render(setupTestDOM(26, 1));
    expect(document.getElementsByClassName("btn").length).toBe(2);
    waitFor(() =>
      expect(document.getElementsByClassName("btn hidden").length).toBe(1)
    );
  });

  it("displays replay button when turns remaining = 0", () => {
    render(setupTestDOM(0, 1));
    expect(document.getElementsByClassName("btn").length).toBe(2);
    waitFor(() =>
      expect(document.getElementsByClassName("btn hidden").length).toBe(2)
    );
  });

  it("calls rollDice function when Roll button is clicked if rollsLeft > 0", () => {
    render(setupTestDOM(26, 1));
    const rollDice = jest.fn();
    let rollBtn = document.querySelector(".btn-roll");
    rollBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    waitFor(() => expect(rollDice).toHaveBeenCalledTimes(1));
  });

  it("does not call rollDice function when Roll button is clicked if rollsLeft = 0", () => {
    render(setupTestDOM(26, 0));
    const rollDice = jest.fn();
    let rollBtn = document.querySelector(".btn-roll");
    rollBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    waitFor(() => expect(rollDice).not.toHaveBeenCalled());
  });

  it("calls setupGame function when Replay button is clicked", () => {
    render(setupTestDOM(26, 1));
    const setupGame = jest.fn();
    let replayBtn = document.querySelector(".btn-replay");
    replayBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    waitFor(() => expect(setupGame).toHaveBeenCalledTimes(1));
  });
});
