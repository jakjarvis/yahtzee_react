import MatSection from "../mat-section/mat-section.component";

const DiceMat = (props) => {
  let diceIds = [];
  for (let i = 0; i < parseInt(props.dice); i++) {
    diceIds.push(i);
  }

  let diceSections = [];
  diceIds.forEach((id, index) => {
    diceSections.push(<MatSection key={index} id={id} />);
  });

  return <div className="dice_mat">{diceSections}</div>;
};

export default DiceMat;
