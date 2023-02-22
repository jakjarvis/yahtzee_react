import {
  topSectionLegal,
  kindxLegal,
  fullHouseLegal,
  shortStraightLegal,
  longStraightLegal,
  yahtzeeLegal,
} from "./legality.functions";
import { postScores } from "./refresh.functions";
import { reset_dice } from "./refresh.functions";

const bodyGenerator = (postField, score) => {
  let body = {};
  body[postField] = score;
  return body;
};

export function scoreNumber(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  scoresState,
  setScoresState,
  activePlayerScores,
  field,
  postField,
  numeric
) {
  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;
  try {
    if (topSectionLegal(field)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (turnState.diceValues[i] === numeric) {
          console.log("Score plus", numeric);
          score += numeric;
        }
      }
      field.textContent = score;
      console.log("Posting:", bodyGenerator(postField, score));
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, score)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreXKind(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  scoresState,
  setScoresState,
  activePlayerScores,
  field,
  postField,
  numeric
) {
  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;
  console.log("field is:", field);
  try {
    if (kindxLegal(field, numeric, turnState.numbers)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += turnState.diceValues[i];
      }
      field.textContent = score;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, score)
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 0)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreFullHouse(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  scoresState,
  setScoresState,
  activePlayerScores,
  field,
  postField
) {
  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;
  try {
    if (fullHouseLegal(field, turnState.numbers)) {
      field.textContent = 25;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 25)
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 0)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreShortStraight(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  scoresState,
  setScoresState,
  activePlayerScores,
  field,
  postField
) {
  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;
  try {
    if (shortStraightLegal(field, turnState.numbers)) {
      field.textContent = 30;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 30)
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 0)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreLongStraight(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  scoresState,
  setScoresState,
  activePlayerScores,
  field,
  postField
) {
  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;
  try {
    if (longStraightLegal(field, turnState.numbers)) {
      field.textContent = 40;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 40)
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 0)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreYahtzee(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  scoresState,
  setScoresState,
  activePlayerScores,
  field,
  postField
) {
  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;
  try {
    if (yahtzeeLegal(field, turnState.numbers)) {
      field.textContent = 50;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 50)
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, 0)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function scoreChance(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
  scoresState,
  setScoresState,
  activePlayerScores,
  field,
  postField
) {
  let {
    active_player,
    player1_name,
    player2_name,
    scores1_id,
    scores2_id,
    turns_remaining,
  } = gameState;
  try {
    if (topSectionLegal(field)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += turnState.diceValues[i];
      }
      field.textContent = score;
      postScores(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        scoresState,
        setScoresState,
        activePlayerScores,
        bodyGenerator(postField, score)
      );
    }
  } catch (error) {
    console.log(error);
  }
}
