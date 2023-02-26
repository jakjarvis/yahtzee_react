// FUNCTIONS:
// - calculateScores
// - reset_dice
// - highlightActivePlayer

import { postGameState, postScores } from "../functions/fetch.functions";

export function calculateScores(context) {
  let scoresObject = context.scoresState;
  for (let playerId = 0; playerId < 2; playerId++) {
    let playerRef = playerId + 1;

    let {
      ones,
      twos,
      threes,
      fours,
      fives,
      sixes,
      three_kind,
      four_kind,
      full_house,
      short_straight,
      long_straight,
      yahtzee,
      chance,
      top_score,
      bonus,
      top_total,
      bottom_total,
      grand_total,
    } = scoresObject;

    top_score[playerId] += parseInt(ones[playerId]);
    top_score[playerId] += parseInt(twos[playerId]);
    top_score[playerId] += parseInt(threes[playerId]);
    top_score[playerId] += parseInt(fours[playerId]);
    top_score[playerId] += parseInt(fives[playerId]);
    top_score[playerId] += parseInt(sixes[playerId]);

    if (top_score[playerId] >= 63) {
      bonus[playerId] = 35;
    } else {
      bonus[playerId] = 0;
    }

    top_total[playerId] = top_score[playerId] + bonus[playerId];

    bottom_total[playerId] += parseInt(three_kind[playerId]);
    bottom_total[playerId] += parseInt(four_kind[playerId]);
    bottom_total[playerId] += parseInt(full_house[playerId]);
    bottom_total[playerId] += parseInt(short_straight[playerId]);
    bottom_total[playerId] += parseInt(long_straight[playerId]);
    bottom_total[playerId] += parseInt(yahtzee[playerId]);
    bottom_total[playerId] += parseInt(chance[playerId]);

    grand_total[playerId] =
      top_score[playerId] + bonus[playerId] + bottom_total[playerId];

    document.querySelector(`.top_initialP${playerRef}`).textContent =
      top_score[playerId];
    document.querySelector(`.top_bonusP${playerRef}`).textContent =
      bonus[playerId];
    document.querySelector(`.top_totalP${playerRef}`).textContent =
      top_total[playerId];
    document.querySelector(`.top_totalP${playerRef}_repeat`).textContent =
      top_total[playerId];
    document.querySelector(`.bottom_totalP${playerRef}`).textContent =
      bottom_total[playerId];
    document.querySelector(`.grand_totalP${playerRef}`).textContent =
      grand_total;
  }

  let player1scores = {};
  let player2scores = {};
  for (const score in scoresObject) {
    player1scores[score] = scoresObject[score][0];
  }
  for (const score in scoresObject) {
    player2scores[score] = scoresObject[score][1];
  }
  postScores(context, player1scores);
  postScores(context, player2scores);
}

export function reset_dice(context) {
  let {
    game_id,
    gameState,
    setGameState,
    turnState,
    setTurnState,
    activePlayerScores,
  } = context;

  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;

  let { diceValues, heldDice, rollsLeft, numbers } = turnState;

  const rollsCountEl = document.querySelector(".rolls-remaining");

  turns_remaining -= 1;

  for (let i = 0; i < 5; i++) {
    const diceElement = document.querySelector(`.dice${i}`);
    diceElement.classList.add("hidden");
    diceElement.classList.remove("hold");
    heldDice[i] = 0;
  }

  let fieldArray = [
    activePlayerScores.onesScore,
    activePlayerScores.twosScore,
    activePlayerScores.threesScore,
    activePlayerScores.foursScore,
    activePlayerScores.fivesScore,
    activePlayerScores.sixesScore,
    activePlayerScores.kind3Score,
    activePlayerScores.kind4Score,
    activePlayerScores.houseScore,
    activePlayerScores.shortScore,
    activePlayerScores.longScore,
    activePlayerScores.yahtzeeScore,
    activePlayerScores.chanceScore,
  ];

  for (let i = 0; i < fieldArray.length; i++) {
    fieldArray[i].classList.remove("legal");
    fieldArray[i].classList.remove("nullable");
    rollsCountEl.textContent = "";
  }

  if (turns_remaining > 0) {
    rollsLeft = 3;
    rollsCountEl.textContent = rollsLeft;
    numbers = [0, 0, 0, 0, 0, 0];
    if (active_player === "player1") {
      active_player = "player2";
    } else {
      active_player = "player1";
    }
  } else {
  }

  postGameState(game_id, active_player, turns_remaining);
  setGameState({
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  });

  setTurnState({ diceValues, heldDice, rollsLeft, numbers });
}

export function highlightActivePlayer(gameState) {
  if (gameState.active_player === "player1") {
    document.querySelector(".player1_name").classList.add("active");
    document.querySelector(".player2_name").classList.remove("active");
  } else {
    document.querySelector(".player1_name").classList.remove("active");
    document.querySelector(".player2_name").classList.add("active");
  }
}
