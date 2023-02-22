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

export function scoreNumber(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
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
      postScores(active_player, scores1_id, scores2_id, postField, score);
      console.log("Stated turns remaining:", gameState.turns_remaining);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
    console.log("Ones Score function run on", active_player);
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
    if (kindxLegal(field, numeric, turnState.numbers)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += turnState.diceValues[i];
      }
      field.textContent = score;
      postScores(active_player, scores1_id, scores2_id, postField, score);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(active_player, scores1_id, scores2_id, postField, 0);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
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
      postScores(active_player, scores1_id, scores2_id, postField, 25);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(active_player, scores1_id, scores2_id, postField, 0);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
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
      postScores(active_player, scores1_id, scores2_id, postField, 30);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(active_player, scores1_id, scores2_id, postField, 0);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
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
      postScores(active_player, scores1_id, scores2_id, postField, 40);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(active_player, scores1_id, scores2_id, postField, 0);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
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
      postScores(active_player, scores1_id, scores2_id, postField, 50);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    } else if (field.textContent === "") {
      field.textContent = 0;
      postScores(active_player, scores1_id, scores2_id, postField, 50);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function scoreChance(
  game_id,
  gameState,
  setGameState,
  turnState,
  setTurnState,
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
      postScores(active_player, scores1_id, scores2_id, postField, score);
      reset_dice(
        game_id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        activePlayerScores
      );
    }
  } catch (error) {
    console.log(error);
  }
}
