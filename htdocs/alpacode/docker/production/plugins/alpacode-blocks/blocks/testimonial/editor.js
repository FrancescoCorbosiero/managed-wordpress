/**
 * Testimonials Block - Premium Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    var InspectorControls = wp.blockEditor.InspectorControls;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;

    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;
    var RangeControl = wp.components.RangeControl;
    var ToggleControl = wp.components.ToggleControl;
    var SelectControl = wp.components.SelectControl;

    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var ServerSideRender = wp.serverSideRender;

    var Edit = function (props) {
        var attributes = props.attributes;
        var setAttributes = props.setAttributes;
        var blockProps = useBlockProps();

        var updateTestimonial = function (index, key, value) {
            var newTestimonials = attributes.testimonials.map(function (item, i) {
                if (i === index) {
                    var updated = {};
                    for (var k in item) {
                        updated[k] = item[k];
                    }
                    updated[key] = value;
                    return updated;
                }
                return item;
            });
            setAttributes({ testimonials: newTestimonials });
        };

        var addTestimonial = function () {
            var newTestimonials = attributes.testimonials.slice();
            newTestimonials.push({
                quote: 'Enter testimonial quote here...',
                author: 'Client Name',
                role: 'Position, Company',
                avatar: '',
                rating: 5,
                company: ''
            });
            setAttributes({ testimonials: newTestimonials });
        };

        var removeTestimonial = function (index) {
            var newTestimonials = attributes.testimonials.filter(function (_, i) {
                return i !== index;
            });
            setAttributes({ testimonials: newTestimonials });
        };

        var moveTestimonial = function (index, direction) {
            var newTestimonials = attributes.testimonials.slice();
            var newIndex = index + direction;
            if (newIndex < 0 || newIndex >= newTestimonials.length) return;

            var temp = newTestimonials[index];
            newTestimonials[index] = newTestimonials[newIndex];
            newTestimonials[newIndex] = temp;
            setAttributes({ testimonials: newTestimonials });
        };

        // Header Panel
        var headerPanel = el(
            PanelBody,
            { title: 'Header', initialOpen: true },
            el(TextControl, {
                label: 'Eyebrow',
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
                rows: 2,
                onChange: function (value) { setAttributes({ description: value }); }
            })
        );

        // Layout Panel
        var layoutPanel = el(
            PanelBody,
            { title: 'Layout', initialOpen: false },
            el(SelectControl, {
                label: 'Layout Style',
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
                max: 4,
                step: 1
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
            }),
            el(ToggleControl, {
                label: 'Show Rating Stars',
                checked: attributes.showRating,
                onChange: function (value) { setAttributes({ showRating: value }); }
            }),
            el(ToggleControl, {
                label: 'Show Quote Icon',
                checked: attributes.showQuoteIcon,
                onChange: function (value) { setAttributes({ showQuoteIcon: value }); }
            })
        );

        // Animation Panel
        var animationPanel = el(
            PanelBody,
            { title: 'Animation', initialOpen: false },
            attributes.layout !== 'grid' && el(ToggleControl, {
                label: 'Fade Edges',
                checked: attributes.showFadeEdges,
                onChange: function (value) { setAttributes({ showFadeEdges: value }); }
            }),
            attributes.layout !== 'grid' && el(ToggleControl, {
                label: 'Pause on Hover',
                checked: attributes.pauseOnHover,
                onChange: function (value) { setAttributes({ pauseOnHover: value }); }
            }),
            attributes.layout === 'carousel' && el(ToggleControl, {
                label: 'Auto-play',
                checked: attributes.autoplay,
                onChange: function (value) { setAttributes({ autoplay: value }); }
            }),
            attributes.layout === 'carousel' && attributes.autoplay && el(RangeControl, {
                label: 'Auto-play Speed (ms)',
                value: attributes.autoplaySpeed,
                onChange: function (value) { setAttributes({ autoplaySpeed: value }); },
                min: 2000,
                max: 10000,
                step: 500
            }),
            attributes.layout === 'infinite' && el(RangeControl, {
                label: 'Scroll Speed (seconds)',
                help: 'Time for one complete cycle',
                value: attributes.infiniteSpeed,
                onChange: function (value) { setAttributes({ infiniteSpeed: value }); },
                min: 10,
                max: 60,
                step: 5
            })
        );

        // Testimonials Panel
        var testimonialPanels = attributes.testimonials.map(function (testimonial, index) {
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
                    label: 'Role & Company',
                    value: testimonial.role,
                    onChange: function (value) { updateTestimonial(index, 'role', value); }
                }),
                el(RangeControl, {
                    label: 'Rating',
                    value: testimonial.rating,
                    onChange: function (value) { updateTestimonial(index, 'rating', value); },
                    min: 0,
                    max: 5,
                    step: 1
                }),
                el(MediaUploadCheck, null,
                    el(MediaUpload, {
                        onSelect: function (media) { updateTestimonial(index, 'avatar', media.url); },
                        allowedTypes: ['image'],
                        value: testimonial.avatar,
                        render: function (obj) {
                            return el(
                                'div',
                                { style: { marginTop: '12px', marginBottom: '12px' } },
                                testimonial.avatar ?
                                    el('div', null,
                                        el('img', {
                                            src: testimonial.avatar,
                                            alt: 'Avatar',
                                            style: {
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                marginBottom: '8px',
                                                display: 'block'
                                            }
                                        }),
                                        el('div', { style: { display: 'flex', gap: '8px' } },
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
                                        variant: 'secondary'
                                    }, 'Upload Avatar')
                            );
                        }
                    })
                ),
                el('div', {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid #e0e0e0'
                    }
                },
                    el('div', { style: { display: 'flex', gap: '4px' } },
                        el(Button, {
                            icon: 'arrow-up-alt2',
                            label: 'Move Up',
                            onClick: function () { moveTestimonial(index, -1); },
                            disabled: index === 0,
                            size: 'small'
                        }),
                        el(Button, {
                            icon: 'arrow-down-alt2',
                            label: 'Move Down',
                            onClick: function () { moveTestimonial(index, 1); },
                            disabled: index === attributes.testimonials.length - 1,
                            size: 'small'
                        })
                    ),
                    el(Button, {
                        isDestructive: true,
                        size: 'small',
                        onClick: function () { removeTestimonial(index); }
                    }, 'Remove')
                )
            );
        });

        // Add Testimonial Panel
        var addPanel = el(
            PanelBody,
            { title: 'Testimonials (' + attributes.testimonials.length + ')', initialOpen: false },
            el(Fragment, null, testimonialPanels),
            el(Button, {
                variant: 'primary',
                onClick: addTestimonial,
                style: { marginTop: '12px', width: '100%', justifyContent: 'center' }
            }, '+ Add Testimonial')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                headerPanel,
                layoutPanel,
                animationPanel,
                addPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/testimonials',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        var blockSettings = wp.blocks.getBlockType('alpacode/testimonials');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/testimonials', {
                edit: Edit
            });
        }
    });

})(window.wp);
