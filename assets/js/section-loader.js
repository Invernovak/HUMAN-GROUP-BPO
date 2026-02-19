document.addEventListener('DOMContentLoaded', async function () {
    const sections = [
        { id: 'hero-container', file: 'sections/hero.html' },
        { id: 'about-container', file: 'sections/about.html' },
        { id: 'who-we-are-container', file: 'sections/who-we-are.html' },
        { id: 'services-container', file: 'sections/services.html' },
        { id: 'process-container', file: 'sections/process.html' },
        { id: 'contact-container', file: 'sections/contact.html' },
        { id: 'blog-container', file: 'sections/blog.html' },
        { id: 'testimonials-container', file: 'sections/testimonials.html' }
    ];

    for (const section of sections) {
        const container = document.getElementById(section.id);
        if (container) {
            try {
                const response = await fetch(section.file);
                if (response.ok) {
                    const html = await response.text();
                    container.innerHTML = html;
                } else {
                    console.error(`Error loading ${section.file}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`Error fetching ${section.file}:`, error);
            }
        }
    }

    // After all fetches complete (sequential await guarantees order if needed, or Promise.all for speed)
    // Re-initialize any JS logic that depends on these elements
    if (window.initializeObservers) {
        setTimeout(() => window.initializeObservers(), 100); // Small delay to ensure DOM is ready
    }

    // Re-attach scroll listeners or mobile menu logic if those elements are part of fetched content
    if (window.initializeMobileMenu) {
        window.initializeMobileMenu();
    }
});
