import { ScoresContext } from "../../contexts/scores.context";
import { GameStateContext } from "../../contexts/game-state.context";
import { useContext, useEffect } from "react";

export var scoresObject = {
  /* Top score fields */
  ones: [null, null],
  twos: [null, null],
  threes: [null, null],
  fours: [null, null],
  fives: [null, null],
  sixes: [null, null],

  /* Bottom score fields */
  three_kind: [null, null],
  four_kind: [null, null],
  full_house: [null, null],
  short_straight: [null, null],
  long_straight: [null, null],
  yahtzee: [null, null],
  chance: [null, null],

  /* Total score fields */
  top_score: [null, null],
  bonus: [null, null],
  top_total: [null, null],
  bottom_total: [null, null],
  grand_total: [null, null],
};

export const update_scores_object = (scores, player) => {
  for (const score in scores) {
    scoresObject[score][player] = scores[score];
  }
  return scoresObject;
};

const ScoreTable = () => {
  const { scoresState, setScoresState } = useContext(ScoresContext);
  const { gameState } = useContext(GameStateContext);

  const displayScore = (score) => {
    if (score != null) {
      return score;
    } else {
      return "";
    }
  };

  return (
    <table className="score_card">
      <tbody>
        <tr className="heading-line">
          <th>Catagory</th>
          <th>Scoring</th>
          <th className="player_name player1_name">
            {`${gameState.player1_name}`}
          </th>
          <th className="player_name player2_name">{`${gameState.player2_name}`}</th>
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
          <th className="ones onesP1">{displayScore(scoresState.ones[0])}</th>
          <th className="ones onesP2">{displayScore(scoresState.ones[1])}</th>
        </tr>
        <tr className="score-line">
          <th>2s</th>
          <th className="scoring">Sum of all twos thrown</th>
          <th className="score twosP1">{displayScore(scoresState.twos[0])}</th>
          <th className="score twosP2">{displayScore(scoresState.twos[1])}</th>
        </tr>
        <tr className="score-line">
          <th>3s</th>
          <th className="scoring">Sum of all threes thrown</th>
          <th className="score threesP1">
            {displayScore(scoresState.threes[0])}
          </th>
          <th className="score threesP2">
            {displayScore(scoresState.threes[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>4s</th>
          <th className="scoring">Sum of all fours thrown</th>
          <th className="score foursP1">
            {displayScore(scoresState.fours[0])}
          </th>
          <th className="score foursP2">
            {displayScore(scoresState.fours[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>5s</th>
          <th className="scoring">Sum of all fives thrown</th>
          <th className="score fivesP1">
            {displayScore(scoresState.fives[0])}
          </th>
          <th className="score fivesP2">
            {displayScore(scoresState.fives[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>6s</th>
          <th className="scoring">Sum of all sixes thrown</th>
          <th className="score sixesP1">
            {displayScore(scoresState.sixes[0])}
          </th>
          <th className="score sixesP2">
            {displayScore(scoresState.sixes[1])}
          </th>
        </tr>
        <tr className="total-line">
          <th>Score</th>
          <th className="scoring">&rarr;</th>
          <th className="score top_initialP1">
            {displayScore(scoresState.top_score[0])}
          </th>
          <th className="score top_initialP2">
            {displayScore(scoresState.top_score[1])}
          </th>
        </tr>
        <tr className="total-line">
          <th>Bonus</th>
          <th className="scoring">If top section score &ge; 63</th>
          <th className="score top_bonusP1">
            {displayScore(scoresState.bonus[0])}
          </th>
          <th className="score top_bonusP2">
            {displayScore(scoresState.bonus[1])}
          </th>
        </tr>
        <tr className="total-line">
          <th>Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score top_totalP1">
            {displayScore(scoresState.top_total[0])}
          </th>
          <th className="score top_totalP2">
            {displayScore(scoresState.top_total[1])}
          </th>
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
          <th className="score kind_3P1">
            {displayScore(scoresState.three_kind[0])}
          </th>
          <th className="score kind_3P2">
            {displayScore(scoresState.three_kind[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>4 of a kind</th>
          <th className="scoring">Total of all dice</th>
          <th className="score kind_4P1">
            {displayScore(scoresState.four_kind[0])}
          </th>
          <th className="score kind_4P2">
            {displayScore(scoresState.four_kind[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Full House</th>
          <th className="scoring">Score 25</th>
          <th className="score full_houseP1">
            {displayScore(scoresState.full_house[0])}
          </th>
          <th className="score full_houseP2">
            {displayScore(scoresState.full_house[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Short Straight</th>
          <th className="scoring">Score 30</th>
          <th className="score short_straightP1">
            {displayScore(scoresState.short_straight[0])}
          </th>
          <th className="score short_straightP2">
            {displayScore(scoresState.short_straight[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Long Straight</th>
          <th className="scoring">Score 40</th>
          <th className="score long_straightP1">
            {displayScore(scoresState.long_straight[0])}
          </th>
          <th className="score long_straightP2">
            {displayScore(scoresState.long_straight[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Yahtzee</th>
          <th className="scoring">Score 50</th>
          <th className="score yahtzeeP1">
            {displayScore(scoresState.yahtzee[0])}
          </th>
          <th className="score yahtzeeP2">
            {displayScore(scoresState.yahtzee[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Chance</th>
          <th className="scoring">Total of all dice</th>
          <th className="score chanceP1">
            {displayScore(scoresState.chance[0])}
          </th>
          <th className="score chanceP2">
            {displayScore(scoresState.chance[1])}
          </th>
        </tr>
        <tr className="total-line">
          <th>Bottom Section Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score bottom_totalP1">
            {displayScore(scoresState.bottom_total[0])}
          </th>
          <th className="score bottom_totalP2">
            {displayScore(scoresState.bottom_total[1])}
          </th>
        </tr>
        <tr className="total-line">
          <th>Top Section Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score top_totalP1_repeat">
            {displayScore(scoresState.top_total[0])}
          </th>
          <th className="score top_totalP2_repeat">
            {displayScore(scoresState.top_total[1])}
          </th>
        </tr>
        <tr className="grand-total-line">
          <th>Grand Total</th>
          <th className="scoring">&rarr;</th>
          <th className="score grand_totalP1">
            {displayScore(scoresState.grand_total[0])}
          </th>
          <th className="score grand_totalP2">
            {displayScore(scoresState.grand_total[1])}
          </th>
        </tr>
      </tbody>
    </table>
  );
};

export default ScoreTable;
