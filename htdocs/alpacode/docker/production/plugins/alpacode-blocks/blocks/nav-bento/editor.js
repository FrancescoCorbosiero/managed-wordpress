(function(wp) {
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var ToggleControl = wp.components.ToggleControl;
    var Button = wp.components.Button;
    var ColorPicker = wp.components.ColorPicker;
    var registerBlockType = wp.blocks.registerBlockType;

    var iconOptions = [
        { label: 'Globe', value: 'globe' },
        { label: 'Smartphone', value: 'smartphone' },
        { label: 'Camera', value: 'camera' },
        { label: 'Eye', value: 'eye' },
        { label: 'Code', value: 'code' },
        { label: 'Mail', value: 'mail' },
        { label: 'File Text', value: 'file-text' },
        { label: 'Users', value: 'users' },
        { label: 'Briefcase', value: 'briefcase' },
        { label: 'Star', value: 'star' }
    ];

    var sizeOptions = [
        { label: 'Small (1x1)', value: 'small' },
        { label: 'Medium (1x1 or 1x2)', value: 'medium' },
        { label: 'Large (2x2)', value: 'large' }
    ];

    var colorPresets = [
        { label: 'Indigo', value: '#6366f1' },
        { label: 'Violet', value: '#8b5cf6' },
        { label: 'Pink', value: '#ec4899' },
        { label: 'Cyan', value: '#06b6d4' },
        { label: 'Emerald', value: '#10b981' },
        { label: 'Amber', value: '#f59e0b' },
        { label: 'Red', value: '#ef4444' },
        { label: 'Blue', value: '#3b82f6' }
    ];

    registerBlockType('alpacode/nav-bento', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var blockProps = useBlockProps({
                className: 'alpacode-nav-bento-editor'
            });

            // Menu item management
            function updateMenuItem(index, key, value) {
                var newItems = attributes.menuItems.slice();
                newItems[index] = Object.assign({}, newItems[index], { [key]: value });
                setAttributes({ menuItems: newItems });
            }

            function updateChildItem(parentIndex, childIndex, key, value) {
                var newItems = attributes.menuItems.slice();
                var children = newItems[parentIndex].children.slice();
                children[childIndex] = Object.assign({}, children[childIndex], { [key]: value });
                newItems[parentIndex] = Object.assign({}, newItems[parentIndex], { children: children });
                setAttributes({ menuItems: newItems });
            }

            function addMenuItem() {
                var newItems = attributes.menuItems.slice();
                newItems.push({
                    label: 'New Item',
                    url: '#',
                    icon: 'globe',
                    description: '',
                    size: 'medium',
                    color: '#6366f1',
                    children: []
                });
                setAttributes({ menuItems: newItems });
            }

            function removeMenuItem(index) {
                var newItems = attributes.menuItems.slice();
                newItems.splice(index, 1);
                setAttributes({ menuItems: newItems });
            }

            function addChildItem(parentIndex) {
                var newItems = attributes.menuItems.slice();
                var children = newItems[parentIndex].children ? newItems[parentIndex].children.slice() : [];
                children.push({ label: 'New Sub-item', url: '#' });
                newItems[parentIndex] = Object.assign({}, newItems[parentIndex], { children: children });
                setAttributes({ menuItems: newItems });
            }

            function removeChildItem(parentIndex, childIndex) {
                var newItems = attributes.menuItems.slice();
                var children = newItems[parentIndex].children.slice();
                children.splice(childIndex, 1);
                newItems[parentIndex] = Object.assign({}, newItems[parentIndex], { children: children });
                setAttributes({ menuItems: newItems });
            }

            // Render color preset buttons
            function renderColorPresets(currentColor, onChange) {
                return el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' } },
                    colorPresets.map(function(preset) {
                        return el('button', {
                            key: preset.value,
                            type: 'button',
                            onClick: function() { onChange(preset.value); },
                            style: {
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                background: preset.value,
                                border: currentColor === preset.value ? '2px solid #000' : '1px solid #ddd',
                                cursor: 'pointer',
                                padding: 0
                            },
                            title: preset.label
                        });
                    })
                );
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    // Trigger Settings
                    el(PanelBody, { title: 'Trigger Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Trigger ID',
                            help: 'Add data-nav-bento-trigger="' + attributes.triggerId + '" to any element to open this navigation',
                            value: attributes.triggerId,
                            onChange: function(value) { setAttributes({ triggerId: value }); }
                        }),
                        el('div', {
                            style: {
                                padding: '12px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '4px',
                                fontSize: '12px',
                                marginTop: '8px'
                            }
                        },
                            el('strong', null, 'Usage Example:'),
                            el('code', { style: { display: 'block', marginTop: '4px', fontSize: '11px' } },
                                '<button data-nav-bento-trigger="' + attributes.triggerId + '">Menu</button>'
                            )
                        )
                    ),

                    // Menu Items
                    el(PanelBody, { title: 'Menu Tiles (' + attributes.menuItems.length + ')', initialOpen: true },
                        attributes.menuItems.map(function(item, index) {
                            return el('div', {
                                key: index,
                                style: {
                                    marginBottom: '16px',
                                    padding: '12px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                    borderLeft: '4px solid ' + (item.color || '#6366f1')
                                }
                            },
                                el('strong', { style: { display: 'block', marginBottom: '8px' } },
                                    'Tile ' + (index + 1) + ': ' + item.label
                                ),
                                el(TextControl, {
                                    label: 'Label',
                                    value: item.label,
                                    onChange: function(v) { updateMenuItem(index, 'label', v); }
                                }),
                                el(TextControl, {
                                    label: 'URL',
                                    value: item.url,
                                    onChange: function(v) { updateMenuItem(index, 'url', v); }
                                }),
                                el(TextControl, {
                                    label: 'Description',
                                    value: item.description || '',
                                    onChange: function(v) { updateMenuItem(index, 'description', v); }
                                }),
                                el(SelectControl, {
                                    label: 'Icon',
                                    value: item.icon || 'globe',
                                    options: iconOptions,
                                    onChange: function(v) { updateMenuItem(index, 'icon', v); }
                                }),
                                el(SelectControl, {
                                    label: 'Tile Size',
                                    value: item.size || 'medium',
                                    options: sizeOptions,
                                    onChange: function(v) { updateMenuItem(index, 'size', v); }
                                }),
                                el('div', { style: { marginTop: '8px' } },
                                    el('label', { style: { display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500' } }, 'Tile Color'),
                                    renderColorPresets(item.color || '#6366f1', function(color) {
                                        updateMenuItem(index, 'color', color);
                                    })
                                ),

                                // Sub-items
                                el('div', { style: { marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #ddd' } },
                                    el('strong', { style: { fontSize: '11px', color: '#666' } }, 'Sub-items (shown on hover/click):'),
                                    item.children && item.children.map(function(child, ci) {
                                        return el('div', {
                                            key: ci,
                                            style: { marginTop: '8px', padding: '8px', backgroundColor: '#fff', borderRadius: '4px' }
                                        },
                                            el(TextControl, {
                                                label: 'Label',
                                                value: child.label,
                                                onChange: function(v) { updateChildItem(index, ci, 'label', v); }
                                            }),
                                            el(TextControl, {
                                                label: 'URL',
                                                value: child.url,
                                                onChange: function(v) { updateChildItem(index, ci, 'url', v); }
                                            }),
                                            el(Button, {
                                                isDestructive: true,
                                                isSmall: true,
                                                onClick: function() { removeChildItem(index, ci); }
                                            }, 'Remove')
                                        );
                                    }),
                                    el(Button, {
                                        isSmall: true,
                                        variant: 'secondary',
                                        onClick: function() { addChildItem(index); },
                                        style: { marginTop: '8px' }
                                    }, 'Add Sub-item')
                                ),

                                el(Button, {
                                    isDestructive: true,
                                    isSmall: true,
                                    onClick: function() { removeMenuItem(index); },
                                    style: { marginTop: '12px' }
                                }, 'Remove Tile')
                            );
                        }),
                        el(Button, {
                            variant: 'primary',
                            onClick: addMenuItem
                        }, 'Add Menu Tile')
                    ),

                    // Design Settings
                    el(PanelBody, { title: 'Design', initialOpen: false },
                        el(SelectControl, {
                            label: 'Color Scheme',
                            value: attributes.colorScheme,
                            options: [
                                { label: 'Dark', value: 'dark' },
                                { label: 'Light', value: 'light' }
                            ],
                            onChange: function(v) { setAttributes({ colorScheme: v }); }
                        }),
                        el(ToggleControl, {
                            label: 'Show Tile Numbers',
                            checked: attributes.showNumbers,
                            onChange: function(v) { setAttributes({ showNumbers: v }); }
                        }),
                        el(ToggleControl, {
                            label: 'Expand Submenus on Hover',
                            help: 'If disabled, submenus expand on click',
                            checked: attributes.hoverExpand,
                            onChange: function(v) { setAttributes({ hoverExpand: v }); }
                        })
                    ),

                    // Footer Settings
                    el(PanelBody, { title: 'Footer', initialOpen: false },
                        el(TextControl, {
                            label: 'Footer Text',
                            value: attributes.footerText,
                            onChange: function(v) { setAttributes({ footerText: v }); }
                        })
                    )
                ),

                // Editor Preview
                el('div', blockProps,
                    el('div', {
                        style: {
                            padding: '24px',
                            backgroundColor: '#0a0a0f',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: '8px'
                        }
                    },
                        el('div', {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '8px',
                                marginBottom: '16px',
                                maxWidth: '200px',
                                margin: '0 auto 16px'
                            }
                        },
                            attributes.menuItems.slice(0, 8).map(function(item, i) {
                                var span = item.size === 'large' ? 2 : 1;
                                return el('div', {
                                    key: i,
                                    style: {
                                        backgroundColor: item.color || '#6366f1',
                                        opacity: 0.7,
                                        borderRadius: '4px',
                                        height: item.size === 'large' ? '40px' : '20px',
                                        gridColumn: 'span ' + span
                                    }
                                });
                            })
                        ),
                        el('p', { style: { margin: 0, fontSize: '14px', fontWeight: '600' } }, 'Bento Navigation'),
                        el('p', { style: { margin: '4px 0 0', fontSize: '12px', opacity: 0.6 } },
                            attributes.menuItems.length + ' tiles configured'
                        ),
                        el('code', {
                            style: { display: 'block', marginTop: '12px', fontSize: '10px', opacity: 0.5 }
                        }, 'Trigger: data-nav-bento-trigger="' + attributes.triggerId + '"')
                    )
                )
            );
        },

        save: function() {
            return null; // Server-side rendered
        }
    });
})(window.wp);
