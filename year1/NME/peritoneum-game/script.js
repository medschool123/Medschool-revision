document.addEventListener('DOMContentLoaded', function() {
    const boardSize = 10;
    const tileCount = boardSize * boardSize;
    const gameBoard = document.getElementById('game-board');
    const player = document.getElementById('player');
    const questionModal = document.getElementById('question-modal');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitButton = document.getElementById('submit-answer');
    
    let currentPosition = 0;
    let snakes = {};
    let ladders = {};
    let isAnimating = false;
    
    // Initialize the game board
    function initBoard() {
        gameBoard.innerHTML = '';
        
        // Create tiles
        for (let i = 0; i < tileCount; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile-${i}`;
            tile.textContent = i + 1;
            
            // Position tiles in a snake pattern
            const row = Math.floor(i / boardSize);
            const col = row % 2 === 0 ? i % boardSize : (boardSize - 1) - (i % boardSize);
            
            tile.style.left = `${col * 60}px`;
            tile.style.top = `${(boardSize - 1 - Math.floor(i / boardSize)) * 60}px`;
            
            gameBoard.appendChild(tile);
        }
        
        // Define snakes and ladders (start to end)
        snakes = {
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
        
        ladders = {
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
        
        // Draw snakes and ladders
        drawSnakesAndLadders();
        
        // Position player at start
        movePlayer(0);
    }
    
    function drawSnakesAndLadders() {
        // Clear existing snakes and ladders
        document.querySelectorAll('.snake, .ladder').forEach(el => el.remove());
        
        // Draw ladders
        for (const [start, end] of Object.entries(ladders)) {
            const startTile = document.getElementById(`tile-${start}`);
            const endTile = document.getElementById(`tile-${end}`);
            
            if (startTile && endTile) {
                const ladder = document.createElement('div');
                ladder.className = 'ladder';
                
                const startRect = startTile.getBoundingClientRect();
                const endRect = endTile.getBoundingClientRect();
                const boardRect = gameBoard.getBoundingClientRect();
                
                const startX = startRect.left + startRect.width/2 - boardRect.left;
                const startY = startRect.top + startRect.height/2 - boardRect.top;
                const endX = endRect.left + endRect.width/2 - boardRect.left;
                const endY = endRect.top + endRect.height/2 - boardRect.top;
                
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                ladder.style.width = `${length}px`;
                ladder.style.height = '20px';
                ladder.style.left = `${startX}px`;
                ladder.style.top = `${startY}px`;
                ladder.style.transformOrigin = '0 0';
                ladder.style.transform = `rotate(${angle}deg)`;
                
                gameBoard.appendChild(ladder);
            }
        }
        
        // Draw snakes (similar to ladders but with a snake image)
        for (const [start, end] of Object.entries(snakes)) {
            const startTile = document.getElementById(`tile-${start}`);
            const endTile = document.getElementById(`tile-${end}`);
            
            if (startTile && endTile) {
                const snake = document.createElement('div');
                snake.className = 'snake';
                
                const startRect = startTile.getBoundingClientRect();
                const endRect = endTile.getBoundingClientRect();
                const boardRect = gameBoard.getBoundingClientRect();
                
                const startX = startRect.left + startRect.width/2 - boardRect.left;
                const startY = startRect.top + startRect.height/2 - boardRect.top;
                const endX = endRect.left + endRect.width/2 - boardRect.left;
                const endY = endRect.top + endRect.height/2 - boardRect.top;
                
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                snake.style.width = `${length}px`;
                snake.style.height = '20px';
                snake.style.left = `${startX}px`;
                snake.style.top = `${startY}px`;
                snake.style.transformOrigin = '0 0';
                snake.style.transform = `rotate(${angle}deg)`;
                
                gameBoard.appendChild(snake);
            }
        }
    }
    
    function movePlayer(newPosition) {
        if (newPosition < 0) newPosition = 0;
        if (newPosition >= tileCount) newPosition = tileCount - 1;
        
        const tile = document.getElementById(`tile-${newPosition}`);
        if (tile) {
            const rect = tile.getBoundingClientRect();
            const boardRect = gameBoard.getBoundingClientRect();
            
            player.style.left = `${rect.left - boardRect.left + rect.width/2 - 15}px`;
            player.style.top = `${rect.top - boardRect.top + rect.height/2 - 15}px`;
            
            currentPosition = newPosition;
            
            // Check for snakes or ladders after move
            setTimeout(() => {
                checkSpecialTile(newPosition);
            }, 500);
        }
    }
    
    function checkSpecialTile(position) {
        if (isAnimating) return;
        
        if (ladders[position] !== undefined) {
            // Landed on a ladder
            showQuestion(true, position, ladders[position]);
        } else if (snakes[position] !== undefined) {
            // Landed on a snake
            showQuestion(false, position, snakes[position]);
        }
    }
    
    function showQuestion(isLadder, currentPos, targetPos) {
        isAnimating = true;
        
        // Sample questions - replace with your medical questions
        const questions = [
            {
                question: "What is the primary function of the peritoneum?",
                options: [
                    "A. Nutrient absorption",
                    "B. Mechanical protection and support",
                    "C. Hormone production",
                    "D. Blood filtration"
                ],
                correct: 1
            },
            {
                question: "Which structure is NOT part of the peritoneal cavity?",
                options: [
                    "A. Greater omentum",
                    "B. Lesser omentum",
                    "C. Mesentery",
                    "D. Renal cortex"
                ],
                correct: 3
            }
            // Add more questions here
        ];
        
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion.question;
        optionsContainer.innerHTML = '';
        
        randomQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.style.margin = '5px';
            optionElement.style.padding = '5px';
            optionElement.style.cursor = 'pointer';
            optionElement.style.border = '1px solid #ccc';
            optionElement.addEventListener('click', function() {
                document.querySelectorAll('#options-container div').forEach(el => {
                    el.style.backgroundColor = '';
                });
                this.style.backgroundColor = '#ddd';
                submitButton.dataset.selected = this.dataset.index;
            });
            optionsContainer.appendChild(optionElement);
        });
        
        submitButton.onclick = function() {
            const selectedOption = parseInt(submitButton.dataset.selected);
            const isCorrect = selectedOption === randomQuestion.correct;
            
            if (isLadder) {
                // Ladder logic
                if (isCorrect) {
                    animateMovement(currentPos, targetPos, true);
                } else {
                    // Stay in place
                    isAnimating = false;
                }
            } else {
                // Snake logic
                if (isCorrect) {
                    // Stay in place
                    isAnimating = false;
                } else {
                    animateMovement(currentPos, targetPos, false);
                }
            }
            
            questionModal.style.display = 'none';
        };
        
        questionModal.style.display = 'block';
    }
    
    function animateMovement(fromPos, toPos, isUpward) {
        const fromTile = document.getElementById(`tile-${fromPos}`);
        const toTile = document.getElementById(`tile-${toPos}`);
        
        if (!fromTile || !toTile) {
            isAnimating = false;
            return;
        }
        
        const fromRect = fromTile.getBoundingClientRect();
        const toRect = toTile.getBoundingClientRect();
        const boardRect = gameBoard.getBoundingClientRect();
        
        const path = isUpward ? 
            document.querySelector(`.ladder[style*="tile-${fromPos}"]`) : 
            document.querySelector(`.snake[style*="tile-${fromPos}"]`);
        
        if (path) {
            // Clone the player for animation
            const animatingPlayer = player.cloneNode();
            animatingPlayer.style.position = 'absolute';
            animatingPlayer.style.transition = 'all 2s linear';
            gameBoard.appendChild(animatingPlayer);
            
            // Hide original player during animation
            player.style.visibility = 'hidden';
            
            // Get path coordinates
            const pathRect = path.getBoundingClientRect();
            const angle = parseFloat(path.style.transform.replace('rotate(', '').replace('deg)', ''));
            
            // Calculate steps along the path
            const steps = 20;
            let currentStep = 0;
            
            function moveAlongPath() {
                if (currentStep > steps) {
                    // Animation complete
                    gameBoard.removeChild(animatingPlayer);
                    player.style.visibility = 'visible';
                    movePlayer(toPos);
                    isAnimating = false;
                    return;
                }
                
                const ratio = currentStep / steps;
                const x = fromRect.left - boardRect.left + (toRect.left - fromRect.left) * ratio;
                const y = fromRect.top - boardRect.top + (toRect.top - fromRect.top) * ratio;
                
                animatingPlayer.style.left = `${x + fromRect.width/2 - 15}px`;
                animatingPlayer.style.top = `${y + fromRect.height/2 - 15}px`;
                
                currentStep++;
                requestAnimationFrame(moveAlongPath);
            }
            
            moveAlongPath();
        } else {
            // Fallback if path element not found
            movePlayer(toPos);
            isAnimating = false;
        }
    }
    
    // Roll dice function (you can connect this to your dice button)
    function rollDice() {
        if (isAnimating) return;
        
        const diceValue = Math.floor(Math.random() * 6) + 1;
        const newPosition = currentPosition + diceValue;
        
        if (newPosition >= tileCount - 1) {
            // Player wins
            movePlayer(tileCount - 1);
            setTimeout(() => {
                alert('Congratulations! You won!');
            }, 1000);
        } else {
            movePlayer(newPosition);
        }
    }
    
    // Initialize the game
    initBoard();
    
    // Add event listener for dice roll (you can modify this to match your UI)
    document.addEventListener('keypress', function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            rollDice();
        }
    });
});
