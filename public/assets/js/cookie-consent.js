(function () {
    // Premium Cookie Consent Bar
    const createCookieBar = () => {
        if (localStorage.getItem('human_group_cookies_accepted')) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 600px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            padding: 20px 30px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            animation: slideUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        `;

        banner.innerHTML = `
            <div style="flex: 1;">
                <p style="margin: 0; font-family: 'Inter', sans-serif; font-size: 0.95rem; color: #333; line-height: 1.5;">
                    Utilizamos cookies para mejorar su experiencia y analizar nuestro tráfico. 
                    Al continuar navegando, acepta nuestra <a href="politica-privacidad.html" style="color: var(--human-green, #8dc63f); font-weight: 600; text-decoration: none;">política de privacidad</a>.
                </p>
            </div>
            <button id="accept-cookies" style="
                background: var(--human-navy, #272f61);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 50px;
                font-family: 'Outfit', sans-serif;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
            ">Aceptar</button>
        `;

        document.body.appendChild(banner);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { opacity: 0; transform: translate(-50%, 50px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            #accept-cookies:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(39, 47, 97, 0.2);
                background: #1a2044;
            }
            @media (max-width: 768px) {
                #cookie-consent-banner {
                    flex-direction: column;
                    text-align: center;
                    padding: 25px;
                    bottom: 20px;
                }
            }
        `;
        document.head.appendChild(style);

        document.getElementById('accept-cookies').addEventListener('click', () => {
            localStorage.setItem('human_group_cookies_accepted', 'true');
            banner.style.opacity = '0';
            banner.style.transform = 'translate(-50%, 20px)';
            banner.style.transition = 'all 0.4s ease';
            setTimeout(() => banner.remove(), 400);
        });
    };

    // Initialize after a short delay
    if (document.readyState === 'complete') {
        setTimeout(createCookieBar, 2000);
    } else {
        window.addEventListener('load', () => setTimeout(createCookieBar, 2000));
    }
})();
