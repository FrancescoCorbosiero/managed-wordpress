/**
 * Portfolio Filter - Frontend Script
 */
(function() {
    'use strict';

    function initPortfolio() {
        var containers = document.querySelectorAll('.alpacode-portfolio');

        containers.forEach(function(container) {
            var filters = container.querySelectorAll('.alpacode-portfolio__filter');
            var items = container.querySelectorAll('.alpacode-portfolio__item');
            var grid = container.querySelector('.alpacode-portfolio__grid');

            if (!filters.length || !items.length) return;

            // Track pending animation frame for cleanup
            var pendingUpdate = null;

            filters.forEach(function(filter) {
                filter.addEventListener('click', function() {
                    var filterValue = filter.getAttribute('data-filter');

                    // Cancel any pending updates to prevent race conditions
                    if (pendingUpdate) {
                        cancelAnimationFrame(pendingUpdate);
                    }

                    // Update active filter
                    filters.forEach(function(f) {
                        f.classList.remove('alpacode-portfolio__filter--active');
                    });
                    filter.classList.add('alpacode-portfolio__filter--active');

                    // Filter items - CSS handles position: absolute via --hidden class
                    items.forEach(function(item) {
                        var category = item.getAttribute('data-category');
                        var shouldShow = filterValue === 'all' || category === filterValue;

                        if (shouldShow) {
                            item.classList.remove('alpacode-portfolio__item--hidden');
                        } else {
                            item.classList.add('alpacode-portfolio__item--hidden');
                        }
                    });

                    // Force a reflow to ensure grid recalculates properly
                    pendingUpdate = requestAnimationFrame(function() {
                        grid.style.minHeight = grid.offsetHeight + 'px';
                        pendingUpdate = requestAnimationFrame(function() {
                            grid.style.minHeight = '';
                            pendingUpdate = null;
                        });
                    });
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolio);
    } else {
        initPortfolio();
    }
})();
