const board = document.getElementById('board');
const message = document.getElementById('message');
const rollDiceButton = document.getElementById('rollDice');
let playerPosition = 0;

function createBoard() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.textContent = i + 1;
    board.appendChild(cell);
  }
}

function rollDice() {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  playerPosition += diceRoll;
  if (playerPosition >= 100) {
    playerPosition = 100;
    message.textContent = 'You reached the end!';
    rollDiceButton.disabled = true;
  } else {
    message.textContent = `You rolled a ${diceRoll}. Now on square ${playerPosition}.`;
  }
}

rollDiceButton.addEventListener('click', rollDice);
createBoard();
