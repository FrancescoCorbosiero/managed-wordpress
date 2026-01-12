/**
 * Timeline Block - Premium Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    var InspectorControls = wp.blockEditor.InspectorControls;
    var useBlockProps = wp.blockEditor.useBlockProps;

    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;
    var ToggleControl = wp.components.ToggleControl;
    var SelectControl = wp.components.SelectControl;

    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var ServerSideRender = wp.serverSideRender;

    // Available icons
    var iconOptions = [
        { label: 'Search', value: 'search' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'Palette', value: 'palette' },
        { label: 'Code', value: 'code' },
        { label: 'Rocket', value: 'rocket' },
        { label: 'Check', value: 'check' },
        { label: 'Star', value: 'star' },
        { label: 'Heart', value: 'heart' },
        { label: 'Flag', value: 'flag' },
        { label: 'Target', value: 'target' },
        { label: 'Users', value: 'users' },
        { label: 'Zap', value: 'zap' }
    ];

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
                title: 'New Step',
                description: 'Describe this step in the process.',
                icon: 'check',
                year: ''
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
            { title: 'Layout', initialOpen: false },
            el(SelectControl, {
                label: 'Layout Style',
                value: attributes.layout,
                options: [
                    { label: 'Vertical', value: 'vertical' },
                    { label: 'Horizontal', value: 'horizontal' },
                    { label: 'Alternating', value: 'alternating' }
                ],
                onChange: function (value) { setAttributes({ layout: value }); }
            }),
            el(SelectControl, {
                label: 'Line Style',
                value: attributes.lineStyle,
                options: [
                    { label: 'Solid', value: 'solid' },
                    { label: 'Dashed', value: 'dashed' },
                    { label: 'Gradient', value: 'gradient' }
                ],
                onChange: function (value) { setAttributes({ lineStyle: value }); }
            }),
            el(ToggleControl, {
                label: 'Show Step Numbers',
                checked: attributes.showNumbers,
                onChange: function (value) { setAttributes({ showNumbers: value }); }
            }),
            el(ToggleControl, {
                label: 'Show Icons',
                help: 'Show icons in content area (when numbers are shown)',
                checked: attributes.showIcons,
                onChange: function (value) { setAttributes({ showIcons: value }); }
            }),
            el(ToggleControl, {
                label: 'Scroll Progress Animation',
                help: 'Line fills as user scrolls',
                checked: attributes.enableScrollProgress,
                onChange: function (value) { setAttributes({ enableScrollProgress: value }); }
            })
        );

        // Items Panel
        var itemPanels = attributes.items.map(function (item, index) {
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
                    el('strong', null, 'Step ' + (index + 1) + (item.title ? ': ' + item.title : '')),
                    el(
                        'div',
                        { style: { display: 'flex', gap: '4px' } },
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
                        }),
                        el(Button, {
                            icon: 'trash',
                            label: 'Remove',
                            onClick: function () { removeItem(index); },
                            isDestructive: true,
                            size: 'small'
                        })
                    )
                ),
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
                    options: iconOptions,
                    onChange: function (value) { updateItem(index, 'icon', value); }
                }),
                el(TextControl, {
                    label: 'Year/Date (optional)',
                    value: item.year,
                    onChange: function (value) { updateItem(index, 'year', value); }
                })
            );
        });

        var itemsPanel = el(
            PanelBody,
            { title: 'Timeline Items (' + attributes.items.length + ')', initialOpen: false },
            el(Fragment, null, itemPanels),
            el(Button, {
                variant: 'primary',
                onClick: addItem,
                style: { marginTop: '12px', width: '100%', justifyContent: 'center' }
            }, '+ Add Step')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                headerPanel,
                layoutPanel,
                itemsPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/timeline',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        var blockSettings = wp.blocks.getBlockType('alpacode/timeline');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/timeline', {
                edit: Edit
            });
        }
    });

})(window.wp);
