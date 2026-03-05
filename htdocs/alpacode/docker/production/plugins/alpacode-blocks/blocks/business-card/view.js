/**
 * Business Card Block - Frontend Interactivity
 *
 * Handles additional animations and effects for the fullscreen
 * business card experience.
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Initialize all business card blocks
     */
    function init() {
        var cards = document.querySelectorAll('.alpacode-business-card');
        cards.forEach(function(card) {
            initCard(card);
        });
    }

    /**
     * Initialize a single business card
     */
    function initCard(card) {
        // Initialize cursor follower effect
        if (!prefersReducedMotion) {
            initCursorGlow(card);
            initParallaxMouse(card);
            initTextScramble(card);
        }

        // Initialize entrance sequence
        initEntranceSequence(card);

        // Initialize scroll hint behavior
        initScrollHint(card);
    }

    /**
     * Cursor glow effect that follows mouse
     */
    function initCursorGlow(card) {
        var glowElement = document.createElement('div');
        glowElement.className = 'alpacode-business-card__cursor-glow';
        glowElement.style.cssText = 'position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,var(--bc-accent-glow,rgba(99,102,241,0.15)) 0%,transparent 70%);pointer-events:none;transform:translate(-50%,-50%);opacity:0;transition:opacity 0.3s ease;z-index:0;';
        card.appendChild(glowElement);

        var targetX = 0;
        var targetY = 0;
        var currentX = 0;
        var currentY = 0;

        card.addEventListener('mouseenter', function() {
            glowElement.style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            glowElement.style.opacity = '0';
        });

        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        });

        function animate() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
            glowElement.style.left = currentX + 'px';
            glowElement.style.top = currentY + 'px';
            requestAnimationFrame(animate);
        }

        animate();
    }

    /**
     * Mouse-based parallax for orbs
     */
    function initParallaxMouse(card) {
        var orbs = card.querySelectorAll('.alpacode-business-card__orb');
        var corners = card.querySelectorAll('.alpacode-business-card__corner');

        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var mouseX = e.clientX - rect.left - centerX;
            var mouseY = e.clientY - rect.top - centerY;

            orbs.forEach(function(orb, index) {
                var speed = 0.02 + (index * 0.01);
                var x = mouseX * speed;
                var y = mouseY * speed;
                orb.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            });

            corners.forEach(function(corner, index) {
                var speed = 0.03;
                var x = mouseX * speed * (index % 2 === 0 ? 1 : -1);
                var y = mouseY * speed * (index < 2 ? 1 : -1);
                corner.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            });
        });

        card.addEventListener('mouseleave', function() {
            orbs.forEach(function(orb) {
                orb.style.transform = 'translate(0, 0)';
            });
            corners.forEach(function(corner) {
                corner.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Text scramble effect for dramatic reveal
     */
    function initTextScramble(card) {
        var tagline = card.querySelector('.alpacode-business-card__tagline');
        if (!tagline || tagline.dataset.scrambled) return;

        tagline.dataset.scrambled = 'true';
        var originalText = tagline.textContent;
        var chars = '!<>-_\\/[]{}—=+*^?#________';

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    scrambleText(tagline, originalText, chars);
                    observer.unobserve(tagline);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(tagline);
    }

    /**
     * Scramble text animation
     */
    function scrambleText(element, finalText, chars) {
        var length = finalText.length;
        var iterations = 0;
        var maxIterations = length * 3;

        var interval = setInterval(function() {
            element.textContent = finalText
                .split('')
                .map(function(char, index) {
                    if (index < iterations / 3) {
                        return finalText[index];
                    }
                    if (char === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            iterations++;

            if (iterations >= maxIterations) {
                element.textContent = finalText;
                clearInterval(interval);
            }
        }, 30);
    }

    /**
     * Entrance sequence with staggered animations
     */
    function initEntranceSequence(card) {
        // Add loaded class after a short delay for CSS animation triggers
        setTimeout(function() {
            card.classList.add('alpacode-business-card--loaded');
        }, 100);

        // Trigger counter animations if present
        var counters = card.querySelectorAll('[data-alpacode-count]');
        counters.forEach(function(counter) {
            animateCounter(counter);
        });
    }

    /**
     * Animate counter numbers
     */
    function animateCounter(element) {
        var target = parseInt(element.dataset.alpacodeCount || element.textContent, 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            var easeProgress = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(easeProgress * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animate);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }

    /**
     * Initialize scroll hint behavior
     */
    function initScrollHint(card) {
        var scrollHint = card.querySelector('.alpacode-business-card__scroll-hint');
        if (!scrollHint) return;

        // Hide scroll hint after user scrolls
        var scrollHandler = function() {
            if (window.scrollY > 50) {
                scrollHint.style.opacity = '0';
                scrollHint.style.pointerEvents = 'none';
            } else {
                scrollHint.style.opacity = '';
                scrollHint.style.pointerEvents = '';
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });

        // Click to scroll down
        scrollHint.style.cursor = 'pointer';
        scrollHint.addEventListener('click', function() {
            var nextSection = card.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    /**
     * Add 3D tilt effect to card
     */
    function initTiltEffect(card) {
        var cardElement = card.querySelector('.alpacode-business-card__card');
        if (!cardElement) return;

        var maxTilt = 5; // degrees

        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var mouseX = e.clientX - rect.left;
            var mouseY = e.clientY - rect.top;

            var tiltX = ((mouseY - centerY) / centerY) * maxTilt;
            var tiltY = ((centerX - mouseX) / centerX) * maxTilt;

            cardElement.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
        });

        card.addEventListener('mouseleave', function() {
            cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize on dynamic content (for Gutenberg editor)
    if (typeof wp !== 'undefined' && wp.domReady) {
        wp.domReady(init);
    }
})();
