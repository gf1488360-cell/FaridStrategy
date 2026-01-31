// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMenuToggle();
    initSmoothScroll();
    initFormInteractions();
    initFeedbackForm();
    initContactForm();
    
    // Show a welcome message in console
    console.log("FaridStrategy.com | Business Strategy Analyst Portfolio");
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

// Initialize form interactions
function initFormInteractions() {
    // Show/hide specific item field based on feedback type
    const feedbackType = document.getElementById('feedbackType');
    const specificItemGroup = document.getElementById('specificItemGroup');
    
    if (feedbackType && specificItemGroup) {
        feedbackType.addEventListener('change', function() {
            if (this.value === 'case-study' || this.value === 'article') {
                specificItemGroup.style.display = 'block';
                document.getElementById('specificItem').required = true;
            } else {
                specificItemGroup.style.display = 'none';
                document.getElementById('specificItem').required = false;
            }
        });
    }
}

// Initialize feedback form
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('reviewerName').value.trim();
            const email = document.getElementById('reviewerEmail').value.trim();
            const feedbackType = document.getElementById('feedbackType').value;
            const specificItem = document.getElementById('specificItem').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked');
            const feedback = document.getElementById('reviewContent').value.trim();
            
            // Validate form
            if (!name || !email || !feedback) {
                alert('Please fill in all required fields (Name, Email, and Feedback).');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create email content
            let subject = `New Feedback from ${name}`;
            if (feedbackType === 'case-study' || feedbackType === 'article') {
                subject += ` - Regarding: ${specificItem}`;
            }
            
            let body = `Feedback Details:\n\n`;
            body += `Name: ${name}\n`;
            body += `Email: ${email}\n`;
            body += `Feedback Type: ${feedbackType}\n`;
            
            if (feedbackType === 'case-study' || feedbackType === 'article') {
                body += `Specific Item: ${specificItem}\n`;
            }
            
            if (rating) {
                body += `Rating: ${rating.value}/5\n`;
            }
            
            body += `\nFeedback:\n${feedback}\n\n`;
            body += `---\nSent from FaridStrategy.com`;
            
            // Send email (using mailto for now - in production, you'd use a backend service)
            const mailtoLink = `mailto:gf1488360@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Show success message
            alert('Thank you for your feedback! A draft email has been prepared. Click OK to open your email client and send it to me.');
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Optional: Reset form after submission
            setTimeout(() => {
                feedbackForm.reset();
                if (specificItemGroup) {
                    specificItemGroup.style.display = 'none';
                }
            }, 1000);
        });
    }
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create email content
            const emailSubject = `Contact Form: ${subject}`;
            let emailBody = `Contact Form Submission Details:\n\n`;
            emailBody += `Name: ${name}\n`;
            emailBody += `Email: ${email}\n`;
            emailBody += `Subject: ${subject}\n\n`;
            emailBody += `Message:\n${message}\n\n`;
            emailBody += `---\nSent from FaridStrategy.com`;
            
            // Send email (using mailto for now - in production, you'd use a backend service)
            const mailtoLink = `mailto:gf1488360@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Show success message
            alert('Thank you for your message! A draft email has been prepared. Click OK to open your email client and send it to me.');
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Optional: Reset form after submission
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
}

// Add some interactivity to value propositions
document.addEventListener('DOMContentLoaded', function() {
    const valueProps = document.querySelectorAll('.value-prop');
    
    valueProps.forEach(prop => {
        prop.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        prop.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize active nav link tracking
    setActiveNavLink();
});

// Copy email to clipboard functionality
function initEmailCopy() {
    const emailElement = document.querySelector('.contact-item span');
    if (emailElement && emailElement.textContent === 'gf1488360@gmail.com') {
        // Add click-to-copy functionality
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', function() {
            navigator.clipboard.writeText('gf1488360@gmail.com').then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = 'var(--accent-color)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    }
}

// Initialize email copy on page load
initEmailCopy();
