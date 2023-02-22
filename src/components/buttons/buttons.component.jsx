import Button from "../button/button.component";
import { TurnStateContext } from "../../contexts/turn-state.context";
import { GameStateContext } from "../../contexts/game-state.context";
import { ScoresContext } from "../../contexts/scores.context";

import { useContext } from "react";
import { useParams } from "react-router-dom";

import { rollDice } from "../../functions/dice.functions";

import dice1 from "../../assets/dice-1.png";
import dice2 from "../../assets/dice-2.png";
import dice3 from "../../assets/dice-3.png";
import dice4 from "../../assets/dice-4.png";
import dice5 from "../../assets/dice-5.png";
import dice6 from "../../assets/dice-6.png";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const Buttons = () => {
  const { id } = useParams();
  const { turnState, setTurnState } = useContext(TurnStateContext);
  const { gameState, setGameState } = useContext(GameStateContext);
  const { scoresState, setScoresState } = useContext(ScoresContext);

  const clickRoll = () => {
    console.log(turnState.rollsLeft, " rolls left");
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

  return (
    <div className="buttons">
      <Button type="button" buttonClass={"btn-roll"} onClick={clickRoll}>
        Roll
      </Button>
      <Button
        type="button"
        buttonClass={"btn-check"}
        onClick={function () {
          console.log(turnState);
        }}
      >
        Check State
      </Button>
      <Button type="button" buttonClass={"btn-reset hidden"}>
        Play Again?
      </Button>
    </div>
  );
};

export default Buttons;
