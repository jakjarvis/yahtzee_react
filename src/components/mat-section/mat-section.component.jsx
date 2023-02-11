const MatSection = (props) => {
  console.log(props.id);
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