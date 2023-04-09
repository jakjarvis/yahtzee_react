import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ScoresContext } from "../../contexts/scores.context";
import { GameStateContext } from "../../contexts/game-state.context";
import { TurnStateContext } from "../../contexts/turn-state.context";

import { activePlayerScoreFields } from "../../functions/legality.functions";
import {
  displayScore,
  scoreFullHouse,
  scoreNumber,
  scoreShortStraight,
  scoreLongStraight,
  scoreXKind,
  scoreYahtzee,
  scoreChance,
} from "../../functions/table.functions";
import {
  highlightActivePlayer,
  calculateScores,
} from "../../functions/refresh.functions";

const ScoreTable = () => {
  const { id } = useParams();
  const { scoresState, setScoresState } = useContext(ScoresContext);
  const { gameState, setGameState } = useContext(GameStateContext);
  const { turnState, setTurnState } = useContext(TurnStateContext);
  const activePlayerScores = activePlayerScoreFields(gameState.active_player);

  const context = {
    game_id: id,
    gameState: gameState,
    setGameState: setGameState,
    turnState: turnState,
    setTurnState: setTurnState,
    scoresState: scoresState,
    setScoresState: setScoresState,
    activePlayerScores: activePlayerScores,
  };

  const activePlayerRef = gameState.active_player.charAt(
    gameState.active_player.length - 1
  );

  try {
    highlightActivePlayer(gameState);
  } catch {}

  const clickOnes = () => {
    scoreNumber(
      context,
      document.querySelector(`.onesP${activePlayerRef}`),
      "ones",
      1
    );
  };
  const clickTwos = () => {
    scoreNumber(
      context,
      document.querySelector(`.twosP${activePlayerRef}`),
      "twos",
      2
    );
  };
  const clickThrees = () => {
    scoreNumber(
      context,
      document.querySelector(`.threesP${activePlayerRef}`),
      "threes",
      3
    );
  };
  const clickFours = () => {
    scoreNumber(
      context,
      document.querySelector(`.foursP${activePlayerRef}`),
      "fours",
      4
    );
  };
  const clickFives = () => {
    scoreNumber(
      context,
      document.querySelector(`.fivesP${activePlayerRef}`),
      "fives",
      5
    );
  };
  const clickSixes = () => {
    scoreNumber(
      context,
      document.querySelector(`.sixesP${activePlayerRef}`),
      "sixes",
      6
    );
  };
  const click3Kind = () => {
    scoreXKind(
      context,
      document.querySelector(`.kind_3P${activePlayerRef}`),
      "three_kind",
      3
    );
  };
  const click4Kind = () => {
    scoreXKind(
      context,
      document.querySelector(`.kind_4P${activePlayerRef}`),
      "four_kind",
      4
    );
  };
  const clickFullHouse = () => {
    scoreFullHouse(
      context,
      document.querySelector(`.full_houseP${activePlayerRef}`),
      "full_house"
    );
  };
  const clickShortStraight = () => {
    scoreShortStraight(
      context,
      document.querySelector(`.short_straightP${activePlayerRef}`),
      "short_straight"
    );
  };
  const clickLongStraight = () => {
    scoreLongStraight(
      context,
      document.querySelector(`.long_straightP${activePlayerRef}`),
      "long_straight"
    );
  };
  const clickYahtzee = () => {
    scoreYahtzee(
      context,
      document.querySelector(`.yahtzeeP${activePlayerRef}`),
      "yahtzee"
    );
  };
  const clickChance = () => {
    scoreChance(
      context,
      document.querySelector(`.chanceP${activePlayerRef}`),
      "chance"
    );
  };

  useEffect(
    (context, scoresState) => {
      if (gameState.turns_remaining === 0) {
        calculateScores(context);
        try {
          if (
            parseInt(scoresState.grand_total[0]) >
            parseInt(scoresState.grand_total[1])
          ) {
            document.querySelector(".rolls-text").textContent =
              "Player 1 wins!";
          } else if (
            parseInt(scoresState.grand_total[1]) >
            parseInt(scoresState.grand_total[0])
          ) {
            document.querySelector(".rolls-text").textContent =
              "Player 2 wins!";
          } else {
            document.querySelector(".rolls-text").textContent = "It's a tie!";
          }
          document.querySelector(".btn-roll").classList.add("hidden");
          document.querySelector(".btn-reset").classList.remove("hidden");
        } catch (error) {
          console.log(error);
        }
      }
    },
    [gameState.turns_remaining]
  );

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

// Initial attempts at generating scorelines via map:

// const clickFunction = (scoreName, reference_digit) => {
//   let scoreFunction = topSection[scoreName].scoreFunction;
//   console.log(
//     `.${scoreName}P${activePlayerRef}`,
//     document.querySelector(`.${scoreName}P${activePlayerRef}`)
//   );
//   let functionInputs = [
//     context,
//     document.querySelector(`.${scoreName}P${activePlayerRef}`),
//     scoreName,
//   ];
//   if (reference_digit != 0) {
//     functionInputs.push(reference_digit);
//   }
//   try {
//     scoreFunction(functionInputs);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const topSection = {
//   ones: {
//     reference_digit: 1,
//     scoreName: "ones",
//     scoreFunction: scoreNumber,
//   },
// };

// const ScoreLine = ({ reference_digit, scoreName }) => {
//   return (
//     <tr className="score-line">
//       <th>{reference_digit}s</th>
//       <th className="scoring">Sum of all {scoreName} thrown</th>
//       <th
//         className={`score ${scoreName}P1`}
//         onClick={clickFunction(scoreName, reference_digit)}
//       >
//         {displayScore(scoresState[scoreName][0])}
//       </th>
//       <th
//         className={`score ${scoreName}P2`}
//         onClick={clickFunction(scoreName, reference_digit)}
//       >
//         {displayScore(scoresState[scoreName][1])}
//       </th>
//     </tr>
//   );
// };

// {Object.entries(topSection).map(([key, values], index) => (
//   <ScoreLine
//     key={index}
//     reference_digit={values.reference_digit}
//     scoreName={values.scoreName}
//   />
// ))}
