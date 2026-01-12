/**
 * Logo Carousel Block - Premium Editor Script
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

        var updateLogo = function (index, key, value) {
            var newLogos = attributes.logos.map(function (item, i) {
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
            setAttributes({ logos: newLogos });
        };

        var addLogo = function () {
            var newLogos = attributes.logos.slice();
            newLogos.push({
                name: 'Company Name',
                url: '',
                image: ''
            });
            setAttributes({ logos: newLogos });
        };

        var removeLogo = function (index) {
            var newLogos = attributes.logos.filter(function (_, i) {
                return i !== index;
            });
            setAttributes({ logos: newLogos });
        };

        var moveLogo = function (index, direction) {
            var newLogos = attributes.logos.slice();
            var newIndex = index + direction;
            if (newIndex < 0 || newIndex >= newLogos.length) return;

            var temp = newLogos[index];
            newLogos[index] = newLogos[newIndex];
            newLogos[newIndex] = temp;
            setAttributes({ logos: newLogos });
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
                    { label: 'Infinite Scroll', value: 'infinite' },
                    { label: 'Static Row', value: 'static' },
                    { label: 'Grid', value: 'grid' }
                ],
                onChange: function (value) { setAttributes({ layout: value }); }
            }),
            attributes.layout === 'grid' && el(RangeControl, {
                label: 'Columns',
                value: attributes.columns,
                onChange: function (value) { setAttributes({ columns: value }); },
                min: 2,
                max: 6,
                step: 1
            }),
            attributes.layout === 'infinite' && el(RangeControl, {
                label: 'Rows',
                value: attributes.rows,
                onChange: function (value) { setAttributes({ rows: value }); },
                min: 1,
                max: 3,
                step: 1
            }),
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
                label: 'Style Variant',
                value: attributes.variant,
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Minimal', value: 'minimal' },
                    { label: 'Bordered', value: 'bordered' }
                ],
                onChange: function (value) { setAttributes({ variant: value }); }
            })
        );

        // Animation Panel
        var animationPanel = el(
            PanelBody,
            { title: 'Animation', initialOpen: false },
            attributes.layout === 'infinite' && el(RangeControl, {
                label: 'Scroll Speed (seconds)',
                help: 'Time for one complete cycle',
                value: attributes.scrollSpeed,
                onChange: function (value) { setAttributes({ scrollSpeed: value }); },
                min: 10,
                max: 60,
                step: 5
            }),
            attributes.layout === 'infinite' && el(SelectControl, {
                label: 'Scroll Direction',
                value: attributes.scrollDirection,
                options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' }
                ],
                onChange: function (value) { setAttributes({ scrollDirection: value }); }
            }),
            attributes.layout === 'infinite' && el(ToggleControl, {
                label: 'Pause on Hover',
                checked: attributes.pauseOnHover,
                onChange: function (value) { setAttributes({ pauseOnHover: value }); }
            }),
            attributes.layout === 'infinite' && el(ToggleControl, {
                label: 'Fade Edges',
                checked: attributes.showFadeEdges,
                onChange: function (value) { setAttributes({ showFadeEdges: value }); }
            }),
            el(ToggleControl, {
                label: 'Grayscale Effect',
                help: 'Logos become colored on hover',
                checked: attributes.grayscale,
                onChange: function (value) { setAttributes({ grayscale: value }); }
            })
        );

        // Logos Panel
        var logoPanels = attributes.logos.map(function (logo, index) {
            return el(
                'div',
                {
                    key: index,
                    style: {
                        marginBottom: '16px',
                        padding: '12px',
                        background: '#f0f0f0',
                        borderRadius: '8px'
                    }
                },
                el(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px'
                        }
                    },
                    el('strong', null, 'Logo ' + (index + 1)),
                    el(
                        'div',
                        { style: { display: 'flex', gap: '4px' } },
                        el(Button, {
                            icon: 'arrow-up-alt2',
                            label: 'Move Up',
                            onClick: function () { moveLogo(index, -1); },
                            disabled: index === 0,
                            size: 'small'
                        }),
                        el(Button, {
                            icon: 'arrow-down-alt2',
                            label: 'Move Down',
                            onClick: function () { moveLogo(index, 1); },
                            disabled: index === attributes.logos.length - 1,
                            size: 'small'
                        }),
                        el(Button, {
                            icon: 'trash',
                            label: 'Remove',
                            onClick: function () { removeLogo(index); },
                            isDestructive: true,
                            size: 'small'
                        })
                    )
                ),
                el(MediaUploadCheck, null,
                    el(MediaUpload, {
                        onSelect: function (media) { updateLogo(index, 'image', media.url); },
                        allowedTypes: ['image'],
                        value: logo.image,
                        render: function (obj) {
                            return el(
                                'div',
                                { style: { marginBottom: '12px' } },
                                logo.image ?
                                    el('div', null,
                                        el('img', {
                                            src: logo.image,
                                            alt: logo.name,
                                            style: {
                                                maxWidth: '100%',
                                                maxHeight: '60px',
                                                objectFit: 'contain',
                                                marginBottom: '8px',
                                                display: 'block',
                                                background: '#fff',
                                                padding: '8px',
                                                borderRadius: '4px'
                                            }
                                        }),
                                        el('div', { style: { display: 'flex', gap: '8px' } },
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: 'secondary',
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
                                        variant: 'secondary',
                                        style: { width: '100%', justifyContent: 'center' }
                                    }, 'Upload Logo')
                            );
                        }
                    })
                ),
                el(TextControl, {
                    label: 'Company Name',
                    value: logo.name,
                    onChange: function (value) { updateLogo(index, 'name', value); }
                }),
                el(TextControl, {
                    label: 'Website URL (optional)',
                    type: 'url',
                    value: logo.url,
                    onChange: function (value) { updateLogo(index, 'url', value); }
                })
            );
        });

        var logosPanel = el(
            PanelBody,
            { title: 'Logos (' + attributes.logos.length + ')', initialOpen: false },
            el(Fragment, null, logoPanels),
            el(Button, {
                variant: 'primary',
                onClick: addLogo,
                style: { marginTop: '12px', width: '100%', justifyContent: 'center' }
            }, '+ Add Logo')
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
                logosPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/logos',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        var blockSettings = wp.blocks.getBlockType('alpacode/logos');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/logos', {
                edit: Edit
            });
        }
    });

})(window.wp);
