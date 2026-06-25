let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

const promptEl = document.getElementById("prompt");
const feedbackEl = document.getElementById("feedback");
const questionCounterEl = document.getElementById("questionCounter");
const scoreDisplayEl = document.getElementById("scoreDisplay");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const regions = document.querySelectorAll(".region");

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function startQuiz() {
  questions = shuffle(QUESTIONS).slice(0, 8);
  currentIndex = 0;
  score = 0;
  updateDisplay();
}

function clearRegionStyles() {
  regions.forEach(region => {
    region.classList.remove("correct-region", "wrong-region");
  });
}

function updateDisplay() {
  answered = false;
  clearRegionStyles();
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextButton.disabled = true;

  if (currentIndex >= questions.length) {
    promptEl.textContent = `Finished! Final score: ${score}/${questions.length}`;
    questionCounterEl.textContent = "Complete";
    scoreDisplayEl.textContent = `Score: ${score}`;
    return;
  }

  const q = questions[currentIndex];
  promptEl.textContent = q.prompt;
  questionCounterEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  scoreDisplayEl.textContent = `Score: ${score}`;
}

function handleRegionClick(event) {
  if (answered || currentIndex >= questions.length) return;

  const clickedId = event.target.id;
  const correctId = questions[currentIndex].answer;
  answered = true;

  if (clickedId === correctId) {
    score++;
    event.target.classList.add("correct-region");
    feedbackEl.textContent = "Correct!";
    feedbackEl.className = "feedback correct";
  } else {
    event.target.classList.add("wrong-region");
    document.getElementById(correctId).classList.add("correct-region");
    const correctName = document.getElementById(correctId).dataset.name;
    feedbackEl.textContent = `Not quite. The correct answer was ${correctName}.`;
    feedbackEl.className = "feedback incorrect";
  }

  scoreDisplayEl.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

regions.forEach(region => region.addEventListener("click", handleRegionClick));
nextButton.addEventListener("click", () => {
  currentIndex++;
  updateDisplay();
});
restartButton.addEventListener("click", startQuiz);

startQuiz();
