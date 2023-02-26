import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import Game from "./routes/game/game.route";
import { GameStateProvider } from "./contexts/game-state.context";
import { ScoresProvider } from "./contexts/scores.context";
import { TurnStateProvider } from "./contexts/turn-state.context";
import { MemoryRouter } from "react-router-dom";

test("landing on the setup page", () => {
  const setupPath = "/setup";

  render(
    <MemoryRouter initialEntries={[setupPath]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Set up a new game/i)).toBeInTheDocument();
});

test("landing on the game page", () => {
  const gamePath = "/game/25";

  render(
    <MemoryRouter initialEntries={[gamePath]}>
      <GameStateProvider>
        <ScoresProvider>
          <App />
        </ScoresProvider>
      </GameStateProvider>
    </MemoryRouter>
  );

  expect(screen.getByTestId("game_board")).toBeInTheDocument();
});

test("404 on incorrect url", () => {
  const incorrectPath = "/wrong-url";

  render(
    <MemoryRouter initialEntries={[incorrectPath]}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/This is not the url you are looking for/i)
  ).toBeInTheDocument();
});
