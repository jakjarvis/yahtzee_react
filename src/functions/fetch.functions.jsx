// FUNCTIONS:
// - getGameState
// - postGameState
// - postScores;

import { reset_dice } from "./refresh.functions";

export async function getGameState(setGameState, setScoresState, game_id) {
  let stateObject = {
    active_player: null,
    player1_name: null,
    player2_name: null,
    scores1_id: null,
    scores2_id: null,
    turns_remaining: null,
  };
  await fetch(`http://127.0.0.1:8000/yahtzee/api/game/${game_id}`)
    .then((response) => response.json())
    .then((state) => {
      for (var property in state) {
        stateObject[property] = state[property][0];
      }
      return stateObject;
    })
    .then((state) => {
      setGameState(state);
    });

  await fetch(
    `http://127.0.0.1:8000/yahtzee/api/scores/${stateObject.scores1_id}`
  )
    .then((response) => response.json())
    .then((scores) => {
      updateScoresObject(scores, 0);
    });

  await fetch(
    `http://127.0.0.1:8000/yahtzee/api/scores/${stateObject.scores2_id}`
  )
    .then((response) => response.json())
    .then((scores) => {
      let scoresObject = updateScoresObject(scores, 1);
      return scoresObject;
    })
    .then((value) => {
      setScoresState(value);
    });
  return;
}

const updateScoresObject = (scores, player) => {
  let scoresObject = {
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
  };
  for (const score in scores) {
    scoresObject[score][player] = scores[score];
  }
  return scoresObject;
};

export function postGameState(game_id, active_player, turns_remaining) {
  let body = {
    active_player: active_player,
    turns_remaining: turns_remaining,
  };
  fetch(`http://127.0.0.1:8000/yahtzee/api/game/${game_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function postScores(context, body) {
  let { gameState, setScoresState } = context;
  let scores_id, playerRef;
  if (gameState.active_player === "player1") {
    scores_id = gameState.scores1_id;
    playerRef = 1;
  } else {
    scores_id = gameState.scores2_id;
    playerRef = 2;
  }

  fetch(`http://127.0.0.1:8000/yahtzee/api/scores/${scores_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      if (playerRef === 1) {
        let scoresObject = {};
        for (const score in json) {
          scoresObject[score] = [
            eval(`json.${score}`),
            eval(`scoresState.${score}`)[1],
          ];
        }
        setScoresState(scoresObject);
      } else {
        let scoresObject = {};
        for (const score in json) {
          scoresObject[score] = [
            eval(`scoresState.${score}`)[0],
            eval(`json.${score}`),
          ];
        }
        setScoresState(scoresObject);
        return scoresObject;
      }
    })
    .then(() => {
      reset_dice(context);
    });
}
