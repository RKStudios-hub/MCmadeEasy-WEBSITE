// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Carousel functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.screenshot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!track || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 20;
        track.scrollTo({ left: currentSlide * slideWidth, behavior: 'smooth' });
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
    }
    
    function goToSlide(index) { currentSlide = index; updateCarousel(); }
    function nextSlide() { currentSlide = (currentSlide + 1) % totalSlides; updateCarousel(); }
    function prevSlide() { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateCarousel(); }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    track.addEventListener('scroll', () => {
        const slideWidth = slides[0].offsetWidth + 20;
        currentSlide = Math.round(track.scrollLeft / slideWidth);
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.feature-card, .step, .screenshot, .stat, .section-header, .download-content, .about-content, .about-stats');
    
    elements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Dynamic scrollbar
function updateScrollbar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = 0;
    
    if (docHeight > 0) {
        scrollPercent = scrollTop / docHeight;
    }
    
    // Calculate thumb height: smaller at top, larger at bottom
    const minHeight = 40;
    const maxHeight = 180;
    const thumbHeight = minHeight + (maxHeight - minHeight) * scrollPercent;
    
    // Calculate thumb position
    const trackHeight = window.innerHeight - thumbHeight;
    const thumbTop = scrollPercent * trackHeight;
    
    // Update custom scrollbar
    const thumb = document.querySelector('.scrollbar-thumb');
    if (thumb) {
        thumb.style.height = thumbHeight + 'px';
        thumb.style.top = thumbTop + 'px';
    }
}

window.addEventListener('scroll', updateScrollbar);
window.addEventListener('load', updateScrollbar);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    handleNavbarScroll();
    initMobileMenu();
    initThemeToggle();
    initCarousel();
    initSmoothScroll();
    initScrollAnimations();
    updateScrollbar();
});

// Dynamic scrollbar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollTop / (docHeight || 1), 1);
    
    // Scrollbar thumb height: small at top, larger at bottom
    const minHeight = 30; // pixels at top
    const maxHeight = 150; // pixels at bottom
    const newHeight = minHeight + (maxHeight - minHeight) * scrollPercent;
    
    document.documentElement.style.setProperty('--scrollbar-height', newHeight + 'px');
});
