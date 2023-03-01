import Button from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";

import { setupGame } from "../../functions/fetch.functions";

const Setup = () => {
  const navigate = useNavigate();
  const clickSetup = () => {
    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;

    setupGame(navigate, player1Name, player2Name);
  };

  return (
    <div>
      <h2>Set up a new game?</h2>
      <form>
        <h4>Player 1 Name</h4>
        <input type="text" id="player1Name"></input>
        <h4>Player 2 Name</h4>
        <input type="text" id="player2Name"></input>
        <Button type="button" buttonClass={"btn-play"} onClick={clickSetup}>
          Play!
        </Button>
      </form>
    </div>
  );
};

export default Setup;
