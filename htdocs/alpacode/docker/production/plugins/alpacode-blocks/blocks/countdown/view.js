/**
 * Countdown Timer - Frontend Script
 */
(function() {
    'use strict';

    function initCountdowns() {
        var countdowns = document.querySelectorAll('.alpacode-countdown');

        countdowns.forEach(function(container) {
            var targetDateStr = container.getAttribute('data-target-date');
            if (!targetDateStr) return;

            var targetDate = new Date(targetDateStr).getTime();
            var timer = container.querySelector('.alpacode-countdown__timer');
            var expiredEl = container.querySelector('.alpacode-countdown__expired');
            var daysEl = timer.querySelector('[data-unit="days"]');
            var hoursEl = timer.querySelector('[data-unit="hours"]');
            var minutesEl = timer.querySelector('[data-unit="minutes"]');
            var secondsEl = timer.querySelector('[data-unit="seconds"]');

            function updateCountdown() {
                var now = new Date().getTime();
                var distance = targetDate - now;

                if (distance < 0) {
                    container.classList.add('alpacode-countdown--expired');
                    if (expiredEl) {
                        expiredEl.removeAttribute('hidden');
                    }
                    return;
                }

                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
                if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
                if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
                if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

                requestAnimationFrame(function() {
                    setTimeout(updateCountdown, 1000);
                });
            }

            updateCountdown();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountdowns);
    } else {
        initCountdowns();
    }
})();
