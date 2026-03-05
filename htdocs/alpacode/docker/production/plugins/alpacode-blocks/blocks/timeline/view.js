/**
 * Timeline Block - Premium Frontend Script
 */

(function () {
    'use strict';

    /**
     * Initialize scroll-linked progress
     */
    function initTimeline(container) {
        var track = container.querySelector('.alpacode-timeline__track');
        var lineProgress = container.querySelector('.alpacode-timeline__line-progress');
        var items = container.querySelectorAll('.alpacode-timeline__item');
        var enableScrollProgress = container.dataset.scrollProgress === 'true';

        if (!track || !items.length) return;

        // Check for reduced motion preference
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Show all items immediately
            items.forEach(function (item) {
                item.classList.add('alpacode-timeline__item--active');
            });
            if (lineProgress) {
                lineProgress.style.height = '100%';
            }
            return;
        }

        /**
         * Calculate scroll progress and update timeline
         */
        function updateProgress() {
            var containerRect = container.getBoundingClientRect();
            var trackRect = track.getBoundingClientRect();
            var windowHeight = window.innerHeight;

            // Calculate overall progress through the timeline section
            var containerTop = containerRect.top;
            var containerHeight = containerRect.height;
            var triggerPoint = windowHeight * 0.6; // 60% down the viewport

            // Progress from 0 to 1 as user scrolls through section
            var scrollProgress = 0;

            if (containerTop < triggerPoint) {
                var scrolled = triggerPoint - containerTop;
                var total = containerHeight - windowHeight * 0.4;
                scrollProgress = Math.min(Math.max(scrolled / total, 0), 1);
            }

            // Update line progress
            if (lineProgress && enableScrollProgress) {
                // Check if horizontal layout
                var isHorizontal = container.classList.contains('alpacode-timeline--horizontal');
                if (isHorizontal) {
                    lineProgress.style.width = (scrollProgress * 100) + '%';
                } else {
                    lineProgress.style.height = (scrollProgress * 100) + '%';
                }
            }

            // Update individual items
            items.forEach(function (item, index) {
                var itemRect = item.getBoundingClientRect();
                var itemCenter = itemRect.top + itemRect.height / 2;
                var threshold = windowHeight * 0.7;

                if (itemCenter < threshold) {
                    item.classList.add('alpacode-timeline__item--active');
                } else {
                    // Only remove class if not already scrolled past
                    if (!enableScrollProgress) {
                        item.classList.remove('alpacode-timeline__item--active');
                    }
                }
            });
        }

        // Use Intersection Observer for performance
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Start tracking scroll when timeline is visible
                    window.addEventListener('scroll', onScroll, { passive: true });
                    updateProgress();
                } else {
                    // Stop tracking when not visible
                    window.removeEventListener('scroll', onScroll);
                }
            });
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0
        });

        // Throttled scroll handler
        var ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(function () {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Start observing
        observer.observe(container);

        // Initial check
        updateProgress();
    }

    /**
     * Initialize horizontal scroll for horizontal layout
     */
    function initHorizontalScroll(container) {
        if (!container.classList.contains('alpacode-timeline--horizontal')) return;

        var track = container.querySelector('.alpacode-timeline__track');
        if (!track) return;

        // Enable drag scrolling
        var isDown = false;
        var startX;
        var scrollLeft;

        track.addEventListener('mousedown', function (e) {
            isDown = true;
            track.classList.add('alpacode-timeline__track--dragging');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', function () {
            isDown = false;
            track.classList.remove('alpacode-timeline__track--dragging');
        });

        track.addEventListener('mouseup', function () {
            isDown = false;
            track.classList.remove('alpacode-timeline__track--dragging');
        });

        track.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - track.offsetLeft;
            var walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
    }

    /**
     * Initialize all timeline blocks
     */
    function init() {
        var containers = document.querySelectorAll('.alpacode-timeline');

        containers.forEach(function (container) {
            initTimeline(container);
            initHorizontalScroll(container);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
