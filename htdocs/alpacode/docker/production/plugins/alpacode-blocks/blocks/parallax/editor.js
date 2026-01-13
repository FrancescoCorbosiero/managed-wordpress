/**
 * Parallax Section Block - Editor Script
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

        const contentPanel = el(
            PanelBody,
            { title: 'Content', initialOpen: true },
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
                rows: 3
            }),
            el(ToggleControl, {
                label: 'Show Button',
                checked: attributes.showButton,
                onChange: function (value) { setAttributes({ showButton: value }); }
            }),
            attributes.showButton && el(
                Fragment,
                null,
                el(TextControl, {
                    label: 'Button Text',
                    value: attributes.buttonText,
                    onChange: function (value) { setAttributes({ buttonText: value }); }
                }),
                el(TextControl, {
                    label: 'Button URL',
                    value: attributes.buttonUrl,
                    onChange: function (value) { setAttributes({ buttonUrl: value }); },
                    type: 'url'
                })
            )
        );

        const backgroundPanel = el(
            PanelBody,
            { title: 'Background', initialOpen: false },
            el(MediaUploadCheck, null,
                el(MediaUpload, {
                    onSelect: function (media) { setAttributes({ backgroundImage: media.url }); },
                    allowedTypes: ['image'],
                    value: attributes.backgroundImage,
                    render: function (obj) {
                        return el(
                            'div',
                            { style: { marginBottom: '16px' } },
                            attributes.backgroundImage ?
                                el('div', null,
                                    el('img', {
                                        src: attributes.backgroundImage,
                                        alt: 'Background',
                                        style: { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }
                                    }),
                                    el('div', { style: { marginTop: '8px', display: 'flex', gap: '8px' } },
                                        el(Button, {
                                            onClick: obj.open,
                                            isSecondary: true
                                        }, 'Change Image'),
                                        el(Button, {
                                            onClick: function () { setAttributes({ backgroundImage: '' }); },
                                            isDestructive: true
                                        }, 'Remove')
                                    )
                                ) :
                                el(Button, {
                                    onClick: obj.open,
                                    isPrimary: true
                                }, 'Select Background Image')
                        );
                    }
                })
            ),
            el(SelectControl, {
                label: 'Background Position',
                value: attributes.backgroundPosition,
                options: [
                    { label: 'Top Left', value: 'top left' },
                    { label: 'Top Center', value: 'top center' },
                    { label: 'Top Right', value: 'top right' },
                    { label: 'Center Left', value: 'center left' },
                    { label: 'Center', value: 'center center' },
                    { label: 'Center Right', value: 'center right' },
                    { label: 'Bottom Left', value: 'bottom left' },
                    { label: 'Bottom Center', value: 'bottom center' },
                    { label: 'Bottom Right', value: 'bottom right' }
                ],
                onChange: function (value) { setAttributes({ backgroundPosition: value }); }
            }),
            el(RangeControl, {
                label: 'Overlay Opacity (%)',
                value: attributes.overlayOpacity,
                onChange: function (value) { setAttributes({ overlayOpacity: value }); },
                min: 0,
                max: 100,
                step: 5
            })
        );

        const parallaxPanel = el(
            PanelBody,
            { title: 'Parallax Settings', initialOpen: false },
            el(ToggleControl, {
                label: 'Enable Parallax Effect',
                checked: attributes.enableParallax,
                onChange: function (value) { setAttributes({ enableParallax: value }); }
            }),
            attributes.enableParallax && el(RangeControl, {
                label: 'Parallax Speed',
                help: 'Lower = slower parallax effect',
                value: attributes.parallaxSpeed,
                onChange: function (value) { setAttributes({ parallaxSpeed: value }); },
                min: 0.1,
                max: 1,
                step: 0.1
            }),
            el(ToggleControl, {
                label: 'Enable Zoom on Hover',
                checked: attributes.enableZoom,
                onChange: function (value) { setAttributes({ enableZoom: value }); }
            })
        );

        const layoutPanel = el(
            PanelBody,
            { title: 'Layout', initialOpen: false },
            el(SelectControl, {
                label: 'Variant',
                value: attributes.variant,
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Fullscreen', value: 'fullscreen' },
                    { label: 'Split', value: 'split' },
                    { label: 'Minimal', value: 'minimal' }
                ],
                onChange: function (value) { setAttributes({ variant: value }); }
            }),
            el(RangeControl, {
                label: 'Minimum Height (px)',
                value: attributes.minHeight,
                onChange: function (value) { setAttributes({ minHeight: value }); },
                min: 200,
                max: 1000,
                step: 50
            }),
            el(SelectControl, {
                label: 'Content Alignment',
                value: attributes.contentAlignment,
                options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' }
                ],
                onChange: function (value) { setAttributes({ contentAlignment: value }); }
            }),
            el(SelectControl, {
                label: 'Vertical Alignment',
                value: attributes.verticalAlignment,
                options: [
                    { label: 'Top', value: 'top' },
                    { label: 'Center', value: 'center' },
                    { label: 'Bottom', value: 'bottom' }
                ],
                onChange: function (value) { setAttributes({ verticalAlignment: value }); }
            })
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                contentPanel,
                backgroundPanel,
                parallaxPanel,
                layoutPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/parallax',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/parallax');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/parallax', {
                edit: Edit
            });
        }
    });

})(window.wp);
