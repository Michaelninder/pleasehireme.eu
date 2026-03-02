/**
 * pleasehireme.eu - Main JavaScript
 * Fabian Ternis Portfolio Site
 */

(function() {
    'use strict';

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const root = document.documentElement;
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const modalOverlay = document.getElementById('modal-overlay');
    const backToTop = document.getElementById('back-to-top');
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    // ========================================
    // THEME MANAGEMENT
    // ========================================
    const THEME_KEY = 'phm-theme';

    const getTheme = () => localStorage.getItem(THEME_KEY) || 'dark';

    const setTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    };

    // Initialize theme
    setTheme(getTheme());

    themeToggle?.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ========================================
    // MOBILE MENU
    // ========================================
    mobileToggle?.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu?.classList.toggle('active');
        body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle?.classList.remove('active');
            mobileMenu?.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // ========================================
    // SCROLL BEHAVIORS
    // ========================================
    let lastScrollY = 0;
    let ticking = false;

    const onScroll = () => {
        const scrollY = window.scrollY;

        // Back to top button
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 500);
        }

        // Navbar background
        if (navbar) {
            navbar.style.background = scrollY > 50 
                ? 'rgba(8, 8, 10, 0.95)' 
                : 'rgba(8, 8, 10, 0.8)';
            
            if (root.getAttribute('data-theme') === 'light') {
                navbar.style.background = scrollY > 50 
                    ? 'rgba(250, 250, 250, 0.95)' 
                    : 'rgba(250, 250, 250, 0.85)';
            }
        }

        lastScrollY = scrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // Back to top click
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // INTERSECTION OBSERVER FOR REVEALS
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => navObserver.observe(section));

    // ========================================
    // MODAL MANAGEMENT
    // ========================================
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modalOverlay?.classList.add('active');
            body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        modalOverlay?.classList.remove('active');
        body.style.overflow = '';
    };

    // Modal triggers
    document.getElementById('open-privacy')?.addEventListener('click', () => {
        openModal('privacy-modal');
    });

    document.getElementById('open-imprint')?.addEventListener('click', () => {
        openModal('imprint-modal');
    });

    // Close modal handlers
    modalOverlay?.addEventListener('click', closeModal);

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ========================================
    // PROJECT FILTERING
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                card.classList.toggle('hidden', !shouldShow);
            });
        });
    });

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    const counters = document.querySelectorAll('.stat-value[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateCounter(target, count);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element, target) {
        const duration = 1500;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }

    // ========================================
    // BACKGROUND CANVAS (Subtle Grid Pattern)
    // ========================================
    if (canvas && ctx) {
        let width, height;
        let particles = [];
        let mouseX = 0;
        let mouseY = 0;
        let animationId = null;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        }

        function initParticles() {
            particles = [];
            const count = prefersReducedMotion ? 20 : 50;
            
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            
            const isLight = root.getAttribute('data-theme') === 'light';
            const particleColor = isLight ? '0, 0, 0' : '255, 255, 255';
            const lineColor = isLight ? '0, 0, 0' : '99, 102, 241';
            
            // Draw grid
            ctx.strokeStyle = isLight 
                ? 'rgba(0, 0, 0, 0.03)' 
                : 'rgba(255, 255, 255, 0.02)';
            ctx.lineWidth = 1;
            
            const gridSize = 60;
            
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            
            // Draw particles
            particles.forEach((p, i) => {
                if (!prefersReducedMotion) {
                    p.x += p.vx;
                    p.y += p.vy;
                    
                    // Wrap around
                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
                ctx.fill();
                
                // Draw connections
                if (!prefersReducedMotion) {
                    particles.slice(i + 1).forEach(p2 => {
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if (dist < 150) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(${lineColor}, ${0.1 * (1 - dist / 150)})`;
                            ctx.stroke();
                        }
                    });
                }
            });
            
            if (!prefersReducedMotion) {
                animationId = requestAnimationFrame(draw);
            }
        }

        // Mouse tracking for subtle parallax (optional enhancement)
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Initialize
        resize();
        draw();

        // Handle resize
        window.addEventListener('resize', () => {
            if (animationId) cancelAnimationFrame(animationId);
            resize();
            if (!prefersReducedMotion) {
                draw();
            }
        });

        // Redraw on theme change
        const themeObserver = new MutationObserver(() => {
            draw();
        });
        
        themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    }

    // ========================================
    // SMOOTH ANCHOR SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // VENTURE CARD HOVER EFFECTS
    // ========================================
    const ventureCards = document.querySelectorAll('.venture-card');
    
    ventureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ========================================
    // INITIALIZATION COMPLETE
    // ========================================
    console.log('%cpleasehireme.eu', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cBuilt by Fabian Ternis', 'font-size: 12px; color: #888;');

})();