document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Elements ---
    const questionNumberEl = document.getElementById('questionNumber');
    const questionTextEl = document.getElementById('questionText');
    const answerOptionsEl = document.querySelector('.answer-options .list-group');
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const progressBar = document.getElementById('progressBar');
    const timerEl = document.getElementById('timer');

    // --- Dummy Questions Data & State ---
    const questions = [
        { q: "Which of the following activities do you enjoy the most?", o: ["Solving complex puzzles and mathematical problems.", "Creating art, music, or writing stories.", "Working with data, organizing information, and planning.", "Leading a team and making strategic decisions."], a: "" },
        { q: "What kind of work environment do you prefer?", o: ["Quiet and independent.", "Collaborative and bustling.", "Structured and predictable.", "Dynamic and fast-paced."], a: "" },
        { q: "When faced with a challenge, you are more likely to:", o: ["Analyze it logically and systematically.", "Brainstorm creative and unconventional solutions.", "Develop a detailed plan of action.", "Take charge and delegate tasks."], a: "" },
        { q: "Which subject area do you find most engaging?", o: ["Mathematics or Physics", "Literature or Art History", "Economics or Business Studies", "Political Science or Sociology"], a: "" },
        { q: "You are good at:", o: ["Identifying patterns and making connections.", "Expressing ideas and emotions.", "Organizing resources and managing time.", "Persuading and motivating others."], a: "" },
    ];
    // For demonstration, let's expand to 10 questions to make it a bit more realistic for flow
    for (let i = 5; i < 10; i++) {
        questions.push({ q: `Sample Question ${i + 1}: This is a placeholder question. What is your favorite color?`, o: [`Red Option ${i+1}`, `Blue Option ${i+1}`, `Green Option ${i+1}`, `Yellow Option ${i+1}`], a: "" });
    }

    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;
    let userAnswers = new Array(totalQuestions).fill(""); // To store user's answers

    // --- Timer ---
    let timeLeft = 30 * 60; // 30 minutes in seconds
    let timerInterval;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `Time Left: ${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function startTimer() {
        if (!timerEl) return;
        timerEl.textContent = formatTime(timeLeft);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                Swal.fire({
                    icon: 'warning',
                    title: 'Time\'s Up!',
                    text: 'Your assessment will be submitted automatically.',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then(() => {
                    submitExam();
                });
            }
        }, 1000);
    }

    // --- Question Loading & Display ---
    function loadQuestion(index) {
        if (!questionNumberEl || !questionTextEl || !answerOptionsEl || !progressBar || !prevQuestionBtn || !nextQuestionBtn) {
            console.error("One or more MCQ elements are missing from the DOM.");
            return;
        }

        const question = questions[index];
        questionNumberEl.textContent = `Question ${index + 1} of ${totalQuestions}`;
        questionTextEl.textContent = question.q;

        answerOptionsEl.innerHTML = ''; // Clear previous options
        question.o.forEach((option, i) => {
            const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${optionLetter}) ${option}`;
            li.dataset.option = optionLetter;
            if (userAnswers[index] === optionLetter) { // Check stored answer
                li.classList.add('active');
            }
            li.addEventListener('click', () => selectAnswer(li, optionLetter, index));
            answerOptionsEl.appendChild(li);
        });

        // Update progress bar
        const progressPercent = ((index + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressBar.textContent = `${Math.round(progressPercent)}%`;
        progressBar.setAttribute('aria-valuenow', progressPercent);

        // Button states
        prevQuestionBtn.disabled = index === 0;
        if (index === totalQuestions - 1) {
            nextQuestionBtn.textContent = 'Submit Answers';
        } else {
            nextQuestionBtn.textContent = 'Next Question';
        }
    }

    function selectAnswer(selectedLi, optionLetter, questionIdx) {
        // Remove 'active' class from other options for the current question
        Array.from(answerOptionsEl.children).forEach(li => li.classList.remove('active'));
        // Add 'active' class to the clicked option
        selectedLi.classList.add('active');
        userAnswers[questionIdx] = optionLetter; // Store selected answer
        console.log(`Question ${questionIdx + 1} Answered: ${optionLetter}`); // For debugging
    }

    // --- Navigation ---
    if(prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                loadQuestion(currentQuestionIndex);
            }
        });
    }

    if(nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            if (currentQuestionIndex < totalQuestions - 1) {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            } else {
                // On last question, "Submit Answers" is clicked
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Do you want to submit your answers?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6', // var(--primary-accent-blue)
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, submit!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearInterval(timerInterval); // Stop timer on manual submit
                        submitExam();
                    }
                });
            }
        });
    }
    
    function submitExam() {
        console.log("Submitting Exam. User Answers:", userAnswers);
        // Conceptual: Process answers here (e.g., send to a backend)
        // For now, we just log them.
        
        // Store answers in localStorage for results page (simple example)
        try {
            localStorage.setItem('mcqResults', JSON.stringify(userAnswers));
            localStorage.setItem('mcqQuestions', JSON.stringify(questions.map(q => q.q))); // Store questions for context on results
        } catch (e) {
            console.error("Could not save results to localStorage", e);
        }


        Swal.fire({
            title: 'Submitted!',
            text: 'Your answers have been submitted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'results_page.html'; // Redirect to results page
        });
    }


    // --- Initial Load ---
    if (document.querySelector('.exam-container')) { // Check if we are on the MCQ page
        loadQuestion(currentQuestionIndex);
        startTimer();
    }
});
