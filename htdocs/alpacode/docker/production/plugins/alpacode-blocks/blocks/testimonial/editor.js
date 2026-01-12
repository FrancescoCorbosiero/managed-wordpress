/**
 * Testimonials Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, Button, RangeControl, ToggleControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updateTestimonial = function (index, key, value) {
            const newTestimonials = attributes.testimonials.slice();
            newTestimonials[index][key] = value;
            setAttributes({ testimonials: newTestimonials });
        };

        const addTestimonial = function () {
            const newTestimonials = attributes.testimonials.slice();
            newTestimonials.push({
                quote: 'Your testimonial here',
                author: 'Author Name',
                role: 'Position, Company',
                avatar: '',
                rating: 5
            });
            setAttributes({ testimonials: newTestimonials });
        };

        const removeTestimonial = function (index) {
            const newTestimonials = attributes.testimonials.slice();
            newTestimonials.splice(index, 1);
            setAttributes({ testimonials: newTestimonials });
        };

        const sectionPanel = el(
            PanelBody,
            { title: 'Section Settings', initialOpen: true },
            el(TextControl, {
                label: 'Section Subtitle',
                value: attributes.sectionSubtitle,
                onChange: function (value) { setAttributes({ sectionSubtitle: value }); }
            }),
            el(TextControl, {
                label: 'Section Title',
                value: attributes.sectionTitle,
                onChange: function (value) { setAttributes({ sectionTitle: value }); }
            }),
            el(ToggleControl, {
                label: 'Auto-play Carousel',
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
            })
        );

        const testimonialPanels = attributes.testimonials.map(function (testimonial, index) {
            return el(
                PanelBody,
                {
                    key: index,
                    title: 'Testimonial ' + (index + 1) + ': ' + testimonial.author,
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
                    min: 1,
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
                                { style: { marginTop: '12px' } },
                                testimonial.avatar ?
                                    el('div', null,
                                        el('img', {
                                            src: testimonial.avatar,
                                            alt: 'Avatar',
                                            style: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }
                                        }),
                                        el('div', { style: { marginTop: '8px' } },
                                            el(Button, {
                                                onClick: obj.open,
                                                isSecondary: true
                                            }, 'Change Avatar'),
                                            el(Button, {
                                                onClick: function () { updateTestimonial(index, 'avatar', ''); },
                                                isDestructive: true,
                                                style: { marginLeft: '8px' }
                                            }, 'Remove')
                                        )
                                    ) :
                                    el(Button, {
                                        onClick: obj.open,
                                        isPrimary: true
                                    }, 'Upload Avatar')
                            );
                        }
                    })
                ),
                el('hr', { style: { margin: '20px 0' } }),
                el(Button, {
                    isDestructive: true,
                    onClick: function () { removeTestimonial(index); }
                }, 'Remove Testimonial')
            );
        });

        const addPanel = el(
            PanelBody,
            { title: 'Add New', initialOpen: false },
            el(Button, {
                isPrimary: true,
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
                el(Fragment, null, testimonialPanels),
                addPanel
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