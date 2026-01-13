/**
 * Pricing Block - Premium Frontend Script
 */

(function () {
    'use strict';

    /**
     * Initialize pricing toggle
     */
    function initPricingToggle(container) {
        var toggle = container.querySelector('.alpacode-pricing__toggle');
        if (!toggle) return;

        var monthlyLabel = container.querySelector('.alpacode-pricing__toggle-label--monthly');
        var annualLabel = container.querySelector('.alpacode-pricing__toggle-label--annual');
        var monthlyPrices = container.querySelectorAll('.alpacode-pricing__price--monthly');
        var annualPrices = container.querySelectorAll('.alpacode-pricing__price--annual');

        var isAnnual = false;

        function updatePricing() {
            toggle.setAttribute('aria-checked', isAnnual ? 'true' : 'false');

            // Update labels
            if (monthlyLabel) {
                monthlyLabel.classList.toggle('alpacode-pricing__toggle-label--active', !isAnnual);
            }
            if (annualLabel) {
                annualLabel.classList.toggle('alpacode-pricing__toggle-label--active', isAnnual);
            }

            // Animate price change
            monthlyPrices.forEach(function (price) {
                if (isAnnual) {
                    price.classList.remove('alpacode-pricing__price--active');
                } else {
                    price.classList.add('alpacode-pricing__price--active');
                }
            });

            annualPrices.forEach(function (price) {
                if (isAnnual) {
                    price.classList.add('alpacode-pricing__price--active');
                } else {
                    price.classList.remove('alpacode-pricing__price--active');
                }
            });
        }

        toggle.addEventListener('click', function () {
            isAnnual = !isAnnual;
            updatePricing();
        });

        // Keyboard support
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                isAnnual = !isAnnual;
                updatePricing();
            }
        });
    }

    /**
     * Initialize all pricing blocks
     */
    function init() {
        var containers = document.querySelectorAll('.alpacode-pricing');

        containers.forEach(function (container) {
            if (container.dataset.toggle === 'true') {
                initPricingToggle(container);
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
