import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { GameStateProvider } from "./contexts/game-state.context";
import { ScoresProvider } from "./contexts/scores.context";
import { MemoryRouter } from "react-router-dom";

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

  // REACTIVATE THIS TEST WITH MOCKED GAME COMPONENT
  // it("routes to the game page", async () => {
  //   const gamePath = "/game/25";

  //   render(
  //     <MemoryRouter initialEntries={[gamePath]}>
  //       <GameStateProvider>
  //         <ScoresProvider>
  //           <App />
  //         </ScoresProvider>
  //       </GameStateProvider>
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByTestId("game_board")).toBeInTheDocument();
  // });

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
