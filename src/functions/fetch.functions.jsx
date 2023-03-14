// FUNCTIONS:
// - setupGame
// - getGameState
// - postAndSetGameState
// - postScores;

import { reset_dice } from "./refresh.functions";

const rootURL = "https://apps.jakjarvis.com";

const serverAlert = (error) => {
  window.alert("Sorry, it looks like the server is down...");
  console.log(error);
};

export const guestAlert = (body, user_array) => {
  if (user_array[0] == false && user_array[1] == false) {
    window.alert(
      `${body.player1} and ${body.player2} are not registered users. These players will play as Guests.`
    );
  } else if (user_array[0] == false) {
    window.alert(
      `${body.player1} is not a registered user. This player will play as a Guest.`
    );
  } else if (user_array[1] == false) {
    window.alert(
      `${body.player2} is not a registered user. This player will play as a Guest.`
    );
  }
};

export async function setupGame(navigate, player1Name, player2Name) {
  let body = {
    player1: player1Name,
    player2: player2Name,
  };

  console.log("Players:", body);

  let url;
  await fetch(`${rootURL}/yahtzee/api/setup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      // console.log("Response", response, typeof response);
      return response.json();
    })
    .then((json) => {
      // console.log("json", json, typeof json);
      url = `/game/${json["game_id"]}`;
      guestAlert(body, json["user_array"]);
      navigate(url);
    })
    .catch((error) => serverAlert(error));

  return url;
}

export async function getGameState(setGameState, setScoresState, game_id) {
  let stateObject = {};
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
  await fetch(`${rootURL}/yahtzee/api/game/${game_id}`)
    .then((response) => response.json())
    .then((state) => {
      stateObject = state;
      setGameState(state);
    })
    .catch((error) => serverAlert(error));

  await fetch(`${rootURL}/yahtzee/api/scores/${stateObject.scores1_id}`)
    .then((response) => response.json())
    .then((scores) => {
      scoresObject = updateScoresObject(scoresObject, scores, 0);
    })
    .catch((error) => console.log(error));

  await fetch(`${rootURL}/yahtzee/api/scores/${stateObject.scores2_id}`)
    .then((response) => response.json())
    .then((scores) => {
      scoresObject = updateScoresObject(scoresObject, scores, 1);
      return scoresObject;
    })
    .then((value) => {
      setScoresState(value);
    })
    .catch((error) => console.log(error));
  return;
}

const updateScoresObject = (scoresObject, scores, player) => {
  for (const score in scores) {
    scoresObject[score][player] = scores[score];
  }
  return scoresObject;
};

export async function putAndSetGameState(context) {
  let { game_id, gameState, setGameState } = context;
  let { active_player, turns_remaining, ...restGameState } = gameState;

  let body = {
    active_player: active_player,
    turns_remaining: turns_remaining,
  };
  await fetch(`${rootURL}/yahtzee/api/game/${game_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      setGameState({
        active_player: json.active_player,
        turns_remaining: json.turns_remaining,
        ...restGameState,
      });
    })
    .catch((error) => serverAlert(error));
}

export async function putAndSetScores(context, body) {
  let { gameState, scoresState, setScoresState } = context; // scoreState must remain in becuase of eval call
  let scores_id, playerRef;
  if (gameState.active_player === "player1") {
    scores_id = gameState.scores1_id;
    playerRef = 1;
  } else {
    scores_id = gameState.scores2_id;
    playerRef = 2;
  }

  await fetch(`${rootURL}/yahtzee/api/scores/${scores_id}`, {
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
    })
    .catch((error) => serverAlert(error));
}
