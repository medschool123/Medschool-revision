// Game setup
const board = document.getElementById('board');
const player = document.getElementById('player');
const rollBtn = document.getElementById('roll-btn');
const questionBox = document.getElementById('question-box');
const questionText = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const submitBtn = document.getElementById('submit');

let playerPosition = 0;
let currentQuestion = null;
let isOnSpecialTile = false;

// Your medical questions
const questions = [
    {
        question: "What is the primary function of the peritoneum?",
        options: ["Mechanical protection and support", "Nutrient absorption", "Hormone production", "Blood filtration"],
        answer: 0,
        explanation: "The peritoneum primarily provides mechanical protection and support to abdominal organs."
    },
    {
        question: "Which structure is NOT part of the peritoneal cavity?",
        options: ["Greater omentum", "Lesser omentum", "Mesentery", "Renal cortex"],
        answer: 3,
        explanation: "The renal cortex is part of the kidney, which is retroperitoneal."
    },
    // Add more questions here in the same format
    {
        question: "What is the name of the double layer of peritoneum that connects the stomach to another organ?",
        options: ["Mesentery", "Omentum", "Ligament", "Fascia"],
        answer: 1,
        explanation: "The omentum is a double layer of peritoneum that connects the stomach to other organs."
    }
];

// Define snakes and ladders positions
const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

// Create the game board
function createBoard() {
    for (let i = 0; i < 100; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = i + 1;
        tile.id = `tile-${i}`;
        
        // Mark snake tiles
        if (snakes[i]) {
            tile.classList.add('snake');
            tile.innerHTML += '<div class="snake-mark">🐍</div>';
        }
        
        // Mark ladder tiles
        if (ladders[i]) {
            tile.classList.add('ladder');
            tile.innerHTML += '<div class="ladder-mark">🪜</div>';
        }
        
        board.appendChild(tile);
    }
    updatePlayerPosition();
}

// Move player to current position
function updatePlayerPosition() {
    const tile = document.getElementById(`tile-${playerPosition}`);
    if (tile) {
        const rect = tile.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();
        player.style.left = `${rect.left - boardRect.left + rect.width/2 - 10}px`;
        player.style.top = `${rect.top - boardRect.top + rect.height/2 - 10}px`;
    }
}

// Roll dice function
rollBtn.onclick = function() {
    if (questionBox.style.display === 'block') return;
    
    const roll = Math.floor(Math.random() * 6) + 1;
    playerPosition += roll;
    
    if (playerPosition >= 99) {
        playerPosition = 99;
        alert("Congratulations! You've reached the end!");
        return;
    }
    
    updatePlayerPosition();
    
    // Check for snake or ladder
    setTimeout(() => {
        if (snakes[playerPosition]) {
            showQuestion(true, playerPosition, snakes[playerPosition]);
        } else if (ladders[playerPosition]) {
            showQuestion(false, playerPosition, ladders[playerPosition]);
        }
    }, 500);
};

// Show question for snake or ladder
function showQuestion(isSnake, currentPos, targetPos) {
    isOnSpecialTile = true;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    currentQuestion = randomQuestion;
    
    questionText.textContent = randomQuestion.question;
    optionsDiv.innerHTML = '';
    
    randomQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.index = index;
        btn.onclick = function() {
            document.querySelectorAll('.option-btn').forEach(b => {
                b.style.backgroundColor = '';
            });
            this.style.backgroundColor = '#ddd';
            submitBtn.dataset.selected = this.dataset.index;
        };
        optionsDiv.appendChild(btn);
    });
    
    submitBtn.onclick = function() {
        const selectedOption = parseInt(submitBtn.dataset.selected);
        const isCorrect = selectedOption === randomQuestion.answer;
        
        if (isSnake) {
            // Snake rules: correct = stay, wrong = slide down
            if (!isCorrect) {
                playerPosition = targetPos;
                alert(`Wrong! ${randomQuestion.explanation}\nYou slide down to position ${playerPosition + 1}`);
            } else {
                alert(`Correct! ${randomQuestion.explanation}\nYou avoid the snake!`);
            }
        } else {
            // Ladder rules: correct = climb up, wrong = stay
            if (isCorrect) {
                playerPosition = targetPos;
                alert(`Correct! ${randomQuestion.explanation}\nYou climb up to position ${playerPosition + 1}`);
            } else {
                alert(`Wrong! ${randomQuestion.explanation}\nYou miss the ladder.`);
            }
        }
        
        questionBox.style.display = 'none';
        isOnSpecialTile = false;
        updatePlayerPosition();
    };
    
    questionBox.style.display = 'block';
}

// Initialize the game
createBoard();
