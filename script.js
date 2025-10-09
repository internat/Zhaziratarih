// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Simple fade-in animation for content
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Set initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Animate in with delay
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    // Animate info card
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        infoCard.style.opacity = '0';
        infoCard.style.transform = 'translateX(20px)';
        infoCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            infoCard.style.opacity = '1';
            infoCard.style.transform = 'translateX(0)';
        }, 500);
    }
    
    // Add hover effects to artifacts
    const artifacts = document.querySelectorAll('.artifact');
    
    artifacts.forEach(artifact => {
        artifact.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        artifact.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Add hover effects to periods
    const periods = document.querySelectorAll('.period');
    
    periods.forEach(period => {
        period.addEventListener('mouseenter', function() {
            this.style.borderColor = '#FFD700';
            this.style.transition = 'border-color 0.3s ease';
        });
        
        period.addEventListener('mouseleave', function() {
            this.style.borderColor = '#a2a9b1';
            this.style.transition = 'border-color 0.3s ease';
        });
    });
    
    // Add hover effects to culture items
    const cultureItems = document.querySelectorAll('.culture-item');
    
    cultureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#fff8dc';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f8f8f8';
            this.style.transition = 'background-color 0.3s ease';
        });
    });
    
    // Add animation to artifact images
    const artifactImages = document.querySelectorAll('.artifact-img');
    
    artifactImages.forEach((img, index) => {
        // Add different emojis for each artifact
        const emojis = ['🏺', '⚔️', '💍', '🏹', '🛡️', '⛏️'];
        img.innerHTML = emojis[index % emojis.length];
        
        // Simple hover effect
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.3s ease';
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = '#FFD700';
    progressBar.style.width = '0%';
    progressBar.style.zIndex = '1000';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Quiz functionality
    const quizForm = document.getElementById('bronzeAgeQuiz');
    const submitButton = document.getElementById('submitQuiz');
    const quizResult = document.getElementById('quizResult');
    const resultText = document.getElementById('resultText');
    const retryButton = document.getElementById('retryQuiz');
    
    // Correct answers
    const correctAnswers = {
        q1: 'b', // б.з.б. III мыңжылдық
        q2: 'b', // Мыс пен қалайы
        q3: 'b', // 3
        q4: 'c', // Солтүстік Қазақстан
        q5: 'b'  // Мал шаруашылығы
    };
    
    // Submit quiz
    submitButton.addEventListener('click', function() {
        let score = 0;
        let total = 5;
        
        // Check answers
        for (let i = 1; i <= total; i++) {
            const questionName = 'q' + i;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (selectedOption) {
                if (selectedOption.value === correctAnswers[questionName]) {
                    score++;
                    selectedOption.parentElement.classList.add('correct');
                } else {
                    selectedOption.parentElement.classList.add('incorrect');
                }
            }
        }
        
        // Display result
        const percentage = Math.round((score / total) * 100);
        let message = '';
        
        if (percentage >= 80) {
            message = `Тамаша! Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%). Сіз қола дәуірі туралы тамаша білесіз!`;
        } else if (percentage >= 60) {
            message = `Жақсы! Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%). Сіз қола дәуірі туралы жақсы білесіз!`;
        } else if (percentage >= 40) {
            message = `Орташа! Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%). Қола дәуірі туралы тағы да оқып шығу керек.`;
        } else {
            message = `Сіз ${score}/${total} дұрыс жауап бердіңіз (${percentage}%). Қола дәуірі туралы көбірек оқып шығу керек.`;
        }
        
        resultText.textContent = message;
        quizResult.style.display = 'block';
        
        // Scroll to results
        quizResult.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Retry quiz
    retryButton.addEventListener('click', function() {
        // Reset form
        quizForm.reset();
        
        // Remove classes
        const labels = document.querySelectorAll('.quiz-question label');
        labels.forEach(label => {
            label.classList.remove('correct', 'incorrect');
        });
        
        // Hide result
        quizResult.style.display = 'none';
        
        // Scroll to quiz
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
    });
});