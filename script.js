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
        const emojis = ['🏺', '⚔️', '💍'];
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
});