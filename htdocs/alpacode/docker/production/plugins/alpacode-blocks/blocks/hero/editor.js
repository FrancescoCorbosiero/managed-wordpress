/**
 * Hero Block - Premium Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const {
        PanelBody,
        TextControl,
        TextareaControl,
        ToggleControl,
        SelectControl,
        RangeControl,
        __experimentalDivider: Divider
    } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                // Content Panel
                el(
                    PanelBody,
                    { title: 'Content', initialOpen: true },
                    el(TextControl, {
                        label: 'Eyebrow Text',
                        help: 'Small text displayed above the heading',
                        value: attributes.eyebrow,
                        onChange: function (value) { setAttributes({ eyebrow: value }); }
                    }),
                    el(TextControl, {
                        label: 'Heading',
                        help: 'Main headline for the hero section',
                        value: attributes.heading,
                        onChange: function (value) { setAttributes({ heading: value }); }
                    }),
                    el(TextareaControl, {
                        label: 'Description',
                        help: 'Supporting text below the heading',
                        value: attributes.description,
                        rows: 3,
                        onChange: function (value) { setAttributes({ description: value }); }
                    }),
                    el(SelectControl, {
                        label: 'Content Alignment',
                        value: attributes.alignment,
                        options: [
                            { label: 'Center', value: 'center' },
                            { label: 'Left', value: 'left' }
                        ],
                        onChange: function (value) { setAttributes({ alignment: value }); }
                    })
                ),
                // Buttons Panel
                el(
                    PanelBody,
                    { title: 'Buttons', initialOpen: false },
                    el(ToggleControl, {
                        label: 'Show Buttons',
                        checked: attributes.showButtons,
                        onChange: function (value) { setAttributes({ showButtons: value }); }
                    }),
                    attributes.showButtons && el(
                        Fragment,
                        null,
                        Divider && el(Divider),
                        el('p', { style: { fontWeight: '600', marginBottom: '8px' } }, 'Primary Button'),
                        el(TextControl, {
                            label: 'Button Text',
                            value: attributes.primaryButtonText,
                            onChange: function (value) { setAttributes({ primaryButtonText: value }); }
                        }),
                        el(TextControl, {
                            label: 'Button URL',
                            type: 'url',
                            value: attributes.primaryButtonUrl,
                            onChange: function (value) { setAttributes({ primaryButtonUrl: value }); }
                        }),
                        Divider && el(Divider),
                        el('p', { style: { fontWeight: '600', marginBottom: '8px' } }, 'Secondary Button'),
                        el(TextControl, {
                            label: 'Button Text',
                            value: attributes.secondaryButtonText,
                            onChange: function (value) { setAttributes({ secondaryButtonText: value }); }
                        }),
                        el(TextControl, {
                            label: 'Button URL',
                            type: 'url',
                            value: attributes.secondaryButtonUrl,
                            onChange: function (value) { setAttributes({ secondaryButtonUrl: value }); }
                        })
                    )
                ),
                // Background Panel
                el(
                    PanelBody,
                    { title: 'Background', initialOpen: false },
                    el(SelectControl, {
                        label: 'Background Type',
                        value: attributes.backgroundType,
                        options: [
                            { label: 'Gradient Orbs', value: 'gradient' },
                            { label: 'Particles', value: 'particles' },
                            { label: 'Video', value: 'video' }
                        ],
                        onChange: function (value) { setAttributes({ backgroundType: value }); }
                    }),
                    attributes.backgroundType === 'particles' && el(RangeControl, {
                        label: 'Particle Density',
                        value: attributes.particleDensity,
                        min: 10,
                        max: 100,
                        step: 5,
                        onChange: function (value) { setAttributes({ particleDensity: value }); }
                    }),
                    attributes.backgroundType === 'video' && el(TextControl, {
                        label: 'Video URL',
                        help: 'Direct link to MP4 video file',
                        type: 'url',
                        value: attributes.videoUrl,
                        onChange: function (value) { setAttributes({ videoUrl: value }); }
                    })
                ),
                // Animation Panel
                el(
                    PanelBody,
                    { title: 'Animations', initialOpen: false },
                    el(ToggleControl, {
                        label: 'Enable Parallax Effect',
                        help: 'Adds depth with scroll-linked movement',
                        checked: attributes.enableParallax,
                        onChange: function (value) { setAttributes({ enableParallax: value }); }
                    }),
                    el(ToggleControl, {
                        label: 'Enable Text Animation',
                        help: 'Word-by-word reveal animation on load',
                        checked: attributes.enableTextAnimation,
                        onChange: function (value) { setAttributes({ enableTextAnimation: value }); }
                    }),
                    el(ToggleControl, {
                        label: 'Show Scroll Indicator',
                        help: 'Animated mouse icon at bottom',
                        checked: attributes.showScrollIndicator,
                        onChange: function (value) { setAttributes({ showScrollIndicator: value }); }
                    })
                )
            ),
            el(ServerSideRender, {
                block: 'alpacode/hero',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/hero');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/hero', {
                edit: Edit
            });
        }
    });

})(window.wp);
