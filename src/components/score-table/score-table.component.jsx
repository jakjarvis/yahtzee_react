import { ScoresContext } from "../../contexts/scores.context";
import { GameStateContext } from "../../contexts/game-state.context";
import { TurnStateContext } from "../../contexts/turn-state.context";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { activePlayerScoreFields } from "../../functions/legality.functions";
import {
  scoreFullHouse,
  scoreNumber,
  scoreShortStraight,
  scoreLongStraight,
  scoreXKind,
  scoreYahtzee,
  scoreChance,
} from "../../functions/table.functions";
import { highlightActivePlayer } from "../../functions/refresh.functions";

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
  const { gameState, setGameState } = useContext(GameStateContext);
  const { turnState, setTurnState } = useContext(TurnStateContext);

  const activePlayerScores = activePlayerScoreFields(gameState.active_player);
  const { id } = useParams();

  const displayScore = (score) => {
    if (score != null) {
      return score;
    } else {
      return "";
    }
  };

  highlightActivePlayer(gameState);

  let activePlayerRef = gameState.active_player.charAt(
    gameState.active_player.length - 1
  );

  let input = [
    id,
    gameState,
    setGameState,
    turnState,
    setTurnState,
    activePlayerScores,
  ];

  const clickOnes = () => {
    scoreNumber(
      ...input,
      document.querySelector(`.onesP${activePlayerRef}`),
      "ones",
      1
    );
  };
  const clickTwos = () => {
    scoreNumber(
      ...input,
      document.querySelector(`.twosP${activePlayerRef}`),
      "twos",
      2
    );
  };
  const clickThrees = () => {
    scoreNumber(
      ...input,
      document.querySelector(`.threesP${activePlayerRef}`),
      "threes",
      3
    );
  };
  const clickFours = () => {
    scoreNumber(
      ...input,
      document.querySelector(`.foursP${activePlayerRef}`),
      "fours",
      4
    );
  };
  const clickFives = () => {
    scoreNumber(
      ...input,
      document.querySelector(`.fivesP${activePlayerRef}`),
      "fives",
      5
    );
  };
  const clickSixes = () => {
    scoreNumber(
      ...input,
      document.querySelector(`.sixesP${activePlayerRef}`),
      "sixes",
      6
    );
  };
  const click3Kind = () => {
    scoreXKind(
      ...input,
      document.querySelector(`.kind3P${activePlayerRef}`),
      "three_kind",
      3
    );
  };
  const click4Kind = () => {
    scoreXKind(
      ...input,
      document.querySelector(`.kind4P${activePlayerRef}`),
      "four_kind",
      4
    );
  };
  const clickFullHouse = () => {
    scoreFullHouse(
      ...input,
      document.querySelector(`.full_houseP${activePlayerRef}`),
      "full_house"
    );
  };
  const clickShortStraight = () => {
    scoreShortStraight(
      ...input,
      document.querySelector(`.short_straightP${activePlayerRef}`),
      "short_straight"
    );
  };
  const clickLongStraight = () => {
    scoreLongStraight(
      ...input,
      document.querySelector(`.long_straightP${activePlayerRef}`),
      "long_straight"
    );
  };
  const clickYahtzee = () => {
    scoreYahtzee(
      ...input,
      document.querySelector(`.yahtzeeP${activePlayerRef}`),
      "yahtzee"
    );
  };
  const clickChance = () => {
    scoreChance(
      ...input,
      document.querySelector(`.chanceP${activePlayerRef}`),
      "chance"
    );
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
          <th className="ones onesP1" onClick={clickOnes}>
            {displayScore(scoresState.ones[0])}
          </th>
          <th className="ones onesP2" onClick={clickOnes}>
            {displayScore(scoresState.ones[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>2s</th>
          <th className="scoring">Sum of all twos thrown</th>
          <th className="score twosP1" onClick={clickTwos}>
            {displayScore(scoresState.twos[0])}
          </th>
          <th className="score twosP2" onClick={clickTwos}>
            {displayScore(scoresState.twos[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>3s</th>
          <th className="scoring">Sum of all threes thrown</th>
          <th className="score threesP1" onClick={clickThrees}>
            {displayScore(scoresState.threes[0])}
          </th>
          <th className="score threesP2" onClick={clickThrees}>
            {displayScore(scoresState.threes[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>4s</th>
          <th className="scoring">Sum of all fours thrown</th>
          <th className="score foursP1" onClick={clickFours}>
            {displayScore(scoresState.fours[0])}
          </th>
          <th className="score foursP2" onClick={clickFours}>
            {displayScore(scoresState.fours[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>5s</th>
          <th className="scoring">Sum of all fives thrown</th>
          <th className="score fivesP1" onClick={clickFives}>
            {displayScore(scoresState.fives[0])}
          </th>
          <th className="score fivesP2" onClick={clickFives}>
            {displayScore(scoresState.fives[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>6s</th>
          <th className="scoring">Sum of all sixes thrown</th>
          <th className="score sixesP1" onClick={clickSixes}>
            {displayScore(scoresState.sixes[0])}
          </th>
          <th className="score sixesP2" onClick={clickSixes}>
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
          <th className="score kind_3P1" onClick={click3Kind}>
            {displayScore(scoresState.three_kind[0])}
          </th>
          <th className="score kind_3P2" onClick={click3Kind}>
            {displayScore(scoresState.three_kind[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>4 of a kind</th>
          <th className="scoring">Total of all dice</th>
          <th className="score kind_4P1" onClick={click4Kind}>
            {displayScore(scoresState.four_kind[0])}
          </th>
          <th className="score kind_4P2" onClick={click4Kind}>
            {displayScore(scoresState.four_kind[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Full House</th>
          <th className="scoring">Score 25</th>
          <th className="score full_houseP1" onClick={clickFullHouse}>
            {displayScore(scoresState.full_house[0])}
          </th>
          <th className="score full_houseP2" onClick={clickFullHouse}>
            {displayScore(scoresState.full_house[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Short Straight</th>
          <th className="scoring">Score 30</th>
          <th className="score short_straightP1" onClick={clickShortStraight}>
            {displayScore(scoresState.short_straight[0])}
          </th>
          <th className="score short_straightP2" onClick={clickShortStraight}>
            {displayScore(scoresState.short_straight[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Long Straight</th>
          <th className="scoring">Score 40</th>
          <th className="score long_straightP1" onClick={clickLongStraight}>
            {displayScore(scoresState.long_straight[0])}
          </th>
          <th className="score long_straightP2" onClick={clickLongStraight}>
            {displayScore(scoresState.long_straight[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Yahtzee</th>
          <th className="scoring">Score 50</th>
          <th className="score yahtzeeP1" onClick={clickYahtzee}>
            {displayScore(scoresState.yahtzee[0])}
          </th>
          <th className="score yahtzeeP2" onClick={clickYahtzee}>
            {displayScore(scoresState.yahtzee[1])}
          </th>
        </tr>
        <tr className="score-line">
          <th>Chance</th>
          <th className="scoring">Total of all dice</th>
          <th className="score chanceP1" onClick={clickChance}>
            {displayScore(scoresState.chance[0])}
          </th>
          <th className="score chanceP2" onClick={clickChance}>
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
