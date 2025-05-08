
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

// Create board
for (let i = 99; i >= 0; i--) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  if ((i + 1) % 9 === 0) cell.classList.add('snake');
  if ((i + 1) % 10 === 0) cell.classList.add('ladder');
  cell.textContent = i + 1;
  board.appendChild(cell);
}
board.children[99].appendChild(player);

// Load questions
let questions = [];
fetch('questions.json')
  .then(res => res.json())
  .then(data => questions = data);

// Dice roll
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

function movePlayer() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    if (cell.contains(player)) cell.removeChild(player);
  });
  cells[99 - playerPosition].appendChild(player);
}

function showQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  questionText.textContent = q.question;
  options.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.answer) {
        alert('✅ Correct!
' + q.explanation);
      } else {
        alert('❌ Incorrect.
' + q.explanation);
        playerPosition -= 3;
        if (playerPosition < 0) playerPosition = 0;
        movePlayer();
      }
      hidePopup();
    };
    options.appendChild(btn);
  });
  overlay.style.display = 'block';
  questionPopup.style.display = 'block';
}

function hidePopup() {
  questionPopup.style.display = 'none';
  overlay.style.display = 'none';
}

closePopup.addEventListener('click', hidePopup);
