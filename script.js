// Desplazamiento suave para los enlaces de navegación
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

// Actualizar números de sección activos basado en scroll
const sections = document.querySelectorAll('.content-section, .hero');
const numbers = document.querySelectorAll('.section-numbers span');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = index;
        }
    });

    numbers.forEach((num, index) => {
        num.classList.remove('active');
        if (index === current) {
            num.classList.add('active');
        }
    });
});

// Click en números de sección para scroll
numbers.forEach((num, index) => {
    num.addEventListener('click', () => {
        sections[index].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Toggle de idioma (funcionalidad básica)
const langToggle = document.querySelector('.lang-toggle');
langToggle.addEventListener('click', () => {
    // Aquí puedes agregar la lógica para cambiar el idioma
    console.log('Cambio de idioma activado');
    // Por ejemplo: window.location.href = '/en/home';
});

const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const dots = document.querySelectorAll('.dot');

let counter = 0;
const size = 100; // Porcentaje de ancho de cada imagen
const intervalTime = 5000; // 5 segundos

function updateCarousel() {
    // Mueve el carrusel
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + '%)';
    
    // Actualiza los puntos (dots)
    dots.forEach(dot => dot.classList.remove('active'));
    dots[counter].classList.add('active');
}

function nextSlide() {
    if (counter >= images.length - 1) {
        counter = 0; // Vuelve al inicio
    } else {
        counter++;
    }
    updateCarousel();
}

// Iniciar el intervalo automático
let slideInterval = setInterval(nextSlide, intervalTime);

// Pausar cuando el mouse está encima (opcional, para que el usuario pueda ver bien una foto)
carouselSlide.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

// Reanudar cuando el mouse sale
carouselSlide.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, intervalTime);
});

// Hacer que los puntos sean clickeables
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        counter = index;
        updateCarousel();
    });
});