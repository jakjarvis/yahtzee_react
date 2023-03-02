// FUNCTIONS:
// - setupGame
// - getGameState
// - postGameState
// - postScores;

import {
  guestAlert,
  getGameState,
  setupGame,
  putAndSetGameState,
  putAndSetScores,
} from "./fetch.functions";

beforeEach(() => {
  fetch.resetMocks();
});

const exampleTurnState = {
  diceValues: [1, 2, 3, 4, 5],
  heldDice: [0, 0, 0, 0, 0],
  rollsLeft: 2,
  numbers: [1, 1, 1, 1, 1, 0],
};

const exampleGameResponse = {
  active_player: ["player1"],
  player1_name: [6],
  player2_name: [6],
  scores1_id: [9],
  scores2_id: [10],
  turns_remaining: [25],
};

const exampleGameState = {
  active_player: "player1",
  player1: "Guest",
  player2: "Guest",
  scores1_id: 9,
  scores2_id: 10,
  turns_remaining: 25,
};

const exampleScoresResponse = {
  ones: 3,
  twos: null,
  threes: 9,
  fours: null,
  fives: 15,
  sixes: null,

  three_kind: 15,
  four_kind: null,
  full_house: 25,
  short_straight: null,
  long_straight: 40,
  yahtzee: null,
  chance: 24,

  top_score: null,
  bonus: null,
  top_total: null,
  bottom_total: null,
  grand_total: null,
};

const exampleScoresState = {
  ones: [3, null],
  twos: [null, 6],
  threes: [9, null],
  fours: [null, 12],
  fives: [15, null],
  sixes: [null, 18],

  three_kind: [15, null],
  four_kind: [null, 15],
  full_house: [25, null],
  short_straight: [null, 30],
  long_straight: [40, null],
  yahtzee: [null, 50],
  chance: [null, null],

  top_score: [null, null],
  bonus: [null, null],
  top_total: [null, null],
  bottom_total: [null, null],
  grand_total: [null, null],
};

jest.mock("./refresh.functions");

describe("guestAlert()", () => {
  const body = {
    player1: "player1Name",
    player2: "player2Name",
  };
  window.alert = jest.fn();
  it("should call window.alert specifying Guest when non-user is input", () => {
    guestAlert(body, [true, false]);
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("player2Name")
    );
    expect(window.alert).not.toHaveBeenCalledWith(
      expect.stringContaining("player1Name")
    );
  });
  it("should not call window.alert if both players are registered users", () => {
    guestAlert(body, [true, true]);
    expect(window.alert).not.toBeCalled;
  });
});

describe("setupGame()", () => {
  const navigate = (url) => {
    return url;
  };
  window.alert = jest.fn();
  it("should retrieve new game ID and route to new game url", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        game_id: 25,
        user_array: [true, false],
      })
    );
    const url = await setupGame(navigate, "Player1", "Player2");
    expect(url).toEqual("/game/25");
  });
  it("should call serverAlert if fetch is rejected", async () => {
    fetch.mockRejectOnce(() => Promise.reject("API is down"));
    await setupGame(navigate, "Player1", "Player2");
    expect(window.alert).toHaveBeenCalledWith(
      "Sorry, it looks like the server is down..."
    );
  });
});

describe("getGameState()", () => {
  const logGame = jest.fn();
  const logScores = jest.fn();

  it("should set returned gameState to state", async () => {
    fetch
      .mockResponseOnce(JSON.stringify(exampleGameResponse))
      .mockResponseOnce(JSON.stringify(exampleScoresResponse))
      .mockResponseOnce(JSON.stringify(exampleScoresResponse));
    await getGameState(logGame, logScores, 1);
    expect(logGame).toHaveBeenCalledTimes(1);
    expect(logGame).toHaveBeenCalledWith(
      expect.objectContaining({ scores1_id: exampleGameResponse.scores1_id[0] })
    );
  });

  it("should set returned scoresState to state", async () => {
    fetch
      .mockResponseOnce(JSON.stringify(exampleGameResponse))
      .mockResponseOnce(JSON.stringify(exampleScoresResponse))
      .mockResponseOnce(JSON.stringify(exampleScoresResponse));
    await getGameState(logGame, logScores, 1);
    expect(logScores).toHaveBeenCalledTimes(2);
    expect(logScores).toHaveBeenCalledWith(
      expect.objectContaining({
        long_straight: [
          exampleScoresResponse.long_straight,
          exampleScoresResponse.long_straight,
        ],
      })
    );
  });
  it("should call serverAlert if fetch is rejected", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    await getGameState(logGame, logScores, 1);
    expect(window.alert).toHaveBeenCalledWith(
      "Sorry, it looks like the server is down..."
    );
  });
});

describe("putAndSetGameState()", () => {
  const setGameState = jest.fn();
  it("should set the state of active_player and turns_remaining based on the response of the put call, without changing other gameState properties", async () => {
    fetch.mockResponse(JSON.stringify(exampleGameResponse));
    await putAndSetGameState({
      game_id: 5,
      gameState: exampleGameState,
      setGameState,
    });
    expect(setGameState).toHaveBeenCalledWith(exampleGameState);
  });
  it("should call serverAlert if fetch is rejected", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    await putAndSetGameState({
      game_id: 5,
      gameState: exampleGameState,
      setGameState,
    });
    expect(window.alert).toHaveBeenCalledWith(
      "Sorry, it looks like the server is down..."
    );
  });
});

describe("putAndSetGameState()", () => {
  const setScoresState = jest.fn();
  it("should set the scores state of the correct player based on the response from the put call", async () => {
    fetch.mockResponse(JSON.stringify(exampleScoresResponse));
    await putAndSetScores(
      {
        gameState: exampleGameState,
        scoresState: exampleScoresState,
        setScoresState,
        turnState: exampleTurnState,
      },
      { chance: 24 }
    );
    let scoresObject = exampleScoresState;
    scoresObject.chance[0] = 24;
    expect(setScoresState).toHaveBeenCalledWith(scoresObject);
  });
  it("should call serverAlert if fetch is rejected", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    await putAndSetScores(
      {
        gameState: exampleGameState,
        scoresState: exampleScoresState,
        setScoresState,
        turnState: exampleTurnState,
      },
      { chance: 24 }
    );
    expect(window.alert).toHaveBeenCalledWith(
      "Sorry, it looks like the server is down..."
    );
  });
});
