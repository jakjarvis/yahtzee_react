import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { GameStateProvider } from "./contexts/game-state.context";
import { ScoresProvider } from "./contexts/scores.context";
import { MemoryRouter } from "react-router-dom";

jest.mock("./routes/game/game.route.jsx");
jest.mock("./routes/title-bar/title-bar.route.jsx");

describe("<App />", () => {
  it("routes to the setup page", () => {
    const setupPath = "/setup";

    render(
      <MemoryRouter initialEntries={[setupPath]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Set up a new game/i)).toBeInTheDocument();
  });

  it("routes to the game page", () => {
    const id = 25;
    const gamePath = `/game/${id}`;

    render(
      <MemoryRouter initialEntries={[gamePath]}>
        <GameStateProvider>
          <ScoresProvider>
            <App />
          </ScoresProvider>
        </GameStateProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(`Game ${id}`)).toBeInTheDocument();
  });

  it("routes to the 404 page on incorrect url", () => {
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
});
