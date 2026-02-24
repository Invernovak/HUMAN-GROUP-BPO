window.initializeNavbar = function () {
    const header = document.getElementById('main-header');
    if (header) {
        // High contrast for internal pages
        if (document.querySelector('.internal-hero')) {
            header.classList.add('header-internal');
        }

        window.removeEventListener('scroll', window._navbarScrollHandler);
        window._navbarScrollHandler = () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', window._navbarScrollHandler);

        // Mobile Menu Toggle (Premium Version)
        const mobileToggle = document.getElementById('mobile-toggle-unified');
        const navPill = document.getElementById('nav-pill-unified');
        if (mobileToggle && navPill) {
            mobileToggle.addEventListener('click', () => {
                navPill.classList.toggle('mobile-active');
                const icon = mobileToggle.querySelector('i');
                if (navPill.classList.contains('mobile-active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        }
    }
};

window.initializeSlider = function () {
    if (typeof Swiper !== 'undefined' && document.querySelector('.servicesSlider')) {
        const swiper = new Swiper('.servicesSlider', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 1000,
        });
    }
};

window.initializeObservers = function () {
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        if (!el.classList.contains('is-visible')) observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', function () {
    window.initializeNavbar();
    window.initializeSlider();
    window.initializeObservers();

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// --- Testimonials Logic ---
const testimonialsData = [
    {
        title: "Altamente profesional.",
        text: "Somos una firma de capital de crecimiento que impulsa a una nueva generación de visionarios extraordinarios.",
        name: "Martín Bailey",
        role: "DIRECTOR DE FINANZAS",
        image: "assets/images/testimonial-profile.jpg"
    },
    {
        title: "Eficiencia comprobada.",
        text: "Human Group BPO ha transformado nuestra gestión de talento.",
        name: "Laura Gómez",
        role: "GERENTE DE RRHH",
        image: "assets/images/testimonial-profile.jpg"
    }
];

let currentTestimonialIndex = 0;

window.changeTestimonial = function (direction) {
    currentTestimonialIndex += direction;
    if (currentTestimonialIndex >= testimonialsData.length) currentTestimonialIndex = 0;
    if (currentTestimonialIndex < 0) currentTestimonialIndex = testimonialsData.length - 1;

    const data = testimonialsData[currentTestimonialIndex];
    const slide = document.getElementById('testimonial-active');
    if (!slide) return;

    slide.style.opacity = '0';
    setTimeout(() => {
        const heading = slide.querySelector('.testimonial-heading');
        const text = slide.querySelector('.testimonial-text');
        const name = slide.querySelector('.user-name');
        const role = slide.querySelector('.user-role');
        if (heading) heading.textContent = data.title;
        if (text) text.textContent = data.text;
        if (name) name.textContent = data.name;
        if (role) role.textContent = data.role;
        slide.style.opacity = '1';
    }, 300);
};
