/**
 * Bento Grid Block - Premium Editor Script
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
    var ToggleControl = wp.components.ToggleControl;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;

    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var ServerSideRender = wp.serverSideRender;

    var Edit = function (props) {
        var attributes = props.attributes;
        var setAttributes = props.setAttributes;
        var blockProps = useBlockProps();

        var updateItem = function (index, key, value) {
            var newItems = attributes.items.map(function (item, i) {
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
            setAttributes({ items: newItems });
        };

        var addItem = function () {
            var newItems = attributes.items.slice();
            newItems.push({
                title: 'New Item',
                description: 'Item description goes here.',
                icon: 'zap',
                size: 'medium',
                image: '',
                link: '',
                accentColor: ''
            });
            setAttributes({ items: newItems });
        };

        var removeItem = function (index) {
            var newItems = attributes.items.filter(function (_, i) {
                return i !== index;
            });
            setAttributes({ items: newItems });
        };

        var moveItem = function (index, direction) {
            var newItems = attributes.items.slice();
            var newIndex = index + direction;
            if (newIndex < 0 || newIndex >= newItems.length) return;

            var temp = newItems[index];
            newItems[index] = newItems[newIndex];
            newItems[newIndex] = temp;
            setAttributes({ items: newItems });
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
            { title: 'Layout & Style', initialOpen: false },
            el(RangeControl, {
                label: 'Columns',
                value: attributes.columns,
                onChange: function (value) { setAttributes({ columns: value }); },
                min: 2,
                max: 4,
                step: 1
            }),
            el(RangeControl, {
                label: 'Gap (px)',
                value: attributes.gap,
                onChange: function (value) { setAttributes({ gap: value }); },
                min: 12,
                max: 48,
                step: 4
            }),
            el(SelectControl, {
                label: 'Card Style',
                value: attributes.cardStyle,
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Bordered', value: 'bordered' },
                    { label: 'Glass', value: 'glass' },
                    { label: 'Gradient', value: 'gradient' }
                ],
                onChange: function (value) { setAttributes({ cardStyle: value }); }
            }),
            el(ToggleControl, {
                label: 'Enable Hover Zoom',
                checked: attributes.enableHoverZoom,
                onChange: function (value) { setAttributes({ enableHoverZoom: value }); }
            }),
            el(ToggleControl, {
                label: 'Show Icons',
                checked: attributes.showIcons,
                onChange: function (value) { setAttributes({ showIcons: value }); }
            }),
            attributes.showIcons && el(SelectControl, {
                label: 'Icon Style',
                value: attributes.iconStyle,
                options: [
                    { label: 'Filled', value: 'filled' },
                    { label: 'Outlined', value: 'outlined' },
                    { label: 'Gradient Background', value: 'gradient' }
                ],
                onChange: function (value) { setAttributes({ iconStyle: value }); }
            })
        );

        // Items Panels
        var itemPanels = attributes.items.map(function (item, index) {
            return el(
                PanelBody,
                {
                    key: index,
                    title: 'Item ' + (index + 1) + ': ' + (item.title || 'Unnamed'),
                    initialOpen: false
                },
                el(TextControl, {
                    label: 'Title',
                    value: item.title,
                    onChange: function (value) { updateItem(index, 'title', value); }
                }),
                el(TextareaControl, {
                    label: 'Description',
                    value: item.description,
                    rows: 2,
                    onChange: function (value) { updateItem(index, 'description', value); }
                }),
                el(SelectControl, {
                    label: 'Icon',
                    value: item.icon,
                    options: [
                        { label: 'Zap (Lightning)', value: 'zap' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'Globe', value: 'globe' },
                        { label: 'Headphones', value: 'headphones' },
                        { label: 'Code', value: 'code' },
                        { label: 'Rocket', value: 'rocket' },
                        { label: 'Layers', value: 'layers' },
                        { label: 'CPU', value: 'cpu' },
                        { label: 'Database', value: 'database' },
                        { label: 'Cloud', value: 'cloud' },
                        { label: 'Lock', value: 'lock' },
                        { label: 'Chart', value: 'chart' },
                        { label: 'Star', value: 'star' },
                        { label: 'Users', value: 'users' },
                        { label: 'Settings', value: 'settings' }
                    ],
                    onChange: function (value) { updateItem(index, 'icon', value); }
                }),
                el(SelectControl, {
                    label: 'Size',
                    value: item.size,
                    options: [
                        { label: 'Small (1x1)', value: 'small' },
                        { label: 'Medium (2x1)', value: 'medium' },
                        { label: 'Large (2x2)', value: 'large' },
                        { label: 'Wide (3x1)', value: 'wide' },
                        { label: 'Tall (1x2)', value: 'tall' }
                    ],
                    onChange: function (value) { updateItem(index, 'size', value); }
                }),
                el(TextControl, {
                    label: 'Link URL (optional)',
                    value: item.link,
                    type: 'url',
                    onChange: function (value) { updateItem(index, 'link', value); }
                }),
                el(MediaUploadCheck, null,
                    el(MediaUpload, {
                        onSelect: function (media) { updateItem(index, 'image', media.url); },
                        allowedTypes: ['image'],
                        value: item.image,
                        render: function (obj) {
                            return el(
                                'div',
                                { style: { marginTop: '12px', marginBottom: '12px' } },
                                item.image ?
                                    el('div', null,
                                        el('img', {
                                            src: item.image,
                                            alt: 'Background',
                                            style: {
                                                width: '100%',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                marginBottom: '8px'
                                            }
                                        }),
                                        el('div', { style: { display: 'flex', gap: '8px' } },
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: 'secondary',
                                                size: 'small'
                                            }, 'Change'),
                                            el(Button, {
                                                onClick: function () { updateItem(index, 'image', ''); },
                                                isDestructive: true,
                                                size: 'small'
                                            }, 'Remove')
                                        )
                                    ) :
                                    el(Button, {
                                        onClick: obj.open,
                                        variant: 'secondary'
                                    }, 'Add Background Image')
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
                            onClick: function () { moveItem(index, -1); },
                            disabled: index === 0,
                            size: 'small'
                        }),
                        el(Button, {
                            icon: 'arrow-down-alt2',
                            label: 'Move Down',
                            onClick: function () { moveItem(index, 1); },
                            disabled: index === attributes.items.length - 1,
                            size: 'small'
                        })
                    ),
                    el(Button, {
                        isDestructive: true,
                        size: 'small',
                        onClick: function () { removeItem(index); }
                    }, 'Remove')
                )
            );
        });

        // Add Item Panel
        var addItemPanel = el(
            PanelBody,
            { title: 'Grid Items (' + attributes.items.length + ')', initialOpen: false },
            el(Fragment, null, itemPanels),
            el(Button, {
                variant: 'primary',
                onClick: addItem,
                style: { marginTop: '12px', width: '100%', justifyContent: 'center' }
            }, '+ Add Item')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                headerPanel,
                layoutPanel,
                addItemPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/bento-grid',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        var blockSettings = wp.blocks.getBlockType('alpacode/bento-grid');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/bento-grid', {
                edit: Edit
            });
        }
    });

})(window.wp);
