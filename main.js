// main.js

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const scrollPosition = window.scrollY;
    
    // Add 'scrolled' class when user scrolls down more than 50px
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting
    highlightActiveLink();
});

// ==================== MOBILE MENU TOGGLE ====================
const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const navMenu = document.querySelector('.nav_menu');

// Open mobile menu
if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => {
        navMenu.classList.add('active');
        openMenuBtn.style.display = 'none';
        closeMenuBtn.style.display = 'block';
    });
}

// Close mobile menu
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        navMenu.classList.remove('active');
        openMenuBtn.style.display = 'block';
        closeMenuBtn.style.display = 'none';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav_menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (openMenuBtn) openMenuBtn.style.display = 'block';
        if (closeMenuBtn) closeMenuBtn.style.display = 'none';
    });
});

// ==================== ACTIVE LINK HIGHLIGHTING ====================
function highlightActiveLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav_menu a');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id') || 'home';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === 'home' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==================== FAQ TOGGLE FUNCTIONALITY ====================
function setupFAQs() {
    const faqs = document.querySelectorAll('.faq');
    
    faqs.forEach(faq => {
        // Add click event listener to each FAQ
        faq.addEventListener('click', () => {
            // Toggle active class on clicked FAQ
            faq.classList.toggle('active');
            
            // Change icon from plus to minus
            const icon = faq.querySelector('.faq_icon i');
            if (icon) {
                if (faq.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
            
            // Optional: Close other FAQs (accordion behavior)
            // Uncomment below if you want only one FAQ open at a time
            /*
            faqs.forEach(otherFaq => {
                if (otherFaq !== faq) {
                    otherFaq.classList.remove('active');
                    const otherIcon = otherFaq.querySelector('.faq_icon i');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });
            */
        });
    });
}

// ==================== TESTIMONIAL SLIDER FUNCTIONALITY ====================
function setupTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial_dot');
    
    // If no testimonials or dots, exit
    if (testimonials.length === 0 || dots.length === 0) return;
    
    let currentTestimonial = 0;
    const totalTestimonials = testimonials.length;
    
    // Function to show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
            testimonial.classList.remove('active');
        });
        
        // Show current testimonial
        testimonials[index].style.display = 'block';
        testimonials[index].classList.add('active');
        
        // Update dots
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
        
        currentTestimonial = index;
    }
    
    // Function for next testimonial
    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= totalTestimonials) nextIndex = 0;
        showTestimonial(nextIndex);
    }
    
    // Function for previous testimonial
    function prevTestimonial() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) prevIndex = totalTestimonials - 1;
        showTestimonial(prevIndex);
    }
    
    // Initialize: show first testimonial
    showTestimonial(0);
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextTestimonial();
        } else if (e.key === 'ArrowLeft') {
            prevTestimonial();
        }
    });
    
    // Auto-rotate testimonials every 7 seconds
    let autoSlideInterval = setInterval(nextTestimonial, 7000);
    
    // Pause auto-slide on hover
    const testimonialsContainer = document.querySelector('.testimonials_container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextTestimonial, 7000);
        });
    }
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialsContainer?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialsContainer?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next testimonial
                nextTestimonial();
            } else {
                // Swipe right - previous testimonial
                prevTestimonial();
            }
        }
    }
}

// ==================== ENHANCED TESTIMONIAL VISIBILITY ====================
function enhanceTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each testimonial
    testimonials.forEach(testimonial => {
        observer.observe(testimonial);
    });
}

// ==================== INITIALIZE ====================
window.addEventListener('load', function() {
    // Initialize navbar state
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Highlight active link on page load
    highlightActiveLink();
    
    // Set up FAQ functionality
    setupFAQs();
    
    // Set up testimonials
    setupTestimonials();
    
    // Enhance testimonial visibility
    enhanceTestimonials();
    
    // Set initial state for mobile menu buttons
    if (window.innerWidth <= 768) {
        if (openMenuBtn) openMenuBtn.style.display = 'block';
        if (closeMenuBtn) closeMenuBtn.style.display = 'none';
    }
});

// ==================== RESPONSIVE NAVBAR CLOSE ON RESIZE ====================
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Reset mobile menu on larger screens
        if (navMenu) navMenu.classList.remove('active');
        if (openMenuBtn) openMenuBtn.style.display = 'none';
        if (closeMenuBtn) closeMenuBtn.style.display = 'none';
        
        // Show all testimonials on larger screens
        const testimonials = document.querySelectorAll('.testimonial');
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'block';
        });
    } else {
        // Show open button on smaller screens
        if (navMenu && !navMenu.classList.contains('active')) {
            if (openMenuBtn) openMenuBtn.style.display = 'block';
            if (closeMenuBtn) closeMenuBtn.style.display = 'none';
        }
        
        // Reset testimonial display for mobile slider
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.testimonial_dot');
        
        if (testimonials.length > 0 && dots.length > 0) {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index === 0 ? 'block' : 'none';
            });
        }
    }
});

// ==================== SMOOTH SCROLLING FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for same-page anchors
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== PAGE LOAD ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Animate elements on load
    const animateElements = document.querySelectorAll('.header_left, .header_right, .category, .course_item');
    
    animateElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});