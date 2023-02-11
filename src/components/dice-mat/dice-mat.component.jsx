import MatSection from "../mat-section/mat-section.component";
import Buttons from "../buttons/buttons.component";

const DiceMat = (props) => {
  let diceIds = [];
  for (let i = 0; i < parseInt(props.dice); i++) {
    diceIds.push(i);
  }

  let diceSections = [];
  diceIds.forEach((id, index) => {
    diceSections.push(<MatSection key={index} id={id} />);
  });

  return (
    <div className="dice_mat">
      {diceSections}
      <Buttons></Buttons>
      <div className="rolls-counter">
        <p className="rolls-text">Rolls remaining:</p>
        <p className="rolls-remaining">3</p>
      </div>
    </div>
  );
};

export default DiceMat;
