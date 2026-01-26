/**
 * Testimonials Block - Premium Frontend Script
 */

(function () {
    'use strict';

    /**
     * Initialize carousel functionality
     */
    function initCarousel(container) {
        var carousel = container.querySelector('.alpacode-testimonials__carousel');
        if (!carousel) return;

        var track = carousel.querySelector('.alpacode-testimonials__track');
        var slides = container.querySelectorAll('.alpacode-testimonials__slide');
        var prevBtn = container.querySelector('.alpacode-testimonials__nav--prev');
        var nextBtn = container.querySelector('.alpacode-testimonials__nav--next');
        var dots = container.querySelectorAll('.alpacode-testimonials__dot');

        var autoplay = container.dataset.autoplay === 'true';
        var autoplaySpeed = parseInt(container.dataset.autoplaySpeed, 10) || 5000;
        var pauseOnHover = container.dataset.pauseHover === 'true';

        var currentIndex = 0;
        var autoplayTimer = null;
        var isPaused = false;

        // Set CSS variable for progress animation
        container.style.setProperty('--autoplay-speed', autoplaySpeed + 'ms');

        function updateCarousel(index, animate) {
            if (animate === undefined) animate = true;

            // Wrap index
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            currentIndex = index;

            // Update track position
            if (animate) {
                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                track.style.transition = 'none';
            }
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

            // Update slide states
            slides.forEach(function (slide, i) {
                if (i === currentIndex) {
                    slide.classList.add('alpacode-testimonials__slide--active');
                } else {
                    slide.classList.remove('alpacode-testimonials__slide--active');
                }
            });

            // Update dots
            dots.forEach(function (dot, i) {
                var progress = dot.querySelector('.alpacode-testimonials__dot-progress');
                if (i === currentIndex) {
                    dot.classList.add('alpacode-testimonials__dot--active');
                    dot.setAttribute('aria-selected', 'true');
                    // Reset progress animation
                    if (progress && autoplay) {
                        progress.style.animation = 'none';
                        progress.offsetHeight; // Trigger reflow
                        progress.style.animation = '';
                    }
                } else {
                    dot.classList.remove('alpacode-testimonials__dot--active');
                    dot.setAttribute('aria-selected', 'false');
                    if (progress) {
                        progress.style.width = '0';
                    }
                }
            });
        }

        function nextSlide() {
            updateCarousel(currentIndex + 1);
        }

        function prevSlide() {
            updateCarousel(currentIndex - 1);
        }

        function goToSlide(index) {
            updateCarousel(index);
        }

        function startAutoplay() {
            if (!autoplay || slides.length <= 1) return;

            stopAutoplay();
            autoplayTimer = setInterval(function () {
                if (!isPaused) {
                    nextSlide();
                }
            }, autoplaySpeed);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                prevSlide();
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                nextSlide();
                startAutoplay();
            });
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                goToSlide(index);
                startAutoplay();
            });
        });

        // Touch/swipe support
        var touchStartX = 0;
        var touchEndX = 0;
        var isDragging = false;

        track.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchmove', function (e) {
            if (!isDragging) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', function () {
            if (!isDragging) return;
            isDragging = false;

            var diff = touchStartX - touchEndX;
            var threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoplay();
            }
        }, { passive: true });

        // Pause on hover
        if (pauseOnHover) {
            container.addEventListener('mouseenter', function () {
                isPaused = true;
            });

            container.addEventListener('mouseleave', function () {
                isPaused = false;
            });
        }

        // Keyboard navigation
        container.setAttribute('tabindex', '0');
        container.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                startAutoplay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                startAutoplay();
            }
        });

        // Intersection Observer to pause when not visible
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    startAutoplay();
                } else {
                    stopAutoplay();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(container);

        // Initialize
        updateCarousel(0, false);
        startAutoplay();
    }

    /**
     * Initialize infinite scroll
     */
    function initInfiniteScroll(container) {
        var track = container.querySelector('.alpacode-testimonials__infinite-track');
        if (!track) return;

        var pauseOnHover = container.dataset.pauseHover === 'true';

        // Check for reduced motion preference
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            track.style.animation = 'none';
            return;
        }

        // Pause/resume handled by CSS hover, but we can add focus handling
        var cards = track.querySelectorAll('.alpacode-testimonials__card');
        cards.forEach(function (card) {
            card.setAttribute('tabindex', '0');

            card.addEventListener('focus', function () {
                if (pauseOnHover) {
                    track.style.animationPlayState = 'paused';
                }
            });

            card.addEventListener('blur', function () {
                track.style.animationPlayState = 'running';
            });
        });

        // Pause when not visible
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    track.style.animationPlayState = 'running';
                } else {
                    track.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(container);
    }

    /**
     * Initialize grid layout with stagger
     */
    function initGrid(container) {
        var grid = container.querySelector('.alpacode-testimonials__grid');
        if (!grid) return;

        var cards = grid.querySelectorAll('.alpacode-testimonials__card');

        // Add stagger delay via inline style
        cards.forEach(function (card, index) {
            card.style.transitionDelay = (index * 0.1) + 's';
        });
    }

    /**
     * Initialize all testimonials blocks
     */
    function init() {
        var containers = document.querySelectorAll('.alpacode-testimonials');

        containers.forEach(function (container) {
            var layout = container.dataset.layout || 'carousel';

            switch (layout) {
                case 'carousel':
                    initCarousel(container);
                    break;
                case 'infinite':
                    initInfiniteScroll(container);
                    break;
                case 'grid':
                    initGrid(container);
                    break;
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
