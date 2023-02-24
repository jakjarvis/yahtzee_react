import Button from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";

function alertWindow(body, user_array) {
  if (user_array[0] == false && user_array[1] == false) {
    window.alert(
      `${body.player1} and ${body.player2} are not registered users. These players will play as Guests.`
    );
  } else if (user_array[0] == false) {
    window.alert(
      `${body.player1} is not a registered user. This player will play as a Guest.`
    );
  } else if (user_array[1] == false) {
    window.alert(
      `${body.player2} is not a registered user. This player will play as a Guest.`
    );
  }
}

const Setup = () => {
  const navigate = useNavigate();

  async function setupGame() {
    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;

    let body = {
      player1: player1Name,
      player2: player2Name,
    };

    await fetch("http://127.0.0.1:8000/yahtzee/api/setup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(JSON.parse(json));
        alertWindow(body, JSON.parse(json)["user_array"]);
        navigate(`/game/${JSON.parse(json)["game_id"]}`);
      });
  }

  return (
    <div>
      <h2>Set up a new game?</h2>
      <form>
        <h4>Player 1 Name</h4>
        <input type="text" id="player1Name"></input>
        <h4>Player 2 Name</h4>
        <input type="text" id="player2Name"></input>
        <Button type="button" buttonClass={"btn-play"} onClick={setupGame}>
          Play!
        </Button>
      </form>
    </div>
  );
};

export default Setup;
