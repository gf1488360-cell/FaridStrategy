// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMenuToggle();
    initSmoothScroll();
    initFormLinks();
    
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

// Initialize form links with instructions
function initFormLinks() {
    const googleFormLinks = document.querySelectorAll('.google-form-btn');
    
    googleFormLinks.forEach(link => {
        // Add click effect
        link.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add click event to show alert if links are not updated
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('YOUR_GOOGLE_FORM_LINK_HERE')) {
                e.preventDefault();
                alert('Please update the Google Form links in the HTML code.\n\nTo get your Google Form link:\n1. Go to forms.google.com\n2. Create a new form\n3. Click "Send"\n4. Copy the link\n5. Replace "YOUR_GOOGLE_FORM_LINK_HERE" with your actual link');
            }
        });
    });
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

// Email obfuscation protection (optional)
function protectEmail() {
    const emailElement = document.querySelector('.contact-item span');
    if (emailElement && emailElement.textContent === 'gf1488360@gmail.com') {
        // Email is already visible, but you could add click-to-copy functionality
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

// Call email protection function
protectEmail();
