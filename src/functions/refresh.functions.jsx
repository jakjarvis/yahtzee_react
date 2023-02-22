import { activePlayerScoreFields } from "./legality.functions";
import {
  topSectionLegal,
  kindxLegal,
  fullHouseLegal,
  shortStraightLegal,
  longStraightLegal,
  yahtzeeLegal,
} from "./legality.functions";

//added player1 and plyer2 as strings until calculate scores is added
let player1 = "player1";
let player2 = "player2";
function calculateScores(player) {
  console.log("Add calculateScores function");
}

function updateGameState(game_id, active_player, turns_remaining) {
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

export function reset_dice(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  activePlayerScores
) {
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

  console.log("Stated turns remaining:", turns_remaining);
  turns_remaining -= 1;
  console.log("Stated turns remaining:", turns_remaining);

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
    if (active_player == "player1") {
      active_player = "player2";
    } else {
      active_player = "player1";
    }
  } else {
    calculateScores(player1);
    calculateScores(player2);
    document.querySelector(".btn-roll").classList.add("hidden");
    document.getElementById("btn-reset").classList.remove("hidden");
    if (
      parseInt(player1.grandTotal.textContent) >
      parseInt(player2.grandTotal.textContent)
    ) {
      document.querySelector(".rolls-text").textContent = "Player 1 wins!";
    } else if (
      parseInt(player2.grandTotal.textContent) >
      parseInt(player1.grandTotal.textContent)
    ) {
      document.querySelector(".rolls-text").textContent = "Player 2 wins!";
    } else {
      document.querySelector(".rolls-text").textContent = "It's a tie!";
    }
  }

  updateGameState(game_id, active_player, turns_remaining);

  setGameState({
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  });

  console.log("Stated turns remaining:", turns_remaining);

  setTurnState({ diceValues, heldDice, rollsLeft, numbers });
}

export function postScores(
  active_player,
  scores1_id,
  scores2_id,
  field,
  score
) {
  let scores_id;
  if (active_player == "player1") {
    scores_id = scores1_id;
  } else {
    scores_id = scores2_id;
  }
  let body = {};
  body[field] = score;
  console.log(`Putting ${body}`);
  fetch(`http://127.0.0.1:8000/yahtzee/api/scores/${scores_id}`, {
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
