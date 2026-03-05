/**
 * Resell Piacenza Blocks - Premium Animation Library
 * Elegant animations for luxury sneaker resale marketplace
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Split Text Animation - Character by character reveals
     */
    const SplitText = {
        init() {
            document.querySelectorAll('[data-rp-split]').forEach(el => {
                if (el.dataset.rpSplitProcessed) return;

                const type = el.dataset.rpSplit || 'chars';
                const text = el.textContent.trim();

                if (type === 'chars') {
                    el.innerHTML = text.split('').map((char, i) =>
                        char === ' '
                            ? '<span class="rp-char rp-char--space">&nbsp;</span>'
                            : `<span class="rp-char" style="--char-index: ${i}; --char-total: ${text.replace(/\s/g, '').length}">${char}</span>`
                    ).join('');
                } else if (type === 'words') {
                    el.innerHTML = text.split(/\s+/).map((word, i, arr) =>
                        `<span class="rp-word" style="--word-index: ${i}; --word-total: ${arr.length}">${word}</span>`
                    ).join(' ');
                }

                el.dataset.rpSplitProcessed = 'true';
            });
        }
    };

    /**
     * Scroll Reveal with Elegant Animations
     */
    const ScrollReveal = {
        init() {
            const elements = document.querySelectorAll('[data-rp-reveal]');
            if (!elements.length) return;

            if (prefersReducedMotion) {
                elements.forEach(el => el.classList.add('rp-revealed'));
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(entry.target.dataset.rpRevealDelay) || 0;
                        setTimeout(() => entry.target.classList.add('rp-revealed'), delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

            elements.forEach(el => observer.observe(el));
        }
    };

    /**
     * Hero Video Section - Visibility trigger
     */
    const HeroVideo = {
        init() {
            document.querySelectorAll('[data-rp-hero-video]').forEach(hero => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            hero.classList.add('rp-hero-video--visible');
                            SplitText.init(); // Process split text in hero
                            observer.unobserve(hero);
                        }
                    });
                }, { threshold: 0.2 });

                observer.observe(hero);

                // Handle video autoplay
                const video = hero.querySelector('video');
                if (video) {
                    video.play().catch(() => {
                        // Autoplay blocked, show fallback or poster
                    });
                }
            });
        }
    };

    /**
     * Testimonials Carousel
     */
    const TestimonialsCarousel = {
        init() {
            document.querySelectorAll('[data-rp-testimonials]').forEach(carousel => {
                const track = carousel.querySelector('[data-rp-testimonials-track]');
                const dots = carousel.querySelectorAll('[data-rp-testimonials-dot]');
                const items = carousel.querySelectorAll('[data-rp-testimonial]');

                if (!track || items.length < 2) return;

                let current = 0;
                let autoplayTimer = null;
                const autoplay = parseInt(carousel.dataset.rpTestimonialsAutoplay) || 6000;

                const goTo = (index) => {
                    current = (index + items.length) % items.length;
                    track.style.transform = `translateX(-${current * 100}%)`;

                    dots.forEach((dot, i) => {
                        dot.classList.toggle('rp-testimonials__dot--active', i === current);
                    });

                    resetAutoplay();
                };

                const resetAutoplay = () => {
                    if (autoplayTimer) clearInterval(autoplayTimer);
                    if (autoplay > 0) {
                        autoplayTimer = setInterval(() => goTo(current + 1), autoplay);
                    }
                };

                // Dot navigation
                dots.forEach((dot, i) => {
                    dot.addEventListener('click', () => goTo(i));
                });

                // Touch/swipe support
                let startX = 0;
                track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
                track.addEventListener('touchend', e => {
                    const diff = startX - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
                }, { passive: true });

                // Pause on hover
                carousel.addEventListener('mouseenter', () => autoplayTimer && clearInterval(autoplayTimer));
                carousel.addEventListener('mouseleave', resetAutoplay);

                resetAutoplay();
            });
        }
    };

    /**
     * FAQ Accordion
     */
    const FAQ = {
        init() {
            document.querySelectorAll('[data-rp-faq]').forEach(container => {
                const items = container.querySelectorAll('[data-rp-faq-item]');
                const allowMultiple = container.dataset.rpFaqMultiple === 'true';

                items.forEach(item => {
                    const trigger = item.querySelector('[data-rp-faq-trigger]');
                    const content = item.querySelector('[data-rp-faq-content]');
                    if (!trigger || !content) return;

                    trigger.addEventListener('click', () => {
                        const isOpen = item.classList.contains('rp-faq__item--open');

                        // Close others if not multiple
                        if (!allowMultiple) {
                            items.forEach(i => {
                                i.classList.remove('rp-faq__item--open');
                                const c = i.querySelector('[data-rp-faq-content]');
                                if (c) c.style.maxHeight = '0';
                                const t = i.querySelector('[data-rp-faq-trigger]');
                                if (t) t.setAttribute('aria-expanded', 'false');
                            });
                        }

                        if (!isOpen) {
                            item.classList.add('rp-faq__item--open');
                            content.style.maxHeight = content.scrollHeight + 'px';
                            trigger.setAttribute('aria-expanded', 'true');
                        } else {
                            item.classList.remove('rp-faq__item--open');
                            content.style.maxHeight = '0';
                            trigger.setAttribute('aria-expanded', 'false');
                        }
                    });
                });
            });
        }
    };

    /**
     * Newsletter Form Handling
     */
    const Newsletter = {
        init() {
            document.querySelectorAll('[data-rp-newsletter-form]').forEach(form => {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const input = form.querySelector('[data-rp-newsletter-input]');
                    const button = form.querySelector('[data-rp-newsletter-submit]');
                    const feedback = form.querySelector('[data-rp-newsletter-feedback]');

                    if (!input || !input.value.trim()) return;

                    const email = input.value.trim();
                    const originalText = button.textContent;

                    // Show loading state
                    button.disabled = true;
                    button.textContent = 'Sending...';

                    // Simulate API call (replace with actual endpoint)
                    try {
                        await new Promise(resolve => setTimeout(resolve, 1500));

                        // Success state
                        input.value = '';
                        button.textContent = 'Subscribed!';
                        if (feedback) {
                            feedback.textContent = 'Thank you for subscribing!';
                            feedback.style.color = '#2d7d46';
                        }

                        setTimeout(() => {
                            button.textContent = originalText;
                            button.disabled = false;
                            if (feedback) feedback.textContent = '';
                        }, 3000);
                    } catch (error) {
                        button.textContent = originalText;
                        button.disabled = false;
                        if (feedback) {
                            feedback.textContent = 'Something went wrong. Please try again.';
                            feedback.style.color = '#b91c1c';
                        }
                    }
                });
            });
        }
    };

    /**
     * Smooth Scroll
     */
    const SmoothScroll = {
        init() {
            document.querySelectorAll('[data-rp-scroll-to]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = trigger.dataset.rpScrollTo;
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    /**
     * Parallax Effect (Subtle)
     */
    const Parallax = {
        elements: [],

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-rp-parallax]').forEach(el => {
                this.elements.push({
                    el,
                    speed: parseFloat(el.dataset.rpParallax) || 0.3
                });
            });

            if (this.elements.length) {
                this.update();
                window.addEventListener('scroll', () => requestAnimationFrame(() => this.update()), { passive: true });
            }
        },

        update() {
            const vh = window.innerHeight;

            this.elements.forEach(({ el, speed }) => {
                const rect = el.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;
                const distance = (elementCenter - vh / 2) / vh;
                const movement = distance * speed * -50;

                el.style.transform = `translate3d(0, ${movement}px, 0)`;
            });
        }
    };

    /**
     * Lazy Load Images
     */
    const LazyLoad = {
        init() {
            const images = document.querySelectorAll('[data-rp-lazy]');
            if (!images.length) return;

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.rpLazy) {
                                img.src = img.dataset.rpLazy;
                                img.removeAttribute('data-rp-lazy');
                            }
                            observer.unobserve(img);
                        }
                    });
                }, { rootMargin: '100px' });

                images.forEach(img => observer.observe(img));
            } else {
                // Fallback for older browsers
                images.forEach(img => {
                    if (img.dataset.rpLazy) {
                        img.src = img.dataset.rpLazy;
                    }
                });
            }
        }
    };

    /**
     * Counter Animation
     */
    const CounterAnimation = {
        init() {
            if (prefersReducedMotion) {
                document.querySelectorAll('[data-rp-counter]').forEach(el => {
                    el.textContent = el.dataset.rpCounter;
                });
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('[data-rp-counter]').forEach(el => observer.observe(el));
        },

        animate(el) {
            const target = parseInt(el.dataset.rpCounter) || 0;
            const duration = parseInt(el.dataset.rpCounterDuration) || 2000;
            const prefix = el.dataset.rpCounterPrefix || '';
            const suffix = el.dataset.rpCounterSuffix || '';
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
                const current = Math.floor(target * easeProgress);

                el.textContent = prefix + current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = prefix + target.toLocaleString() + suffix;
                }
            };

            requestAnimationFrame(update);
        }
    };

    /**
     * Video Background Handler
     */
    const VideoBackground = {
        init() {
            document.querySelectorAll('[data-rp-video-bg]').forEach(video => {
                // Ensure video plays
                video.play().catch(() => {
                    // Autoplay blocked - could show poster or static image
                    const poster = video.getAttribute('poster');
                    if (poster) {
                        const img = document.createElement('img');
                        img.src = poster;
                        img.alt = '';
                        img.style.cssText = video.style.cssText;
                        img.className = video.className;
                        video.parentNode.replaceChild(img, video);
                    }
                });

                // Pause when not visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(() => {});
                        } else {
                            video.pause();
                        }
                    });
                }, { threshold: 0.25 });

                observer.observe(video);
            });
        }
    };

    /**
     * Initialize All Modules
     */
    const init = () => {
        SplitText.init();
        ScrollReveal.init();
        HeroVideo.init();
        TestimonialsCarousel.init();
        FAQ.init();
        Newsletter.init();
        SmoothScroll.init();
        Parallax.init();
        LazyLoad.init();
        CounterAnimation.init();
        VideoBackground.init();
    };

    // DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API
    window.ResellPiacenza = {
        init,
        FAQ,
        TestimonialsCarousel,
        SplitText,
        ScrollReveal
    };
})();
