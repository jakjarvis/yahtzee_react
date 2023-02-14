import "./App.css";
import ScoreTable from "./components/score-table/score-table.component";
import TitleBar from "./components/title-bar/title-bar.component";
import DiceMat from "./components/dice-mat/dice-mat.component";
import { useEffect, useContext } from "react";
import { GameStateContext } from "./contexts/game-state.context";
import { ScoresContext } from "./contexts/scores.context";
import {
  update_scores_object,
  scoresObject,
} from "./components/score-table/score-table.component";

function App() {
  const { gameState, setGameState } = useContext(GameStateContext);
  const { setScoresState } = useContext(ScoresContext);

  async function fetch_game_state(gameState, setGameState, setScoresState) {
    let stateObject = {
      active_player: null,
      player1_name: null,
      player2_name: null,
      scores1_id: null,
      scores2_id: null,
      turns_remaining: null,
    };
    await fetch("http://127.0.0.1:8000/yahtzee/api/game/9")
      .then((response) => response.json())
      .then((state) => {
        for (var property in state) {
          stateObject[property] = state[property][0];
        }
        return stateObject;
      })
      .then((state) => {
        console.log("Game state is: ", state);
        setGameState(state);
      });

    await fetch(
      `http://127.0.0.1:8000/yahtzee/api/scores/${stateObject.scores1_id}`
    )
      .then((response) => response.json())
      .then((scores) => {
        console.log(scores);
        update_scores_object(scores, 0);
      })
      .catch((error) => console.log("Error"));

    await fetch(
      `http://127.0.0.1:8000/yahtzee/api/scores/${stateObject.scores2_id}`
    )
      .then((response) => response.json())
      .then((scores) => {
        console.log(scores);
        update_scores_object(scores, 1);
        console.log(scoresObject);
        return scoresObject;
      })
      .then((value) => {
        console.log(value);
        setScoresState(value);
      })
      .catch((error) => console.log("Error"));
  }

  useEffect(() => {
    fetch_game_state(gameState, setGameState, setScoresState);
  }, []);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/yahtzee/api/game/9")
  //     .then((response) => response.json())
  //     .then((state) => {
  //       setGameState(state);
  //     });
  // }, []);

  return (
    <div className="App">
      <TitleBar />
      <div className="game_board">
        <div className="score_zone">
          <ScoreTable />
        </div>
        <div className="zone middle">
          <DiceMat dice="5" />
        </div>
        <form method="post" id="submit_form">
          <input type="text" id="field" name="field" className="hidden" />
          <input
            type="number"
            id="scores_id"
            name="scores_id"
            className="hidden"
          />
          <input type="number" id="score" name="score" className="hidden" />
          <input
            type="text"
            id="active_player"
            name="active_player"
            className="hidden"
          />
          <input
            type="number"
            id="turns_remaining"
            name="turns_remaining"
            className="hidden"
          />
        </form>
      </div>
      <script src="resources/script.js"></script>
    </div>
  );
}

export default App;
