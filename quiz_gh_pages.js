// Quiz functionality for GitHub Pages
// This version simulates sending results since GitHub Pages doesn't support PHP

document.addEventListener('DOMContentLoaded', function() {
    // Prevent user from leaving the page during quiz
    let quizStarted = false;
    
    window.addEventListener('beforeunload', function(e) {
        if (quizStarted) {
            e.preventDefault();
            e.returnValue = '';
            return 'Тест барысында беттен шығуға болмайды!';
        }
    });
    
    // Quiz elements
    const quizIntro = document.getElementById('quizIntro');
    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');
    const studentForm = document.getElementById('studentForm');
    const startQuizBtn = document.getElementById('startQuiz');
    const submitQuizBtn = document.getElementById('submitFullQuiz');
    const finishQuizBtn = document.getElementById('finishQuiz');
    const timeRemaining = document.getElementById('timeRemaining');
    const progressText = document.getElementById('progressText');
    const prevQuestionBtn = document.getElementById('prevQuestion');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    
    // Student info
    let studentName = '';
    let studentClass = '';
    let studentId = '';
    
    // Timer variables
    let timeLeft = 30 * 60; // 30 minutes in seconds
    let timerInterval;
    
    // Current question index
    let currentQuestion = 1;
    const totalQuestions = 20;
    
    // Correct answers
    const correctAnswers = {
        q1: 'b',  // б.з.б. III мыңжылдық
        q2: 'b',  // Мыс пен қалайы
        q3: 'b',  // 3
        q4: 'c',  // Солтүстік Қазақстан
        q5: 'b',  // Мал шаруашылығы
        q6: 'b',  // б.з.б. II мыңжылдықтың басы
        q7: 'b',  // б.з.б. 2200-1700 жж.
        q8: 'c',  // Батыс Сібір мен Солтүстік Қазақстан
        q9: 'c',  // Қола құралдар
        q10: 'b', // Қола өндірісін
        q11: 'a', // Жерлендіру рәсімдері
        q12: 'a', // Жер үйлер мен жартас үңгірлерде
        q13: 'a', // Теріден тігілген киімдер
        q14: 'a', // Зергерлік өнер
        q15: 'c', // Ұзақ қашықтықтағы сауда
        q16: 'c', // Қауымдастықтар
        q17: 'c', // Бұғы мен аю
        q18: 'a', // Қайта қалыптандыру технологиясы
        q19: 'a', // Қола ыдыстар
        q20: 'b'  // Маңызды кезең
    };
    
    // Start quiz button
    startQuizBtn.addEventListener('click', function() {
        // Get student info
        studentName = document.getElementById('studentName').value;
        studentClass = document.getElementById('studentClass').value;
        studentId = document.getElementById('studentId').value;
        
        // Validate form
        if (!studentName || !studentClass || !studentId) {
            alert('Барлық ақпаратты толтырыңыз!');
            return;
        }
        
        // Start quiz
        quizStarted = true;
        quizIntro.style.display = 'none';
        quizContainer.style.display = 'block';
        
        // Start timer
        startTimer();
        
        // Show first question
        showQuestion(1);
        
        // Update navigation buttons
        updateNavigationButtons();
    });
    
    // Navigation buttons
    prevQuestionBtn.addEventListener('click', function() {
        if (currentQuestion > 1) {
            showQuestion(currentQuestion - 1);
            updateNavigationButtons();
        }
    });
    
    nextQuestionBtn.addEventListener('click', function() {
        if (currentQuestion < totalQuestions) {
            showQuestion(currentQuestion + 1);
            updateNavigationButtons();
        }
    });
    
    // Show question
    function showQuestion(questionNumber) {
        // Hide all questions
        const questions = document.querySelectorAll('.quiz-question');
        questions.forEach(q => q.classList.remove('active'));
        
        // Show current question
        const currentQuestionElement = document.getElementById('question' + questionNumber);
        if (currentQuestionElement) {
            currentQuestionElement.classList.add('active');
            currentQuestion = questionNumber;
            progressText.textContent = questionNumber + '/' + totalQuestions;
        }
    }
    
    // Update navigation buttons
    function updateNavigationButtons() {
        prevQuestionBtn.disabled = currentQuestion === 1;
        nextQuestionBtn.disabled = currentQuestion === totalQuestions;
    }
    
    // Timer function
    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;
            
            // Update display
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeRemaining.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Check if time is up
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitQuiz();
            }
        }, 1000);
    }
    
    // Submit quiz
    submitQuizBtn.addEventListener('click', submitQuiz);
    
    function submitQuiz() {
        // Stop timer
        clearInterval(timerInterval);
        
        // Calculate score
        let score = 0;
        let total = 20;
        let results = [];
        
        // Check answers
        for (let i = 1; i <= total; i++) {
            const questionName = 'q' + i;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            const isCorrect = selectedOption && selectedOption.value === correctAnswers[questionName];
            
            if (isCorrect) {
                score++;
            }
            
            results.push({
                question: i,
                selected: selectedOption ? selectedOption.value : 'Жауап берілмеді',
                correct: correctAnswers[questionName],
                isCorrect: isCorrect
            });
        }
        
        // Calculate percentage
        const percentage = Math.round((score / total) * 100);
        
        // Generate result message
        let message = '';
        if (percentage >= 80) {
            message = `Тамаша! Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%).`;
        } else if (percentage >= 60) {
            message = `Жақсы! Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%).`;
        } else if (percentage >= 40) {
            message = `Орташа! Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%).`;
        } else {
            message = `Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%).`;
        }
        
        // Display results
        document.getElementById('resultMessage').textContent = message;
        
        // Display detailed results
        let detailsHTML = `<div class="result-details">`;
        detailsHTML += `<h3>Толық нәтиже:</h3>`;
        detailsHTML += `<p><strong>Оқушы:</strong> ${studentName}</p>`;
        detailsHTML += `<p><strong>Сынып:</strong> ${studentClass}</p>`;
        detailsHTML += `<p><strong>ID:</strong> ${studentId}</p>`;
        detailsHTML += `<p><strong>Уақыт:</strong> ${30 - Math.floor(timeLeft / 60)} минут жұмсалды</p>`;
        detailsHTML += `<h4>Жауаптар:</h4>`;
        
        results.forEach(result => {
            const statusClass = result.isCorrect ? 'correct-answer' : 'incorrect-answer';
            const statusText = result.isCorrect ? 'Дұрыс' : 'Қате';
            detailsHTML += `<p><strong>Сұрақ ${result.question}:</strong> <span class="${statusClass}">${statusText}</span></p>`;
        });
        
        detailsHTML += `</div>`;
        document.getElementById('resultDetails').innerHTML = detailsHTML;
        
        // Hide quiz container and show results
        quizContainer.style.display = 'none';
        quizResult.style.display = 'block';
        
        // Simulate sending results to Telegram (since GitHub Pages doesn't support PHP)
        simulateSendResultsToTelegram(studentName, studentClass, studentId, score, total, percentage);
    }
    
    // Simulate sending results to Telegram for GitHub Pages
    function simulateSendResultsToTelegram(name, class_, id, score, total, percentage) {
        // In a GitHub Pages environment, we can't actually send to Telegram
        // because there's no PHP support. Instead, we'll show a simulation.
        
        console.log('GitHub Pages Simulation: Results that would be sent to Telegram:');
        console.log(`Student: ${name}`);
        console.log(`Class: ${class_}`);
        console.log(`ID: ${id}`);
        console.log(`Score: ${score}/${total} (${percentage}%)`);
        
        // Show a notification to the user
        alert(`Нәтиже дайын!
Оқушы: ${name}
Сынып: ${class_}
Нәтиже: ${score}/${total} (${percentage}%)

GitHub Pages хостингінде Telegram интеграциясы жоқ, сондықтан нәтиже мұғалімге жіберілмеді.`);
    }
    
    // Finish quiz
    finishQuizBtn.addEventListener('click', function() {
        alert('Тест аяқталды. GitHub Pages хостингінде Telegram интеграциясы жоқ.');
        window.location.href = 'index.html';
    });
});