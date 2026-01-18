/**
 * Navigation Bento Block - Frontend Interactivity
 *
 * Creative bento-grid fullscreen navigation with:
 * - External trigger support (data-nav-bento-trigger)
 * - Tile hover effects and glow
 * - Submenu expansion (click or hover based on mode)
 * - Keyboard navigation
 * - Staggered entrance animations
 */

(function() {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Initialize all nav bento instances
     */
    function init() {
        var navs = document.querySelectorAll('.alpacode-nav-bento');
        navs.forEach(function(nav) {
            initNavBento(nav);
        });
    }

    /**
     * Initialize a single nav bento instance
     */
    function initNavBento(nav) {
        var triggerId = nav.dataset.triggerId;
        var closeBtn = nav.querySelector('.alpacode-nav-bento__close');
        var tiles = nav.querySelectorAll('.alpacode-nav-bento__tile');
        var tilesWithChildren = nav.querySelectorAll('.alpacode-nav-bento__tile.has-children');
        var hoverExpand = nav.classList.contains('alpacode-nav-bento--hover-expand');

        var isOpen = false;

        // Bind external triggers
        bindTriggers();

        // Initialize close button
        initCloseButton();

        // Initialize tile interactions
        initTileEffects();

        // Initialize submenus
        initSubmenus();

        // Initialize keyboard navigation
        initKeyboardNav();

        /**
         * Bind external trigger elements
         */
        function bindTriggers() {
            if (!triggerId) return;

            var triggers = document.querySelectorAll('[data-nav-bento-trigger="' + triggerId + '"]');
            triggers.forEach(function(trigger) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleNav();
                });
            });
        }

        /**
         * Initialize close button
         */
        function initCloseButton() {
            if (!closeBtn) return;

            closeBtn.addEventListener('click', function() {
                closeNav();
            });
        }

        /**
         * Toggle navigation
         */
        function toggleNav() {
            if (isOpen) {
                closeNav();
            } else {
                openNav();
            }
        }

        /**
         * Open navigation
         */
        function openNav() {
            isOpen = true;
            nav.classList.add('is-open');
            document.body.classList.add('alpacode-nav-bento-open');

            // Update ARIA
            nav.setAttribute('aria-hidden', 'false');

            // Focus close button after animation
            setTimeout(function() {
                if (closeBtn) closeBtn.focus();
            }, 800);

            // Dispatch event
            nav.dispatchEvent(new CustomEvent('navbento:open', { bubbles: true }));
        }

        /**
         * Close navigation
         */
        function closeNav() {
            isOpen = false;
            nav.classList.remove('is-open');
            document.body.classList.remove('alpacode-nav-bento-open');

            // Update ARIA
            nav.setAttribute('aria-hidden', 'true');

            // Close any expanded tiles
            closeAllSubmenus();

            // Dispatch event
            nav.dispatchEvent(new CustomEvent('navbento:close', { bubbles: true }));
        }

        /**
         * Initialize tile hover/click effects
         */
        function initTileEffects() {
            if (prefersReducedMotion) return;

            tiles.forEach(function(tile) {
                var tileLink = tile.querySelector('.alpacode-nav-bento__tile-link');
                if (!tileLink) return;

                // Mouse glow effect
                tileLink.addEventListener('mousemove', function(e) {
                    var rect = tileLink.getBoundingClientRect();
                    var x = ((e.clientX - rect.left) / rect.width) * 100;
                    var y = ((e.clientY - rect.top) / rect.height) * 100;

                    tileLink.style.setProperty('--glow-x', x + '%');
                    tileLink.style.setProperty('--glow-y', y + '%');
                });
            });
        }

        /**
         * Initialize submenu interactions
         */
        function initSubmenus() {
            tilesWithChildren.forEach(function(tile) {
                var tileLink = tile.querySelector('.alpacode-nav-bento__tile-link');
                if (!tileLink) return;

                if (hoverExpand) {
                    // Hover mode - handled by CSS
                    // But we add touch support
                    tileLink.addEventListener('touchstart', function(e) {
                        if (!tile.classList.contains('is-expanded')) {
                            e.preventDefault();
                            toggleSubmenu(tile);
                        }
                    });
                } else {
                    // Click mode
                    tileLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        toggleSubmenu(tile);
                    });
                }
            });
        }

        /**
         * Toggle submenu expansion
         */
        function toggleSubmenu(tile) {
            var isExpanded = tile.classList.contains('is-expanded');

            // Close others first (accordion behavior)
            tilesWithChildren.forEach(function(otherTile) {
                if (otherTile !== tile) {
                    otherTile.classList.remove('is-expanded');
                }
            });

            // Toggle current
            if (isExpanded) {
                tile.classList.remove('is-expanded');
            } else {
                tile.classList.add('is-expanded');
            }
        }

        /**
         * Close all submenus
         */
        function closeAllSubmenus() {
            tilesWithChildren.forEach(function(tile) {
                tile.classList.remove('is-expanded');
            });
        }

        /**
         * Keyboard navigation
         */
        function initKeyboardNav() {
            nav.addEventListener('keydown', function(e) {
                if (!isOpen) return;

                // Escape to close
                if (e.key === 'Escape') {
                    closeNav();
                    // Focus back on trigger
                    var trigger = document.querySelector('[data-nav-bento-trigger="' + triggerId + '"]');
                    if (trigger) trigger.focus();
                }

                // Tab trap
                if (e.key === 'Tab') {
                    trapFocus(e);
                }
            });
        }

        /**
         * Trap focus within navigation
         */
        function trapFocus(e) {
            var focusableElements = nav.querySelectorAll(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length === 0) return;

            var firstElement = focusableElements[0];
            var lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }

        // Close on background click
        nav.addEventListener('click', function(e) {
            if (e.target === nav || e.target.classList.contains('alpacode-nav-bento__bg')) {
                closeNav();
            }
        });

        // Close on link click (for same-page navigation)
        var allLinks = nav.querySelectorAll('.alpacode-nav-bento__tile-link:not(.has-children .alpacode-nav-bento__tile-link), .alpacode-nav-bento__tile-submenu-link');
        allLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(function() {
                    closeNav();
                }, 150);
            });
        });

        // Expose instance API
        nav.alpacodeNavBento = {
            open: openNav,
            close: closeNav,
            toggle: toggleNav,
            isOpen: function() { return isOpen; }
        };
    }

    /**
     * Global API for external control
     */
    window.AlpacodeNavBento = {
        init: init,

        open: function(triggerId) {
            var nav = document.querySelector('.alpacode-nav-bento[data-trigger-id="' + triggerId + '"]');
            if (nav && nav.alpacodeNavBento) {
                nav.alpacodeNavBento.open();
            }
        },

        close: function(triggerId) {
            var nav = document.querySelector('.alpacode-nav-bento[data-trigger-id="' + triggerId + '"]');
            if (nav && nav.alpacodeNavBento) {
                nav.alpacodeNavBento.close();
            }
        },

        toggle: function(triggerId) {
            var nav = document.querySelector('.alpacode-nav-bento[data-trigger-id="' + triggerId + '"]');
            if (nav && nav.alpacodeNavBento) {
                nav.alpacodeNavBento.toggle();
            }
        },

        closeAll: function() {
            var navs = document.querySelectorAll('.alpacode-nav-bento.is-open');
            navs.forEach(function(nav) {
                if (nav.alpacodeNavBento) {
                    nav.alpacodeNavBento.close();
                }
            });
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize for dynamic content
    if (typeof wp !== 'undefined' && wp.domReady) {
        wp.domReady(init);
    }
})();
