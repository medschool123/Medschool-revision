const board = document.getElementById('board');
const rollDice = document.getElementById('rollDice');
const questionPopup = document.getElementById('questionPopup');
const questionText = document.getElementById('questionText');
const options = document.getElementById('options');
const closePopup = document.getElementById('closePopup');
const overlay = document.getElementById('overlay');

let playerPosition = 0;
const player = document.createElement('div');
player.classList.add('player');

// 🐍 Snakes: if you land here and get it wrong, you slide down
const snakes = {
  92: 6,
  83: 5,
  94: 20,
  86: 3,
  69: 4,
  70: 1,
  89: 2,
  96: 7,
  99: 8,
  97: 9
};

// 🪜 Ladders: if you land here and get it right, you climb up
const ladders = {
  2: 41,
  5: 43,
  6: 48,
  7: 45,
  8: 47,
  10: 49,
  11: 50,
  12: 51,
  13: 52,
  14: 53
};

// 🎲 Create the board
for (let i = 99; i >= 0; i--) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  if (snakes[i + 1]) cell.classList.add('snake');
  if (ladders[i + 1]) cell.classList.add('ladder');
  cell.textContent = i + 1;
  board.appendChild(cell);
}
board.children[99].appendChild(player);

// 📚 Load questions
let questions = [];
fetch('questions.json')
  .then(res => res.json())
  .then(data => questions = data);

// 🎲 Roll the dice
rollDice.addEventListener('click', () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  playerPosition += roll;
  if (playerPosition >= 99) {
    playerPosition = 99;
    alert("🎉 You've completed the Peritoneum Quest!");
  }
  movePlayer();
  showQuestion();
});

// 🧍 Move the player
function movePlayer() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    if (cell.contains(player)) cell.removeChild(player);
  });
  cells[99 - playerPosition].appendChild(player);
}

// ❓ Show a question
function showQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  questionText.textContent = q.question;
  options.innerHTML = '';

  const currentTile = playerPosition + 1;
  const isSnake = snakes[currentTile];
  const isLadder = ladders[currentTile];

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.answer) {
        alert('✅ Correct!
' + q.explanation);
        if (isLadder) {
          animatePlayerMove(currentTile, ladders[currentTile]);
        }
      } else {
        alert('❌ Incorrect.
' + q.explanation);
        if (isSnake) {
          animatePlayerMove(currentTile, snakes[currentTile]);
        }
      }
      hidePopup();
    };
    options.appendChild(btn);
  });

  overlay.style.display = 'block';
  questionPopup.style.display = 'block';
}

// 🧍 Animate player movement
function animatePlayerMove(start, end) {
  const step = start < end ? 1 : -1;
  const interval = setInterval(() => {
    playerPosition += step;
    movePlayer();
    if (playerPosition + 1 === end) {
      clearInterval(interval);
    }
  }, 300);
}

// ❌ Hide the popup
function hidePopup() {
  questionPopup.style.display = 'none';
  overlay.style.display = 'none';
}

closePopup.addEventListener('click', hidePopup);
