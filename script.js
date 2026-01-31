// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initFormInteractions();
    console.log('FaridStrategy.com loaded');
});

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form interactions
function initFormInteractions() {
    const feedbackType = document.getElementById('feedbackType');
    const specificItemGroup = document.getElementById('specificItemGroup');
    
    if (feedbackType && specificItemGroup) {
        feedbackType.addEventListener('change', function() {
            if (this.value === 'case_study' || this.value === 'article') {
                specificItemGroup.style.display = 'block';
                document.getElementById('specificItem').required = true;
            } else {
                specificItemGroup.style.display = 'none';
                document.getElementById('specificItem').required = false;
            }
        });
    }
}
