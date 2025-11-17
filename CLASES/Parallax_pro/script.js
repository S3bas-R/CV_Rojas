// ==================== PARALLAX MULTICAPA ====================
// Función para calcular movimiento basado en scroll.
function updateParallax() {
    const scrolled = window.pageYOffset; // Cuánto se ha scrollado (en píxeles).
    const parallaxContainer = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.parallax-layer');
    
    // Velocidades: negativa para movimiento inverso (profundidad).
    // Sky: muy lento (0.2), Mountains: medio (0.5), Foreground: rápido (1).
    const speeds = [0.2, 0.5, 1]; // Ajusta estos números para más/menos efecto.
    
    layers.forEach((layer, index) => {
        const speed = speeds[index];
        layer.style.transform = `translateY(${scrolled * speed}px)`;
        // Mueve cada capa proporcional al scroll.
    });
}

// ==================== ANIMACIONES AL SCROLL (Reveal y Slide) ====================
// Función para activar elementos cuando entran en vista.
function handleScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const slides = document.querySelectorAll('.slide-in');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight; // Altura de ventana.
        const revealTop = reveal.getBoundingClientRect().top; // Posición del elemento vs viewport.
        const revealVisible = 150; // Activa cuando está 150px antes de llegar.
        
        if (revealTop < windowHeight - revealVisible) {
            reveal.classList.add('active'); // Agrega clase para animar.
        }
    });
    
    slides.forEach(slide => {
        const windowHeight = window.innerHeight;
        const slideTop = slide.getBoundingClientRect().top;
        const slideVisible = 100;
        
        if (slideTop < windowHeight - slideVisible) {
            slide.classList.add('active');
        }
    });
}

// ==================== EJECUTAR AL CARGAR Y AL SCROLL ====================
// Llama funciones iniciales.
window.addEventListener('load', () => {
    updateParallax();
    handleScrollAnimations();
});

// Escucha scroll para actualizar en tiempo real.
window.addEventListener('scroll', () => {
    updateParallax();
    handleScrollAnimations();
});

// ==================== OPTIMIZACIÓN (throttle para performance) ====================
// Opcional: Limita llamadas a scroll (cada 16ms ~60fps).
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateParallax();
            handleScrollAnimations();
            ticking = false;
        });
        ticking = true;
    }
});

/* ==================== NOTAS ==================== */
/*
   - Velocidades: Baja números para más sutil, alta para dramático.
   - Para GSAP (avanzado): Incluye <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script> y usa gsap.to().
   - Prueba: Abre index.html, scroll lento para ver el efecto.
*/