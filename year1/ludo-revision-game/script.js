const questions = [
    {
        question: "What is the function of the biliary tract?",
        answer: "Transport bile from the liver to the small intestine"
    },
    {
        question: "Name the parts of the pancreas.",
        answer: "Head, body, tail"
    },
    {
        question: "What is the role of the spleen?",
        answer: "Filter blood and support the immune system"
    }
];

let currentQuestionIndex = 0;

document.getElementById('roll-dice').addEventListener('click', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    alert(`You rolled a ${diceRoll}`);
    // You can add player movement logic here
});

document.getElementById('submit-answer').addEventListener('click', () => {
    const userAnswer = document.getElementById('answer').value;
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
        alert('Correct answer!');
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        document.getElementById('question').innerText = questions[currentQuestionIndex].question;
    } else {
        alert('Incorrect answer. Try again.');
    }
});

document.getElementById('question').innerText = questions[currentQuestionIndex].question;

