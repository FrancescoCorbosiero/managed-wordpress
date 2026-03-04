/**
 * Edizioni Rosi Blocks — Animation Library
 * IntersectionObserver-based reveal animations and scroll effects
 * Modules: ScrollReveal, HeaderScroll, SmoothScroll
 */

(function() {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    /* ═══════════════════════════════════════════════════════════════
       1. ScrollReveal — IntersectionObserver-based reveal animations
       Usage: data-er-reveal on elements
       ═══════════════════════════════════════════════════════════════ */
    var ScrollReveal = {
        init: function() {
            var elements = document.querySelectorAll('[data-er-reveal]');
            if (!elements.length) return;

            if (prefersReducedMotion) {
                elements.forEach(function(el) { el.classList.add('er-revealed'); });
                return;
            }

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var delay = parseInt(entry.target.dataset.erRevealDelay) || 0;
                        setTimeout(function() { entry.target.classList.add('er-revealed'); }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

            elements.forEach(function(el) { observer.observe(el); });
        }
    };


    /* ═══════════════════════════════════════════════════════════════
       2. HeaderScroll — Sticky header shadow on scroll
       ═══════════════════════════════════════════════════════════════ */
    var HeaderScroll = {
        init: function() {
            var header = document.querySelector('.er-header');
            if (!header) return;

            var ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(function() {
                        if (window.scrollY > 10) {
                            header.classList.add('er-header--scrolled');
                        } else {
                            header.classList.remove('er-header--scrolled');
                        }
                        ticking = false;
                    });
                }
            }, { passive: true });
        }
    };


    /* ═══════════════════════════════════════════════════════════════
       3. SmoothScroll — Anchor link smooth scrolling
       ═══════════════════════════════════════════════════════════════ */
    var SmoothScroll = {
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    var targetId = link.getAttribute('href');
                    if (targetId === '#' || targetId.length < 2) return;

                    var target = document.querySelector(targetId);
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


    /* ─── Initialize All Modules ─── */
    var init = function() {
        ScrollReveal.init();
        HeaderScroll.init();
        SmoothScroll.init();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.EdizioniRosiBlocks = { init: init };
})();
