document.addEventListener('DOMContentLoaded', function () {
    // ===== GESTION DU DROPDOWN =====
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle dropdown sur desktop
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function (e) {
            if (window.innerWidth > 992) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            }
        });

        // Fermer le dropdown en cliquant ailleurs
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target) && window.innerWidth > 992) {
                dropdown.classList.remove('active');
            }
        });
    }

    // ===== GESTION DU MENU MOBILE =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');

    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mainMenu.classList.toggle('active');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });

        // Fermer le menu mobile en cliquant sur un lien
        const navLinks = mainMenu.querySelectorAll('a:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 992) {
                    mainMenu.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Gestion spécifique du dropdown sur mobile
        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', function (e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active-mobile');
                }
            });
        }
    }

    // ===== NAVIGATION ANIMEE AVEC HIGHLIGHT =====
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');

            // Fermer le dropdown
            if (window.innerWidth > 992) {
                dropdown.classList.remove('active');
            } else {
                dropdown.classList.remove('active-mobile');
                mainMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }

            // Scroller vers la section
            scrollToSection('textes-fiscaux', target);
        });
    });

    // Fonction de scroll avec animation
    function scrollToSection(sectionId, target = null) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Calculer la position avec offset pour la navbar
        const headerHeight = document.querySelector('header').offsetHeight;
        const sectionPosition = section.offsetTop - headerHeight - 20;

        // Animation de scroll fluide
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });

        // Highlight de l'élément cible après un délai
        setTimeout(() => {
            highlightTarget(target);
        }, 800);
    }

    // Fonction pour highlight l'élément cible
    function highlightTarget(target) {
        // Retirer tout highlight précédent
        document.querySelectorAll('.document-card').forEach(card => {
            card.classList.remove('highlighted');
        });

        // Highlight selon la cible
        if (target === 'cgi') {
            const cgiCard = document.getElementById('cgi-section');
            if (cgiCard) {
                cgiCard.classList.add('highlighted');

                // Scroll supplémentaire pour bien positionner la carte
                const cardPosition = cgiCard.offsetTop - document.querySelector('header').offsetHeight - 30;
                window.scrollTo({
                    top: cardPosition,
                    behavior: 'smooth'
                });
            }
        } else if (target === 'textes') {
            const textesCard = document.getElementById('textes-section');
            if (textesCard) {
                textesCard.classList.add('highlighted');

                // Scroll supplémentaire pour bien positionner la carte
                const cardPosition = textesCard.offsetTop - document.querySelector('header').offsetHeight - 30;
                window.scrollTo({
                    top: cardPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Retirer le highlight après l'animation
        setTimeout(() => {
            document.querySelectorAll('.document-card').forEach(card => {
                card.classList.remove('highlighted');
            });
        }, 2000);
    }

    // ===== GESTION DES LIENS D'ANCRE STANDARDS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.dropdown-item)');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Fermer le menu mobile si ouvert
                    if (window.innerWidth <= 992 && mainMenu.classList.contains('active')) {
                        mainMenu.classList.remove('active');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // ===== TESTIMONIAL SLIDER =====
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    if (slides.length > 0) {
        showSlide(0);

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto-slide
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        startAutoSlide();

        // Pause auto-slide on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // ===== FORM SUBMISSION =====
    document.getElementById("contactForm").addEventListener("submit", async function (e) {
        e.preventDefault(); // Empêche la soumission par défaut

        const form = e.target;

        // Vérification des champs obligatoires
        const requiredFields = form.querySelectorAll("[required]");
        let isValid = true;
        let emptyFields = [];

        // Réinitialiser les styles d'erreur
        requiredFields.forEach(field => {
            field.classList.remove("error-field");
            const errorMsg = field.parentElement.querySelector(".error-message");
            if (errorMsg) errorMsg.remove();
        });

        // Vérifier chaque champ obligatoire
        requiredFields.forEach(field => {
            const fieldValue = field.value.trim();

            // Vérification spécifique pour le select
            if (field.tagName === "SELECT") {
                if (!fieldValue) {
                    field.classList.add("error-field");
                    showFieldError(field, "Veuillez sélectionner une option");
                    isValid = false;
                    emptyFields.push(field.name);
                }
            }
            // Vérification pour les champs texte et textarea
            else if (!fieldValue) {
                field.classList.add("error-field");
                showFieldError(field, "Ce champ est obligatoire");
                isValid = false;
                emptyFields.push(field.name);
            }
            // Validation de l'email
            else if (field.type === "email" && !isValidEmail(fieldValue)) {
                field.classList.add("error-field");
                showFieldError(field, "Veuillez entrer une adresse email valide");
                isValid = false;
            }
        });

        // Si validation échoue, afficher message et stopper
        if (!isValid) {
            const formResult = document.getElementById("form-result");
            formResult.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Veuillez remplir correctement les champs obligatoires.
            </div>
        `;
            formResult.style.display = "block";

            // Scroll vers le premier champ en erreur
            if (emptyFields.length > 0) {
                const firstErrorField = form.querySelector(`[name="${emptyFields[0]}"]`);
                firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
                firstErrorField.focus();
            }

            return;
        }

        // Afficher l'état de chargement
        const submitBtn = form.querySelector(".btn-submit");
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoading = submitBtn.querySelector(".btn-loading");

        btnText.style.display = "none";
        btnLoading.style.display = "flex";
        submitBtn.disabled = true;

        try {
            // Préparer les données
            const data = new FormData(form);

            // Envoyer les données à Web3Forms
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Redirection vers la page de confirmation
                window.location.href = "merci.html";
            } else {
                // Afficher l'erreur
                const formResult = document.getElementById("form-result");
                formResult.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    Une erreur s'est produite : ${result.message || "Veuillez réessayer plus tard."}
                </div>
            `;
                formResult.style.display = "block";

                // Réactiver le bouton
                btnText.style.display = "flex";
                btnLoading.style.display = "none";
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error("Erreur d'envoi :", error);

            // Afficher l'erreur
            const formResult = document.getElementById("form-result");
            formResult.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                Erreur de connexion. Vérifiez votre connexion internet et réessayez.
            </div>
        `;
            formResult.style.display = "block";

            // Réactiver le bouton
            btnText.style.display = "flex";
            btnLoading.style.display = "none";
            submitBtn.disabled = false;
        }
    });

    // Fonction pour afficher un message d'erreur sous un champ
    function showFieldError(field, message) {
        const parent = field.parentElement;
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorDiv.style.color = "#dc3545";
        errorDiv.style.fontSize = "0.85rem";
        errorDiv.style.marginTop = "5px";
        errorDiv.style.display = "flex";
        errorDiv.style.alignItems = "center";
        errorDiv.style.gap = "5px";

        // Insérer après le champ
        parent.appendChild(errorDiv);
    }

    // Fonction de validation d'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Gestion de la saisie en temps réel pour supprimer les erreurs
    document.querySelectorAll("#contactForm [required]").forEach(field => {
        field.addEventListener("input", function () {
            this.classList.remove("error-field");
            const errorMsg = this.parentElement.querySelector(".error-message");
            if (errorMsg) errorMsg.remove();

            // Cacher le message d'erreur global
            const formResult = document.getElementById("form-result");
            if (formResult) formResult.style.display = "none";
        });

        field.addEventListener("change", function () {
            if (this.tagName === "SELECT" && this.value) {
                this.classList.remove("error-field");
                const errorMsg = this.parentElement.querySelector(".error-message");
                if (errorMsg) errorMsg.remove();
            }
        });
    });


    // ===== PREVENTION DES TEXTES COUPES =====
    // Assurer que les textes de la navbar ne se coupent pas
    function adjustNavbarSpacing() {
        const navItems = document.querySelectorAll('nav li:not(.dropdown)');
        const totalWidth = Array.from(navItems).reduce((sum, item) => {
            return sum + item.offsetWidth;
        }, 0);

        const dropdownWidth = dropdown ? dropdown.offsetWidth : 0;
        const containerWidth = document.querySelector('.header-container').offsetWidth;
        const logoWidth = document.querySelector('.logo').offsetWidth;
        const btnWidth = document.querySelector('.header-btn').offsetWidth;

        const availableSpace = containerWidth - logoWidth - btnWidth - 100; // 100px de marge

        if (totalWidth + dropdownWidth > availableSpace) {
            // Réduire légèrement l'espacement
            document.querySelector('nav ul').style.gap = '1.5rem';
        } else {
            // Espacement normal
            document.querySelector('nav ul').style.gap = '2rem';
        }
    }

    // Ajuster au chargement et au redimensionnement
    window.addEventListener('load', adjustNavbarSpacing);
    window.addEventListener('resize', adjustNavbarSpacing);
});