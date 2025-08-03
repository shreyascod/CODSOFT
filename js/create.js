// js/create.js
const STORAGE_KEY = "quizData";
const questionsContainer = document.getElementById("questionsContainer");
const addQuestionBtn = document.getElementById("addQuestionBtn");

let questionCount = 0;
addQuestionBtn.addEventListener("click", () => {
  questionCount++;
  const div = document.createElement("div");
  div.className = `question-block`;
  div.innerHTML = `
  <h3>Question ${questionCount}</h3>
  <input type="text" class="questionText" placeholder="Question" required><br>
  <input type="text" class="option" placeholder="Option 1" required><br>
        <input type="text" class="option" placeholder="Option 2" required><br>
        <input type="text" class="option" placeholder="Option 3" required><br>
        <input type="text" class="option" placeholder="Option 4" required><br>
        Correct Answer (1-4): <input type="number" class="correctIndex" min="1" max="4" required><br><br>
        `;
        questionsContainer.appendChild(div);
});

document.getElementById("quizForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("quizTitle").value.trim();
  const questionBlocks = document.querySelectorAll(".question-block");

  const questions = [];
  questionBlocks.forEach(block => {
    const text = block.querySelector(".questionText").value.trim();
    const options = Array.from(block.querySelectorAll(".option")).map(o => o.value.trim());
    const correctIndex = parseInt(block.querySelector(".correctIndex").value.trim()) - 1;
    questions.push({text,options,correctIndex});
  });

  const quizObj = { title, questions };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizObj));
    alert("Quiz saved!");
    window.location.href = "quiz.html";
});
function toggleTheme() {
  document.body.classList.toggle("dark");
}
