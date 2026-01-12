/**
 * Stats Counter Block - Frontend Script
 */

document.addEventListener('DOMContentLoaded', function () {
    const statsBlocks = document.querySelectorAll('.alpacode-stats');

    statsBlocks.forEach(block => {
        const duration = parseInt(block.dataset.duration) || 2000;
        const items = block.querySelectorAll('.alpacode-stats__item');
        const numbers = block.querySelectorAll('.alpacode-stats__number');

        let hasAnimated = false;

        // Intersection Observer for scroll animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    // Animate items visibility
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });

                    // Animate numbers
                    numbers.forEach((numberEl) => {
                        animateNumber(numberEl, duration);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(block);

        function animateNumber(element, animationDuration) {
            const target = parseFloat(element.dataset.target);
            const startTime = performance.now();
            const isDecimal = target % 1 !== 0;
            const decimalPlaces = isDecimal ? target.toString().split('.')[1]?.length || 1 : 0;

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / animationDuration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = target * easeOut;

                if (isDecimal) {
                    element.textContent = current.toFixed(decimalPlaces);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    // Ensure final value is exact
                    if (isDecimal) {
                        element.textContent = target.toFixed(decimalPlaces);
                    } else {
                        element.textContent = Math.floor(target).toLocaleString();
                    }
                }
            }

            requestAnimationFrame(update);
        }
    });
});