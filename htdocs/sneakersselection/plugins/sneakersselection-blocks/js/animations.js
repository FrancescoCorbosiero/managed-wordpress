/**
 * Sneaker Selection Blocks - Premium Animation Library
 * High-end animations for luxury sneaker e-commerce
 */

(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Split Text Animation - Character by character reveals
     */
    const SplitText = {
        init() {
            document.querySelectorAll('[data-ss-split]').forEach(el => {
                if (el.dataset.ssSplitProcessed) return;

                const type = el.dataset.ssSplit || 'chars';
                const text = el.textContent.trim();

                if (type === 'chars') {
                    el.innerHTML = text.split('').map((char, i) =>
                        char === ' '
                            ? '<span class="ss-char ss-char--space">&nbsp;</span>'
                            : `<span class="ss-char" style="--char-index: ${i}; --char-total: ${text.replace(/\s/g, '').length}">${char}</span>`
                    ).join('');
                } else if (type === 'words') {
                    el.innerHTML = text.split(/\s+/).map((word, i, arr) =>
                        `<span class="ss-word" style="--word-index: ${i}; --word-total: ${arr.length}">${word}</span>`
                    ).join(' ');
                }

                el.dataset.ssSplitProcessed = 'true';
            });
        }
    };

    /**
     * Magnetic Cursor - Elements attracted to mouse
     */
    const MagneticCursor = {
        init() {
            if (prefersReducedMotion || 'ontouchstart' in window) return;

            document.querySelectorAll('[data-ss-magnetic]').forEach(el => {
                const strength = parseFloat(el.dataset.ssMagnetic) || 0.3;
                let bounds;

                el.addEventListener('mouseenter', () => {
                    bounds = el.getBoundingClientRect();
                    el.style.transition = 'transform 0.1s ease-out';
                });

                el.addEventListener('mousemove', (e) => {
                    const x = e.clientX - bounds.left - bounds.width / 2;
                    const y = e.clientY - bounds.top - bounds.height / 2;
                    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transition = 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
                    el.style.transform = 'translate(0, 0)';
                });
            });
        }
    };

    /**
     * Depth Parallax - Multi-layer scroll parallax
     */
    const DepthParallax = {
        layers: [],

        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-ss-depth]').forEach(el => {
                this.layers.push({
                    el,
                    depth: parseFloat(el.dataset.ssDepth) || 0.5,
                    direction: el.dataset.ssDepthDir || 'y'
                });
            });

            if (this.layers.length) {
                this.update();
                window.addEventListener('scroll', () => requestAnimationFrame(() => this.update()), { passive: true });
            }

            // Mouse parallax for containers
            document.querySelectorAll('[data-ss-mouse-parallax]').forEach(container => {
                const layers = container.querySelectorAll('[data-ss-mouse-layer]');

                container.addEventListener('mousemove', (e) => {
                    const rect = container.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    layers.forEach(layer => {
                        const depth = parseFloat(layer.dataset.ssMouseLayer) || 30;
                        const rotateX = y * depth * 0.1;
                        const rotateY = -x * depth * 0.1;
                        layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    });
                });

                container.addEventListener('mouseleave', () => {
                    layers.forEach(layer => {
                        layer.style.transition = 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
                        layer.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
                        setTimeout(() => layer.style.transition = '', 600);
                    });
                });
            });
        },

        update() {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;

            this.layers.forEach(({ el, depth, direction }) => {
                const rect = el.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;
                const distance = (elementCenter - vh / 2) / vh;
                const movement = distance * depth * -100;

                if (direction === 'x') {
                    el.style.transform = `translate3d(${movement}px, 0, 0)`;
                } else {
                    el.style.transform = `translate3d(0, ${movement}px, 0)`;
                }
            });
        }
    };

    /**
     * Scroll Reveal with Premium Animations
     */
    const ScrollReveal = {
        init() {
            const elements = document.querySelectorAll('[data-ss-reveal]');
            if (!elements.length) return;

            if (prefersReducedMotion) {
                elements.forEach(el => el.classList.add('ss-revealed'));
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(entry.target.dataset.ssRevealDelay) || 0;
                        setTimeout(() => entry.target.classList.add('ss-revealed'), delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

            elements.forEach(el => observer.observe(el));
        }
    };

    /**
     * Premium Countdown with Flip Animation
     */
    const CountdownTimer = {
        init() {
            document.querySelectorAll('[data-ss-countdown]').forEach(el => {
                const targetDate = new Date(el.dataset.ssCountdown).getTime();
                if (isNaN(targetDate)) return;

                this.update(el, targetDate);
                const interval = setInterval(() => {
                    if (this.update(el, targetDate) <= 0) {
                        clearInterval(interval);
                        this.handleExpired(el);
                    }
                }, 1000);
            });
        },

        update(el, targetDate) {
            const remaining = targetDate - Date.now();
            if (remaining <= 0) return remaining;

            const units = {
                days: Math.floor(remaining / 86400000),
                hours: Math.floor((remaining % 86400000) / 3600000),
                minutes: Math.floor((remaining % 3600000) / 60000),
                seconds: Math.floor((remaining % 60000) / 1000)
            };

            Object.entries(units).forEach(([unit, value]) => {
                const digitEl = el.querySelector(`[data-ss-countdown-${unit}]`);
                if (!digitEl) return;

                const newVal = String(value).padStart(2, '0');
                if (digitEl.textContent !== newVal) {
                    digitEl.classList.add('ss-digit-flip');
                    setTimeout(() => {
                        digitEl.textContent = newVal;
                        digitEl.classList.remove('ss-digit-flip');
                    }, 200);
                }
            });

            return remaining;
        },

        handleExpired(el) {
            el.innerHTML = `<div class="ss-countdown__expired">${el.dataset.ssCountdownExpired || 'AVAILABLE NOW'}</div>`;
            el.classList.add('ss-countdown--expired');
        }
    };

    /**
     * Social Proof Popup Notifications
     */
    const SocialProof = {
        notifications: [],
        currentIndex: 0,
        container: null,

        init() {
            this.container = document.querySelector('[data-ss-social-proof]');
            if (!this.container) return;

            try {
                this.notifications = JSON.parse(this.container.dataset.ssSocialProofItems || '[]');
            } catch (e) { return; }

            if (!this.notifications.length) return;

            const interval = parseInt(this.container.dataset.ssSocialProofInterval) || 8000;
            const delay = parseInt(this.container.dataset.ssSocialProofDelay) || 5000;

            // Close button
            this.container.querySelector('[data-ss-social-proof-close]')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hide();
            });

            // Start showing notifications
            setTimeout(() => {
                this.show();
                setInterval(() => this.show(), interval);
            }, delay);
        },

        show() {
            const n = this.notifications[this.currentIndex];
            this.currentIndex = (this.currentIndex + 1) % this.notifications.length;

            const els = {
                product: this.container.querySelector('[data-ss-social-proof-product]'),
                time: this.container.querySelector('[data-ss-social-proof-time]'),
                location: this.container.querySelector('[data-ss-social-proof-location]'),
                image: this.container.querySelector('[data-ss-social-proof-image]')
            };

            if (els.product) els.product.textContent = n.product;
            if (els.time) els.time.textContent = n.time;
            if (els.location) els.location.textContent = n.location || '';
            if (els.image && n.image) {
                els.image.src = n.image;
                els.image.alt = n.product;
            }

            this.container.classList.add('ss-social-proof--visible');
            setTimeout(() => this.hide(), 5500);
        },

        hide() {
            this.container.classList.remove('ss-social-proof--visible');
        }
    };

    /**
     * Smooth Marquee
     */
    const Marquee = {
        init() {
            document.querySelectorAll('[data-ss-marquee]').forEach(container => {
                const track = container.querySelector('[data-ss-marquee-track]');
                if (!track) return;

                const clone = track.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                container.appendChild(clone);

                const speed = parseInt(container.dataset.ssMarqueeSpeed) || 50;
                const dir = container.dataset.ssMarqueeDirection === 'right' ? 'reverse' : 'normal';
                const duration = track.scrollWidth / speed;

                [track, clone].forEach(t => {
                    t.style.animation = `ss-marquee-scroll ${duration}s linear infinite ${dir}`;
                });

                if (container.dataset.ssMarqueePause !== 'false') {
                    container.addEventListener('mouseenter', () => {
                        [track, clone].forEach(t => t.style.animationPlayState = 'paused');
                    });
                    container.addEventListener('mouseleave', () => {
                        [track, clone].forEach(t => t.style.animationPlayState = 'running');
                    });
                }
            });

            if (!document.getElementById('ss-marquee-keyframes')) {
                const style = document.createElement('style');
                style.id = 'ss-marquee-keyframes';
                style.textContent = `@keyframes ss-marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }`;
                document.head.appendChild(style);
            }
        }
    };

    /**
     * Modal System
     */
    const Modal = {
        init() {
            document.querySelectorAll('[data-ss-modal-trigger]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open(trigger.dataset.ssModalTrigger);
                });
            });

            document.querySelectorAll('[data-ss-modal-close]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const modal = btn.closest('[data-ss-modal]');
                    if (modal) this.close(modal.dataset.ssModal);
                });
            });

            document.querySelectorAll('[data-ss-modal]').forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) this.close(modal.dataset.ssModal);
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const open = document.querySelector('[data-ss-modal].ss-modal--open');
                    if (open) this.close(open.dataset.ssModal);
                }
            });
        },

        open(id) {
            const modal = document.querySelector(`[data-ss-modal="${id}"]`);
            if (!modal) return;
            modal.classList.add('ss-modal--open');
            document.body.style.overflow = 'hidden';
        },

        close(id) {
            const modal = document.querySelector(`[data-ss-modal="${id}"]`);
            if (!modal) return;
            modal.classList.remove('ss-modal--open');
            document.body.style.overflow = '';
        }
    };

    /**
     * FAQ Accordion
     */
    const FAQ = {
        init() {
            document.querySelectorAll('[data-ss-faq]').forEach(container => {
                const items = container.querySelectorAll('[data-ss-faq-item]');

                items.forEach(item => {
                    const trigger = item.querySelector('[data-ss-faq-trigger]');
                    const content = item.querySelector('[data-ss-faq-content]');
                    if (!trigger || !content) return;

                    trigger.addEventListener('click', () => {
                        const isOpen = item.classList.contains('ss-faq__item--open');

                        // Close others
                        if (container.dataset.ssFaqMultiple !== 'true') {
                            items.forEach(i => {
                                i.classList.remove('ss-faq__item--open');
                                const c = i.querySelector('[data-ss-faq-content]');
                                if (c) c.style.maxHeight = '0';
                            });
                        }

                        if (!isOpen) {
                            item.classList.add('ss-faq__item--open');
                            content.style.maxHeight = content.scrollHeight + 'px';
                        } else {
                            item.classList.remove('ss-faq__item--open');
                            content.style.maxHeight = '0';
                        }
                    });
                });
            });
        }
    };

    /**
     * Hero Carousel with Crossfade
     */
    const HeroCarousel = {
        init() {
            document.querySelectorAll('[data-ss-hero-carousel]').forEach(carousel => {
                const slides = carousel.querySelectorAll('[data-ss-hero-slide]');
                const dots = carousel.querySelector('[data-ss-hero-dots]');
                const prev = carousel.querySelector('[data-ss-hero-prev]');
                const next = carousel.querySelector('[data-ss-hero-next]');

                if (slides.length < 2) return;

                let current = 0;
                let timer = null;
                const autoplay = parseInt(carousel.dataset.ssHeroAutoplay) || 6000;

                const goTo = (index) => {
                    slides[current].classList.remove('ss-hero-slide--active');
                    current = (index + slides.length) % slides.length;
                    slides[current].classList.add('ss-hero-slide--active');

                    if (dots) {
                        dots.querySelectorAll('button').forEach((d, i) => {
                            d.classList.toggle('ss-hero-dot--active', i === current);
                        });
                    }

                    resetTimer();
                };

                const resetTimer = () => {
                    if (timer) clearInterval(timer);
                    if (autoplay > 0) timer = setInterval(() => goTo(current + 1), autoplay);
                };

                // Create dots
                if (dots) {
                    slides.forEach((_, i) => {
                        const btn = document.createElement('button');
                        btn.className = 'ss-hero-dot' + (i === 0 ? ' ss-hero-dot--active' : '');
                        btn.setAttribute('aria-label', `Slide ${i + 1}`);
                        btn.addEventListener('click', () => goTo(i));
                        dots.appendChild(btn);
                    });
                }

                if (prev) prev.addEventListener('click', () => goTo(current - 1));
                if (next) next.addEventListener('click', () => goTo(current + 1));

                // Touch
                let startX = 0;
                carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
                carousel.addEventListener('touchend', e => {
                    const diff = startX - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
                }, { passive: true });

                // Pause on hover
                carousel.addEventListener('mouseenter', () => timer && clearInterval(timer));
                carousel.addEventListener('mouseleave', resetTimer);

                slides[0].classList.add('ss-hero-slide--active');
                resetTimer();
            });
        }
    };

    /**
     * Size Selector
     */
    const SizeSelector = {
        init() {
            document.querySelectorAll('[data-ss-size-selector]').forEach(container => {
                const sizes = container.querySelectorAll('[data-ss-size]');
                const display = container.querySelector('[data-ss-size-selected]');

                sizes.forEach(size => {
                    if (size.classList.contains('ss-size--unavailable')) return;

                    size.addEventListener('click', () => {
                        sizes.forEach(s => s.classList.remove('ss-size--selected'));
                        size.classList.add('ss-size--selected');
                        if (display) display.textContent = size.dataset.ssSize;
                    });
                });
            });
        }
    };

    /**
     * Image Reveal Effect
     */
    const ImageReveal = {
        init() {
            if (prefersReducedMotion) return;

            document.querySelectorAll('[data-ss-image-reveal]').forEach(el => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('ss-image-revealed');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2 });

                observer.observe(el);
            });
        }
    };

    /**
     * Initialize
     */
    const init = () => {
        SplitText.init();
        MagneticCursor.init();
        DepthParallax.init();
        ScrollReveal.init();
        CountdownTimer.init();
        SocialProof.init();
        Marquee.init();
        Modal.init();
        FAQ.init();
        HeroCarousel.init();
        SizeSelector.init();
        ImageReveal.init();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.SneakerSelection = { init, Modal, SocialProof };
})();
