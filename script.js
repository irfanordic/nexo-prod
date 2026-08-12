document.addEventListener('DOMContentLoaded', () => {

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        const toggleHeaderStyle = () => {
            siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
        };
        toggleHeaderStyle();
        window.addEventListener('scroll', toggleHeaderStyle, { passive: true });
    }


    const staggerGroups = [
        '.gallery-grid .gallery-item',
        '.why-list li',
        '.process-list li',
        '.associates-grid .partner-card',
        '.hero-stats > div'
    ];

    staggerGroups.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.setProperty('--i', index % 6);
        });
    });

    const fadeUpTargets = document.querySelectorAll(
        '.about-grid, .why-list li, .process-list li, .gallery-item, .partner-card, .hero-stats > div'
    );
    fadeUpTargets.forEach(el => el.classList.add('reveal'));

    const allRevealTargets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        allRevealTargets.forEach(el => revealObserver.observe(el));
    } else {
        allRevealTargets.forEach(el => el.classList.add('is-visible'));
    }


    document.querySelectorAll('.build-cta[data-service]').forEach(link => {
        link.addEventListener('click', () => {
            const select = document.querySelector('#contactForm select[name="service"]');
            if (select) select.value = link.dataset.service;
        });
    });


    // --- Bottom-Sheet Mobile Menu Modal ---
    const mobileMenuModal = document.getElementById('mobileMenuModal');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    if (mobileMenuModal && mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenuModal.classList.toggle('active');
        });
    }

    if (mobileMenuModal && closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenuModal.classList.remove('active');
        });
    }

    // Close menu when any grid link is clicked
    if (mobileMenuModal) {
        mobileMenuModal.querySelectorAll('.menu-grid a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuModal.classList.remove('active');
            });
        });
    }


    const WHATSAPP_NUMBER = '919999999999';
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const data = new FormData(contactForm);
            const name = data.get('name').trim();
            const phone = data.get('phone').trim();
            const service = data.get('service');
            const message = data.get('message').trim();

            if (!name || !phone) {
                if (formNote) formNote.textContent = 'Please add your name and phone number.';
                return;
            }

            const text =
                `Hi Nexo Interio, I'm ${name}.\n` +
                `Phone: ${phone}\n` +
                `Interested in: ${service}\n` +
                (message ? `Message: ${message}` : '');

            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank', 'noopener');

            if (formNote) formNote.textContent = 'Opening WhatsApp…';
            contactForm.reset();
        });
    }
});