let position = 0;
const boardSize = 25;

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById("dice-result").textContent = `You rolled a ${roll}`;
  askQuestion(roll);
}

function askQuestion(roll) {
  const q = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("question-box").classList.remove("hidden");
  document.getElementById("question-text").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === q.answer) {
        position += roll;
        updateBoard();
        alert("Correct! You move forward.");
      } else {
        alert("Incorrect! Try again next turn.");
      }
      document.getElementById("question-box").classList.add("hidden");
    };
    answersDiv.appendChild(btn);
  });
}

function updateBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    const cell = document.createElement("div");
    cell.textContent = i === position ? "🧍" : i + 1;
    board.appendChild(cell);
  }
}

updateBoard();
