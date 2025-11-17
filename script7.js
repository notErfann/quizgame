const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "What is the capital of Italy?",
        answers: [
            { text: "Rome", correct: true },
            { text: "Paris", correct: false },
            { text: "Madrid", correct: false },
            { text: "Brussels", correct: false }
        ]
    },
    {
        question: "What is the capital of Spain?",
        answers: [
            { text: "Madrid", correct: true },
            { text: "Rome", correct: false },
            { text: "Barcelona", correct: false },
            { text: "Paris", correct: false }
        ]
    }
];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let scoresElement = document.getElementById("scores");
let nextButton = document.getElementById("next-btn");
let usernameBox = document.getElementById("username");

let username = prompt("Enter your name:");
usernameBox.innerHTML = username || "Guest";

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoresElement.innerHTML = "0";
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let current = questions[currentQuestionIndex];

    questionElement.innerHTML = current.question;

    current.answers.forEach(ans => {
        let btn = document.createElement("button");
        btn.innerHTML = ans.text;
        btn.classList.add("btn");
        if (ans.correct) btn.dataset.correct = true;
        btn.addEventListener("click", selectAnswer);
        answerButtons.appendChild(btn);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    let selected = e.target;
    let correct = selected.dataset.correct === "true";

    if (correct) {
        selected.classList.add("correct");
        score++;
        scoresElement.innerHTML = score;
    } else {
        selected.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(b => {
        if (b.dataset.correct === "true") b.classList.add("correct");
        b.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    questionElement.innerHTML = "Quiz Completed!";
    answerButtons.innerHTML = "";
    nextButton.innerText = "Restart";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerText.includes("Restart")) {
        startQuiz();
    } else {
        handleNext();
    }
});

startQuiz();
