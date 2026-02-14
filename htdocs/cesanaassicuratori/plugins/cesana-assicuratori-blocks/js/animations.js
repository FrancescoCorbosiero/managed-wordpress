/**
 * Cesana Assicuratori Blocks - Animation Library
 * Animazioni professionali e sottili per broker assicurativo
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Scroll Reveal — IntersectionObserver-based reveal animations
     */
    const ScrollReveal = {
        init() {
            const elements = document.querySelectorAll('[data-ca-reveal]');
            if (!elements.length) return;

            if (prefersReducedMotion) {
                elements.forEach(el => el.classList.add('ca-revealed'));
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(entry.target.dataset.caRevealDelay) || 0;
                        setTimeout(() => entry.target.classList.add('ca-revealed'), delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

            elements.forEach(el => observer.observe(el));
        }
    };

    /**
     * FAQ Accordion
     */
    const FAQ = {
        init() {
            document.querySelectorAll('[data-ca-faq]').forEach(container => {
                const items = container.querySelectorAll('[data-ca-faq-item]');

                items.forEach(item => {
                    const trigger = item.querySelector('[data-ca-faq-trigger]');
                    const content = item.querySelector('[data-ca-faq-content]');
                    if (!trigger || !content) return;

                    trigger.addEventListener('click', () => {
                        const isOpen = item.classList.contains('ca-faq__item--open');

                        // Close others if not multiple mode
                        if (container.dataset.caFaqMultiple !== 'true') {
                            items.forEach(i => {
                                i.classList.remove('ca-faq__item--open');
                                const t = i.querySelector('[data-ca-faq-trigger]');
                                const c = i.querySelector('[data-ca-faq-content]');
                                if (t) t.setAttribute('aria-expanded', 'false');
                                if (c) c.style.maxHeight = '0';
                            });
                        }

                        if (!isOpen) {
                            item.classList.add('ca-faq__item--open');
                            trigger.setAttribute('aria-expanded', 'true');
                            content.style.maxHeight = content.scrollHeight + 'px';
                        } else {
                            item.classList.remove('ca-faq__item--open');
                            trigger.setAttribute('aria-expanded', 'false');
                            content.style.maxHeight = '0';
                        }
                    });
                });
            });
        }
    };

    /**
     * Counter Animation — animated count-up for statistics
     */
    const CounterAnimation = {
        init() {
            const counters = document.querySelectorAll('[data-ca-counter]');
            if (!counters.length) return;

            if (prefersReducedMotion) {
                counters.forEach(el => {
                    el.textContent = el.dataset.caCounter;
                });
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(el => observer.observe(el));
        },

        animate(el) {
            const target = parseInt(el.dataset.caCounter, 10);
            if (isNaN(target)) return;

            const duration = 2000;
            const start = performance.now();

            const step = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                el.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            };

            requestAnimationFrame(step);
        }
    };

    /**
     * Hero Banner — crossfade carousel
     */
    const HeroBanner = {
        init() {
            document.querySelectorAll('[data-ca-hero-banner]').forEach(carousel => {
                const slides = carousel.querySelectorAll('[data-ca-hero-slide]');
                const dots = carousel.querySelector('[data-ca-hero-dots]');
                const prev = carousel.querySelector('[data-ca-hero-prev]');
                const next = carousel.querySelector('[data-ca-hero-next]');

                if (slides.length < 2) return;

                let current = 0;
                let timer = null;
                const autoplay = parseInt(carousel.dataset.caHeroAutoplay) || 8000;

                const goTo = (index) => {
                    slides[current].classList.remove('ca-hero-slide--active');
                    current = (index + slides.length) % slides.length;
                    slides[current].classList.add('ca-hero-slide--active');

                    // Restart Ken Burns animation on the new active slide
                    const img = slides[current].querySelector('.ca-hero-slide__bg img');
                    if (img) {
                        img.style.animation = 'none';
                        img.offsetHeight; // force reflow
                        img.style.animation = '';
                    }

                    if (dots) {
                        dots.querySelectorAll('button').forEach((d, i) => {
                            d.classList.toggle('ca-hero-dot--active', i === current);
                            d.setAttribute('aria-current', i === current ? 'true' : 'false');
                        });
                    }

                    resetTimer();
                };

                const resetTimer = () => {
                    if (timer) clearInterval(timer);
                    if (autoplay > 0) timer = setInterval(() => goTo(current + 1), autoplay);
                };

                // Create dot buttons
                if (dots) {
                    slides.forEach((_, i) => {
                        const btn = document.createElement('button');
                        btn.className = 'ca-hero-dot' + (i === 0 ? ' ca-hero-dot--active' : '');
                        btn.setAttribute('aria-label', 'Slide ' + (i + 1));
                        if (i === 0) btn.setAttribute('aria-current', 'true');
                        btn.addEventListener('click', () => goTo(i));
                        dots.appendChild(btn);
                    });
                }

                if (prev) prev.addEventListener('click', () => goTo(current - 1));
                if (next) next.addEventListener('click', () => goTo(current + 1));

                // Touch support
                let startX = 0;
                carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
                carousel.addEventListener('touchend', e => {
                    const diff = startX - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
                }, { passive: true });

                // Pause on hover
                carousel.addEventListener('mouseenter', () => timer && clearInterval(timer));
                carousel.addEventListener('mouseleave', resetTimer);

                slides[0].classList.add('ca-hero-slide--active');
                resetTimer();
            });
        }
    };

    /**
     * Smooth Scroll — anchor link smooth scrolling for CTA buttons
     */
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const targetId = link.getAttribute('href');
                    if (targetId === '#' || targetId.length < 2) return;

                    const target = document.querySelector(targetId);
                    if (!target) return;

                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                });
            });
        }
    };

    /**
     * Initialize all modules
     */
    const init = () => {
        ScrollReveal.init();
        FAQ.init();
        CounterAnimation.init();
        HeroBanner.init();
        SmoothScroll.init();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.CesanaBlocks = { init };
})();
