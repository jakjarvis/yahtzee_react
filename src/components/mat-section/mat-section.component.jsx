import { holdDie } from "../../functions/dice.functions";

const MatSection = (props) => {
  return (
    <div className={`mat mat${props.id}`}>
      <img
        src="assets/dice-1.png"
        alt={`Dice ${props.id}`}
        className={`dice dice${props.id} hidden`}
      />
    </div>
  );
};

export default MatSection;
