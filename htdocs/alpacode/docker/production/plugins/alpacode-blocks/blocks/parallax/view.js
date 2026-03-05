/**
 * Parallax Section - Frontend Script
 */
(function() {
    'use strict';

    function initParallax() {
        var sections = document.querySelectorAll('.alpacode-parallax--enabled');

        if (!sections.length) return;

        // Check for reduced motion preference
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        var parallaxItems = [];

        sections.forEach(function(section) {
            var background = section.querySelector('[data-parallax-bg]');
            if (!background) return;

            var speed = parseFloat(section.getAttribute('data-parallax-speed')) || 0.5;

            parallaxItems.push({
                section: section,
                background: background,
                speed: speed,
                bounds: null
            });
        });

        if (!parallaxItems.length) return;

        var ticking = false;
        var lastScrollY = window.scrollY;

        function updateBounds() {
            parallaxItems.forEach(function(item) {
                var rect = item.section.getBoundingClientRect();
                item.bounds = {
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                    height: rect.height
                };
            });
        }

        function updateParallax() {
            var scrollY = window.scrollY;
            var viewportHeight = window.innerHeight;

            parallaxItems.forEach(function(item) {
                if (!item.bounds) return;

                var sectionTop = item.bounds.top;
                var sectionBottom = item.bounds.bottom;

                // Check if section is in viewport
                if (scrollY + viewportHeight < sectionTop || scrollY > sectionBottom) {
                    return;
                }

                // Calculate parallax offset
                var sectionCenter = sectionTop + (item.bounds.height / 2);
                var viewportCenter = scrollY + (viewportHeight / 2);
                var distance = viewportCenter - sectionCenter;
                var offset = distance * item.speed;

                // Apply transform
                item.background.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
            });

            ticking = false;
        }

        function onScroll() {
            lastScrollY = window.scrollY;

            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        function onResize() {
            updateBounds();
            updateParallax();
        }

        // Initialize
        updateBounds();
        updateParallax();

        // Event listeners
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        // Recalculate bounds when images load
        document.addEventListener('load', function(e) {
            if (e.target.tagName === 'IMG') {
                updateBounds();
            }
        }, true);

        // Intersection Observer for performance
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    var item = parallaxItems.find(function(p) {
                        return p.section === entry.target;
                    });
                    if (item) {
                        item.isVisible = entry.isIntersecting;
                    }
                });
            }, {
                rootMargin: '100px'
            });

            parallaxItems.forEach(function(item) {
                observer.observe(item.section);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParallax);
    } else {
        initParallax();
    }
})();
