/* ============================================================
   SAIFULLAH RAZZAQ — CINEMATIC PORTFOLIO
   Interactive Script • Animations • Smooth Scroll
   ============================================================ */

(function () {
    'use strict';

    // ── Loader ──────────────────────────────────────────
    const loader = document.getElementById('loader');
    const loaderProgress = document.getElementById('loaderProgress');
    let progress = 0;

    const loaderInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        loaderProgress.textContent = Math.floor(progress) + '%';
        if (progress >= 100) {
            clearInterval(loaderInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                initAnimations();
            }, 400);
        }
    }, 120);

    document.body.style.overflow = 'hidden';

    // ── Custom Cursor ───────────────────────────────────
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect for interactive elements
        const hoverables = document.querySelectorAll('a, button, .project-card, .creative-item, .skill-category, .stat-card, .contact-card, .timeline-item');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovering');
                cursorRing.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovering');
                cursorRing.classList.remove('hovering');
            });
        });
    }

    // ── Typewriter Effect ───────────────────────────────
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Full Stack Developer',
        'Creative Director',
        'Media Leader',
        'Event Strategist',
        'Videographer & Filmmaker'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typewrite() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2500; // Pause before deleting
            } else {
                typeSpeed = 65 + Math.random() * 45;
            }
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; // Pause before next phrase
            } else {
                typeSpeed = 35;
            }
        }

        setTimeout(typewrite, typeSpeed);
    }

    // ── Navbar ──────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link tracking
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section, .hero');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ── Theme Toggle ────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ── Smooth Scroll ───────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Scroll Reveal ───────────────────────────────────
    function initAnimations() {
        // Start typewriter
        setTimeout(typewrite, 500);

        // Reveal observer
        const revealElements = document.querySelectorAll('[data-reveal]');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // Skill bars
        const skillFills = document.querySelectorAll('.skill-fill');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillFills.forEach(fill => skillObserver.observe(fill));

        // Counters
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 1800;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(eased * target);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    // ── Hero Particles ──────────────────────────────────
    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            const hue = Math.random() > 0.5 ? '255, 99, 255' : '99, 102, 255';
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: rgba(${hue}, ${Math.random() * 0.4 + 0.1});
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 15 + 10}s;
                animation-delay: ${Math.random() * 10}s;
            `;
            container.appendChild(particle);
        }
    }
    createParticles();

    // ── Creative Showcase — Hover Play ──────────────────
    const creativeItems = document.querySelectorAll('.creative-video-wrapper');
    creativeItems.forEach(wrapper => {
        const video = wrapper.querySelector('.creative-video');
        if (!video) return;

        wrapper.addEventListener('mouseenter', () => {
            video.play().catch(() => { });
            wrapper.classList.add('playing');
        });

        wrapper.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
            wrapper.classList.remove('playing');
        });

        // Click to toggle play on mobile
        wrapper.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(() => { });
                wrapper.classList.add('playing');
            } else {
                video.pause();
                wrapper.classList.remove('playing');
            }
        });
    });

    // ── Contact Form (Web3Forms) ────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('formSubmit');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                    contactForm.reset();
                } else {
                    submitBtn.innerHTML = '<span>Failed to Send</span><i class="fas fa-times"></i>';
                    submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                }
            } catch (error) {
                submitBtn.innerHTML = '<span>Error! Try Again</span><i class="fas fa-exclamation-triangle"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            }

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // ── Parallax Effect on Hero ─────────────────────────
    window.addEventListener('scroll', () => {
        const heroOrbs = document.querySelector('.hero-bg-orbs');
        if (heroOrbs) {
            const scrolled = window.scrollY;
            heroOrbs.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // ── Magnetic Hover Effect on Buttons ────────────────
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .social-link, .contact-social-link');
    if (window.matchMedia('(pointer: fine)').matches) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ── Navbar Hide on Scroll Down, Show on Scroll Up ───
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                if (currentScrollY > lastScrollY && currentScrollY > 300) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });

})();
