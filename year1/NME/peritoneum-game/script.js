let loadedQuestions = [];

async function loadQuestions() {
  const res = await fetch('questions.json');  // File must be renamed to questions.json and placed in the root/public folder
  loadedQuestions = await res.json();
}

function askQuestion() {
  const q = loadedQuestions[Math.floor(Math.random() * loadedQuestions.length)];

  questionText.innerHTML = q.question;
  questionBox.innerHTML = `<p>${q.question}</p>`;

  // Handle options
  if (Array.isArray(q.options)) {
    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.addEventListener('click', () => {
        const correct = Array.isArray(q.answer)
          ? JSON.stringify(q.answer) === JSON.stringify(q.options)
          : option === q.answer;

        if (correct) {
          message.textContent = "✅ Correct!";
          questionBox.classList.add('hidden');
          movePlayer();
        } else {
          message.textContent = `❌ Incorrect. Correct answer: ${q.answer}`;
          questionBox.classList.add('hidden');
          nextTurn();
        }
      });
      questionBox.appendChild(btn);
    });
  } else {
    const input = document.createElement('input');
    input.placeholder = "Your answer...";
    const submit = document.createElement('button');
    submit.textContent = "Submit Answer";
    submit.onclick = () => {
      if (input.value.trim().toLowerCase() === q.answer.toLowerCase()) {
        message.textContent = "✅ Correct!";
        questionBox.classList.add('hidden');
        movePlayer();
      } else {
        message.textContent = `❌ Incorrect. Correct answer: ${q.answer}`;
        questionBox.classList.add('hidden');
        nextTurn();
      }
    };
    questionBox.appendChild(input);
    questionBox.appendChild(submit);
  }

  questionBox.classList.remove('hidden');
}
