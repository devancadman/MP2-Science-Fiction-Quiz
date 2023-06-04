document.addEventListener("DOMContentLoaded", function () {
    // Getting references to various elements
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const categoryHeading = document.getElementById("category-heading");
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-button");
    const resultContainer = document.getElementById("result-container");
    const resultText = document.getElementById("result-text");
    const homeButton = document.getElementById("home-button");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const counterText = document.getElementById("counter-text");
    const errorMessage = document.getElementById("error-message");
  
    // Variables for game logic
    let questions = [];
    let questionIndices = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let maxQuestions = 10; // Set the maximum number of questions
    let answeredQuestions = []; // Array to store the answered questions

});