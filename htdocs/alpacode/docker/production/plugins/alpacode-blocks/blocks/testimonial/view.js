/**
 * Testimonials Block - Frontend Script
 */

document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.alpacode-testimonials');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.alpacode-testimonials__track');
        const cards = carousel.querySelectorAll('.alpacode-testimonials__card');
        const prevBtn = carousel.querySelector('.alpacode-testimonials__nav--prev');
        const nextBtn = carousel.querySelector('.alpacode-testimonials__nav--next');
        const dots = carousel.querySelectorAll('.alpacode-testimonials__dot');

        const autoplay = carousel.dataset.autoplay === 'true';
        const autoplaySpeed = parseInt(carousel.dataset.autoplaySpeed) || 5000;

        let currentIndex = 0;
        let autoplayInterval = null;

        function updateCarousel(index) {
            // Ensure index is within bounds
            if (index < 0) index = 0;
            if (index >= cards.length) index = cards.length - 1;

            currentIndex = index;

            // Move track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update cards opacity and scale
            cards.forEach((card, i) => {
                if (i === currentIndex) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0.4';
                    card.style.transform = 'scale(0.95)';
                }
            });

            // Update dots
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Update navigation buttons
            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex === cards.length - 1;
            }
        }

        function nextSlide() {
            if (currentIndex < cards.length - 1) {
                updateCarousel(currentIndex + 1);
            } else if (autoplay) {
                // Loop back to start if autoplay is enabled
                updateCarousel(0);
            }
        }

        function prevSlide() {
            if (currentIndex > 0) {
                updateCarousel(currentIndex - 1);
            }
        }

        function startAutoplay() {
            if (autoplay && cards.length > 1) {
                autoplayInterval = setInterval(nextSlide, autoplaySpeed);
            }
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
                stopAutoplay();
            });
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                stopAutoplay();
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoplay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoplay();
            }
        });

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Initialize
        updateCarousel(0);
        startAutoplay();
    });
});