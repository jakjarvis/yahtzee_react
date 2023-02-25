import "./game.styles.css";

import { useEffect, useContext } from "react";
import { GameStateContext } from "../../contexts/game-state.context";
import { ScoresContext } from "../../contexts/scores.context";
import { useParams } from "react-router-dom";

import ScoreTable from "../../components/score-table/score-table.component";
import DiceMat from "../../components/dice-mat/dice-mat.component";

import { getGameState } from "../../functions/fetch.functions";

const Game = () => {
  const { id } = useParams();
  const { gameState, setGameState } = useContext(GameStateContext);
  const { setScoresState } = useContext(ScoresContext);
  console.log("Game is: ", id);
  console.log("Active player is: ", gameState.active_player);

  useEffect(() => {
    getGameState(setGameState, setScoresState, id);
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
