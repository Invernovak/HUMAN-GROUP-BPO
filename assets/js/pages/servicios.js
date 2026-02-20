/**
 * Interactive Tabs Script for Servicios Page
 */
document.addEventListener('DOMContentLoaded', () => {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function switchTab(targetId) {
        // Remove active state from all triggers
        tabTriggers.forEach(trigger => {
            trigger.classList.remove('active');
        });

        // Remove active state from all panels
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active state to selected trigger
        const activeTrigger = document.querySelector(`.tab-trigger[data-target="${targetId}"]`);
        if (activeTrigger) activeTrigger.classList.add('active');

        // Add active state to selected panel
        const activePanel = document.getElementById(targetId);
        if (activePanel) {
            activePanel.classList.add('active');

            // On mobile, scroll content panel into view after switch
            if (window.innerWidth <= 1024) {
                const headerOffset = 150;
                const elementPosition = activePanel.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Attach click events to triggers
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = trigger.getAttribute('data-target');
            switchTab(target);
        });
    });

    // Check URL hash for direct linking (e.g., servicios.html#seleccion)
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        setTimeout(() => switchTab(hash), 100);
    }
});
