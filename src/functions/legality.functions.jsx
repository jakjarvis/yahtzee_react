// FUNCTIONS:
// - topSectionLegal, kindxLegal, fullHouseLegal, shortStraightLegal, longStraightLegal, yahtzeeLegal
// - activePlayerScoreFields
// - highlight

export function topSectionLegal(scoreField) {
  if (scoreField.textContent === "") {
    return true;
  } else {
    return false;
  }
}

export function kindxLegal(scoreField, x, numbers) {
  if (
    (numbers.includes(x) || numbers.includes(4) || numbers.includes(5)) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

export function fullHouseLegal(scoreField, numbers) {
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

export function shortStraightLegal(scoreField, numbers) {
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

export function longStraightLegal(scoreField, numbers) {
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

export function yahtzeeLegal(scoreField, numbers) {
  if (numbers.includes(5) && scoreField.textContent === "") {
    return true;
  } else {
    return false;
  }
}

export function activePlayerScoreFields(activePlayer) {
  let activePlayerRef = activePlayer.charAt(activePlayer.length - 1);
  let activePlayerScores = {
    onesScore: document.querySelector(`.onesP${activePlayerRef}`),
    twosScore: document.querySelector(`.twosP${activePlayerRef}`),
    threesScore: document.querySelector(`.threesP${activePlayerRef}`),
    foursScore: document.querySelector(`.foursP${activePlayerRef}`),
    fivesScore: document.querySelector(`.fivesP${activePlayerRef}`),
    sixesScore: document.querySelector(`.sixesP${activePlayerRef}`),

    /* Bottom score fields */
    kind3Score: document.querySelector(`.kind_3P${activePlayerRef}`),
    kind4Score: document.querySelector(`.kind_4P${activePlayerRef}`),
    houseScore: document.querySelector(`.full_houseP${activePlayerRef}`),
    shortScore: document.querySelector(`.short_straightP${activePlayerRef}`),
    longScore: document.querySelector(`.long_straightP${activePlayerRef}`),
    yahtzeeScore: document.querySelector(`.yahtzeeP${activePlayerRef}`),
    chanceScore: document.querySelector(`.chanceP${activePlayerRef}`),

    /* Total score fields */
    topInitial: document.querySelector(`.top_initialP${activePlayerRef}`),
    topBonus: document.querySelector(`.top_bonusP${activePlayerRef}`),
    topTotal: document.querySelector(`.top_totalP${activePlayerRef}`),
    bottomTotal: document.querySelector(`.bottom_totalP${activePlayerRef}`),
    grandTotal: document.querySelector(`.grand_totalP${activePlayerRef}`),
  };
  return activePlayerScores;
}

const highlightScore = (legalFunction, scoreField) => {
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
};

export function highlight(activePlayer, numbers) {
  const activePlayerScores = activePlayerScoreFields(activePlayer);

  highlightScore(
    topSectionLegal(activePlayerScores.onesScore),
    activePlayerScores.onesScore
  );
  highlightScore(
    topSectionLegal(activePlayerScores.twosScore),
    activePlayerScores.twosScore
  );
  highlightScore(
    topSectionLegal(activePlayerScores.threesScore),
    activePlayerScores.threesScore
  );
  highlightScore(
    topSectionLegal(activePlayerScores.foursScore),
    activePlayerScores.foursScore
  );
  highlightScore(
    topSectionLegal(activePlayerScores.fivesScore),
    activePlayerScores.fivesScore
  );
  highlightScore(
    topSectionLegal(activePlayerScores.sixesScore),
    activePlayerScores.sixesScore
  );

  /* Bottom Section */

  highlightScore(
    kindxLegal(activePlayerScores.kind3Score, 3, numbers),
    activePlayerScores.kind3Score
  );
  highlightScore(
    kindxLegal(activePlayerScores.kind4Score, 4, numbers),
    activePlayerScores.kind4Score
  );
  highlightScore(
    fullHouseLegal(activePlayerScores.houseScore, numbers),
    activePlayerScores.houseScore
  );
  highlightScore(
    shortStraightLegal(activePlayerScores.shortScore, numbers),
    activePlayerScores.shortScore
  );
  highlightScore(
    longStraightLegal(activePlayerScores.longScore, numbers),
    activePlayerScores.longScore
  );
  highlightScore(
    yahtzeeLegal(activePlayerScores.yahtzeeScore, numbers),
    activePlayerScores.yahtzeeScore
  );
  highlightScore(
    topSectionLegal(activePlayerScores.chanceScore),
    activePlayerScores.chanceScore
  );
}
