// script.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Toggle Functionality
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');
    
    // Set initial theme based on localStorage or default to dark
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeSwitch.checked = true;
        }
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Scroll Animations
    function checkVisibility() {
        const elements = document.querySelectorAll('.portfolio-item, .service-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check visibility on load and scroll
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Flip Card Functionality for Contact Section - FIXED VERSION
    const flipCard = document.querySelector('.flip-card');
    const socialIcons = document.querySelectorAll('.flip-card-front .social-icon');
    const flipBackBtn = document.getElementById('flip-back');
    
    // Social media links mapping
    const socialLinks = {
        'facebook': 'https://www.facebook.com/share/1K9Br3Yd5H/',
        'instagram': 'https://www.instagram.com/kabir_edits_official?igsh=amhwZWFwYm54aTkx',
        'email': 'mailto:kabirlaskar782@gmail.com'
    };
    
    // Add click event to each social icon in the front - FIXED
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            if (platform && socialLinks[platform]) {
                // Directly redirect to the social media link
                window.open(socialLinks[platform], '_blank');
            }
        });
    });
    
    // Also make the back side social icons work
    const backSocialIcons = document.querySelectorAll('.flip-card-back .social-icon');
    backSocialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Let the natural link behavior happen
            // No need to prevent default or stop propagation
        });
    });
    
    // Flip back when back button is clicked
    flipBackBtn.addEventListener('click', function(e) {
        e.preventDefault();
        flipCard.classList.remove('flipped');
    });

    // Optional: Auto-flip to show contact details after 3 seconds
    setTimeout(() => {
        if (!flipCard.classList.contains('flipped')) {
            // Only show this once
            const hasSeenHint = sessionStorage.getItem('seenContactHint');
            if (!hasSeenHint) {
                flipCard.classList.add('flipped');
                setTimeout(() => {
                    flipCard.classList.remove('flipped');
                }, 3000);
                sessionStorage.setItem('seenContactHint', 'true');
            }
        }
    }, 3000);

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Header Background on Scroll
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'var(--primary-bg)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                if (document.documentElement.getAttribute('data-theme') === 'light') {
                    header.style.backgroundColor = 'rgba(245, 245, 245, 0.9)';
                } else {
                    header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
                }
                header.style.boxShadow = 'none';
            }
        });
    }

    // Enhanced Hover Effects for Service Cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // Portfolio Items Hover Effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // Add active class styling in CSS via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--accent-color) !important;
        }
        .nav-links a.active::after {
            width: 100% !important;
        }
        
        /* Improve social icon cursor */
        .social-icon {
            cursor: pointer;
        }
        
        /* Flip card animation improvement */
        .flip-card {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Initialize any additional animations
    checkVisibility();
    highlightNavLink();
});

// Additional utility function for random delays in animations
function randomDelay(min, max) {
    return Math.random() * (max - min) + min;
}

// Add loading animation to portfolio items
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Add loading animation to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});