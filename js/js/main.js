document.addEventListener('DOMContentLoaded', () => {


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll('.reveal');


    if ('IntersectionObserver' in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add('visible');

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -30px 0px'
                }
            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add('visible');
        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.getElementById('navbar');


    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {

            navbar.classList.add('scrolled');

        } else {

            navbar.classList.remove('scrolled');

        }

    };


    updateNavbar();


    window.addEventListener(
        'scroll',
        updateNavbar,
        {
            passive: true
        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuButton =
        document.getElementById('mobile-menu-btn');

    const navigation =
        document.getElementById('nav-links');


    const closeMobileMenu = () => {

        if (!mobileMenuButton || !navigation) {
            return;
        }

        navigation.classList.remove('open');

        mobileMenuButton.classList.remove('active');

        mobileMenuButton.setAttribute(
            'aria-expanded',
            'false'
        );

    };


    if (mobileMenuButton && navigation) {

        mobileMenuButton.addEventListener(
            'click',
            () => {

                const isOpen =
                    navigation.classList.toggle('open');


                mobileMenuButton.classList.toggle(
                    'active',
                    isOpen
                );


                mobileMenuButton.setAttribute(
                    'aria-expanded',
                    String(isOpen)
                );

            }
        );


        navigation
            .querySelectorAll('a')
            .forEach((link) => {

                link.addEventListener(
                    'click',
                    closeMobileMenu
                );

            });


        window.addEventListener(
            'resize',
            () => {

                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach((link) => {

        link.addEventListener(
            'click',
            (event) => {

                const targetId =
                    link.getAttribute('href');


                if (!targetId || targetId === '#') {
                    return;
                }


                const targetElement =
                    document.querySelector(targetId);


                if (!targetElement) {
                    return;
                }


                event.preventDefault();


                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION SECTION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            'section[id], header[id]'
        );


    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    if (
        sections.length > 0 &&
        navLinks.length > 0 &&
        'IntersectionObserver' in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const sectionId =
                            entry.target.getAttribute('id');


                        navLinks.forEach((link) => {

                            link.classList.remove('active');


                            if (
                                link.getAttribute('href') ===
                                `#${sectionId}`
                            ) {

                                link.classList.add('active');

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        '-35% 0px -55% 0px',

                    threshold: 0
                }
            );


        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById('current-year');


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});