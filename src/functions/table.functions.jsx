// FUNCTIONS:
// - displayScore
// - scoreNumber, scorexKind, scoreFullHouse, scoreShortStraight, scoreLongStraight, scoreYahtzee, scoreChance

import {
  topSectionLegal,
  kindxLegal,
  fullHouseLegal,
  shortStraightLegal,
  longStraightLegal,
  yahtzeeLegal,
} from "./legality.functions";
import { postScores } from "./fetch.functions";

const bodyGenerator = (postField, score) => {
  let body = {};
  body[postField] = score;
  return body;
};

export function displayScore(score) {
  if (score != null) {
    return score;
  } else {
    return "";
  }
}

export function scoreNumber(context, field, postField, numeric) {
  try {
    if (topSectionLegal(field)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (context.turnState.diceValues[i] === numeric) {
          score += numeric;
        }
      }
      field.textContent = score;
      postScores(context, bodyGenerator(postField, score));
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreXKind(context, field, postField, numeric) {
  try {
    if (kindxLegal(field, numeric, context.turnState.numbers)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += context.turnState.diceValues[i];
      }
      field.textContent = score;
      postScores(context, bodyGenerator(postField, score));
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(context, bodyGenerator(postField, 0));
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreFullHouse(context, field, postField) {
  try {
    if (fullHouseLegal(field, context.turnState.numbers)) {
      field.textContent = 25;
      postScores(context, bodyGenerator(postField, 25));
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(context, bodyGenerator(postField, 0));
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreShortStraight(context, field, postField) {
  try {
    if (shortStraightLegal(field, context.turnState.numbers)) {
      field.textContent = 30;
      postScores(context, bodyGenerator(postField, 30));
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(context, bodyGenerator(postField, 0));
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreLongStraight(context, field, postField) {
  try {
    if (longStraightLegal(field, context.turnState.numbers)) {
      field.textContent = 40;
      postScores(context, bodyGenerator(postField, 40));
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(context, bodyGenerator(postField, 0));
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreYahtzee(context, field, postField) {
  try {
    if (yahtzeeLegal(field, context.turnState.numbers)) {
      field.textContent = 50;
      postScores(context, bodyGenerator(postField, 50));
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(context, bodyGenerator(postField, 0));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function scoreChance(context, field, postField) {
  try {
    if (topSectionLegal(field)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += context.turnState.diceValues[i];
      }
      field.textContent = score;
      postScores(context, bodyGenerator(postField, score));
    }
  } catch (error) {
    console.log(error);
  }
}
