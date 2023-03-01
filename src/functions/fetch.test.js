// FUNCTIONS:
// - setupGame
// - getGameState
// - postGameState
// - postScores;

import { setupGame } from "./fetch.functions";

describe("setupGame()", () => {
  it("should retrieve new game ID and route to new game url", async () => {
    const navigate = (url) => {
      return url;
    };
    fetch.mockResponseOnce(
      JSON.stringify({
        game_id: 25,
        user_array: [true, false],
      })
    );
    const url = await setupGame(navigate, "Player1", "Player2");
    expect(url).toEqual("/game/25");
  });
});
