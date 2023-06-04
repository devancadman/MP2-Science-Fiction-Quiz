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

    // Fetch questions from JSON file
    function fetchQuestions() {
        fetch("./assets/js/questions.json")
        .then((response) => response.json())
        .then(function (data) {
            console.log(data); // Add this line to log the fetched data
            questions = data[category];
            categoryHeading.textContent = `Category - ${category}`;
            document.title = `Science Fiction Quiz - ${category}`;
            document.getElementById("page-heading").innerHTML = `<a class="logo" href="./index.html" aria-label="logo home page link">Science Fiction Quiz:<br>${category}</a></a>`;
            generateQuestionIndices();
            showQuestion();
        })
        .catch(function (error) {
            console.error("Error fetching questions:", error);
        });
    }

    // Generate random indices for the questions
    function generateQuestionIndices() {
        questionIndices = Array.from({ length: questions.length }, (_, index) => index);
        shuffleArray(questionIndices);
    }

    // Shuffle array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Display the current question
    function showQuestion() {
        if (currentQuestionIndex >= Math.min(maxQuestions, questionIndices.length)) {
        showResult();
        return;
        }

        const currentQuestion = questions[questionIndices[currentQuestionIndex]];
        questionText.textContent = currentQuestion.question;

        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach(function (option, index) {
        const optionElement = document.createElement("button");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", function () {
            checkAnswer(index, optionElement);
        });

        optionsContainer.appendChild(optionElement);
        });

        showElement(questionContainer);
        updateProgressText();
    }

     // Check the selected answer
    function checkAnswer(selectedIndex, optionElement) {
    const currentQuestion = questions[questionIndices[currentQuestionIndex]];
    const correctIndex = currentQuestion.correctIndex;

    if (selectedIndex === correctIndex) {
        optionElement.classList.add("correct");
        score++;
        resultText.textContent = "Correct!";
        resultText.style.color = "green";
        const answeredQuestion = {
        question: currentQuestion.question,
        answer: currentQuestion.options[selectedIndex],
        isCorrect: true
        };
        answeredQuestions.push(answeredQuestion);
    } else {
        optionElement.classList.add("wrong");
        resultText.textContent = "Wrong!";
        resultText.style.color = "red";
        highlightCorrectAnswer(correctIndex);
        const answeredQuestion = {
        question: currentQuestion.question,
        answer: currentQuestion.options[selectedIndex],
        correctAnswer: currentQuestion.options[correctIndex],
        isCorrect: false
        };
        answeredQuestions.push(answeredQuestion);
    }

    disableOptions(); // Disable all buttons after answering

    showNextButton();
    }

    // Highlight the correct answer
    function highlightCorrectAnswer(correctIndex) {
        const options = optionsContainer.children;
        for (let i = 0; i < options.length; i++) {
            if (i === correctIndex) {
                options[i].classList.add("correct");
            }
        }
    }

    // Disable all answer options
    function disableOptions() {
        const options = optionsContainer.children;
        for (let i = 0; i < options.length; i++) {
        options[i].disabled = true; // Disable all buttons
        }
    }

    // Show the next button
    function showNextButton() {
        nextButton.style.display = "block";
    }

    // Proceed to the next question
    function nextQuestion() {
        if (!isAnswered()) {
            errorMessage.textContent = "Please provide an answer before continuing.";
            return;
        }

        currentQuestionIndex++;
        resultText.textContent = "";
        errorMessage.textContent = "";

        if (currentQuestionIndex < Math.min(maxQuestions, questionIndices.length)) {
        showQuestion();
        } else {
        showResult();
        }

        updateProgressText();
    }

    // Check if the current question is answered
    function isAnswered() {
        const options = optionsContainer.children;
        for (let i = 0; i < options.length; i++) {
        if (options[i].classList.contains("correct") || options[i].classList.contains("wrong")) {
            return true;
        }
        }
        return false;
    }

    // Show the final result
    function showResult() {
        hideElement(questionContainer);

        resultText.textContent = `Your score: ${score}/${Math.min(maxQuestions, questionIndices.length)}`;
        resultText.style.color = "black";

        showElement(resultContainer);

        // Display the list of answered questions
        const answeredQuestionsList = document.createElement("ul");
        answeredQuestionsList.classList.add("answered-questions-list");

        answeredQuestions.forEach(function (answeredQuestion) {
            const questionItem = document.createElement("li");
            const questionText = document.createElement("p");
            questionText.classList.add("answered-question");
            questionText.textContent = answeredQuestion.question;
            questionItem.appendChild(questionText);

            if (answeredQuestion.isCorrect) {
                questionItem.classList.add("correct");
            } else {
                questionItem.classList.add("wrong");
                const correctAnswerItem = document.createElement("p");
                correctAnswerItem.textContent = `Correct Answer: ${answeredQuestion.correctAnswer}`;
                correctAnswerItem.classList.add("correct-answer");
                questionItem.appendChild(correctAnswerItem);
            }

            const answerItem = document.createElement("p");
            answerItem.textContent = `Answer: ${answeredQuestion.answer}`;
            questionItem.appendChild(answerItem);

            answeredQuestionsList.appendChild(questionItem);
        });

        resultContainer.appendChild(answeredQuestionsList);
    }

    // Update progress bar and text
    function updateProgressText() {
        const totalQuestions = Math.min(maxQuestions, questionIndices.length);
        const currentQuestionNumber = currentQuestionIndex + 1;
        const progressPercentage = (currentQuestionNumber / totalQuestions) * 100;

        progressBar.value = progressPercentage;
        progressText.textContent = `${Math.round(progressPercentage)}%`;
        counterText.textContent = `Question: ${currentQuestionNumber} / ${totalQuestions}`;
    }

    // Show an HTML element
    function showElement(element) {
        element.style.display = "block";
    }

    // Hide an HTML element
    function hideElement(element) {
        element.style.display = "none";
    }

    // Go back to the home page
    function goBackToHome() {
        window.location.href = "index.html";
    }

    // Event listeners
    nextButton.addEventListener("click", nextQuestion);
    homeButton.addEventListener("click", goBackToHome);

  // Fetch questions when the DOM is loaded
  fetchQuestions();
});