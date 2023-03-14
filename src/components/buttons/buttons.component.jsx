import Button from "../button/button.component";
import "./buttons.styles.css";
import { TurnStateContext } from "../../contexts/turn-state.context";
import { GameStateContext } from "../../contexts/game-state.context";
import { ScoresContext } from "../../contexts/scores.context";

import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { rollDice } from "../../functions/dice.functions";
import { setupGame } from "../../functions/fetch.functions";

import dice1 from "../../assets/dice-1.png";
import dice2 from "../../assets/dice-2.png";
import dice3 from "../../assets/dice-3.png";
import dice4 from "../../assets/dice-4.png";
import dice5 from "../../assets/dice-5.png";
import dice6 from "../../assets/dice-6.png";
import { getGameState } from "../../functions/fetch.functions";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const Buttons = () => {
  const { id } = useParams();
  const { turnState, setTurnState } = useContext(TurnStateContext);
  const { gameState, setGameState } = useContext(GameStateContext);
  const { setScoresState } = useContext(ScoresContext);
  const navigate = useNavigate();

  const clickRoll = () => {
    if (turnState.rollsLeft > 0) {
      rollDice(
        id,
        gameState,
        setGameState,
        turnState,
        setTurnState,
        diceImages
      );
    }
  };

  async function clickReplay() {
    await setupGame(navigate, gameState.player1_name, gameState.player2_name);
    await getGameState(setGameState, setScoresState, id);
  }

  return (
    <div className="buttons">
      <Button type="button" buttonClass={"btn-roll"} onClick={clickRoll}>
        Roll
      </Button>
      <Button
        type="button"
        buttonClass={"btn-replay hidden"}
        onClick={clickReplay}
      >
        Play Again?
      </Button>
      <Button
        type="button"
        buttonClass={"btn-replay"}
        onClick={console.log(gameState)}
      >
        Test
      </Button>
    </div>
  );
};

export default Buttons;
