import { useContext } from "react";

import { holdDie } from "../../functions/dice.functions";

import { TurnStateContext } from "../../contexts/turn-state.context";

const MatSection = (props) => {
  const { turnState, setTurnState } = useContext(TurnStateContext);
  const clickHold = () => {
    holdDie(turnState, setTurnState, props.id);
  };

  return (
    <div className={`mat mat${props.id}`}>
      <img
        src="assets/dice-1.png"
        alt={`Dice ${props.id}`}
        className={`dice dice${props.id} hidden`}
        onClick={clickHold}
      />
    </div>
  );
};

export default MatSection;
