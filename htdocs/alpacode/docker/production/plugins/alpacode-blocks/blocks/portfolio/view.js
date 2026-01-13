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

            filters.forEach(function(filter) {
                filter.addEventListener('click', function() {
                    var filterValue = filter.getAttribute('data-filter');

                    // Update active filter
                    filters.forEach(function(f) {
                        f.classList.remove('alpacode-portfolio__filter--active');
                    });
                    filter.classList.add('alpacode-portfolio__filter--active');

                    // Filter items
                    items.forEach(function(item) {
                        var category = item.getAttribute('data-category');
                        var shouldShow = filterValue === 'all' || category === filterValue;

                        if (shouldShow) {
                            item.classList.remove('alpacode-portfolio__item--hidden');
                            item.style.position = '';
                        } else {
                            item.classList.add('alpacode-portfolio__item--hidden');
                            setTimeout(function() {
                                if (item.classList.contains('alpacode-portfolio__item--hidden')) {
                                    item.style.position = 'absolute';
                                }
                            }, 400);
                        }
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
