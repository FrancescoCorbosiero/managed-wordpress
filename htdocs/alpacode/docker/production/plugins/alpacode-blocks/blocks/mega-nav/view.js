/**
 * Mega Navigation Block - Frontend Interactivity
 *
 * Handles all interactive features:
 * - Menu open/close with body scroll lock
 * - Submenu expansion with accordion behavior
 * - Cursor follower effect
 * - Keyboard navigation
 * - Scroll detection for header styling
 * - Preview area updates on hover
 */

(function() {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Initialize all mega nav instances
     */
    function init() {
        var navs = document.querySelectorAll('.alpacode-mega-nav');
        navs.forEach(function(nav) {
            initMegaNav(nav);
        });
    }

    /**
     * Initialize a single mega nav instance
     */
    function initMegaNav(nav) {
        var trigger = nav.querySelector('.alpacode-mega-nav__trigger');
        var overlay = nav.querySelector('.alpacode-mega-nav__overlay');
        var items = nav.querySelectorAll('.alpacode-mega-nav__item.has-children');
        var cursor = nav.querySelector('.alpacode-mega-nav__cursor');
        var preview = nav.querySelector('.alpacode-mega-nav__preview');

        // State
        var isOpen = false;
        var activeSubmenu = null;

        // Initialize features
        initTrigger();
        initSubmenus();
        initScrollDetection();
        initKeyboardNav();

        if (cursor && !prefersReducedMotion) {
            initCursorFollower();
        }

        if (preview && !prefersReducedMotion) {
            initPreviewUpdates();
        }

        /**
         * Toggle menu trigger
         */
        function initTrigger() {
            trigger.addEventListener('click', function() {
                toggleMenu();
            });
        }

        /**
         * Toggle menu open/close
         */
        function toggleMenu() {
            isOpen = !isOpen;

            if (isOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        }

        /**
         * Open menu
         */
        function openMenu() {
            nav.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('alpacode-mega-nav-open');

            // Focus first menu item after animation
            setTimeout(function() {
                var firstLink = nav.querySelector('.alpacode-mega-nav__link');
                if (firstLink) firstLink.focus();
            }, 600);
        }

        /**
         * Close menu
         */
        function closeMenu() {
            nav.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('alpacode-mega-nav-open');

            // Close any open submenus
            closeAllSubmenus();

            // Return focus to trigger
            trigger.focus();
        }

        /**
         * Initialize submenus
         */
        function initSubmenus() {
            items.forEach(function(item) {
                var link = item.querySelector('.alpacode-mega-nav__link');

                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleSubmenu(item);
                });
            });
        }

        /**
         * Toggle submenu
         */
        function toggleSubmenu(item) {
            var isExpanded = item.classList.contains('is-expanded');
            var link = item.querySelector('.alpacode-mega-nav__link');

            // Close other submenus (accordion behavior)
            items.forEach(function(otherItem) {
                if (otherItem !== item && otherItem.classList.contains('is-expanded')) {
                    otherItem.classList.remove('is-expanded');
                    var otherLink = otherItem.querySelector('.alpacode-mega-nav__link');
                    otherLink.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (isExpanded) {
                item.classList.remove('is-expanded');
                link.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('is-expanded');
                link.setAttribute('aria-expanded', 'true');
            }
        }

        /**
         * Close all submenus
         */
        function closeAllSubmenus() {
            items.forEach(function(item) {
                item.classList.remove('is-expanded');
                var link = item.querySelector('.alpacode-mega-nav__link');
                link.setAttribute('aria-expanded', 'false');
            });
        }

        /**
         * Scroll detection for header styling
         */
        function initScrollDetection() {
            var scrollThreshold = 50;

            function checkScroll() {
                if (window.scrollY > scrollThreshold) {
                    nav.classList.add('is-scrolled');
                } else {
                    nav.classList.remove('is-scrolled');
                }
            }

            window.addEventListener('scroll', checkScroll, { passive: true });
            checkScroll(); // Initial check
        }

        /**
         * Keyboard navigation
         */
        function initKeyboardNav() {
            nav.addEventListener('keydown', function(e) {
                // Escape to close
                if (e.key === 'Escape' && isOpen) {
                    closeMenu();
                }

                // Tab trap when open
                if (e.key === 'Tab' && isOpen) {
                    trapFocus(e);
                }
            });
        }

        /**
         * Trap focus within menu
         */
        function trapFocus(e) {
            var focusableElements = overlay.querySelectorAll(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
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

        /**
         * Cursor follower effect
         */
        function initCursorFollower() {
            var targetX = 0;
            var targetY = 0;
            var currentX = 0;
            var currentY = 0;
            var isAnimating = false;

            overlay.addEventListener('mousemove', function(e) {
                targetX = e.clientX;
                targetY = e.clientY;

                if (!isAnimating) {
                    isAnimating = true;
                    animateCursor();
                }
            });

            function animateCursor() {
                currentX += (targetX - currentX) * 0.1;
                currentY += (targetY - currentY) * 0.1;

                cursor.style.left = currentX + 'px';
                cursor.style.top = currentY + 'px';

                if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                    requestAnimationFrame(animateCursor);
                } else {
                    isAnimating = false;
                }
            }
        }

        /**
         * Preview area updates on hover
         */
        function initPreviewUpdates() {
            var previewTitle = preview.querySelector('.alpacode-mega-nav__preview-title');
            var previewDesc = preview.querySelector('.alpacode-mega-nav__preview-description');
            var allItems = nav.querySelectorAll('.alpacode-mega-nav__item');

            var defaultTitle = previewTitle ? previewTitle.textContent : '';
            var defaultDesc = previewDesc ? previewDesc.textContent : '';

            allItems.forEach(function(item) {
                var link = item.querySelector('.alpacode-mega-nav__link');
                var text = link.querySelector('.alpacode-mega-nav__link-text');
                var itemTitle = text ? text.textContent : '';

                // Get description from submenu or data attribute
                var submenuDesc = item.querySelector('.alpacode-mega-nav__submenu-desc');
                var itemDesc = submenuDesc ? submenuDesc.textContent : '';

                item.addEventListener('mouseenter', function() {
                    if (previewTitle) {
                        previewTitle.textContent = itemTitle;
                        previewTitle.style.opacity = 0;
                        previewTitle.style.transform = 'translateY(10px)';

                        setTimeout(function() {
                            previewTitle.style.opacity = 1;
                            previewTitle.style.transform = 'translateY(0)';
                        }, 50);
                    }

                    if (previewDesc && itemDesc) {
                        previewDesc.textContent = itemDesc;
                    }

                    // Add visual feedback
                    preview.classList.add('is-active');
                });

                item.addEventListener('mouseleave', function() {
                    // Don't reset immediately - let it persist
                });
            });

            // Reset on menu close
            var menuContainer = nav.querySelector('.alpacode-mega-nav__menu');
            if (menuContainer) {
                menuContainer.addEventListener('mouseleave', function() {
                    setTimeout(function() {
                        if (previewTitle) previewTitle.textContent = defaultTitle;
                        if (previewDesc) previewDesc.textContent = defaultDesc;
                        preview.classList.remove('is-active');
                    }, 200);
                });
            }
        }

        // Close menu on link click (for same-page navigation)
        var allLinks = nav.querySelectorAll('.alpacode-mega-nav__submenu-link, .alpacode-mega-nav__link:not([aria-expanded])');
        allLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Small delay to allow navigation
                setTimeout(function() {
                    closeMenu();
                }, 100);
            });
        });

        // Close on overlay click (outside menu)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target.classList.contains('alpacode-mega-nav__overlay-bg')) {
                closeMenu();
            }
        });
    }

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

    // Expose for external use
    window.AlpacodeMegaNav = {
        init: init
    };
})();
