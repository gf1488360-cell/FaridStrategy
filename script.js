// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initMenuToggle();
    initSmoothScroll();
    initFormInteractions();
    initEmailCopy();
    initSimpleFormHandling();
    
    console.log("FaridStrategy.com | Business Strategy Analyst Portfolio");
});

// Keep all your existing functions (initMenuToggle, initSmoothScroll, etc.)

// Initialize form interactions
function initFormInteractions() {
    const feedbackType = document.getElementById('feedbackType');
    const specificItemGroup = document.getElementById('specificItemGroup');
    
    if (feedbackType && specificItemGroup) {
        feedbackType.addEventListener('change', function() {
            if (this.value === 'Case Study' || this.value === 'Article') {
                specificItemGroup.style.display = 'block';
            } else {
                specificItemGroup.style.display = 'none';
            }
        });
    }
}

// Simple form handling (just validation, let Formspree handle submission)
function initSimpleFormHandling() {
    const feedbackForm = document.getElementById('feedbackForm');
    const contactForm = document.getElementById('contactForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            } else {
                // Form will submit to Formspree
                console.log('Feedback form submitting to Formspree...');
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            } else {
                // Form will submit to Formspree
                console.log('Contact form submitting to Formspree...');
            }
        });
    }
}

// Simple validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
            
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                field.style.borderColor = '#e74c3c';
                alert('Please enter a valid email address.');
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

// Copy email to clipboard (keep existing)
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
                // Fallback method
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
