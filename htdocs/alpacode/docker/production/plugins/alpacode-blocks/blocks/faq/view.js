/**
 * FAQ Accordion - Frontend Script
 */
(function() {
    'use strict';

    function initFAQ() {
        var containers = document.querySelectorAll('.alpacode-faq');

        containers.forEach(function(container) {
            var allowMultiple = container.getAttribute('data-allow-multiple') === 'true';
            var questions = container.querySelectorAll('.alpacode-faq__question');

            questions.forEach(function(button) {
                button.addEventListener('click', function() {
                    var item = button.closest('.alpacode-faq__item');
                    var answer = item.querySelector('.alpacode-faq__answer');
                    var isOpen = item.classList.contains('alpacode-faq__item--open');

                    if (!allowMultiple) {
                        var allItems = container.querySelectorAll('.alpacode-faq__item--open');
                        allItems.forEach(function(openItem) {
                            if (openItem !== item) {
                                openItem.classList.remove('alpacode-faq__item--open');
                                openItem.querySelector('.alpacode-faq__question').setAttribute('aria-expanded', 'false');
                                openItem.querySelector('.alpacode-faq__answer').setAttribute('hidden', '');
                            }
                        });
                    }

                    if (isOpen) {
                        item.classList.remove('alpacode-faq__item--open');
                        button.setAttribute('aria-expanded', 'false');
                        answer.setAttribute('hidden', '');
                    } else {
                        item.classList.add('alpacode-faq__item--open');
                        button.setAttribute('aria-expanded', 'true');
                        answer.removeAttribute('hidden');
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }
})();
