import "./App.css";
import Buttons from "./components/buttons/buttons.component";
import ScoreTable from "./components/score-table/score-table.component";
import TitleBar from "./components/title-bar/title-bar.component";
import DiceMat from "./components/dice-mat/dice-mat.component";

function App() {
  return (
    <div className="App">
      <TitleBar />
      <div className="game_board">
        <div className="score_zone">
          <ScoreTable />
        </div>
        <div className="zone middle">
          <DiceMat dice="5" />
          <Buttons></Buttons>
          <div className="rolls-counter">
            <p className="rolls-text">Rolls remaining:</p>
            <p className="rolls-remaining">3</p>
          </div>
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
