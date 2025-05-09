const questions = [
    {
        question: "What is the function of the biliary tract?",
        options: ["Transport bile from the liver to the small intestine", "Produce bile", "Store bile", "Filter blood"],
        answer: "Transport bile from the liver to the small intestine"
    },
    {
        question: "Name the parts of the pancreas.",
        options: ["Head, body, tail", "Head, neck, tail", "Body, neck, tail", "Head, body, neck"],
        answer: "Head, body, tail"
    },
    {
        question: "What is the role of the spleen?",
        options: ["Filter blood and support the immune system", "Produce bile", "Store bile", "Transport bile"],
        answer: "Filter blood and support the immune system"
    },
    {
        question: "What are the parts of the gallbladder?",
        options: ["Fundus, body, infundibulum, neck", "Head, body, tail", "Fundus, neck, tail", "Body, neck, tail"],
        answer: "Fundus, body, infundibulum, neck"
    },
    {
        question: "Which duct joins with the common hepatic duct to form the common bile duct?",
        options: ["Cystic duct", "Pancreatic duct", "Gallbladder duct", "Spleen duct"],
        answer: "Cystic duct"
    },
    {
        question: "What is the function of the hepatopancreatic sphincter (of Oddi)?",
        options: ["Controls bile and pancreatic juice flow into the duodenum", "Produces bile", "Stores bile", "Filters blood"],
        answer: "Controls bile and pancreatic juice flow into the duodenum"
    },
    {
        question: "Which artery supplies the gallbladder?",
        options: ["Cystic artery", "Pancreatic artery", "Spleen artery", "Hepatic artery"],
        answer: "Cystic artery"
    },
    {
        question: "What is the referred pain location for gallbladder inflammation?",
        options: ["Right shoulder", "Left shoulder", "Lower back", "Upper back"],
        answer: "Right shoulder"
    },
    {
        question: "What are the endocrine functions of the pancreas?",
        options: ["Secretion of insulin and glucagon", "Production of bile", "Storage of bile", "Filtering blood"],
        answer: "Secretion of insulin and glucagon"
    },
    {
        question: "What is Kehr’s sign and what does it indicate?",
        options: ["Left shoulder pain indicating splenic injury", "Right shoulder pain indicating gallbladder inflammation", "Lower back pain indicating kidney stones", "Upper back pain indicating liver injury"],
        answer: "Left shoulder pain indicating splenic injury"
    }
];

let currentQuestionIndex = 0;
let playerPosition = 0;

const gameBoard = document.getElementById('game-board');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');

function createBoard() {
    for (let i = 0; i < 100; i++) {
        const tile = document.createElement('div');
        gameBoard.appendChild(tile);
    }
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Shuffle the options
    const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);

    optionsElement.innerHTML = '';
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);

    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        alert('Correct answer!');
        playerPosition += 1;
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        updateBoard();
    } else {
        alert('Incorrect answer. Try again.');
    }
    displayQuestion();
}

function updateBoard() {
    const tiles = gameBoard.children;
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.backgroundColor = i === playerPosition ? 'green' : 'lightblue';
    }
}

document.getElementById('roll-dice').addEventListener('click', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    alert(`You rolled a ${diceRoll}`);
    playerPosition += diceRoll;
    playerPosition = Math.min(playerPosition, 99);
    updateBoard();
    displayQuestion();
});

createBoard();
displayQuestion();
updateBoard();
