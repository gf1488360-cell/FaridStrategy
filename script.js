// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMenuToggle();
    initSmoothScroll();
    initCounterAnimation();
    initForms();
    setActiveNavLink();
    
    // Show a welcome message in console
    console.log("Welcome to FaridStrategy.com | Ghulam Farid's Portfolio");
});

// Mobile Menu Toggle
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Counter Animation for Stats
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate counter
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 1500; // Animation duration in ms
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
        
        element.setAttribute('data-animated', 'true');
    }
    
    // Check on scroll
    function checkCounters() {
        statNumbers.forEach(stat => {
            if (isInViewport(stat) && !stat.hasAttribute('data-animated')) {
                animateCounter(stat);
            }
        });
    }
    
    // Initial check
    checkCounters();
    
    // Check on scroll
    window.addEventListener('scroll', checkCounters);
}

// Form Handling
function initForms() {
    const feedbackForm = document.getElementById('feedbackForm');
    const contactForm = document.getElementById('contactForm');
    
    // Feedback Form Submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reviewerName = document.getElementById('reviewerName').value;
            const reviewContent = document.getElementById('reviewContent').value;
            const itemType = document.getElementById('itemType').value;
            
            if (!reviewerName.trim() || !reviewContent.trim()) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real app, you would send this to a server
            // For now, we'll simulate adding it to the page
            
            const reviewsList = document.querySelector('.reviews-list');
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            const today = new Date();
            const dateString = today.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // Get item name for tag
            let itemName = '';
            if (itemType === 'article') {
                itemName = 'Article: E-commerce in Pakistan';
            } else if (itemType === 'case-study') {
                itemName = 'Case Study: Netflix Strategy';
            } else {
                itemName = 'General Feedback';
            }
            
            reviewItem.innerHTML = `
                <div class="review-header">
                    <span class="reviewer">${reviewerName}</span>
                    <span class="review-date">${dateString}</span>
                </div>
                <p class="review-text">"${reviewContent}"</p>
                <span class="review-tag">${itemName}</span>
            `;
            
            // Add to the top of the reviews list
            const firstReview = reviewsList.querySelector('.review-item');
            if (firstReview) {
                reviewsList.insertBefore(reviewItem, firstReview);
            } else {
                reviewsList.appendChild(reviewItem);
            }
            
            // Reset form
            feedbackForm.reset();
            
            // Show success message
            alert('Thank you for your feedback! Your review has been added.');
            
            // Scroll to reviews
            window.scrollTo({
                top: document.getElementById('feedback').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
    
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would send this to a server
            // For now, we'll just show a success message
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Set active nav link based on scroll position
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add some interactivity to buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Simulate "View Article" and "View Case Study" button clicks
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // In a real app, this would navigate to the full article/case study
            // For now, we'll show an alert
            e.preventDefault();
            const isArticle = this.closest('.article-card');
            const isCaseStudy = this.closest('.case-study-card');
            
            if (isArticle) {
                alert('In the complete website, this would open the full article. For now, we\'re working with a simplified version.');
            } else if (isCaseStudy) {
                alert('In the complete website, this would open the full case study with detailed analysis. For now, we\'re working with a simplified version.');
            }
        });
    });
    
    // Review buttons already link to feedback section via href
});
