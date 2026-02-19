document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    // Mobile Menu Toggle
    window.initializeMobileMenu = function () {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileBtn && navLinks) {
            // Remove old listener to be safe (cloneNode method is cleaner but this works if called cautiously)
            const newBtn = mobileBtn.cloneNode(true);
            mobileBtn.parentNode.replaceChild(newBtn, mobileBtn);

            newBtn.addEventListener('click', function () {
                navLinks.classList.toggle('active');
                const icon = navLinks.classList.contains('active') ? '✕' : '☰';
                newBtn.textContent = icon;
            });

            // Re-bind link closers
            const links = document.querySelectorAll('.nav-links a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        newBtn.textContent = '☰';
                    }
                });
            });
        }
    };

    window.initializeMobileMenu();

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileBtn.textContent = '☰';
            }
        });
    });

    // Smooth Scroll for Anchor Links (polite fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // --- Scroll Animations ---
    window.initializeObservers = function () {
        const observerOptions = {
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    // Handle staggered children if present
                    const staggeredChildren = entry.target.querySelectorAll('[class*="stagger-"]');
                    if (staggeredChildren.length > 0) {
                        staggeredChildren.forEach((child, index) => {
                            // If it doesn't have a specific delay class, we could auto-assign one, 
                            // but for now we trust the CSS classes or manual setup.
                            // Ensure the parent's visibility triggers children animations
                            child.style.animationPlayState = 'running';
                        });
                    }

                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => {
            // Prevent re-observing if already observed or visible (optional check)
            if (!el.classList.contains('is-visible')) {
                observer.observe(el);
            }
        });
    };

    // Call initially in case static content exists
    window.initializeObservers();

    // --- Testimonials Logic ---
    const testimonialsData = [
        {
            title: "Altamente profesional.",
            text: "Somos una firma de capital de crecimiento que impulsa a una nueva generación de visionarios extraordinarios. Impulsamos marcas y soluciones tecnológicas que hacen nuestras vidas más saludables, felices y cómodas.",
            name: "Martín Bailey",
            role: "DIRECTOR DE FINANZAS",
            image: "assets/images/testimonial-profile.jpg"
        },
        {
            title: "Eficiencia comprobada.",
            text: "Human Group BPO ha transformado nuestra gestión de talento. Su capacidad para encontrar los perfiles adecuados en tiempo récord ha sido fundamental para nuestro crecimiento.",
            name: "Laura Gómez",
            role: "GERENTE DE RRHH",
            image: "assets/images/testimonial-profile.jpg"
        },
        {
            title: "Socios estratégicos.",
            text: "Más que un proveedor, son un aliado en nuestra estrategia corporativa. La gestión de nómina es impecable y nos permite enfocarnos en nuestro core business.",
            name: "Carlos Rodríguez",
            role: "CEO - TECH SOLUTIONS",
            image: "assets/images/testimonial-profile.jpg"
        }
    ];

    let currentTestimonialIndex = 0;

    window.changeTestimonial = function (direction) {
        currentTestimonialIndex += direction;

        if (currentTestimonialIndex >= testimonialsData.length) {
            currentTestimonialIndex = 0;
        } else if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = testimonialsData.length - 1;
        }

        const data = testimonialsData[currentTestimonialIndex];
        const slide = document.getElementById('testimonial-active');

        if (!slide) return;

        // Simple fade out/in effect
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(20px)';

        setTimeout(() => {
            const heading = slide.querySelector('.testimonial-heading');
            const text = slide.querySelector('.testimonial-text');
            const name = slide.querySelector('.user-name');
            const role = slide.querySelector('.user-role');
            const img = slide.querySelector('.user-avatar img');

            if (heading) heading.textContent = data.title;
            if (text) text.textContent = data.text;
            if (name) name.textContent = data.name;
            if (role) role.textContent = data.role;
            if (img) img.src = data.image;

            slide.style.opacity = '1';
            slide.style.transform = 'translateX(0)';
        }, 300);
    };

    // Optional: Auto-rotate
    // setInterval(() => window.changeTestimonial(1), 5000);
});
