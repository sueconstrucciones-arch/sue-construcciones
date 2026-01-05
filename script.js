// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when clicking on a link
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Smooth scroll
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.solution-item, .process-step, .feature-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Change sticky image on scroll
const images = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=1600&fit=crop',
    'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&h=1600&fit=crop'
];

const stickyImg = document.getElementById('stickyImg');
const solutionItems = document.querySelectorAll('.solution-item');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting && images[index]) {
            stickyImg.style.opacity = '0';
            setTimeout(() => {
                stickyImg.src = images[index];
                stickyImg.style.opacity = '1';
            }, 300);
        }
    });
}, { threshold: 0.5 });

solutionItems.forEach(item => imageObserver.observe(item));

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo && scrolled < window.innerHeight) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
