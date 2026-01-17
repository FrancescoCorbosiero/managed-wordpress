/**
 * Sneaker Selection Blocks - Animation Library
 * Premium vanilla JavaScript animations and interactions
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Scroll Reveal Animation
     * Animates elements into view on scroll
     */
    const ScrollReveal = {
        init() {
            if (prefersReducedMotion) {
                document.querySelectorAll('[data-ss-animate]').forEach(el => {
                    el.classList.add('ss-visible');
                });
                return;
            }

            const elements = document.querySelectorAll('[data-ss-animate]');
            if (!elements.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('ss-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => observer.observe(el));
        }
    };

    /**
     * Stagger Animation
     * Applies staggered delays to child elements
     */
    const StaggerAnimation = {
        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-ss-stagger]').forEach(container => {
                const children = container.children;
                Array.from(children).forEach((child, index) => {
                    child.style.setProperty('--ss-stagger-index', index);
                });
            });
        }
    };

    /**
     * Countdown Timer
     * Live countdown for sneaker releases
     */
    const CountdownTimer = {
        init() {
            document.querySelectorAll('[data-ss-countdown]').forEach(el => {
                const targetDate = new Date(el.dataset.ssCountdown).getTime();

                if (isNaN(targetDate)) {
                    console.warn('Invalid countdown date:', el.dataset.ssCountdown);
                    return;
                }

                this.update(el, targetDate);

                const interval = setInterval(() => {
                    const remaining = this.update(el, targetDate);
                    if (remaining <= 0) {
                        clearInterval(interval);
                        this.handleExpired(el);
                    }
                }, 1000);
            });
        },

        update(el, targetDate) {
            const now = Date.now();
            const remaining = targetDate - now;

            if (remaining <= 0) {
                return remaining;
            }

            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            const daysEl = el.querySelector('[data-ss-countdown-days]');
            const hoursEl = el.querySelector('[data-ss-countdown-hours]');
            const minutesEl = el.querySelector('[data-ss-countdown-minutes]');
            const secondsEl = el.querySelector('[data-ss-countdown-seconds]');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

            return remaining;
        },

        handleExpired(el) {
            const expiredText = el.dataset.ssCountdownExpired || 'Released!';
            el.innerHTML = `<div class="ss-countdown__expired">${expiredText}</div>`;
            el.classList.add('ss-countdown--expired');
        }
    };

    /**
     * Carousel
     * Image and product carousels
     */
    const Carousel = {
        init() {
            document.querySelectorAll('[data-ss-carousel]').forEach(carousel => {
                this.setup(carousel);
            });
        },

        setup(carousel) {
            const track = carousel.querySelector('[data-ss-carousel-track]');
            const slides = carousel.querySelectorAll('[data-ss-carousel-slide]');
            const prevBtn = carousel.querySelector('[data-ss-carousel-prev]');
            const nextBtn = carousel.querySelector('[data-ss-carousel-next]');
            const dotsContainer = carousel.querySelector('[data-ss-carousel-dots]');

            if (!track || !slides.length) return;

            let currentIndex = 0;
            const totalSlides = slides.length;
            const autoplay = carousel.dataset.ssCarouselAutoplay !== undefined;
            const autoplayInterval = parseInt(carousel.dataset.ssCarouselInterval) || 5000;
            let autoplayTimer = null;

            // Calculate visible slides
            const getVisibleSlides = () => {
                const slidesPerView = carousel.dataset.ssCarouselSlides || 1;
                if (slidesPerView === 'auto') {
                    const slideWidth = slides[0].offsetWidth;
                    return Math.floor(carousel.offsetWidth / slideWidth);
                }
                return parseInt(slidesPerView);
            };

            // Update carousel position
            const updatePosition = (animate = true) => {
                const slideWidth = slides[0].offsetWidth;
                const gap = parseInt(getComputedStyle(track).gap) || 0;
                const offset = -(currentIndex * (slideWidth + gap));

                track.style.transition = animate && !prefersReducedMotion
                    ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'none';
                track.style.transform = `translateX(${offset}px)`;

                // Update dots
                if (dotsContainer) {
                    dotsContainer.querySelectorAll('[data-ss-carousel-dot]').forEach((dot, i) => {
                        dot.classList.toggle('ss-carousel__dot--active', i === currentIndex);
                    });
                }

                // Update button states
                if (prevBtn) prevBtn.disabled = currentIndex === 0;
                if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - getVisibleSlides();
            };

            // Navigation
            const goTo = (index) => {
                const maxIndex = totalSlides - getVisibleSlides();
                currentIndex = Math.max(0, Math.min(index, maxIndex));
                updatePosition();
            };

            const goNext = () => goTo(currentIndex + 1);
            const goPrev = () => goTo(currentIndex - 1);

            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', goPrev);
            if (nextBtn) nextBtn.addEventListener('click', goNext);

            // Dots
            if (dotsContainer) {
                for (let i = 0; i < totalSlides; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'ss-carousel__dot';
                    dot.setAttribute('data-ss-carousel-dot', '');
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dot.addEventListener('click', () => goTo(i));
                    dotsContainer.appendChild(dot);
                }
            }

            // Autoplay
            if (autoplay && !prefersReducedMotion) {
                const startAutoplay = () => {
                    autoplayTimer = setInterval(() => {
                        if (currentIndex >= totalSlides - getVisibleSlides()) {
                            goTo(0);
                        } else {
                            goNext();
                        }
                    }, autoplayInterval);
                };

                const stopAutoplay = () => clearInterval(autoplayTimer);

                startAutoplay();
                carousel.addEventListener('mouseenter', stopAutoplay);
                carousel.addEventListener('mouseleave', startAutoplay);
            }

            // Touch/Swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? goNext() : goPrev();
                }
            }, { passive: true });

            // Resize handling
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => updatePosition(false), 100);
            });

            // Initial setup
            updatePosition(false);
        }
    };

    /**
     * Size Selector
     * Interactive size selection with availability
     */
    const SizeSelector = {
        init() {
            document.querySelectorAll('[data-ss-size-selector]').forEach(container => {
                const sizes = container.querySelectorAll('[data-ss-size]');
                const hiddenInput = container.querySelector('input[type="hidden"]');
                const selectedDisplay = container.querySelector('[data-ss-size-selected]');

                sizes.forEach(size => {
                    if (size.classList.contains('ss-size--disabled')) return;

                    size.addEventListener('click', () => {
                        // Remove selection from all
                        sizes.forEach(s => s.classList.remove('ss-size--selected'));

                        // Add selection to clicked
                        size.classList.add('ss-size--selected');

                        // Update hidden input
                        if (hiddenInput) {
                            hiddenInput.value = size.dataset.ssSize;
                        }

                        // Update display
                        if (selectedDisplay) {
                            selectedDisplay.textContent = size.dataset.ssSize;
                        }

                        // Dispatch custom event
                        container.dispatchEvent(new CustomEvent('ss:size-selected', {
                            detail: { size: size.dataset.ssSize }
                        }));
                    });
                });
            });
        }
    };

    /**
     * Image Gallery
     * Product image gallery with zoom
     */
    const ImageGallery = {
        init() {
            document.querySelectorAll('[data-ss-gallery]').forEach(gallery => {
                this.setup(gallery);
            });
        },

        setup(gallery) {
            const mainImage = gallery.querySelector('[data-ss-gallery-main]');
            const thumbnails = gallery.querySelectorAll('[data-ss-gallery-thumb]');

            if (!mainImage || !thumbnails.length) return;

            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const imgSrc = thumb.dataset.ssGalleryThumb;
                    const imgAlt = thumb.getAttribute('alt') || '';

                    // Update main image
                    mainImage.src = imgSrc;
                    mainImage.alt = imgAlt;

                    // Update active state
                    thumbnails.forEach(t => t.classList.remove('ss-gallery__thumb--active'));
                    thumb.classList.add('ss-gallery__thumb--active');
                });
            });

            // Image zoom on hover
            if (gallery.dataset.ssGalleryZoom !== undefined && !prefersReducedMotion) {
                const zoomContainer = mainImage.parentElement;

                zoomContainer.addEventListener('mousemove', (e) => {
                    const rect = zoomContainer.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    mainImage.style.transformOrigin = `${x}% ${y}%`;
                    mainImage.style.transform = 'scale(1.5)';
                });

                zoomContainer.addEventListener('mouseleave', () => {
                    mainImage.style.transform = 'scale(1)';
                });
            }
        }
    };

    /**
     * Parallax Effect
     * Scroll-based parallax for background images
     */
    const Parallax = {
        init() {
            if (prefersReducedMotion) return;

            const elements = document.querySelectorAll('[data-ss-parallax]');
            if (!elements.length) return;

            const updateParallax = () => {
                const scrollY = window.scrollY;

                elements.forEach(el => {
                    const speed = parseFloat(el.dataset.ssParallax) || 0.5;
                    const rect = el.getBoundingClientRect();
                    const centerY = rect.top + rect.height / 2;
                    const viewportCenter = window.innerHeight / 2;
                    const offset = (centerY - viewportCenter) * speed;

                    el.style.transform = `translateY(${offset}px)`;
                });
            };

            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        updateParallax();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });

            updateParallax();
        }
    };

    /**
     * Infinite Scroll/Marquee
     * For brand logos and product showcases
     */
    const InfiniteScroll = {
        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-ss-marquee]').forEach(container => {
                const track = container.querySelector('[data-ss-marquee-track]');
                if (!track) return;

                // Clone items for seamless loop
                const clone = track.cloneNode(true);
                container.appendChild(clone);

                // Set animation speed
                const speed = parseInt(container.dataset.ssMarqueeSpeed) || 30;
                const direction = container.dataset.ssMarqueeDirection === 'right' ? 'reverse' : 'normal';

                track.style.animation = `ss-marquee ${speed}s linear infinite ${direction}`;
                clone.style.animation = `ss-marquee ${speed}s linear infinite ${direction}`;
            });

            // Add marquee animation keyframes if not exists
            if (!document.querySelector('#ss-marquee-styles')) {
                const style = document.createElement('style');
                style.id = 'ss-marquee-styles';
                style.textContent = `
                    @keyframes ss-marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-100%); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    };

    /**
     * Counter Animation
     * Animate numbers counting up
     */
    const Counter = {
        init() {
            if (prefersReducedMotion) {
                document.querySelectorAll('[data-ss-counter]').forEach(el => {
                    el.textContent = el.dataset.ssCounter;
                });
                return;
            }

            const elements = document.querySelectorAll('[data-ss-counter]');
            if (!elements.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            elements.forEach(el => observer.observe(el));
        },

        animate(el) {
            const target = parseInt(el.dataset.ssCounter);
            const duration = parseInt(el.dataset.ssCounterDuration) || 2000;
            const prefix = el.dataset.ssCounterPrefix || '';
            const suffix = el.dataset.ssCounterSuffix || '';
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                el.textContent = prefix + current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = prefix + target.toLocaleString() + suffix;
                }
            };

            requestAnimationFrame(step);
        }
    };

    /**
     * Hover 3D Tilt Effect
     * Card hover effect for product cards
     */
    const TiltEffect = {
        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-ss-tilt]').forEach(el => {
                const maxTilt = parseInt(el.dataset.ssTilt) || 10;

                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -maxTilt;
                    const rotateY = ((x - centerX) / centerX) * maxTilt;

                    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
            });
        }
    };

    /**
     * Floating Animation
     * Subtle floating effect for images
     */
    const FloatingEffect = {
        init() {
            if (prefersReducedMotion) return;

            // Add floating animation keyframes
            if (!document.querySelector('#ss-floating-styles')) {
                const style = document.createElement('style');
                style.id = 'ss-floating-styles';
                style.textContent = `
                    @keyframes ss-float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    [data-ss-float] {
                        animation: ss-float 6s ease-in-out infinite;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    };

    /**
     * Tab System
     * For size charts and product details
     */
    const Tabs = {
        init() {
            document.querySelectorAll('[data-ss-tabs]').forEach(container => {
                const triggers = container.querySelectorAll('[data-ss-tab-trigger]');
                const panels = container.querySelectorAll('[data-ss-tab-panel]');

                triggers.forEach(trigger => {
                    trigger.addEventListener('click', () => {
                        const targetId = trigger.dataset.ssTabTrigger;

                        // Update triggers
                        triggers.forEach(t => {
                            t.classList.remove('ss-tab--active');
                            t.setAttribute('aria-selected', 'false');
                        });
                        trigger.classList.add('ss-tab--active');
                        trigger.setAttribute('aria-selected', 'true');

                        // Update panels
                        panels.forEach(panel => {
                            const isTarget = panel.dataset.ssTabPanel === targetId;
                            panel.hidden = !isTarget;
                            panel.classList.toggle('ss-tab-panel--active', isTarget);
                        });
                    });
                });
            });
        }
    };

    /**
     * Initialize all modules
     */
    const init = () => {
        ScrollReveal.init();
        StaggerAnimation.init();
        CountdownTimer.init();
        Carousel.init();
        SizeSelector.init();
        ImageGallery.init();
        Parallax.init();
        InfiniteScroll.init();
        Counter.init();
        TiltEffect.init();
        FloatingEffect.init();
        Tabs.init();
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize on dynamic content load (e.g., AJAX)
    document.addEventListener('ss:content-loaded', init);

    // Expose modules for external use
    window.SneakerSelectionAnimations = {
        ScrollReveal,
        StaggerAnimation,
        CountdownTimer,
        Carousel,
        SizeSelector,
        ImageGallery,
        Parallax,
        InfiniteScroll,
        Counter,
        TiltEffect,
        FloatingEffect,
        Tabs,
        init
    };

})();
