
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Empêche la redirection Web3Forms

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
    });

    if (response.ok) {
        window.location.href = "merci.html"; // 👉 ta page de remerciement personnalisée
    } else {
        alert("Une erreur s'est produite. Veuillez réessayer.");
    }
});

// Menu mobile
document.getElementById('mobileMenuBtn').addEventListener('click', function () {
    document.getElementById('mainMenu').classList.toggle('active');
    this.innerHTML = document.getElementById('mainMenu').classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('#mainMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mainMenu').classList.remove('active');
        document.getElementById('mobileMenuBtn').innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Slider de témoignages
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    // Masquer toutes les slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Afficher la slide demandée
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Ajouter les événements aux dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Boutons précédent/suivant
prevBtn.addEventListener('click', () => {
    let prevSlide = currentSlide - 1;
    if (prevSlide < 0) prevSlide = slides.length - 1;
    showSlide(prevSlide);
});

nextBtn.addEventListener('click', () => {
    let nextSlide = currentSlide + 1;
    if (nextSlide >= slides.length) nextSlide = 0;
    showSlide(nextSlide);
});

// Auto-slide toutes les 5 secondes
setInterval(() => {
    let nextSlide = currentSlide + 1;
    if (nextSlide >= slides.length) nextSlide = 0;
    showSlide(nextSlide);
}, 5000);

// Ajuster la hauteur de la hero section sur mobile
function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    const headerHeight = document.querySelector('header').offsetHeight;

    if (window.innerWidth <= 768) {
        hero.style.minHeight = `calc(100vh - ${headerHeight}px)`;
        hero.style.height = 'auto';
    } else {
        hero.style.minHeight = '700px';
        hero.style.height = '100vh';
    }
}

window.addEventListener('load', adjustHeroHeight);
window.addEventListener('resize', adjustHeroHeight);