// Modal setup
const modal = document.getElementById("settings-modal");
const btnSettings = document.getElementById("settings");
const span = document.getElementsByClassName("close")[0];

// Open and close settings modal
btnSettings.onclick = () => { modal.style.display = "block"; };
span.onclick = () => { modal.style.display = "none"; };

// Default game settings
let questionTime = 5;
let totalQuestions = 10;
let pointsCorrect = 2;
let pointsWrong = 1;
let darkModeEnabled = false;

// Save settings
document.getElementById("save-settings").onclick = function () {
    questionTime = document.getElementById("question-time").value;
    totalQuestions = document.getElementById("total-questions").value;
    pointsCorrect = document.getElementById("points-correct").value;
    pointsWrong = document.getElementById("points-wrong").value;
    darkModeEnabled = document.getElementById("dark-mode").checked;

    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    modal.style.display = "none";
};

// Game start logic
document.getElementById("start-game").onclick = function () {
    startGame();
};

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timer;

const questions = [
    { question: "Translate 'Cat' into Bengali", answer: "বিড়াল" },
    { question: "Translate 'Dog' into Bengali", answer: "কুকুর" },
    { question: "Translate 'Bird' into Bengali", answer: "পাখি" },
];

// Game start function
function startGame() {
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    nextQuestion();
}

// Move to the next question
function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }

    const questionObj = questions[currentQuestion % questions.length];
    const userAnswer = prompt(questionObj.question); // Replace with better input later

    if (userAnswer === questionObj.answer) {
        correctAnswers++;
        showReaction("love");
    } else {
        wrongAnswers++;
        showReaction("sad");
    }

    currentQuestion++;
    setTimeout(nextQuestion, 2000); // Delay for next question
}

// Show reaction (love or sad)
function showReaction(type) {
    const reaction = document.createElement("div");
    reaction.textContent = type === "love" ? "❤️" : "😢";
    reaction.classList.add("reaction");
    document.body.appendChild(reaction);
    setTimeout(() => reaction.remove(), 1000);
}

// End game and show summary
function endGame() {
    alert(`Game Over! Correct: ${correctAnswers}, Wrong: ${wrongAnswers}`);
}