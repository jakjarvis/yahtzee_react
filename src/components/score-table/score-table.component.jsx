const ScoreTable = () => {
  return (
    <table className="score_card">
      <tbody>
        <tr className="heading-line">
          <th>Catagory</th>
          <th>Scoring</th>
          <th className="player_name player1_name">#####</th>
          <th className="player_name player2_name">#####</th>
        </tr>
        <tr className="heading-line">
          <th>Top Section</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr className="score-line">
          <th>1s</th>
          <th className="scoring">Sum of all ones thrown</th>
          <th className="ones onesP1"></th>
          <th className="ones onesP2"></th>
        </tr>
        <tr className="score-line">
          <th>2s</th>
          <th className="scoring">Sum of all twos thrown</th>
          <th className="score twosP1"></th>
          <th className="score twosP2"></th>
        </tr>
        <tr className="score-line">
          <th>3s</th>
          <th className="scoring">Sum of all threes thrown</th>
          <th className="score threesP1"></th>
          <th className="score threesP2"></th>
        </tr>
        <tr className="score-line">
          <th>4s</th>
          <th className="scoring">Sum of all fours thrown</th>
          <th className="score foursP1"></th>
          <th className="score foursP2"></th>
        </tr>
        <tr className="score-line">
          <th>5s</th>
          <th className="scoring">Sum of all fives thrown</th>
          <th className="score fivesP1"></th>
          <th className="score fivesP2"></th>
        </tr>
        <tr className="score-line">
          <th>6s</th>
          <th className="scoring">Sum of all sixes thrown</th>
          <th className="score sixesP1"></th>
          <th className="score sixesP2"></th>
        </tr>
        <tr className="total-line">
          <th>Score</th>
          <th className="scoring">&rarr;</th>
          <th className="score top_initialP1"></th>
          <th className="score top_initialP2"></th>
        </tr>
        <tr className="total-line">
          <th>Bonus</th>
          <th className="scoring">If top section score &ge; 63</th>
          <th className="score top_bonusP1"></th>
          <th className="score top_bonusP2"></th>
        </tr>
        <tr className="total-line">
          <th>Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score top_totalP1"></th>
          <th className="score top_totalP2"></th>
        </tr>
        <tr className="heading-line">
          <th>Bottom Section</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr className="score-line">
          <th>3 of a kind</th>
          <th className="scoring">Total of all dice</th>
          <th className="score kind_3P1"></th>
          <th className="score kind_3P2"></th>
        </tr>
        <tr className="score-line">
          <th>4 of a kind</th>
          <th className="scoring">Total of all dice</th>
          <th className="score kind_4P1"></th>
          <th className="score kind_4P2"></th>
        </tr>
        <tr className="score-line">
          <th>Full House</th>
          <th className="scoring">Score 25</th>
          <th className="score full_houseP1"></th>
          <th className="score full_houseP2"></th>
        </tr>
        <tr className="score-line">
          <th>Short Straight</th>
          <th className="scoring">Score 30</th>
          <th className="score short_straightP1"></th>
          <th className="score short_straightP2"></th>
        </tr>
        <tr className="score-line">
          <th>Long Straight</th>
          <th className="scoring">Score 40</th>
          <th className="score long_straightP1"></th>
          <th className="score long_straightP2"></th>
        </tr>
        <tr className="score-line">
          <th>Yahtzee</th>
          <th className="scoring">Score 50</th>
          <th className="score yahtzeeP1"></th>
          <th className="score yahtzeeP2"></th>
        </tr>
        <tr className="score-line">
          <th>Chance</th>
          <th className="scoring">Total of all dice</th>
          <th className="score chanceP1"></th>
          <th className="score chanceP2"></th>
        </tr>
        <tr className="total-line">
          <th>Bottom Section Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score bottom_totalP1"></th>
          <th className="score bottom_totalP2"></th>
        </tr>
        <tr className="total-line">
          <th>Top Section Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score top_totalP1_repeat"></th>
          <th className="score top_totalP2_repeat"></th>
        </tr>
        <tr className="grand-total-line">
          <th>Grand Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score grand_totalP1"></th>
          <th className="score grand_totalP2"></th>
        </tr>
      </tbody>
    </table>
  );
};

export default ScoreTable;
