/**
 * Alpacode Animations Library
 * Premium vanilla JS animation system for WordPress blocks
 * No dependencies - uses Intersection Observer, requestAnimationFrame
 * Respects prefers-reduced-motion
 *
 * @version 1.0.0
 * @author Alpacode Studio
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Utility: Debounce function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utility: Throttle function
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Utility: Linear interpolation
     */
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    /**
     * Utility: Clamp value between min and max
     */
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Utility: Map value from one range to another
     */
    function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    /**
     * Utility: Easing functions
     */
    const easing = {
        easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
        easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
        easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
        easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        easeOutBack: (t) => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        }
    };

    /**
     * ScrollReveal - Fade/slide animations on scroll
     */
    class ScrollReveal {
        constructor() {
            this.elements = [];
            this.observer = null;
            this.init();
        }

        init() {
            if (prefersReducedMotion) {
                // Show all elements immediately if reduced motion is preferred
                document.querySelectorAll('[data-alpacode-animate]').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                return;
            }

            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            document.querySelectorAll('[data-alpacode-animate]').forEach(el => {
                this.prepareElement(el);
                this.observer.observe(el);
            });
        }

        prepareElement(el) {
            const animation = el.dataset.alpacodeAnimate;
            const delay = parseFloat(el.dataset.delay) || 0;
            const duration = parseFloat(el.dataset.duration) || 0.6;

            el.style.opacity = '0';
            el.style.transition = `opacity ${duration}s ease, transform ${duration}s ease`;
            el.style.transitionDelay = `${delay}s`;

            switch (animation) {
                case 'fade-up':
                    el.style.transform = 'translateY(30px)';
                    break;
                case 'fade-down':
                    el.style.transform = 'translateY(-30px)';
                    break;
                case 'fade-left':
                    el.style.transform = 'translateX(30px)';
                    break;
                case 'fade-right':
                    el.style.transform = 'translateX(-30px)';
                    break;
                case 'fade-scale':
                    el.style.transform = 'scale(0.9)';
                    break;
                case 'fade':
                default:
                    el.style.transform = 'none';
            }
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                    this.observer.unobserve(entry.target);
                }
            });
        }
    }

    /**
     * StaggerReveal - Staggered animations for lists/grids
     */
    class StaggerReveal {
        constructor() {
            this.init();
        }

        init() {
            if (prefersReducedMotion) {
                document.querySelectorAll('[data-alpacode-stagger]').forEach(container => {
                    Array.from(container.children).forEach(child => {
                        child.style.opacity = '1';
                        child.style.transform = 'none';
                    });
                });
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateChildren(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            document.querySelectorAll('[data-alpacode-stagger]').forEach(container => {
                const staggerDelay = parseFloat(container.dataset.alpacodeStagger) || 0.1;
                const children = Array.from(container.children);

                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    child.style.transitionDelay = `${index * staggerDelay}s`;
                });

                observer.observe(container);
            });
        }

        animateChildren(container) {
            Array.from(container.children).forEach(child => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            });
        }
    }

    /**
     * ParallaxEffect - Scroll-linked transforms
     */
    class ParallaxEffect {
        constructor() {
            this.elements = [];
            this.ticking = false;
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-alpacode-parallax]').forEach(el => {
                this.elements.push({
                    el,
                    speed: parseFloat(el.dataset.alpacodeParallax) || 0.5,
                    direction: el.dataset.parallaxDirection || 'vertical'
                });
            });

            if (this.elements.length > 0) {
                window.addEventListener('scroll', () => this.onScroll(), { passive: true });
                this.update();
            }
        }

        onScroll() {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.update();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }

        update() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            this.elements.forEach(({ el, speed, direction }) => {
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const elementCenter = elementTop + rect.height / 2;
                const viewportCenter = scrollY + windowHeight / 2;
                const distance = viewportCenter - elementCenter;
                const offset = distance * speed * 0.1;

                if (direction === 'horizontal') {
                    el.style.transform = `translateX(${offset}px)`;
                } else {
                    el.style.transform = `translateY(${offset}px)`;
                }
            });
        }
    }

    /**
     * MagneticButton - Cursor-following effect
     */
    class MagneticButton {
        constructor() {
            this.elements = [];
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-alpacode-magnetic]').forEach(el => {
                this.setupMagnetic(el);
            });
        }

        setupMagnetic(el) {
            const strength = parseFloat(el.dataset.magneticStrength) || 0.3;
            let bounds = el.getBoundingClientRect();
            let currentX = 0;
            let currentY = 0;
            let targetX = 0;
            let targetY = 0;
            let animationFrame = null;

            const updateBounds = debounce(() => {
                bounds = el.getBoundingClientRect();
            }, 100);

            window.addEventListener('resize', updateBounds);

            const animate = () => {
                currentX = lerp(currentX, targetX, 0.1);
                currentY = lerp(currentY, targetY, 0.1);

                el.style.transform = `translate(${currentX}px, ${currentY}px)`;

                if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            el.addEventListener('mousemove', (e) => {
                bounds = el.getBoundingClientRect();
                const centerX = bounds.left + bounds.width / 2;
                const centerY = bounds.top + bounds.height / 2;

                targetX = (e.clientX - centerX) * strength;
                targetY = (e.clientY - centerY) * strength;

                if (!animationFrame) {
                    animationFrame = requestAnimationFrame(animate);
                }
            });

            el.addEventListener('mouseleave', () => {
                targetX = 0;
                targetY = 0;
                if (!animationFrame) {
                    animationFrame = requestAnimationFrame(animate);
                }
            });
        }
    }

    /**
     * TextSplitter - Character/word animations
     */
    class TextSplitter {
        constructor() {
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-alpacode-split]').forEach(el => {
                this.splitText(el);
            });
        }

        splitText(el) {
            const type = el.dataset.alpacodeSplit; // 'chars' or 'words'
            const text = el.textContent;
            const delay = parseFloat(el.dataset.splitDelay) || 0.03;

            el.innerHTML = '';
            el.style.display = 'inline-block';

            if (type === 'chars') {
                this.splitByChars(el, text, delay);
            } else {
                this.splitByWords(el, text, delay);
            }

            // Set up intersection observer to trigger animation
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateSplit(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            observer.observe(el);
        }

        splitByChars(el, text, delay) {
            let index = 0;
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ') {
                    el.appendChild(document.createTextNode(' '));
                } else {
                    const span = document.createElement('span');
                    span.className = 'alpacode-split-char';
                    span.textContent = char;
                    span.style.cssText = `
                        display: inline-block;
                        opacity: 0;
                        transform: translateY(100%);
                        transition: opacity 0.4s ease, transform 0.4s ease;
                        transition-delay: ${index * delay}s;
                    `;
                    el.appendChild(span);
                    index++;
                }
            }
        }

        splitByWords(el, text, delay) {
            const words = text.split(' ');
            words.forEach((word, index) => {
                const wrapper = document.createElement('span');
                wrapper.className = 'alpacode-split-word-wrapper';
                wrapper.style.cssText = 'display: inline-block; overflow: hidden; vertical-align: bottom;';

                const span = document.createElement('span');
                span.className = 'alpacode-split-word';
                span.textContent = word;
                span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(100%);
                    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    transition-delay: ${index * delay}s;
                `;

                wrapper.appendChild(span);
                el.appendChild(wrapper);

                if (index < words.length - 1) {
                    el.appendChild(document.createTextNode(' '));
                }
            });
        }

        animateSplit(el) {
            const spans = el.querySelectorAll('.alpacode-split-char, .alpacode-split-word');
            spans.forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }
    }

    /**
     * CountUp - Animated number counting
     */
    class CountUp {
        constructor() {
            this.init();
        }

        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !entry.target.dataset.counted) {
                            this.animateCount(entry.target);
                            entry.target.dataset.counted = 'true';
                        }
                    });
                },
                { threshold: 0.5 }
            );

            document.querySelectorAll('[data-alpacode-count]').forEach(el => {
                observer.observe(el);
            });
        }

        animateCount(el) {
            const target = parseFloat(el.dataset.alpacodeCount);
            const duration = parseInt(el.dataset.countDuration) || 2000;
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const decimals = parseInt(el.dataset.decimals) || 0;
            const start = performance.now();

            if (prefersReducedMotion) {
                el.textContent = prefix + target.toFixed(decimals) + suffix;
                return;
            }

            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easing.easeOutExpo(progress);
                const current = target * easedProgress;

                el.textContent = prefix + current.toFixed(decimals) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }

    /**
     * InfiniteScroll - For carousels/marquees
     */
    class InfiniteScroll {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('[data-alpacode-infinite]').forEach(container => {
                this.setupInfiniteScroll(container);
            });
        }

        setupInfiniteScroll(container) {
            const track = container.querySelector('.alpacode-carousel-track');
            if (!track) return;

            const speed = parseFloat(container.dataset.speed) || 30;
            const direction = container.dataset.direction || 'left';
            const pauseOnHover = container.dataset.pauseHover !== 'false';

            // Clone items for seamless loop
            const items = Array.from(track.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });

            // Set up CSS animation
            const trackWidth = track.scrollWidth / 2;
            track.style.setProperty('--scroll-width', `-${trackWidth}px`);
            track.style.animationDuration = `${trackWidth / speed}s`;
            track.style.animationDirection = direction === 'right' ? 'reverse' : 'normal';

            if (!prefersReducedMotion) {
                track.classList.add('alpacode-carousel-animate');
            }

            // Pause on hover
            if (pauseOnHover && !prefersReducedMotion) {
                container.addEventListener('mouseenter', () => {
                    track.style.animationPlayState = 'paused';
                });
                container.addEventListener('mouseleave', () => {
                    track.style.animationPlayState = 'running';
                });
            }
        }
    }

    /**
     * TiltEffect - 3D card tilt on hover
     */
    class TiltEffect {
        constructor() {
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-alpacode-tilt]').forEach(el => {
                this.setupTilt(el);
            });
        }

        setupTilt(el) {
            const maxTilt = parseFloat(el.dataset.tiltMax) || 10;
            const perspective = parseFloat(el.dataset.tiltPerspective) || 1000;
            const scale = parseFloat(el.dataset.tiltScale) || 1.02;
            const speed = parseFloat(el.dataset.tiltSpeed) || 400;

            el.style.transformStyle = 'preserve-3d';
            el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -maxTilt;
                const rotateY = ((x - centerX) / centerX) * maxTilt;

                el.style.transform = `
                    perspective(${perspective}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(${scale}, ${scale}, ${scale})
                `;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        }
    }

    /**
     * GradientAnimation - Animated gradient backgrounds
     */
    class GradientAnimation {
        constructor() {
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-alpacode-gradient]').forEach(el => {
                this.setupGradient(el);
            });
        }

        setupGradient(el) {
            const colors = el.dataset.gradientColors || '#3b82f6,#60a5fa,#3b82f6';
            const speed = parseFloat(el.dataset.gradientSpeed) || 3;

            el.style.setProperty('--gradient-colors', colors);
            el.style.setProperty('--gradient-speed', `${speed}s`);
            el.classList.add('alpacode-gradient-animated');
        }
    }

    /**
     * RippleEffect - Button click ripple
     */
    class RippleEffect {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('[data-alpacode-ripple]').forEach(el => {
                this.setupRipple(el);
            });
        }

        setupRipple(el) {
            el.style.position = 'relative';
            el.style.overflow = 'hidden';

            el.addEventListener('click', (e) => {
                if (prefersReducedMotion) return;

                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'alpacode-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: alpacode-ripple-effect 0.6s ease-out;
                    pointer-events: none;
                    left: ${x}px;
                    top: ${y}px;
                    width: 100px;
                    height: 100px;
                    margin-left: -50px;
                    margin-top: -50px;
                `;

                el.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        }
    }

    /**
     * TextScramble - Scramble text effect
     */
    class TextScramble {
        constructor() {
            this.chars = '!<>-_\\/[]{}#%&@+=$^?:*';
            this.init();
        }

        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !entry.target.dataset.scrambled) {
                            this.scramble(entry.target);
                            entry.target.dataset.scrambled = 'true';
                        }
                    });
                },
                { threshold: 0.5 }
            );

            document.querySelectorAll('[data-alpacode-scramble]').forEach(el => {
                observer.observe(el);
            });
        }

        scramble(el) {
            if (prefersReducedMotion) return;

            const originalText = el.textContent;
            const duration = parseInt(el.dataset.scrambleDuration) || 1000;
            const start = performance.now();
            let frame = 0;

            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                let output = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (originalText[i] === ' ') {
                        output += ' ';
                    } else if (i < originalText.length * progress) {
                        output += originalText[i];
                    } else {
                        output += this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                }

                el.textContent = output;
                frame++;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    el.textContent = originalText;
                }
            };

            requestAnimationFrame(animate);
        }
    }

    /**
     * ScrollProgress - Progress indicator
     */
    class ScrollProgress {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('[data-alpacode-scroll-progress]').forEach(el => {
                this.setupProgress(el);
            });
        }

        setupProgress(el) {
            const target = el.dataset.alpacodeScrollProgress;
            let targetElement = null;

            if (target && target !== 'page') {
                targetElement = document.querySelector(target);
            }

            const updateProgress = throttle(() => {
                let progress;

                if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementHeight = rect.height;
                    const scrollTop = window.scrollY;
                    const viewportHeight = window.innerHeight;

                    progress = clamp((scrollTop - elementTop + viewportHeight) / (elementHeight + viewportHeight), 0, 1);
                } else {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    progress = scrollTop / docHeight;
                }

                el.style.setProperty('--scroll-progress', progress);
                el.style.transform = `scaleX(${progress})`;
            }, 16);

            window.addEventListener('scroll', updateProgress, { passive: true });
            updateProgress();
        }
    }

    /**
     * GlowEffect - Pulsing glow effect
     */
    class GlowEffect {
        constructor() {
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-alpacode-glow]').forEach(el => {
                const color = el.dataset.glowColor || 'var(--wp--preset--color--accent)';
                const intensity = el.dataset.glowIntensity || '20';

                el.style.setProperty('--glow-color', color);
                el.style.setProperty('--glow-intensity', `${intensity}px`);
                el.classList.add('alpacode-glow-pulse');
            });
        }
    }

    /**
     * ProgressBar - Animated progress bars
     */
    class ProgressBar {
        constructor() {
            this.init();
        }

        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !entry.target.dataset.animated) {
                            this.animateProgress(entry.target);
                            entry.target.dataset.animated = 'true';
                        }
                    });
                },
                { threshold: 0.3 }
            );

            document.querySelectorAll('[data-alpacode-progress]').forEach(el => {
                observer.observe(el);
            });
        }

        animateProgress(el) {
            const value = parseFloat(el.dataset.alpacodeProgress) || 0;
            const duration = parseInt(el.dataset.progressDuration) || 1000;
            const bar = el.querySelector('.alpacode-progress-bar') || el;

            if (prefersReducedMotion) {
                bar.style.width = `${value}%`;
                return;
            }

            bar.style.width = '0%';
            bar.style.transition = `width ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

            requestAnimationFrame(() => {
                bar.style.width = `${value}%`;
            });
        }
    }

    /**
     * Particles - Floating particles background
     */
    class Particles {
        constructor() {
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-alpacode-particles]').forEach(container => {
                this.createParticles(container);
            });
        }

        createParticles(container) {
            const count = parseInt(container.dataset.particleCount) || 30;
            const color = container.dataset.particleColor || 'var(--wp--preset--color--accent)';

            const wrapper = document.createElement('div');
            wrapper.className = 'alpacode-particles';
            wrapper.style.cssText = `
                position: absolute;
                inset: 0;
                overflow: hidden;
                pointer-events: none;
                z-index: 0;
            `;

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                const size = Math.random() * 4 + 2;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * -20;

                particle.className = 'alpacode-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}%;
                    top: ${y}%;
                    background: ${color};
                    border-radius: 50%;
                    opacity: ${Math.random() * 0.5 + 0.2};
                    animation: alpacode-float ${duration}s ease-in-out ${delay}s infinite;
                `;

                wrapper.appendChild(particle);
            }

            container.style.position = 'relative';
            container.insertBefore(wrapper, container.firstChild);
        }
    }

    /**
     * Cursor Follower - Custom cursor effect
     */
    class CursorFollower {
        constructor() {
            this.cursor = null;
            this.cursorDot = null;
            this.init();
        }

        init() {
            if (prefersReducedMotion) return;
            if (!document.querySelector('[data-alpacode-cursor]')) return;

            this.createCursor();
            this.bindEvents();
        }

        createCursor() {
            this.cursor = document.createElement('div');
            this.cursor.className = 'alpacode-cursor';
            this.cursor.style.cssText = `
                position: fixed;
                width: 40px;
                height: 40px;
                border: 2px solid var(--wp--preset--color--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
                transform: translate(-50%, -50%);
                mix-blend-mode: difference;
            `;

            this.cursorDot = document.createElement('div');
            this.cursorDot.className = 'alpacode-cursor-dot';
            this.cursorDot.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: var(--wp--preset--color--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
            `;

            document.body.appendChild(this.cursor);
            document.body.appendChild(this.cursorDot);
        }

        bindEvents() {
            let cursorX = 0;
            let cursorY = 0;
            let dotX = 0;
            let dotY = 0;

            document.addEventListener('mousemove', (e) => {
                cursorX = e.clientX;
                cursorY = e.clientY;
            });

            const animate = () => {
                dotX = lerp(dotX, cursorX, 0.2);
                dotY = lerp(dotY, cursorY, 0.2);

                this.cursor.style.left = `${cursorX}px`;
                this.cursor.style.top = `${cursorY}px`;
                this.cursorDot.style.left = `${dotX}px`;
                this.cursorDot.style.top = `${dotY}px`;

                requestAnimationFrame(animate);
            };

            animate();

            // Hover effects
            document.querySelectorAll('a, button, [data-alpacode-cursor-hover]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    this.cursor.style.borderColor = 'var(--wp--preset--color--accent-light)';
                });
                el.addEventListener('mouseleave', () => {
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    this.cursor.style.borderColor = 'var(--wp--preset--color--accent)';
                });
            });
        }
    }

    /**
     * Main Controller - AlpacodeAnimations
     */
    class AlpacodeAnimations {
        constructor() {
            this.modules = {};
            this.initialized = false;
        }

        init() {
            if (this.initialized) return;

            // Initialize all modules
            this.modules.scrollReveal = new ScrollReveal();
            this.modules.staggerReveal = new StaggerReveal();
            this.modules.parallax = new ParallaxEffect();
            this.modules.magnetic = new MagneticButton();
            this.modules.textSplit = new TextSplitter();
            this.modules.countUp = new CountUp();
            this.modules.infiniteScroll = new InfiniteScroll();
            this.modules.tilt = new TiltEffect();
            this.modules.gradient = new GradientAnimation();
            this.modules.ripple = new RippleEffect();
            this.modules.scramble = new TextScramble();
            this.modules.scrollProgress = new ScrollProgress();
            this.modules.glow = new GlowEffect();
            this.modules.progressBar = new ProgressBar();
            this.modules.particles = new Particles();
            this.modules.cursor = new CursorFollower();

            this.initialized = true;

            // Dispatch custom event for extensibility
            document.dispatchEvent(new CustomEvent('alpacodeAnimationsInit', {
                detail: { animations: this }
            }));
        }

        // Public method to re-initialize (useful for AJAX loaded content)
        refresh() {
            this.initialized = false;
            this.init();
        }

        // Get specific module
        getModule(name) {
            return this.modules[name];
        }
    }

    // Create global instance
    window.AlpacodeAnimations = new AlpacodeAnimations();

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.AlpacodeAnimations.init();
        });
    } else {
        window.AlpacodeAnimations.init();
    }

    // Inject required keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes alpacode-ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes alpacode-float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
            }
            75% {
                transform: translateY(-30px) translateX(5px);
            }
        }

        @keyframes alpacode-carousel-scroll {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(var(--scroll-width, -50%));
            }
        }

        .alpacode-carousel-animate {
            animation: alpacode-carousel-scroll linear infinite;
        }

        @keyframes alpacode-gradient-shift {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        .alpacode-gradient-animated {
            background-size: 200% 200%;
            animation: alpacode-gradient-shift var(--gradient-speed, 3s) ease infinite;
        }

        @keyframes alpacode-glow-pulse {
            0%, 100% {
                box-shadow: 0 0 var(--glow-intensity, 20px) var(--glow-color, #3b82f6);
            }
            50% {
                box-shadow: 0 0 calc(var(--glow-intensity, 20px) * 1.5) var(--glow-color, #3b82f6);
            }
        }

        .alpacode-glow-pulse {
            animation: alpacode-glow-pulse 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
            .alpacode-carousel-animate,
            .alpacode-gradient-animated,
            .alpacode-glow-pulse {
                animation: none !important;
            }

            .alpacode-particles {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);

})();
