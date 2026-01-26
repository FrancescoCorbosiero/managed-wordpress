/**
 * Business Card Bento Block - Frontend Interactivity
 *
 * Handles interactive effects for the bento-grid business card:
 * - Cell glow following mouse
 * - Live time display
 * - Stats counter animation
 * - Hover effects enhancement
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Initialize all bento card blocks
     */
    function init() {
        var cards = document.querySelectorAll('.alpacode-bento-card');
        cards.forEach(function(card) {
            initCard(card);
        });
    }

    /**
     * Initialize a single bento card
     */
    function initCard(card) {
        // Initialize cell glow effects
        if (!prefersReducedMotion) {
            initCellGlow(card);
            initParallaxFloaters(card);
        }

        // Initialize live time display
        initTimeDisplay(card);

        // Initialize stats counter
        initStatsCounter(card);

        // Add loaded class for entrance animations
        setTimeout(function() {
            card.classList.add('alpacode-bento-card--loaded');
        }, 100);
    }

    /**
     * Cell glow effect that follows mouse within each cell
     */
    function initCellGlow(card) {
        var cells = card.querySelectorAll('.alpacode-bento-card__cell');

        cells.forEach(function(cell) {
            cell.addEventListener('mousemove', function(e) {
                var rect = cell.getBoundingClientRect();
                var x = ((e.clientX - rect.left) / rect.width) * 100;
                var y = ((e.clientY - rect.top) / rect.height) * 100;

                cell.style.setProperty('--mouse-x', x + '%');
                cell.style.setProperty('--mouse-y', y + '%');
            });
        });
    }

    /**
     * Parallax effect for floating elements based on mouse position
     */
    function initParallaxFloaters(card) {
        var floaters = card.querySelectorAll('.alpacode-bento-card__floater');

        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var mouseX = e.clientX - rect.left - centerX;
            var mouseY = e.clientY - rect.top - centerY;

            floaters.forEach(function(floater, index) {
                var speed = parseFloat(floater.dataset.alpacodeParallax) || 0.3;
                var x = mouseX * speed;
                var y = mouseY * speed;
                floater.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            });
        });

        card.addEventListener('mouseleave', function() {
            floaters.forEach(function(floater) {
                floater.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Initialize live time display
     */
    function initTimeDisplay(card) {
        var timeElement = card.querySelector('.alpacode-bento-card__time-current');
        var zoneElement = card.querySelector('.alpacode-bento-card__time-zone');

        if (!timeElement) return;

        function updateTime() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();

            // Format with leading zeros
            var timeString = [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0')
            ].join(':');

            timeElement.textContent = timeString;

            // Update timezone
            if (zoneElement) {
                var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                // Simplify timezone name
                var shortZone = timezone.split('/').pop().replace(/_/g, ' ');
                zoneElement.textContent = shortZone;
            }
        }

        // Update immediately and then every second
        updateTime();
        setInterval(updateTime, 1000);
    }

    /**
     * Initialize stats counter animation
     */
    function initStatsCounter(card) {
        var statValues = card.querySelectorAll('.alpacode-bento-card__stat-value');

        statValues.forEach(function(element) {
            var text = element.textContent.trim();

            // Skip if already processed
            if (element.dataset.processed === 'true') return;
            element.dataset.processed = 'true';

            // Store original value
            element.dataset.originalValue = text;

            // Parse the value - handle formats like: "10+", "$5M", "99%", "200+", "10.5K"
            // Match: optional prefix (non-digits), number (with optional decimal), optional suffix
            var match = text.match(/^([^\d]*)([\d.]+)(.*)$/);

            // If no number found, don't animate (e.g., "Fortune", "Custom")
            if (!match || !match[2]) {
                return;
            }

            var prefix = match[1] || '';  // e.g., "$", "€", ""
            var numStr = match[2];         // e.g., "10", "5.5", "99"
            var suffix = match[3] || '';   // e.g., "+", "M", "%", "K"

            var targetValue = parseFloat(numStr);

            // Validate the number
            if (isNaN(targetValue) || !isFinite(targetValue)) {
                return;
            }

            var isFloat = numStr.includes('.');
            var decimalPlaces = isFloat ? (numStr.split('.')[1] || '').length : 0;
            var duration = 2000;

            // Create observer for scroll-triggered animation
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateValue(element, 0, targetValue, prefix, suffix, isFloat, decimalPlaces, duration);
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    /**
     * Animate a numeric value
     */
    function animateValue(element, start, end, prefix, suffix, isFloat, decimalPlaces, duration) {
        // Validate inputs
        if (isNaN(end) || !isFinite(end)) {
            return;
        }

        if (prefersReducedMotion) {
            element.textContent = prefix + (isFloat ? end.toFixed(decimalPlaces) : Math.floor(end)) + suffix;
            return;
        }

        var startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            var easeProgress = 1 - Math.pow(1 - progress, 3);
            var current = start + (end - start) * easeProgress;

            // Format the number
            var displayValue = isFloat ? current.toFixed(decimalPlaces) : Math.floor(current);
            element.textContent = prefix + displayValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = prefix + (isFloat ? end.toFixed(decimalPlaces) : Math.floor(end)) + suffix;
            }
        }

        requestAnimationFrame(animate);
    }

    /**
     * Add tilt effect to CTA button
     */
    function initCtaTilt(card) {
        var cta = card.querySelector('.alpacode-bento-card__cell--cta');
        if (!cta) return;

        var maxTilt = 8;

        cta.addEventListener('mousemove', function(e) {
            var rect = cta.getBoundingClientRect();
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;

            var tiltX = ((mouseY - centerY) / centerY) * maxTilt;
            var tiltY = ((centerX - mouseX) / centerX) * maxTilt;

            cta.style.transform = 'perspective(500px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-4px) scale(1.02)';
        });

        cta.addEventListener('mouseleave', function() {
            cta.style.transform = '';
        });
    }

    /**
     * Add staggered reveal animation for cells
     */
    function initStaggeredReveal(card) {
        var cells = card.querySelectorAll('.alpacode-bento-card__cell');

        cells.forEach(function(cell, index) {
            cell.style.animationDelay = (index * 0.1) + 's';
        });
    }

    /**
     * Initialize keyboard navigation for interactive cells
     */
    function initKeyboardNav(card) {
        var interactiveCells = card.querySelectorAll('a.alpacode-bento-card__cell');

        interactiveCells.forEach(function(cell) {
            cell.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    cell.click();
                }
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize for dynamically added content (Gutenberg editor)
    if (typeof wp !== 'undefined' && wp.domReady) {
        wp.domReady(init);
    }

    // Expose refresh function for external use
    window.AlpacodeBentoCard = {
        init: init,
        refresh: init
    };
})();
