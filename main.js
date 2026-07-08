document.addEventListener('DOMContentLoaded', () => {

    // ================= MOBILE MENU LOGIC =================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (menuToggle && mobileMenu) {
        const toggleMenu = (expand) => {
            menuToggle.setAttribute('aria-expanded', expand);
            mobileMenu.setAttribute('aria-hidden', !expand);

            if (!expand) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('block');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('block');
                menuIconOpen.classList.add('hidden');
                menuIconClose.classList.remove('hidden');
            }
        };

        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });

        // Close mobile menu when clicking any link inside it
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // ================= CAROUSEL LOGIC =================
    const carousel = document.getElementById('image-carousel');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    if (carousel && prevBtn && nextBtn && indicatorsContainer) {
        const totalSlides = 15;
        let currentSlide = 0;
        let slideInterval;

        // Dynamically generate indicators
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all focus:outline-none ${i === 0 ? 'bg-[#C93F6E] w-5' : 'bg-white/60 hover:bg-white'}`;
            dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            indicatorsContainer.appendChild(dot);
        }

        const indicators = indicatorsContainer.children;

        const updateCarousel = () => {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update indicator states
            for (let i = 0; i < totalSlides; i++) {
                if (i === currentSlide) {
                    indicators[i].className = 'w-5 h-2 rounded-full transition-all focus:outline-none bg-[#C93F6E]';
                } else {
                    indicators[i].className = 'w-2 h-2 rounded-full transition-all focus:outline-none bg-white/60 hover:bg-white';
                }
            }
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        };

        const goToSlide = (index) => {
            currentSlide = index;
            updateCarousel();
        };

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 3000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        startInterval();

        // Pause animation on mouse hover
        const carouselWrapper = carousel.parentElement;
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carouselWrapper.addEventListener('mouseleave', startInterval);
    }

    // ================= FORM SUBMISSION TO WHATSAPP =================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const serviceType = document.getElementById('service-type').value;
            const message = document.getElementById('message').value;

            // Set the target WhatsApp number (replace with the actual clinic number)
            const whatsappNumber = "524921726849";

            // Format the WhatsApp message
            let whatsappText = `¡Hola! Me gustaría agendar una cita o recibir más información.\n\n`;
            whatsappText += `*Nombre:* ${name}\n`;
            whatsappText += `*Teléfono:* ${phone}\n`;
            if (email) whatsappText += `*Correo:* ${email}\n`;
            whatsappText += `*Servicio de interés:* ${serviceType}\n`;
            if (message) whatsappText += `*Detalles adicionales:* ${message}\n`;

            // Create the WhatsApp API URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            // Redirect the user
            window.open(whatsappUrl, '_blank');
        });
    }

    // ================= INTERSECTION OBSERVER (SCROLL REVEAL) =================
    const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
    if (fadeEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeEls.forEach(el => observer.observe(el));
    }
});