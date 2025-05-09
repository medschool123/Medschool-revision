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
    },
    {
        question: "What are the parts of the gallbladder?",
        answer: "Fundus, body, infundibulum, neck"
    },
    {
        question: "Which duct joins with the common hepatic duct to form the common bile duct?",
        answer: "Cystic duct"
    },
    {
        question: "What is the function of the hepatopancreatic sphincter (of Oddi)?",
        answer: "Controls bile and pancreatic juice flow into the duodenum"
    },
    {
        question: "Which artery supplies the gallbladder?",
        answer: "Cystic artery"
    },
    {
        question: "What is the referred pain location for gallbladder inflammation?",
        answer: "Right shoulder"
    },
    {
        question: "What are the endocrine functions of the pancreas?",
        answer: "Secretion of insulin and glucagon"
    },
    {
        question: "What is Kehr’s sign and what does it indicate?",
        answer: "Left shoulder pain indicating splenic injury"
    },
    {
        question: "Which vein drains the spleen?",
        answer: "Splenic vein"
    },
    {
        question: "What is the function of the lesser omentum?",
        answer: "Transmits neurovascular structures and stabilizes stomach and duodenum"
    },
    {
        question: "Which lymph nodes drain the gallbladder?",
        answer: "Cystic lymph nodes"
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
    if (userAnswer.toLowerCase().trim() === questions[currentQuestionIndex].answer.toLowerCase().trim()) {
        alert('Correct answer!');
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        document.getElementById('question').innerText = questions[currentQuestionIndex].question;
    } else {
        alert('Incorrect answer. Try again.');
    }
});

document.getElementById('question').innerText = questions[currentQuestionIndex].question;
