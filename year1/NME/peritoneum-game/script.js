// Game setup
const board = document.getElementById('board');
const player = document.getElementById('player');
const rollBtn = document.getElementById('roll-btn');
const questionBox = document.getElementById('question-box');
const questionText = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const submitBtn = document.getElementById('submit');

let playerPosition = 0;

// All 30 medical questions
const questions = [
    {
        "question": "Which structure separates the greater and lesser sacs of the peritoneal cavity?",
        "options": ["Mesentery", "Epiploic foramen", "Rectus sheath", "Inguinal canal"],
        "answer": "Epiploic foramen",
        "explanation": "The epiploic foramen is the passage between the greater and lesser sacs."
    },
    {
        "question": "The lesser sac is located anterior to the stomach.",
        "options": ["True", "False"],
        "answer": "False",
        "explanation": "The lesser sac is located posterior to the stomach."
    },
    {
        "question": "Arrange the layers of the anterolateral abdominal wall from superficial to deep.",
        "options": [
            "Skin",
            "Superficial fascia",
            "External oblique",
            "Internal oblique",
            "Transversus abdominis",
            "Transversalis fascia",
            "Parietal peritoneum"
        ],
        "answer": "Skin, Superficial fascia, External oblique, Internal oblique, Transversus abdominis, Transversalis fascia, Parietal peritoneum",
        "explanation": "The correct order of layers from superficial to deep is as listed."
    },
    {
        "question": "Which artery supplies blood to the anterolateral abdominal wall?",
        "options": ["Superior epigastric artery", "Inferior epigastric artery", "Femoral artery", "Aorta"],
        "answer": "Superior epigastric artery",
        "explanation": "The superior epigastric artery supplies blood to the anterolateral abdominal wall."
    },
    {
        "question": "The inguinal canal is located in the anterolateral abdominal wall.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The inguinal canal is located in the anterolateral abdominal wall."
    },
    {
        "question": "Which structure forms the anterior boundary of the abdominal cavity?",
        "options": ["Rectus abdominis", "Transversus abdominis", "External oblique", "Internal oblique"],
        "answer": "Rectus abdominis",
        "explanation": "The rectus abdominis forms the anterior boundary of the abdominal cavity."
    },
    {
        "question": "The greater sac is located posterior to the stomach.",
        "options": ["True", "False"],
        "answer": "False",
        "explanation": "The greater sac is located anterior to the stomach."
    },
    {
        "question": "Which structure is responsible for the rotation of the gut during development?",
        "options": ["Mesentery", "Epiploic foramen", "Rectus sheath", "Inguinal canal"],
        "answer": "Mesentery",
        "explanation": "The mesentery is responsible for the rotation of the gut during development."
    },
    {
        "question": "The peritoneum is a single-layered membrane.",
        "options": ["True", "False"],
        "answer": "False",
        "explanation": "The peritoneum is a double-layered membrane."
    },
    {
        "question": "Which structure connects the greater and lesser sacs?",
        "options": ["Mesentery", "Epiploic foramen", "Rectus sheath", "Inguinal canal"],
        "answer": "Epiploic foramen",
        "explanation": "The epiploic foramen connects the greater and lesser sacs."
    },
    {
        "question": "The mesentery is responsible for the rotation of the gut during development.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The mesentery is responsible for the rotation of the gut during development."
    },
    {
        "question": "Which structure forms the posterior boundary of the abdominal cavity?",
        "options": ["Rectus abdominis", "Transversus abdominis", "External oblique", "Internal oblique"],
        "answer": "Transversus abdominis",
        "explanation": "The transversus abdominis forms the posterior boundary of the abdominal cavity."
    },
    {
        "question": "The peritoneum lines the abdominal cavity and viscera.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The peritoneum lines the abdominal cavity and viscera."
    },
    {
        "question": "Which structure is located in the free edge of the lesser omentum?",
        "options": ["Epiploic foramen", "Portal vein", "Rectus sheath", "Inguinal canal"],
        "answer": "Portal vein",
        "explanation": "The portal vein is located in the free edge of the lesser omentum."
    },
    {
        "question": "The rectus sheath is part of the anterolateral abdominal wall.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The rectus sheath is part of the anterolateral abdominal wall."
    },
    {
        "question": "Which structure forms the lateral boundary of the abdominal cavity?",
        "options": ["Rectus abdominis", "Transversus abdominis", "External oblique", "Internal oblique"],
        "answer": "External oblique",
        "explanation": "The external oblique forms the lateral boundary of the abdominal cavity."
    },
    {
        "question": "The inguinal canal is located in the posterior abdominal wall.",
        "options": ["True", "False"],
        "answer": "False",
        "explanation": "The inguinal canal is located in the anterolateral abdominal wall."
    },
    {
        "question": "Which structure is responsible for the formation of the greater and lesser sacs?",
        "options": ["Mesentery", "Epiploic foramen", "Rectus sheath", "Inguinal canal"],
        "answer": "Mesentery",
        "explanation": "The mesentery is responsible for the formation of the greater and lesser sacs."
    },
    {
        "question": "The peritoneum is a double-layered membrane.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The peritoneum is a double-layered membrane."
    },
    {
        "question": "Which structure forms the superior boundary of the abdominal cavity?",
        "options": ["Diaphragm", "Rectus abdominis", "Transversus abdominis", "External oblique"],
        "answer": "Diaphragm",
        "explanation": "The diaphragm forms the superior boundary of the abdominal cavity."
    },
    {
        "question": "The lesser sac is located posterior to the stomach.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The lesser sac is located posterior to the stomach."
    },
    {
        "question": "Which structure connects the greater and lesser sacs?",
        "options": ["Mesentery", "Epiploic foramen", "Rectus sheath", "Inguinal canal"],
        "answer": "Epiploic foramen",
        "explanation": "The epiploic foramen connects the greater and lesser sacs."
    },
    {
        "question": "The mesentery is responsible for the rotation of the gut during development.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The mesentery is responsible for the rotation of the gut during development."
    },
    {
        "question": "Which structure forms the posterior boundary of the abdominal cavity?",
        "options": ["Rectus abdominis", "Transversus abdominis", "External oblique", "Internal oblique"],
        "answer": "Transversus abdominis",
        "explanation": "The transversus abdominis forms the posterior boundary of the abdominal cavity."
    },
    {
        "question": "The peritoneum lines the abdominal cavity and viscera.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The peritoneum lines the abdominal cavity and viscera."
    },
    {
        "question": "Which structure is located in the free edge of the lesser omentum?",
        "options": ["Epiploic foramen", "Portal vein", "Rectus sheath", "Inguinal canal"],
        "answer": "Portal vein",
        "explanation": "The portal vein is located in the free edge of the lesser omentum."
    },
    {
        "question": "The rectus sheath is part of the anterolateral abdominal wall.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The rectus sheath is part of the anterolateral abdominal wall."
    },
    {
        "question": "Which structure forms the lateral boundary of the abdominal cavity?",
        "options": ["Rectus abdominis", "Transversus abdominis", "External oblique", "Internal oblique"],
        "answer": "External oblique",
        "explanation": "The external oblique forms the lateral boundary of the abdominal cavity."
    },
    {
        "question": "The inguinal canal is located in the posterior abdominal wall.",
        "options": ["True", "False"],
        "answer": "False",
        "explanation": "The inguinal canal is located in the anterolateral abdominal wall."
    },
    {
        "question": "Which structure is responsible for the formation of the greater and lesser sacs?",
        "options": ["Mesentery", "Epiploic foramen", "Rectus sheath", "Inguinal canal"],
        "answer": "Mesentery",
        "explanation": "The mesentery is responsible for the formation of the greater and lesser sacs."
    },
    {
        "question": "The peritoneum is a double-layered membrane.",
        "options": ["True", "False"],
        "answer": "True",
        "explanation": "The peritoneum is a double-layered membrane."
    }
];

// Define snakes and ladders positions (start: end)
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
    // Create 100 tiles in reverse order (snakes and ladders board)
    for (let row = 9; row >= 0; row--) {
        for (let col = 0; col < 10; col++) {
            const tileNum = row % 2 === 0 ? (9 - row) * 10 + col : (9 - row) * 10 + (9 - col);
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            // Add tile number
            const numberSpan = document.createElement('span');
            numberSpan.className = 'tile-number';
            numberSpan.textContent = tileNum + 1;
            tile.appendChild(numberSpan);
            
            tile.id = `tile-${tileNum}`;
            
            if (snakes[tileNum]) {
                tile.classList.add('snake');
            }
            if (ladders[tileNum]) {
                tile.classList.add('ladder');
            }
            
            board.appendChild(tile);
        }
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
        if (snakes[playerPosition] !== undefined) {
            showQuestion(true, playerPosition, snakes[playerPosition]);
        } else if (ladders[playerPosition] !== undefined) {
            showQuestion(false, playerPosition, ladders[playerPosition]);
        }
    }, 500);
};

// Show question for snake or ladder
function showQuestion(isSnake, currentPos, targetPos) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    currentQuestion = randomQuestion;
    
    questionText.textContent = randomQuestion.question;
    optionsDiv.innerHTML = '';
    
    randomQuestion.options.forEach((option) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = function() {
            document.querySelectorAll('.option-btn').forEach(b => {
                b.style.backgroundColor = '';
            });
            this.style.backgroundColor = '#ddd';
            submitBtn.dataset.selected = option;
        };
        optionsDiv.appendChild(btn);
    });
    
    submitBtn.onclick = function() {
        const selectedOption = submitBtn.dataset.selected;
        const isCorrect = selectedOption === currentQuestion.answer;
        
        if (isSnake) {
            // Snake rules: correct = stay, wrong = slide down
            if (!isCorrect) {
                playerPosition = targetPos;
                alert(`Wrong! ${currentQuestion.explanation}\nYou slide down to position ${playerPosition + 1}`);
            } else {
                alert(`Correct! ${currentQuestion.explanation}\nYou avoid the snake!`);
            }
        } else {
            // Ladder rules: correct = climb up, wrong = stay
            if (isCorrect) {
                playerPosition = targetPos;
                alert(`Correct! ${currentQuestion.explanation}\nYou climb up to position ${playerPosition + 1}`);
            } else {
                alert(`Wrong! ${currentQuestion.explanation}\nYou miss the ladder.`);
            }
        }
        
        questionBox.style.display = 'none';
        updatePlayerPosition();
    };
    
    questionBox.style.display = 'block';
}

// Initialize the game
createBoard();
