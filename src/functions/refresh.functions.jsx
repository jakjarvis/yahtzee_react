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

function reset_dice(
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

export function refresh_listeners(
  gameState,
  setGameState,
  turnState,
  setTurnState
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

  const activePlayerScores = activePlayerScoreFields(active_player);

  const updateForm = () => {
    console.log("Add for updating functions");
  };

  activePlayerScores.onesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayerScores.onesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 1) {
          score += 1;
        }
        activePlayerScores.onesScore.textContent = score;
        updateForm("ones", activePlayerScores.scoresId, score);
      }
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  activePlayerScores.twosScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayerScores.twosScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 2) {
          score += 2;
        }
        activePlayerScores.twosScore.textContent = score;
        updateForm("twos", activePlayerScores.scoresId, score);
      }
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });
  activePlayerScores.threesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayerScores.threesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 3) {
          score += 3;
        }
        activePlayerScores.threesScore.textContent = score;
        updateForm("threes", activePlayerScores.scoresId, score);
      }
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });
  activePlayerScores.foursScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayerScores.foursScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 4) {
          score += 4;
        }
        activePlayerScores.foursScore.textContent = score;
        updateForm("fours", activePlayerScores.scoresId, score);
      }
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });
  activePlayerScores.fivesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayerScores.fivesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 5) {
          score += 5;
        }
        activePlayerScores.fivesScore.textContent = score;
        updateForm("fives", activePlayerScores.scoresId, score);
      }
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });
  activePlayerScores.sixesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayerScores.sixesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 6) {
          score += 6;
        }
        activePlayerScores.sixesScore.textContent = score;
        updateForm("sixes", activePlayerScores.scoresId, score);
      }
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  /* Bottom Section */
  activePlayerScores.kind3Score.addEventListener("click", function () {
    if (kindxLegal(activePlayerScores.kind3Score, 3)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayerScores.kind3Score.textContent = score;
      updateForm("three_kind", activePlayerScores.scoresId, score);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (activePlayerScores.kind3Score.textContent === "") {
      activePlayerScores.kind3Score.textContent = 0;
      updateForm("ones", activePlayerScores.scoresId, 0);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  activePlayerScores.kind4Score.addEventListener("click", function () {
    if (kindxLegal(activePlayerScores.kind4Score, 4)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayerScores.kind4Score.textContent = score;
      updateForm("four_kind", activePlayerScores.scoresId, score);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (activePlayerScores.kind4Score.textContent === "") {
      activePlayerScores.kind4Score.textContent = 0;
      updateForm("four_kind", activePlayerScores.scoresId, 0);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  activePlayerScores.houseScore.addEventListener("click", function () {
    if (fullHouseLegal(activePlayerScores.houseScore)) {
      activePlayerScores.houseScore.textContent = 25;
      updateForm("full_house", activePlayerScores.scoresId, 25);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (activePlayerScores.houseScore.textContent === "") {
      activePlayerScores.houseScore.textContent = 0;
      updateForm("full_house", activePlayerScores.scoresId, 0);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  activePlayerScores.shortScore.addEventListener("click", function () {
    if (shortStraightLegal(activePlayerScores.shortScore)) {
      activePlayerScores.shortScore.textContent = 30;
      updateForm("short_straight", activePlayerScores.scoresId, 30);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (activePlayerScores.shortScore.textContent === "") {
      activePlayerScores.shortScore.textContent = 0;
      updateForm("short_straight", activePlayerScores.scoresId, 0);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  activePlayerScores.longScore.addEventListener("click", function () {
    if (longStraightLegal(activePlayerScores.longScore)) {
      activePlayerScores.longScore.textContent = 40;
      updateForm("long_straight", activePlayerScores.scoresId, 40);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (activePlayerScores.longScore.textContent === "") {
      activePlayerScores.longScore.textContent = 0;
      updateForm("long_straight", activePlayerScores.scoresId, 0);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  activePlayerScores.yahtzeeScore.addEventListener("click", function () {
    if (yahtzeeLegal(activePlayerScores.yahtzeeScore)) {
      activePlayerScores.yahtzeeScore.textContent = 50;
      updateForm("yahtzee", activePlayerScores.scoresId, 50);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (activePlayerScores.yahtzeeScore.textContent === "") {
      activePlayerScores.yahtzeeScore.textContent = 0;
      updateForm("yahtzee", activePlayerScores.scoresId, 0);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });

  activePlayerScores.chanceScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayerScores.chanceScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayerScores.chanceScore.textContent = score;
      updateForm("chance", activePlayerScores.scoresId, score);
      reset_dice(
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  });
}
