/**
 * Stats Counter - Simple Frontend Script
 */
(function() {
    'use strict';

    function animateCounters() {
        var counters = document.querySelectorAll('[data-alpacode-count]');

        counters.forEach(function(counter) {
            var target = parseFloat(counter.getAttribute('data-alpacode-count')) || 0;
            var duration = parseInt(counter.getAttribute('data-count-duration')) || 2000;
            var hasRun = counter.getAttribute('data-counted') === 'true';

            if (hasRun) return;

            var rect = counter.getBoundingClientRect();
            var inView = rect.top < window.innerHeight && rect.bottom > 0;

            if (!inView) return;

            counter.setAttribute('data-counted', 'true');

            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(target * eased);

                counter.textContent = current.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(step);
        });
    }

    function init() {
        animateCounters();
        window.addEventListener('scroll', animateCounters, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
