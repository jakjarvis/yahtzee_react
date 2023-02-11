"use strict";
//
/* DEFINE ELEMENTS */
/* Buttons */
const rollBtn = document.querySelector(".btn-roll");
const resetBtn = document.getElementById("btn-reset");

/* Dice */
const dice0El = document.querySelector(".dice0");
const dice1El = document.querySelector(".dice1");
const dice2El = document.querySelector(".dice2");
const dice3El = document.querySelector(".dice3");
const dice4El = document.querySelector(".dice4");

/* Roll counter */
const rollsCountEl = document.querySelector(".rolls-remaining");

// DUMMY VARIABLES

const player1Name = "Dummy1";
const player2Name = "Dummy2";
const scores1Id = 1;
const scores2Id = 2;
let activePlayerRef = 1;
let turnsRemaining = 25;

/* Submit Form */
const form = document.getElementById("submit_form");

/* DEFINE OBJECTS */

const gameId = window.location.pathname.split("/yahtzee/")[1];

const player1 = {
  name: player1Name,
  nameEl: document.querySelector(".player1_name"),
  scoresId: scores1Id,
  /* Top score fields */
  onesScore: document.querySelector(".onesP1"),
  twosScore: document.querySelector(".twosP1"),
  threesScore: document.querySelector(".threesP1"),
  foursScore: document.querySelector(".foursP1"),
  fivesScore: document.querySelector(".fivesP1"),
  sixesScore: document.querySelector(".sixesP1"),

  /* Bottom score fields */
  kind3Score: document.querySelector(".kind_3P1"),
  kind4Score: document.querySelector(".kind_4P1"),
  houseScore: document.querySelector(".full_houseP1"),
  shortScore: document.querySelector(".short_straightP1"),
  longScore: document.querySelector(".long_straightP1"),
  yahtzeeScore: document.querySelector(".yahtzeeP1"),
  chanceScore: document.querySelector(".chanceP1"),

  /* Total score fields */
  topInitial: document.querySelector(".top_initialP1"),
  topBonus: document.querySelector(".top_bonusP1"),
  topTotal: document.querySelector(".top_totalP1"),
  topTotalRepeat: document.querySelector(".top_totalP1_repeat"),
  bottomTotal: document.querySelector(".bottom_totalP1"),
  grandTotal: document.querySelector(".grand_totalP1"),
};

const player2 = {
  name: player2Name,
  nameEl: document.querySelector(".player2_name"),
  scoresId: scores2Id,
  /* Top score fields */
  onesScore: document.querySelector(".onesP2"),
  twosScore: document.querySelector(".twosP2"),
  threesScore: document.querySelector(".threesP2"),
  foursScore: document.querySelector(".foursP2"),
  fivesScore: document.querySelector(".fivesP2"),
  sixesScore: document.querySelector(".sixesP2"),

  /* Bottom score fields */
  kind3Score: document.querySelector(".kind_3P2"),
  kind4Score: document.querySelector(".kind_4P2"),
  houseScore: document.querySelector(".full_houseP2"),
  shortScore: document.querySelector(".short_straightP2"),
  longScore: document.querySelector(".long_straightP2"),
  yahtzeeScore: document.querySelector(".yahtzeeP2"),
  chanceScore: document.querySelector(".chanceP2"),

  /* Total score fields */
  topInitial: document.querySelector(".top_initialP2"),
  topBonus: document.querySelector(".top_bonusP2"),
  topTotal: document.querySelector(".top_totalP2"),
  topTotalRepeat: document.querySelector(".top_totalP2_repeat"),
  bottomTotal: document.querySelector(".bottom_totalP2"),
  grandTotal: document.querySelector(".grand_totalP2"),
};

/* DEFINE VARIABLES */
// Now in Game State context
let diceValues = [1, 2, 3, 4, 5];
let heldDice = [0, 0, 0, 0, 0];
let rollsLeft = 3;
let numbers = [0, 0, 0, 0, 0, 0];
let activePlayer = eval(activePlayerRef);

var dice1src = "assets/dice-1.png";
var dice2src = "assets/dice-2.png";
var dice3src = "assets/dice-3.png";
var dice4src = "assets/dice-4.png";
var dice5src = "assets/dice-5.png";
var dice6src = "assets/dice-6.png";

/* DEFINE FUNCTIONS */

/* Reset Game */
resetBtn.addEventListener("click", function () {
  location.reload();
});

/* Calculate dice values */
function numberArray() {
  let numbers = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    numbers[diceValues[i] - 1] += 1;
  }
  return numbers;
}

/* Define score highlighting */
function highlightScore(legalFunction, scoreField) {
  if (legalFunction === true) {
    scoreField.classList.add("legal");
    scoreField.classList.remove("nullable");
  } else if (scoreField.textContent === "") {
    scoreField.classList.remove("legal");
    scoreField.classList.add("nullable");
  } else {
    scoreField.classList.remove("legal");
    scoreField.classList.remove("nullable");
  }
}

/* Reset after selection */
function reset_dice() {
  turnsRemaining -= 1;

  for (let i = 0; i < 5; i++) {
    const diceElement = document.querySelector(`.dice${i}`);
    diceElement.classList.add("hidden");
    diceElement.classList.remove("hold");
    heldDice[i] = 0;
  }

  let fieldArray = [
    activePlayer.onesScore,
    activePlayer.twosScore,
    activePlayer.threesScore,
    activePlayer.foursScore,
    activePlayer.fivesScore,
    activePlayer.sixesScore,
    activePlayer.kind3Score,
    activePlayer.kind4Score,
    activePlayer.houseScore,
    activePlayer.shortScore,
    activePlayer.longScore,
    activePlayer.yahtzeeScore,
    activePlayer.chanceScore,
  ];

  for (let i = 0; i < fieldArray.length; i++) {
    fieldArray[i].classList.remove("legal");
    fieldArray[i].classList.remove("nullable");
    rollsCountEl.textContent = "";
  }

  if (turnsRemaining > 0) {
    rollsLeft = 3;
    rollsCountEl.textContent = rollsLeft;
    numbers = [0, 0, 0, 0, 0, 0];
  } else {
    calculateScores(player1);
    calculateScores(player2);
    rollBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
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
}

/* Roll dice */

function randomiseDiceImage(diceElement) {
  let randHeight = Math.trunc(Math.random() * 5);
  let randWidth = Math.trunc(Math.random() * 5);
  let randAngle = Math.trunc(Math.random() * 90);

  diceElement.style.top = `${randHeight}vw`;
  diceElement.style.left = `${randWidth}vw`;
  diceElement.style.transform = `rotate(${randAngle}deg)`;
}

function rollDice() {
  refresh_listeners();
  for (let i = 0; i < 5; i++) {
    if (heldDice[i] === 0) {
      console.log(`Dice is ${i}`);
      const result = Math.trunc(Math.random() * 6) + 1;
      console.log(`Result is ${result}`);
      diceValues[i] = result;
      const diceElement = document.querySelector(`.dice${i}`);
      randomiseDiceImage(diceElement);
      diceElement.classList.remove("hidden");
      diceElement.src = window[`dice${diceValues[i]}src`];
    }
  }
  rollsLeft -= 1;
  rollsCountEl.textContent = rollsLeft;
  numbers = numberArray();
  highlight();
}

// rollBtn.addEventListener("click", function () {
//   console.log("Roll clicked");
//   if (rollsLeft > 0) {
//     rollDice();
//   }
// });

/* Hold dice */
function holdDie(diceXEl, diceNumber) {
  diceXEl.classList.toggle("hold");
  if (diceXEl.classList.contains("hold")) {
    heldDice[diceNumber] = diceValues[diceNumber];
  } else {
    heldDice[diceNumber] = 0;
  }
  console.log(`Held dice are ${heldDice}`);
}

dice0El.addEventListener("click", function () {
  holdDie(dice0El, 0);
});
dice1El.addEventListener("click", function () {
  holdDie(dice1El, 1);
});
dice2El.addEventListener("click", function () {
  holdDie(dice2El, 2);
});
dice3El.addEventListener("click", function () {
  holdDie(dice3El, 3);
});
dice4El.addEventListener("click", function () {
  holdDie(dice4El, 4);
});

/* Define legality functions */
function topSectionLegal(scoreField) {
  if (scoreField.textContent === "") {
    return true;
  } else {
    return false;
  }
}

function kindxLegal(scoreField, x) {
  if (
    (numbers.includes(x) || numbers.includes(4) || numbers.includes(5)) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function fullHouseLegal(scoreField) {
  if (
    numbers.includes(2) &&
    numbers.includes(3) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function shortStraightLegal(scoreField) {
  if (
    ((numbers[0] > 0 && numbers[1] > 0 && numbers[2] > 0 && numbers[3] > 0) ||
      (numbers[1] > 0 && numbers[2] > 0 && numbers[3] > 0 && numbers[4] > 0) ||
      (numbers[2] > 0 && numbers[3] > 0 && numbers[4] > 0 && numbers[5] > 0)) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function longStraightLegal(scoreField) {
  if (
    ((numbers[0] > 0 &&
      numbers[1] > 0 &&
      numbers[2] > 0 &&
      numbers[3] > 0 &&
      numbers[4] > 0) ||
      (numbers[1] > 0 &&
        numbers[2] > 0 &&
        numbers[3] > 0 &&
        numbers[4] > 0 &&
        numbers[5] > 0)) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function yahtzeeLegal(scoreField) {
  if (numbers.includes(5) && scoreField.textContent === "") {
    return true;
  } else {
    return false;
  }
}

/* Define the highlight function (highlight all legal fields)*/

function highlight() {
  /* Top Section */
  /*highlightScore(topSectionLegal(onesScore), onesScore);*/
  highlightScore(
    topSectionLegal(activePlayer.onesScore),
    activePlayer.onesScore
  );
  highlightScore(
    topSectionLegal(activePlayer.twosScore),
    activePlayer.twosScore
  );
  highlightScore(
    topSectionLegal(activePlayer.threesScore),
    activePlayer.threesScore
  );
  highlightScore(
    topSectionLegal(activePlayer.foursScore),
    activePlayer.foursScore
  );
  highlightScore(
    topSectionLegal(activePlayer.fivesScore),
    activePlayer.fivesScore
  );
  highlightScore(
    topSectionLegal(activePlayer.sixesScore),
    activePlayer.sixesScore
  );

  /* Bottom Section */

  highlightScore(
    kindxLegal(activePlayer.kind3Score, 3),
    activePlayer.kind3Score
  );
  highlightScore(
    kindxLegal(activePlayer.kind4Score, 4),
    activePlayer.kind4Score
  );
  highlightScore(
    fullHouseLegal(activePlayer.houseScore),
    activePlayer.houseScore
  );
  highlightScore(
    shortStraightLegal(activePlayer.shortScore),
    activePlayer.shortScore
  );
  highlightScore(
    longStraightLegal(activePlayer.longScore),
    activePlayer.longScore
  );
  highlightScore(
    yahtzeeLegal(activePlayer.yahtzeeScore),
    activePlayer.yahtzeeScore
  );
  highlightScore(
    topSectionLegal(activePlayer.chanceScore),
    activePlayer.chanceScore
  );
}

/* Define score setting */

/* Switch player */
function switchPlayer() {
  if (activePlayer === player1) {
    return "player2";
  } else {
    return "player1";
  }
}

function refresh_listeners() {
  activePlayer.onesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.onesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 1) {
          score += 1;
        }
        activePlayer.onesScore.textContent = score;
        updateForm("ones", activePlayer.scoresId, score);
      }
      reset_dice();
    }
  });

  activePlayer.twosScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.twosScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 2) {
          score += 2;
        }
        activePlayer.twosScore.textContent = score;
        updateForm("twos", activePlayer.scoresId, score);
      }
      reset_dice();
    }
  });
  activePlayer.threesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.threesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 3) {
          score += 3;
        }
        activePlayer.threesScore.textContent = score;
        updateForm("threes", activePlayer.scoresId, score);
      }
      reset_dice();
    }
  });
  activePlayer.foursScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.foursScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 4) {
          score += 4;
        }
        activePlayer.foursScore.textContent = score;
        updateForm("fours", activePlayer.scoresId, score);
      }
      reset_dice();
    }
  });
  activePlayer.fivesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.fivesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 5) {
          score += 5;
        }
        activePlayer.fivesScore.textContent = score;
        updateForm("fives", activePlayer.scoresId, score);
      }
      reset_dice();
    }
  });
  activePlayer.sixesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.sixesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 6) {
          score += 6;
        }
        activePlayer.sixesScore.textContent = score;
        updateForm("sixes", activePlayer.scoresId, score);
      }
      reset_dice();
    }
  });

  /* Bottom Section */
  activePlayer.kind3Score.addEventListener("click", function () {
    if (kindxLegal(activePlayer.kind3Score, 3)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayer.kind3Score.textContent = score;
      updateForm("three_kind", activePlayer.scoresId, score);
      reset_dice();
    } else if (activePlayer.kind3Score.textContent === "") {
      activePlayer.kind3Score.textContent = 0;
      updateForm("ones", activePlayer.scoresId, 0);
      reset_dice();
    }
  });

  activePlayer.kind4Score.addEventListener("click", function () {
    if (kindxLegal(activePlayer.kind4Score, 4)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayer.kind4Score.textContent = score;
      updateForm("four_kind", activePlayer.scoresId, score);
      reset_dice();
    } else if (activePlayer.kind4Score.textContent === "") {
      activePlayer.kind4Score.textContent = 0;
      updateForm("four_kind", activePlayer.scoresId, 0);
      reset_dice();
    }
  });

  activePlayer.houseScore.addEventListener("click", function () {
    if (fullHouseLegal(activePlayer.houseScore)) {
      activePlayer.houseScore.textContent = 25;
      updateForm("full_house", activePlayer.scoresId, 25);
      reset_dice();
    } else if (activePlayer.houseScore.textContent === "") {
      activePlayer.houseScore.textContent = 0;
      updateForm("full_house", activePlayer.scoresId, 0);
      reset_dice();
    }
  });

  activePlayer.shortScore.addEventListener("click", function () {
    if (shortStraightLegal(activePlayer.shortScore)) {
      activePlayer.shortScore.textContent = 30;
      updateForm("short_straight", activePlayer.scoresId, 30);
      reset_dice();
    } else if (activePlayer.shortScore.textContent === "") {
      activePlayer.shortScore.textContent = 0;
      updateForm("short_straight", activePlayer.scoresId, 0);
      reset_dice();
    }
  });

  activePlayer.longScore.addEventListener("click", function () {
    if (longStraightLegal(activePlayer.longScore)) {
      activePlayer.longScore.textContent = 40;
      updateForm("long_straight", activePlayer.scoresId, 40);
      reset_dice();
    } else if (activePlayer.longScore.textContent === "") {
      activePlayer.longScore.textContent = 0;
      updateForm("long_straight", activePlayer.scoresId, 0);
      reset_dice();
    }
  });

  activePlayer.yahtzeeScore.addEventListener("click", function () {
    if (yahtzeeLegal(activePlayer.yahtzeeScore)) {
      activePlayer.yahtzeeScore.textContent = 50;
      updateForm("yahtzee", activePlayer.scoresId, 50);
      reset_dice();
    } else if (activePlayer.yahtzeeScore.textContent === "") {
      activePlayer.yahtzeeScore.textContent = 0;
      updateForm("yahtzee", activePlayer.scoresId, 0);
      reset_dice();
    }
  });

  activePlayer.chanceScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.chanceScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayer.chanceScore.textContent = score;
      updateForm("chance", activePlayer.scoresId, score);
      reset_dice();
    }
  });
}

function calculateScores(player) {
  let topInitialScore = 0;
  let bonusScore = 0;
  let topTotalScore = 0;
  let bottomScore = 0;
  let grandTotalScore = 0;

  topInitialScore += parseInt(player.onesScore.textContent);
  topInitialScore += parseInt(player.twosScore.textContent);
  topInitialScore += parseInt(player.threesScore.textContent);
  topInitialScore += parseInt(player.foursScore.textContent);
  topInitialScore += parseInt(player.fivesScore.textContent);
  topInitialScore += parseInt(player.sixesScore.textContent);

  if (topInitialScore >= 63) {
    bonusScore = 35;
  }

  topTotalScore = topInitialScore + bonusScore;

  bottomScore += parseInt(player.kind3Score.textContent);
  bottomScore += parseInt(player.kind4Score.textContent);
  bottomScore += parseInt(player.houseScore.textContent);
  bottomScore += parseInt(player.shortScore.textContent);
  bottomScore += parseInt(player.longScore.textContent);
  bottomScore += parseInt(player.yahtzeeScore.textContent);
  bottomScore += parseInt(player.chanceScore.textContent);

  grandTotalScore = topTotalScore + bonusScore + bottomScore;

  player.topInitial.textContent = topInitialScore;
  player.topBonus.textContent = bonusScore;
  player.topTotal.textContent = topTotalScore;
  player.bottomTotal.textContent = bottomScore;
  player.grandTotal.textContent = grandTotalScore;
}

// const displayScores1 = () => {
//   /* Top score fields */
//   player1.onesScore.textContent = removeNones("{{ scores1.ones }}");
//   player1.twosScore.textContent = removeNones("{{ scores1.twos }}");
//   player1.threesScore.textContent = removeNones("{{ scores1.threes }}");
//   player1.foursScore.textContent = removeNones("{{ scores1.fours }}");
//   player1.fivesScore.textContent = removeNones("{{ scores1.fives }}");
//   player1.sixesScore.textContent = removeNones("{{ scores1.sixes }}");

//   /* Bottom score fields */
//   player1.kind3Score.textContent = removeNones("{{ scores1.three_kind }}");
//   player1.kind4Score.textContent = removeNones("{{ scores1.four_kind }}");
//   player1.houseScore.textContent = removeNones("{{ scores1.full_house }}");
//   player1.shortScore.textContent = removeNones(
//     "{{ scores1.short_straight }}"
//   );
//   player1.longScore.textContent = removeNones(
//     "{{ scores1.long_straight }}"
//   );
//   player1.yahtzeeScore.textContent = removeNones("{{ scores1.yahtzee }}");
//   player1.chanceScore.textContent = removeNones("{{ scores1.chance }}");

//   /* Total score fields */
//   player1.topInitial.textContent = removeNones("{{ scores1.top_score }}");
//   player1.topBonus.textContent = removeNones("{{ scores1.bonus }}");
//   player1.topTotal.textContent = removeNones("{{ scores1.top_total }}");
//   player1.topTotalRepeat.textContent = removeNones(
//     "{{ scores1.top_total }}"
//   );
//   player1.bottomTotal.textContent = removeNones(
//     "{{ scores1.bottom_total }}"
//   );
//   player1.grandTotal.textContent = removeNones("{{ scores1.grand_total }}");
// };

// const displayScores2 = () => {
//   player2.onesScore.textContent = removeNones("{{ scores2.ones }}");
//   player2.twosScore.textContent = removeNones("{{ scores2.twos }}");
//   player2.threesScore.textContent = removeNones("{{ scores2.threes }}");
//   player2.foursScore.textContent = removeNones("{{ scores2.fours }}");
//   player2.fivesScore.textContent = removeNones("{{ scores2.fives }}");
//   player2.sixesScore.textContent = removeNones("{{ scores2.sixes }}");

//   /* Bottom score fields */
//   player2.kind3Score.textContent = removeNones("{{ scores2.three_kind }}");
//   player2.kind4Score.textContent = removeNones("{{ scores2.four_kind }}");
//   player2.houseScore.textContent = removeNones("{{ scores2.full_house }}");
//   player2.shortScore.textContent = removeNones(
//     "{{ scores2.short_straight }}"
//   );
//   player2.longScore.textContent = removeNones(
//     "{{ scores2.long_straight }}"
//   );
//   player2.yahtzeeScore.textContent = removeNones("{{ scores2.yahtzee }}");
//   player2.chanceScore.textContent = removeNones("{{ scores2.chance }}");

//   /* Total score fields */
//   player2.topInitial.textContent = removeNones("{{ scores2.top_score }}");
//   player2.topBonus.textContent = removeNones("{{ scores2.bonus }}");
//   player2.topTotal.textContent = removeNones("{{ scores2.top_total }}");
//   player2.topTotalRepeat.textContent = removeNones(
//     "{{ scores2.top_total }}"
//   );
//   player2.bottomTotal.textContent = removeNones(
//     "{{ scores2.bottom_total }}"
//   );
//   player2.grandTotal.textContent = removeNones("{{ scores2.grand_total }}");
// };

// New functions from django implementation

const updateForm = (field, scores_id, score) => {
  document.getElementById("field").value = field;
  document.getElementById("scores_id").value = scores_id;
  document.getElementById("score").value = score;
  document.getElementById("active_player").value = switchPlayer();
  document.getElementById("turns_remaining").value = turnsRemaining - 1;
  form.submit();
};

const removeNones = (score) => {
  if (score == "None") {
    return "";
  } else {
    return score;
  }
};

window.onload = function () {
  displayScores1();
  displayScores2();
  eval(activePlayer).nameEl.classNameList.add("active");
  console.log("Turns remianing: ", turnsRemaining);
};
