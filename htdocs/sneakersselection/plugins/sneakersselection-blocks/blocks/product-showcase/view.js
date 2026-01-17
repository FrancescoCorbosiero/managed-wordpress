/**
 * Product Showcase Block - Frontend JavaScript
 */
(function() {
    'use strict';

    // This block's functionality is handled by the global animations.js
    // - Size selector: data-ss-size-selector
    // - Image gallery: data-ss-gallery
    // Both are initialized automatically

    // Additional product-specific functionality can be added here
    document.querySelectorAll('.ss-product-showcase').forEach(showcase => {
        const addToCartBtn = showcase.querySelector('.ss-product-showcase__add-to-cart');
        const sizeSelector = showcase.querySelector('[data-ss-size-selector]');

        if (addToCartBtn && sizeSelector) {
            // Listen for size selection
            sizeSelector.addEventListener('ss:size-selected', (e) => {
                addToCartBtn.classList.add('ss-button--ready');
            });
        }
    });
})();
