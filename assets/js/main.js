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
});
