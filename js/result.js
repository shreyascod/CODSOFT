// js/result.js
window.onload = function(){
const quizData = JSON.parse(localStorage.getItem("quizData"));
const quizScore = parseInt(localStorage.getItem("quizScore") || "0", 10);
const userAnswers = JSON.parse(localStorage.getItem("quizUserAnswers") || "[]");
const resultDiv = document.getElementById("result");

if (!quizData) {
  resultDiv.innerHTML = "<p>No quiz results found.</p>";
  return;
} 

  const total = quizData.questions.length;
  let html = `
    <h2>${quizData.title}</h2>
    <p>You scored ${quizScore} out of ${total}</p>
    <hr>
    <ol>
  `;

  quizData.questions.forEach((q, i) => {
    const userAns = userAnswers[i] !=null ? q.options[userAnswers[i]] : "(no answer)";
    const correctAns = q.options[q.correctIndex];
    html += `<li><strong>${q.text}</strong><br>Your answer: ${userAns}<br>Correct: ${correctAns}</li>`;
  });

  html += "</ol>";
  resultDiv.innerHTML = html;

  if(quizScore > total / 2) {
    const popup = document.getElementById("celebrationPopup");
    const sound = document.getElementById("celebrationSound");

    if (popup) popup.classList.remove("hidden");
    if (sound) sound.play();

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6}
    });
  }

  window.closePopup = function () {
    document.getElementById("celebrationPopup").classList.add("hidden");
  };

  window.restartQuiz = function () {
    localStorage.removeItem("quizScore");
    localStorage.removeItem("quizUserAnswers");
    window.location.href = "index.html";
  };
};

function toggleTheme() {
  document.body.classList.toggle("dark");
}
