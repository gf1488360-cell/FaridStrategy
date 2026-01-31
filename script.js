// Professional Business Portfolio - Always Visible Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAlwaysVisibleNavigation();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavTracking();
    initFormValidation();
    initAnimations();
    
    console.log('🚀 Professional Portfolio - Always Visible Navigation Loaded');
});

// Always Visible Navigation Module
function initAlwaysVisibleNavigation() {
    const body = document.body;
    const mainNav = document.querySelector('.main-nav');
    const announcementBar = document.querySelector('.announcement-bar');
    
    // Add announcement bar class to body
    if (announcementBar) {
        body.classList.add('has-announcement');
    }
    
    // Force navigation to always be visible
    mainNav.style.transform = 'translateY(0)';
    mainNav.style.opacity = '1';
    mainNav.style.visibility = 'visible';
    
    // Prevent any hiding on scroll
    window.addEventListener('scroll', () => {
        mainNav.style.transform = 'translateY(0)';
        mainNav.style.opacity = '1';
        
        // Add scroll effect for visual enhancement only
        if (window.scrollY > 50) {
            mainNav.classList.add('nav-scrolled');
        } else {
            mainNav.classList.remove('nav-scrolled');
        }
    });
    
    // Ensure desktop menu is always visible
    if (window.innerWidth >= 993) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = 'flex';
            navMenu.style.opacity = '1';
            navMenu.style.visibility = 'visible';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Force visibility on desktop
        if (window.innerWidth >= 993) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.getElementById('mobileToggle');
            
            if (navMenu) {
                navMenu.style.display = 'flex';
                navMenu.style.opacity = '1';
                navMenu.style.visibility = 'visible';
                navMenu.classList.remove('active');
            }
            
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
            
            // Reset body overflow
            body.style.overflow = '';
        }
    });
}

// Mobile Menu with Backdrop
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll lock
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Only close on mobile
                if (window.innerWidth <= 992) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking outside (mobile only)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                if (!e.target.closest('.nav-menu') && 
                    !e.target.closest('.mobile-toggle') &&
                    navMenu.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 993 && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Enhanced Smooth Scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.main-nav').offsetHeight;
    const announcementHeight = document.querySelector('.announcement-bar')?.offsetHeight || 0;
    const totalOffset = headerHeight + announcementHeight + 20;
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position with offset
                const targetPosition = targetElement.offsetTop - totalOffset;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page refresh
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Active Navigation Tracking
function initActiveNavTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainNav = document.querySelector('.main-nav');
    const announcementBar = document.querySelector('.announcement-bar');
    
    const headerHeight = mainNav.offsetHeight;
    const announcementHeight = announcementBar?.offsetHeight || 0;
    const totalOffset = headerHeight + announcementHeight + 100;
    
    // Initial check
    updateActiveNav();
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        updateActiveNav();
    });
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + totalOffset;
        let currentSection = '';
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Update home link
        if (scrollPosition < sections[0]?.offsetTop) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }
}

// Form Validation (Keep your existing)
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    this.submit();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    showNotification('Message sent successfully!', 'success');
                    setTimeout(() => this.reset(), 1000);
                }, 1500);
            }
        });
    }
}

// Helper function for form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e53e3e';
            isValid = false;
            
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                field.style.borderColor = '#e53e3e';
                showNotification('Please enter a valid email address.', 'error');
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
    }
    
    return isValid;
}

// Notification System
function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add notification styles if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                transform: translateX(120%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification.success {
                border-left: 4px solid #38a169;
            }
            .notification.error {
                border-left: 4px solid #e53e3e;
            }
            .notification-close {
                background: none;
                border: none;
                color: #718096;
                cursor: pointer;
                padding: 0.25rem;
            }
            @media (max-width: 768px) {
                .notification {
                    top: 80px;
                    left: 20px;
                    right: 20px;
                    transform: translateY(-120%);
                }
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animations (Keep your existing)
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.approach-card, .insight-card, .point').forEach(el => {
        observer.observe(el);
    });
}

// Handle initial load and resize
window.addEventListener('load', () => {
    // Force navigation visibility on load
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.style.transform = 'translateY(0)';
        mainNav.style.opacity = '1';
        mainNav.style.visibility = 'visible';
    }
    
    // Update body padding
    updateBodyPadding();
});

// Update body padding based on navigation height
function updateBodyPadding() {
    const mainNav = document.querySelector('.main-nav');
    const announcementBar = document.querySelector('.announcement-bar');
    const body = document.body;
    
    if (mainNav) {
        const navHeight = mainNav.offsetHeight;
        const announcementHeight = announcementBar?.offsetHeight || 0;
        const totalHeight = navHeight + announcementHeight;
        
        if (window.innerWidth >= 993) {
            body.style.paddingTop = `${totalHeight}px`;
        } else {
            body.style.paddingTop = `${navHeight + 10}px`;
        }
    }
}

// Update on resize
window.addEventListener('resize', updateBodyPadding);
