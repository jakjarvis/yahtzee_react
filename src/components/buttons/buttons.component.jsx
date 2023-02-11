import Button from "../button/button.component";
import { TurnStateContext } from "../../contexts/turn-state.context";
import { useContext } from "react";

const Buttons = () => {
  const { turnState, setTurnState } = useContext(TurnStateContext);

  const clickRoll = () => {
    console.log("Roll clicked");
    if (turnState.rollsLeft > 0) {
      rollDice();
    }
  };

  const rollDice = () => {
    console.log("Dice Roll function called");
  };

  return (
    <div className="buttons">
      <Button type="button" buttonClass={"btn-roll"} onClick={clickRoll}>
        Roll
      </Button>
      <Button type="button" buttonClass={"btn-reset hidden"}>
        Play Again?
      </Button>
    </div>
  );
};

export default Buttons;
