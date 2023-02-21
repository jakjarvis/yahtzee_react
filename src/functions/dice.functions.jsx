import { highlight } from "./legality.functions";
import { refresh_listeners } from "./refresh.functions";

function randomiseDiceImage(diceElement) {
  let randHeight = Math.trunc(Math.random() * 5);
  let randWidth = Math.trunc(Math.random() * 5);
  let randAngle = Math.trunc(Math.random() * 90);

  diceElement.style.top = `${randHeight}vw`;
  diceElement.style.left = `${randWidth}vw`;
  diceElement.style.transform = `rotate(${randAngle}deg)`;
}

function numberArray(diceValues) {
  let numbers = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    numbers[diceValues[i] - 1] += 1;
  }
  return numbers;
}

export function rollDice(
  gameState,
  setGameState,
  turnState,
  setTurnState,
  diceImages
) {
  console.log("RollDice called");
  const [dice1, dice2, dice3, dice4, dice5, dice6] = diceImages;
  let { diceValues, heldDice, rollsLeft, numbers } = turnState;
  refresh_listeners(gameState, setGameState, turnState, setTurnState);
  for (let i = 0; i < 5; i++) {
    if (heldDice[i] === 0) {
      const result = Math.trunc(Math.random() * 6) + 1;
      diceValues[i] = result;
      const diceElement = document.querySelector(`.dice${i}`);
      randomiseDiceImage(diceElement);
      diceElement.classList.remove("hidden");
      diceElement.src = eval(`dice${diceValues[i]}`);
    }
  }
  rollsLeft -= 1;
  document.querySelector(".rolls-remaining").textContent = rollsLeft;
  numbers = numberArray(diceValues);
  setTurnState({ diceValues, heldDice, rollsLeft, numbers });
  highlight(gameState.active_player, turnState.numbers);

  for (let i = 0; i < 5; i++) {
    const diceEl = document.querySelector(`.dice${i}`);
    diceEl.addEventListener("click", function () {
      holdDie({ diceValues, heldDice, rollsLeft, numbers }, setTurnState, i);
    });
  }
  return;
}

export function holdDie(turnState, setTurnState, diceNumber) {
  let { diceValues, heldDice, rollsLeft, numbers } = turnState;
  const diceEl = document.querySelector(`.dice${diceNumber}`);
  console.log(rollsLeft, " rolls left");
  console.log("Before", diceEl);
  diceEl.classList.toggle("hold");
  console.log("After", diceEl);
  if (diceEl.classList.contains("hold")) {
    heldDice[diceNumber] = diceValues[diceNumber];
  } else {
    heldDice[diceNumber] = 0;
  }
  setTurnState({ diceValues, heldDice, rollsLeft, numbers });
  return;
}