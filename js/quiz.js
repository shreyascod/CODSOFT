// js/quiz.js
const STORAGE_KEY = "quizData";
const quizData = JSON.parse(localStorage.getItem(STORAGE_KEY));
const quizTitle = document.getElementById("quizTitle");
const quizContainer = document.getElementById("quizContainer");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progressBar = document.getElementById("progress");
const questionCount = document.getElementById("questionCount");
const timerDisplay = document.getElementById("timer");

let currentIndex = 0;
let userAnswers = []; // store selected index numbers
let timeLeft = 15;
let timer;

function toggleTheme() {
  document.body.classList.toggle("dark");
}

if (!quizData) {
  quizContainer.innerHTML = "<p>No quiz found. Please create one first.</p>";
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";
} else {
  quizTitle.textContent = quizData.title;
  renderQuestion();
}

function renderQuestion() {
  const q = quizData.questions[currentIndex];
  questionCount.textContent = `Question ${currentIndex + 1} / ${quizData.questions.length}`;
  quizContainer.innerHTML = `
    <h3>${q.text}</h3>
    ${q.options.map((opt, i) => `
      <div class="option-btn" data-index="${i}"><strong>${String.fromCharCode(65+i)}.</strong> ${opt}</div>
    `).join("")}
  `;
  document.querySelectorAll(".option-btn").forEach(btn=> {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");  
    });
  });
  updateProgress();
  startTimer();
}

function updateProgress(){
  const percent = ((currentIndex + 1) / quizData.questions.length) * 100;
  progressBar.style.width = percent + "%";
}

function getSelected() {
  const selected = document.querySelector(".option-btn.selected");
  return selected ? parseInt(selected.dataset.index) : null;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNext();
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  clearInterval(timer);
  handleNext();
});
submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  handleSubmit();
});

function handleNext() {
  const ans = getSelected();
  userAnswers[currentIndex] = ans !=null ? ans : -1;
  if (currentIndex < quizData.questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    handleSubmit();
  }
}

function handleSubmit() {
  const ans = getSelected();
  if (ans !== null) userAnswers[currentIndex] = ans;
  localStorage.setItem("quizUserAnswers", JSON.stringify(userAnswers));
  let score = 0;
  quizData.questions.forEach((q, i) => {
    if (userAnswers[i] === q.correctIndex) score++;
  });
  localStorage.setItem("quizScore", score);
  window.location.href = "result.html";
}
