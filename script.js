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
const nav = document.getElementById('nav');;

// Crear overlay
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);


// Toggle menú
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Cerrar menú al hacer click en el overlay
overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking on a link - OPTIMIZADO
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Cerrar menú con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
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


 let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        let autoplayInterval;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function changeSlide(direction) {
            showSlide(currentSlide + direction);
            resetAutoplay();
        }

        function goToSlide(n) {
            showSlide(n);
            resetAutoplay();
        }

        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Iniciar autoplay
        startAutoplay();

        // Pausar en hover
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
            startAutoplay();
        });

        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;

        document.querySelector('.carousel-container').addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.querySelector('.carousel-container').addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                changeSlide(1);
            }
            if (touchEndX > touchStartX + 50) {
                changeSlide(-1);
            }
        };