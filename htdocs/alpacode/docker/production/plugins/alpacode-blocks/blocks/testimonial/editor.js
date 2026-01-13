/**
 * Testimonials Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, RangeControl, ToggleControl, Button } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updateTestimonial = function (index, key, value) {
            const newTestimonials = attributes.testimonials.slice();
            newTestimonials[index] = Object.assign({}, newTestimonials[index], { [key]: value });
            setAttributes({ testimonials: newTestimonials });
        };

        const addTestimonial = function () {
            const newTestimonials = attributes.testimonials.slice();
            newTestimonials.push({
                quote: 'Your testimonial quote here...',
                author: 'Client Name',
                role: 'Position, Company',
                avatar: '',
                rating: 5,
                company: ''
            });
            setAttributes({ testimonials: newTestimonials });
        };

        const removeTestimonial = function (index) {
            const newTestimonials = attributes.testimonials.slice();
            newTestimonials.splice(index, 1);
            setAttributes({ testimonials: newTestimonials });
        };

        const moveTestimonial = function (index, direction) {
            const newTestimonials = attributes.testimonials.slice();
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= newTestimonials.length) return;
            var temp = newTestimonials[index];
            newTestimonials[index] = newTestimonials[newIndex];
            newTestimonials[newIndex] = temp;
            setAttributes({ testimonials: newTestimonials });
        };

        const sectionPanel = el(
            PanelBody,
            { title: 'Section Settings', initialOpen: true },
            el(TextControl, {
                label: 'Eyebrow Text',
                value: attributes.eyebrow,
                onChange: function (value) { setAttributes({ eyebrow: value }); }
            }),
            el(TextControl, {
                label: 'Heading',
                value: attributes.heading,
                onChange: function (value) { setAttributes({ heading: value }); }
            }),
            el(TextareaControl, {
                label: 'Description',
                value: attributes.description,
                onChange: function (value) { setAttributes({ description: value }); },
                rows: 2
            })
        );

        const layoutPanel = el(
            PanelBody,
            { title: 'Layout', initialOpen: false },
            el(SelectControl, {
                label: 'Layout Type',
                value: attributes.layout,
                options: [
                    { label: 'Carousel', value: 'carousel' },
                    { label: 'Infinite Scroll', value: 'infinite' },
                    { label: 'Grid', value: 'grid' }
                ],
                onChange: function (value) { setAttributes({ layout: value }); }
            }),
            attributes.layout === 'grid' && el(RangeControl, {
                label: 'Columns',
                value: attributes.columns,
                onChange: function (value) { setAttributes({ columns: value }); },
                min: 1,
                max: 4
            }),
            el(SelectControl, {
                label: 'Card Style',
                value: attributes.cardStyle,
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Bordered', value: 'bordered' },
                    { label: 'Glass', value: 'glass' },
                    { label: 'Minimal', value: 'minimal' }
                ],
                onChange: function (value) { setAttributes({ cardStyle: value }); }
            })
        );

        const displayPanel = el(
            PanelBody,
            { title: 'Display Options', initialOpen: false },
            el(ToggleControl, {
                label: 'Show Rating Stars',
                checked: attributes.showRating,
                onChange: function (value) { setAttributes({ showRating: value }); }
            }),
            el(ToggleControl, {
                label: 'Show Quote Icon',
                checked: attributes.showQuoteIcon,
                onChange: function (value) { setAttributes({ showQuoteIcon: value }); }
            }),
            (attributes.layout === 'carousel' || attributes.layout === 'infinite') && el(ToggleControl, {
                label: 'Show Fade Edges',
                checked: attributes.showFadeEdges,
                onChange: function (value) { setAttributes({ showFadeEdges: value }); }
            })
        );

        const animationPanel = el(
            PanelBody,
            { title: 'Animation', initialOpen: false },
            attributes.layout === 'carousel' && el(
                Fragment,
                null,
                el(ToggleControl, {
                    label: 'Auto-play',
                    checked: attributes.autoplay,
                    onChange: function (value) { setAttributes({ autoplay: value }); }
                }),
                attributes.autoplay && el(RangeControl, {
                    label: 'Auto-play Speed (ms)',
                    value: attributes.autoplaySpeed,
                    onChange: function (value) { setAttributes({ autoplaySpeed: value }); },
                    min: 2000,
                    max: 10000,
                    step: 500
                }),
                el(ToggleControl, {
                    label: 'Pause on Hover',
                    checked: attributes.pauseOnHover,
                    onChange: function (value) { setAttributes({ pauseOnHover: value }); }
                })
            ),
            attributes.layout === 'infinite' && el(RangeControl, {
                label: 'Scroll Speed (seconds)',
                value: attributes.infiniteSpeed,
                onChange: function (value) { setAttributes({ infiniteSpeed: value }); },
                min: 10,
                max: 60,
                step: 5
            })
        );

        const testimonialPanels = attributes.testimonials.map(function (testimonial, index) {
            return el(
                PanelBody,
                {
                    key: index,
                    title: 'Testimonial ' + (index + 1) + ': ' + (testimonial.author || 'Unnamed'),
                    initialOpen: false
                },
                el(TextareaControl, {
                    label: 'Quote',
                    value: testimonial.quote,
                    onChange: function (value) { updateTestimonial(index, 'quote', value); },
                    rows: 4
                }),
                el(TextControl, {
                    label: 'Author Name',
                    value: testimonial.author,
                    onChange: function (value) { updateTestimonial(index, 'author', value); }
                }),
                el(TextControl, {
                    label: 'Role / Position',
                    value: testimonial.role,
                    onChange: function (value) { updateTestimonial(index, 'role', value); }
                }),
                el(TextControl, {
                    label: 'Company',
                    value: testimonial.company || '',
                    onChange: function (value) { updateTestimonial(index, 'company', value); }
                }),
                el(RangeControl, {
                    label: 'Rating',
                    value: testimonial.rating,
                    onChange: function (value) { updateTestimonial(index, 'rating', value); },
                    min: 1,
                    max: 5
                }),
                el(MediaUploadCheck, null,
                    el(MediaUpload, {
                        onSelect: function (media) { updateTestimonial(index, 'avatar', media.url); },
                        allowedTypes: ['image'],
                        value: testimonial.avatar,
                        render: function (obj) {
                            return el(
                                'div',
                                { style: { marginTop: '12px' } },
                                testimonial.avatar ?
                                    el('div', null,
                                        el('img', {
                                            src: testimonial.avatar,
                                            alt: 'Avatar',
                                            style: { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }
                                        }),
                                        el('div', { style: { marginTop: '8px', display: 'flex', gap: '8px' } },
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: 'secondary',
                                                size: 'small'
                                            }, 'Change'),
                                            el(Button, {
                                                onClick: function () { updateTestimonial(index, 'avatar', ''); },
                                                isDestructive: true,
                                                size: 'small'
                                            }, 'Remove')
                                        )
                                    ) :
                                    el(Button, {
                                        onClick: obj.open,
                                        variant: 'primary'
                                    }, 'Upload Avatar')
                            );
                        }
                    })
                ),
                el('div', { style: { marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                    el(Button, {
                        variant: 'secondary',
                        size: 'small',
                        onClick: function () { moveTestimonial(index, -1); },
                        disabled: index === 0
                    }, '↑ Up'),
                    el(Button, {
                        variant: 'secondary',
                        size: 'small',
                        onClick: function () { moveTestimonial(index, 1); },
                        disabled: index === attributes.testimonials.length - 1
                    }, '↓ Down'),
                    el(Button, {
                        isDestructive: true,
                        size: 'small',
                        onClick: function () { removeTestimonial(index); }
                    }, 'Delete')
                )
            );
        });

        const managePanel = el(
            PanelBody,
            { title: 'Manage Testimonials', initialOpen: true },
            el('p', { style: { color: '#757575', marginBottom: '12px' } },
                attributes.testimonials.length + ' testimonial(s)'
            ),
            el(Button, {
                variant: 'primary',
                onClick: addTestimonial
            }, 'Add Testimonial')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                sectionPanel,
                layoutPanel,
                displayPanel,
                animationPanel,
                managePanel,
                el(Fragment, null, testimonialPanels)
            ),
            el(ServerSideRender, {
                block: 'alpacode/testimonials',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/testimonials');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/testimonials', {
                edit: Edit
            });
        }
    });

})(window.wp);
