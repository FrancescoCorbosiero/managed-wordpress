/**
 * Navigation Fullscreen Block - Frontend Interactivity
 *
 * Standalone fullscreen navigation that can be triggered
 * from any element with [data-nav-trigger] attribute.
 */

(function() {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function init() {
        var navs = document.querySelectorAll('.alpacode-nav-fullscreen');
        navs.forEach(initNav);
    }

    function initNav(nav) {
        var triggerId = nav.dataset.trigger || 'nav-trigger';
        var closeBtn = nav.querySelector('.alpacode-nav-fullscreen__close');
        var cursor = nav.querySelector('.alpacode-nav-fullscreen__cursor');
        var items = nav.querySelectorAll('.alpacode-nav-fullscreen__item.has-children');

        var isOpen = false;

        // Find all triggers with matching data attribute
        function bindTriggers() {
            var triggers = document.querySelectorAll('[data-nav-trigger="' + triggerId + '"]');
            triggers.forEach(function(trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleNav();
                });
            });

            // Also bind to elements with just data-nav-trigger (no value)
            var genericTriggers = document.querySelectorAll('[data-nav-trigger]:not([data-nav-trigger=""])');
            // Already bound above

            // Bind to common menu button classes
            var commonTriggers = document.querySelectorAll('.menu-toggle, .nav-toggle, .hamburger, [aria-label="Menu"], [aria-label="Toggle menu"]');
            commonTriggers.forEach(function(trigger) {
                if (!trigger.dataset.navBound) {
                    trigger.dataset.navBound = 'true';
                    trigger.addEventListener('click', function(e) {
                        // Only if no specific trigger is set
                        if (!trigger.dataset.navTrigger) {
                            e.preventDefault();
                            toggleNav();
                        }
                    });
                }
            });
        }

        function toggleNav() {
            if (isOpen) {
                closeNav();
            } else {
                openNav();
            }
        }

        function openNav() {
            isOpen = true;
            nav.classList.add('is-open');
            nav.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            // Focus close button after animation
            setTimeout(function() {
                if (closeBtn) closeBtn.focus();
            }, 600);

            // Dispatch event
            nav.dispatchEvent(new CustomEvent('navopen', { bubbles: true }));
        }

        function closeNav() {
            isOpen = false;
            nav.classList.remove('is-open');
            nav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';

            // Close all submenus
            items.forEach(function(item) {
                item.classList.remove('is-expanded');
                var link = item.querySelector('.alpacode-nav-fullscreen__link');
                if (link) link.setAttribute('aria-expanded', 'false');
            });

            // Dispatch event
            nav.dispatchEvent(new CustomEvent('navclose', { bubbles: true }));
        }

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', closeNav);
        }

        // Submenu toggle
        items.forEach(function(item) {
            var link = item.querySelector('.alpacode-nav-fullscreen__link');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var isExpanded = item.classList.contains('is-expanded');

                    // Close other items (accordion)
                    items.forEach(function(other) {
                        if (other !== item) {
                            other.classList.remove('is-expanded');
                            var otherLink = other.querySelector('.alpacode-nav-fullscreen__link');
                            if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
                        }
                    });

                    // Toggle current
                    item.classList.toggle('is-expanded');
                    link.setAttribute('aria-expanded', !isExpanded);
                });
            }
        });

        // Keyboard navigation
        nav.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                closeNav();
            }
        });

        // Click outside to close
        nav.addEventListener('click', function(e) {
            if (e.target === nav || e.target.classList.contains('alpacode-nav-fullscreen__bg-slide')) {
                closeNav();
            }
        });

        // Close on link click (for same-page navigation)
        var allLinks = nav.querySelectorAll('.alpacode-nav-fullscreen__submenu-link');
        allLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(closeNav, 150);
            });
        });

        // Cursor follower
        if (cursor && !prefersReducedMotion) {
            var targetX = 0, targetY = 0;
            var currentX = 0, currentY = 0;
            var animating = false;

            nav.addEventListener('mousemove', function(e) {
                targetX = e.clientX;
                targetY = e.clientY;
                if (!animating) {
                    animating = true;
                    animateCursor();
                }
            });

            function animateCursor() {
                currentX += (targetX - currentX) * 0.08;
                currentY += (targetY - currentY) * 0.08;
                cursor.style.left = currentX + 'px';
                cursor.style.top = currentY + 'px';

                if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
                    requestAnimationFrame(animateCursor);
                } else {
                    animating = false;
                }
            }
        }

        // Bind triggers
        bindTriggers();

        // Re-bind on DOM changes (for dynamic content)
        var observer = new MutationObserver(function() {
            bindTriggers();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Expose API
        nav.alpacodeNav = {
            open: openNav,
            close: closeNav,
            toggle: toggleNav,
            isOpen: function() { return isOpen; }
        };
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Global API
    window.AlpacodeNavFullscreen = {
        init: init,
        open: function(id) {
            var nav = document.querySelector('.alpacode-nav-fullscreen' + (id ? '[data-trigger="' + id + '"]' : ''));
            if (nav && nav.alpacodeNav) nav.alpacodeNav.open();
        },
        close: function(id) {
            var nav = document.querySelector('.alpacode-nav-fullscreen' + (id ? '[data-trigger="' + id + '"]' : ''));
            if (nav && nav.alpacodeNav) nav.alpacodeNav.close();
        },
        toggle: function(id) {
            var nav = document.querySelector('.alpacode-nav-fullscreen' + (id ? '[data-trigger="' + id + '"]' : ''));
            if (nav && nav.alpacodeNav) nav.alpacodeNav.toggle();
        }
    };
})();
