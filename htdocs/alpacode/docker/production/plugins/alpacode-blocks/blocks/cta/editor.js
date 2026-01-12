/**
 * CTA Block - Premium Editor Script
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
        SelectControl
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
                        help: 'Small text above the heading',
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
                        rows: 3,
                        onChange: function (value) { setAttributes({ description: value }); }
                    })
                ),
                // Buttons Panel
                el(
                    PanelBody,
                    { title: 'Buttons', initialOpen: false },
                    el('p', { style: { fontWeight: '600', marginBottom: '8px' } }, 'Primary Button'),
                    el(TextControl, {
                        label: 'Button Text',
                        value: attributes.buttonText,
                        onChange: function (value) { setAttributes({ buttonText: value }); }
                    }),
                    el(TextControl, {
                        label: 'Button URL',
                        type: 'url',
                        value: attributes.buttonUrl,
                        onChange: function (value) { setAttributes({ buttonUrl: value }); }
                    }),
                    el('p', { style: { fontWeight: '600', marginBottom: '8px', marginTop: '16px' } }, 'Secondary Button (Optional)'),
                    el(TextControl, {
                        label: 'Button Text',
                        value: attributes.secondaryButtonText,
                        onChange: function (value) { setAttributes({ secondaryButtonText: value }); }
                    }),
                    attributes.secondaryButtonText && el(TextControl, {
                        label: 'Button URL',
                        type: 'url',
                        value: attributes.secondaryButtonUrl,
                        onChange: function (value) { setAttributes({ secondaryButtonUrl: value }); }
                    })
                ),
                // Style Panel
                el(
                    PanelBody,
                    { title: 'Style', initialOpen: false },
                    el(SelectControl, {
                        label: 'Variant',
                        value: attributes.variant,
                        options: [
                            { label: 'Gradient (Default)', value: 'gradient' },
                            { label: 'Glow', value: 'glow' },
                            { label: 'Default', value: 'default' },
                            { label: 'Minimal', value: 'minimal' }
                        ],
                        onChange: function (value) { setAttributes({ variant: value }); }
                    })
                ),
                // Animation Panel
                el(
                    PanelBody,
                    { title: 'Animations', initialOpen: false },
                    el(ToggleControl, {
                        label: 'Animated Gradient Background',
                        help: 'Floating gradient orbs animation',
                        checked: attributes.enableAnimatedGradient,
                        onChange: function (value) { setAttributes({ enableAnimatedGradient: value }); }
                    }),
                    el(ToggleControl, {
                        label: 'Glow Effect',
                        help: 'Pulsing glow behind content',
                        checked: attributes.enableGlow,
                        onChange: function (value) { setAttributes({ enableGlow: value }); }
                    }),
                    el(ToggleControl, {
                        label: 'Text Scramble Effect',
                        help: 'Typewriter-style text reveal on heading',
                        checked: attributes.enableTextScramble,
                        onChange: function (value) { setAttributes({ enableTextScramble: value }); }
                    })
                )
            ),
            el(ServerSideRender, {
                block: 'alpacode/cta',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/cta');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/cta', {
                edit: Edit
            });
        }
    });

})(window.wp);
