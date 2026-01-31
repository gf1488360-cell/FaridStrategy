// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMenuToggle();
    initSmoothScroll();
    initFormInteractions();
    initFormspreeForms();
    initEmailCopy();
    
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

// Initialize Formspree forms
function initFormspreeForms() {
    // Feedback Form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('feedback', 'Thank you for your feedback! Your message has been sent successfully.', 'success');
                    this.reset();
                    
                    // Reset specific item group
                    const specificItemGroup = document.getElementById('specificItemGroup');
                    if (specificItemGroup) {
                        specificItemGroup.style.display = 'none';
                    }
                } else {
                    const error = await response.json();
                    showFormMessage('feedback', 'Sorry, there was an error. Please try again or email me directly at gf1488360@gmail.com', 'error');
                    console.error('Formspree error:', error);
                }
            } catch (error) {
                showFormMessage('feedback', 'Network error. Please check your connection and try again.', 'error');
                console.error('Network error:', error);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormMessage('contact', 'Thank you for your message! I will get back to you soon.', 'success');
                    this.reset();
                } else {
                    const error = await response.json();
                    showFormMessage('contact', 'Sorry, there was an error. Please try again or email me directly at gf1488360@gmail.com', 'error');
                    console.error('Formspree error:', error);
                }
            } catch (error) {
                showFormMessage('contact', 'Network error. Please check your connection and try again.', 'error');
                console.error('Network error:', error);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Show form success/error messages
function showFormMessage(formType, message, type) {
    const messageId = formType === 'feedback' ? 'formMessage' : 'contactFormMessage';
    const messageElement = document.getElementById(messageId);
    
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = type === 'success' ? 'form-success' : 'form-error';
        messageElement.style.display = 'block';
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide message after 10 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 10000);
    } else {
        // Fallback alert
        alert(message);
    }
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
            
            // Remove error style when user starts typing
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Special validation for email fields
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                field.style.borderColor = '#e74c3c';
                showFormMessage('feedback', 'Please enter a valid email address.', 'error');
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        showFormMessage('feedback', 'Please fill in all required fields correctly.', 'error');
    }
    
    return isValid;
}

// Copy email to clipboard
function initEmailCopy() {
    const emailElement = document.getElementById('emailText');
    if (emailElement) {
        emailElement.classList.add('click-to-copy');
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#27ae60';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback: Create a temporary input element
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#27ae60';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
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
