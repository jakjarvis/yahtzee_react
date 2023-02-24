import "./game.styles.css";

import { useEffect, useContext } from "react";
import { GameStateContext } from "../../contexts/game-state.context";
import { ScoresContext } from "../../contexts/scores.context";
import { useParams } from "react-router-dom";

import ScoreTable from "../../components/score-table/score-table.component";
import DiceMat from "../../components/dice-mat/dice-mat.component";

import {
  update_scores_object,
  scoresObject,
} from "../../components/score-table/score-table.component";

async function fetch_game_state(setGameState, setScoresState, game_id) {
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
      update_scores_object(scores, 0);
    });

  await fetch(
    `http://127.0.0.1:8000/yahtzee/api/scores/${stateObject.scores2_id}`
  )
    .then((response) => response.json())
    .then((scores) => {
      update_scores_object(scores, 1);
      return scoresObject;
    })
    .then((value) => {
      setScoresState(value);
    });
}

const Game = () => {
  const { id } = useParams();
  const { gameState, setGameState } = useContext(GameStateContext);
  const { setScoresState } = useContext(ScoresContext);
  console.log("Game is: ", id);
  console.log("Active player is: ", gameState.active_player);

  useEffect(() => {
    fetch_game_state(setGameState, setScoresState, id);
  }, []);

  return (
    <div className="game">
      <div className="game_board">
        <div className="score_zone">
          <ScoreTable />
        </div>
        <div className="zone middle">
          <DiceMat dice="5" />
        </div>
      </div>
      <script src="resources/script.js"></script>
    </div>
  );
};

export default Game;
