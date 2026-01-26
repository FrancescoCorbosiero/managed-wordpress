/**
 * Logo Carousel Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl, Button } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updateLogo = function (index, key, value) {
            const newLogos = attributes.logos.slice();
            newLogos[index] = Object.assign({}, newLogos[index], { [key]: value });
            setAttributes({ logos: newLogos });
        };

        const addLogo = function () {
            const newLogos = attributes.logos.slice();
            newLogos.push({
                name: 'Company ' + (newLogos.length + 1),
                url: '',
                image: ''
            });
            setAttributes({ logos: newLogos });
        };

        const removeLogo = function (index) {
            const newLogos = attributes.logos.slice();
            newLogos.splice(index, 1);
            setAttributes({ logos: newLogos });
        };

        const moveLogo = function (index, direction) {
            const newLogos = attributes.logos.slice();
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= newLogos.length) return;
            var temp = newLogos[index];
            newLogos[index] = newLogos[newIndex];
            newLogos[newIndex] = temp;
            setAttributes({ logos: newLogos });
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
            })
        );

        const layoutPanel = el(
            PanelBody,
            { title: 'Layout Settings', initialOpen: false },
            el(SelectControl, {
                label: 'Layout',
                value: attributes.layout,
                options: [
                    { label: 'Infinite Scroll', value: 'infinite' },
                    { label: 'Static Row', value: 'static' },
                    { label: 'Grid', value: 'grid' }
                ],
                onChange: function (value) { setAttributes({ layout: value }); }
            }),
            attributes.layout === 'infinite' && el(
                Fragment,
                null,
                el(RangeControl, {
                    label: 'Scroll Speed (seconds)',
                    value: attributes.scrollSpeed,
                    onChange: function (value) { setAttributes({ scrollSpeed: value }); },
                    min: 10,
                    max: 60,
                    step: 5
                }),
                el(SelectControl, {
                    label: 'Scroll Direction',
                    value: attributes.scrollDirection,
                    options: [
                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' }
                    ],
                    onChange: function (value) { setAttributes({ scrollDirection: value }); }
                }),
                el(ToggleControl, {
                    label: 'Pause on Hover',
                    checked: attributes.pauseOnHover,
                    onChange: function (value) { setAttributes({ pauseOnHover: value }); }
                }),
                el(ToggleControl, {
                    label: 'Show Fade Edges',
                    checked: attributes.showFadeEdges,
                    onChange: function (value) { setAttributes({ showFadeEdges: value }); }
                }),
                el(RangeControl, {
                    label: 'Rows',
                    value: attributes.rows,
                    onChange: function (value) { setAttributes({ rows: value }); },
                    min: 1,
                    max: 3
                })
            ),
            attributes.layout === 'grid' && el(RangeControl, {
                label: 'Columns',
                value: attributes.columns,
                onChange: function (value) { setAttributes({ columns: value }); },
                min: 2,
                max: 8
            })
        );

        const stylePanel = el(
            PanelBody,
            { title: 'Style Settings', initialOpen: false },
            el(SelectControl, {
                label: 'Logo Size',
                value: attributes.logoSize,
                options: [
                    { label: 'Small', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Large', value: 'large' }
                ],
                onChange: function (value) { setAttributes({ logoSize: value }); }
            }),
            el(SelectControl, {
                label: 'Variant',
                value: attributes.variant,
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Minimal', value: 'minimal' },
                    { label: 'Bordered', value: 'bordered' }
                ],
                onChange: function (value) { setAttributes({ variant: value }); }
            }),
            el(ToggleControl, {
                label: 'Grayscale Logos',
                checked: attributes.grayscale,
                onChange: function (value) { setAttributes({ grayscale: value }); }
            })
        );

        const logoPanels = attributes.logos.map(function (logo, index) {
            return el(
                PanelBody,
                {
                    key: index,
                    title: 'Logo ' + (index + 1) + ': ' + (logo.name || 'Unnamed'),
                    initialOpen: false
                },
                el(TextControl, {
                    label: 'Company Name',
                    value: logo.name,
                    onChange: function (value) { updateLogo(index, 'name', value); }
                }),
                el(TextControl, {
                    label: 'Link URL (optional)',
                    value: logo.url,
                    onChange: function (value) { updateLogo(index, 'url', value); },
                    type: 'url'
                }),
                el(MediaUploadCheck, null,
                    el(MediaUpload, {
                        onSelect: function (media) { updateLogo(index, 'image', media.url); },
                        allowedTypes: ['image'],
                        value: logo.image,
                        render: function (obj) {
                            return el(
                                'div',
                                { style: { marginTop: '12px' } },
                                logo.image ?
                                    el('div', null,
                                        el('img', {
                                            src: logo.image,
                                            alt: logo.name,
                                            style: { maxWidth: '120px', maxHeight: '60px', objectFit: 'contain', background: '#f0f0f0', padding: '8px', borderRadius: '4px' }
                                        }),
                                        el('div', { style: { marginTop: '8px', display: 'flex', gap: '8px' } },
                                            el(Button, {
                                                onClick: obj.open,
                                                isSecondary: true,
                                                size: 'small'
                                            }, 'Change'),
                                            el(Button, {
                                                onClick: function () { updateLogo(index, 'image', ''); },
                                                isDestructive: true,
                                                size: 'small'
                                            }, 'Remove')
                                        )
                                    ) :
                                    el(Button, {
                                        onClick: obj.open,
                                        isPrimary: true
                                    }, 'Upload Logo')
                            );
                        }
                    })
                ),
                el('div', { style: { marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                    el(Button, {
                        isSecondary: true,
                        size: 'small',
                        onClick: function () { moveLogo(index, -1); },
                        disabled: index === 0
                    }, '↑ Move Up'),
                    el(Button, {
                        isSecondary: true,
                        size: 'small',
                        onClick: function () { moveLogo(index, 1); },
                        disabled: index === attributes.logos.length - 1
                    }, '↓ Move Down'),
                    el(Button, {
                        isDestructive: true,
                        size: 'small',
                        onClick: function () { removeLogo(index); }
                    }, 'Delete')
                )
            );
        });

        const addPanel = el(
            PanelBody,
            { title: 'Manage Logos', initialOpen: true },
            el('p', { style: { color: '#757575', marginBottom: '12px' } },
                attributes.logos.length + ' logo(s) added'
            ),
            el(Button, {
                isPrimary: true,
                onClick: addLogo
            }, 'Add Logo')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                sectionPanel,
                layoutPanel,
                stylePanel,
                addPanel,
                el(Fragment, null, logoPanels)
            ),
            el(ServerSideRender, {
                block: 'alpacode/logos',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/logos');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/logos', {
                edit: Edit
            });
        }
    });

})(window.wp);
