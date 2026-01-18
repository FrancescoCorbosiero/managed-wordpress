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

    var socialPlatforms = [
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter/X', value: 'twitter' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'GitHub', value: 'github' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'YouTube', value: 'youtube' }
    ];

    registerBlockType('alpacode/nav-fullscreen', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var blockProps = useBlockProps();

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
                newItems.push({ label: 'New Item', url: '#', description: '', children: [] });
                setAttributes({ menuItems: newItems });
            }

            function removeMenuItem(index) {
                var newItems = attributes.menuItems.slice();
                newItems.splice(index, 1);
                setAttributes({ menuItems: newItems });
            }

            function addChildItem(parentIndex) {
                var newItems = attributes.menuItems.slice();
                var children = newItems[parentIndex].children.slice();
                children.push({ label: 'New Sub-item', url: '#', description: '' });
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

            function updateSocial(index, key, value) {
                var newSocials = attributes.socialLinks.slice();
                newSocials[index] = Object.assign({}, newSocials[index], { [key]: value });
                setAttributes({ socialLinks: newSocials });
            }

            function addSocial() {
                var newSocials = attributes.socialLinks.slice();
                newSocials.push({ platform: 'linkedin', url: '' });
                setAttributes({ socialLinks: newSocials });
            }

            function removeSocial(index) {
                var newSocials = attributes.socialLinks.slice();
                newSocials.splice(index, 1);
                setAttributes({ socialLinks: newSocials });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    // Trigger Settings
                    el(PanelBody, { title: 'Trigger Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Trigger ID',
                            help: 'Add data-nav-trigger="' + attributes.triggerId + '" to any element to trigger this menu',
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
                            el('strong', null, 'Usage:'),
                            el('code', { style: { display: 'block', marginTop: '4px', fontSize: '11px' } },
                                '<button data-nav-trigger="' + attributes.triggerId + '">Menu</button>'
                            )
                        )
                    ),

                    // Menu Items
                    el(PanelBody, { title: 'Menu Items', initialOpen: false },
                        attributes.menuItems.map(function(item, index) {
                            return el('div', {
                                key: index,
                                style: { marginBottom: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px', borderLeft: '3px solid var(--wp-admin-theme-color)' }
                            },
                                el('strong', { style: { display: 'block', marginBottom: '8px' } }, 'Item ' + (index + 1) + ': ' + item.label),
                                el(TextControl, { label: 'Label', value: item.label, onChange: function(v) { updateMenuItem(index, 'label', v); } }),
                                el(TextControl, { label: 'URL', value: item.url, onChange: function(v) { updateMenuItem(index, 'url', v); } }),
                                el(TextControl, { label: 'Description', value: item.description, onChange: function(v) { updateMenuItem(index, 'description', v); } }),

                                // Children
                                el('div', { style: { marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #ddd' } },
                                    el('strong', { style: { fontSize: '11px', color: '#666' } }, 'Sub-items:'),
                                    item.children && item.children.map(function(child, ci) {
                                        return el('div', { key: ci, style: { marginTop: '8px', padding: '8px', backgroundColor: '#fff', borderRadius: '4px' } },
                                            el(TextControl, { label: 'Label', value: child.label, onChange: function(v) { updateChildItem(index, ci, 'label', v); } }),
                                            el(TextControl, { label: 'URL', value: child.url, onChange: function(v) { updateChildItem(index, ci, 'url', v); } }),
                                            el(Button, { isDestructive: true, isSmall: true, onClick: function() { removeChildItem(index, ci); } }, 'Remove')
                                        );
                                    }),
                                    el(Button, { isSmall: true, variant: 'secondary', onClick: function() { addChildItem(index); }, style: { marginTop: '8px' } }, 'Add Sub-item')
                                ),
                                el(Button, { isDestructive: true, isSmall: true, onClick: function() { removeMenuItem(index); }, style: { marginTop: '8px' } }, 'Remove Item')
                            );
                        }),
                        el(Button, { variant: 'primary', onClick: addMenuItem }, 'Add Menu Item')
                    ),

                    // CTA
                    el(PanelBody, { title: 'Call to Action', initialOpen: false },
                        el(TextControl, { label: 'CTA Text', value: attributes.ctaText, onChange: function(v) { setAttributes({ ctaText: v }); } }),
                        el(TextControl, { label: 'CTA URL', value: attributes.ctaUrl, onChange: function(v) { setAttributes({ ctaUrl: v }); } })
                    ),

                    // Design
                    el(PanelBody, { title: 'Design', initialOpen: false },
                        el(SelectControl, {
                            label: 'Color Scheme',
                            value: attributes.colorScheme,
                            options: [{ label: 'Dark', value: 'dark' }, { label: 'Light', value: 'light' }],
                            onChange: function(v) { setAttributes({ colorScheme: v }); }
                        }),
                        el(SelectControl, {
                            label: 'Animation Style',
                            value: attributes.animationStyle,
                            options: [{ label: 'Stagger', value: 'stagger' }, { label: 'Wave', value: 'wave' }, { label: 'Fade', value: 'fade' }],
                            onChange: function(v) { setAttributes({ animationStyle: v }); }
                        }),
                        el(ToggleControl, { label: 'Show Numbering', checked: attributes.enableNumbering, onChange: function(v) { setAttributes({ enableNumbering: v }); } }),
                        el(ToggleControl, { label: 'Cursor Effect', checked: attributes.enableCursorEffect, onChange: function(v) { setAttributes({ enableCursorEffect: v }); } }),
                        el('div', { style: { marginTop: '16px' } },
                            el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: '500' } }, 'Accent Color'),
                            el(ColorPicker, { color: attributes.accentColor, onChangeComplete: function(c) { setAttributes({ accentColor: c.hex }); }, disableAlpha: true })
                        )
                    ),

                    // Social Links
                    el(PanelBody, { title: 'Social Links', initialOpen: false },
                        el(ToggleControl, { label: 'Show Social Links', checked: attributes.showSocialLinks, onChange: function(v) { setAttributes({ showSocialLinks: v }); } }),
                        attributes.showSocialLinks && attributes.socialLinks.map(function(s, i) {
                            return el('div', { key: i, style: { marginBottom: '12px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' } },
                                el(SelectControl, { label: 'Platform', value: s.platform, options: socialPlatforms, onChange: function(v) { updateSocial(i, 'platform', v); } }),
                                el(TextControl, { label: 'URL', value: s.url, onChange: function(v) { updateSocial(i, 'url', v); } }),
                                el(Button, { isDestructive: true, isSmall: true, onClick: function() { removeSocial(i); } }, 'Remove')
                            );
                        }),
                        attributes.showSocialLinks && el(Button, { variant: 'secondary', isSmall: true, onClick: addSocial }, 'Add Social')
                    ),

                    // Footer
                    el(PanelBody, { title: 'Footer', initialOpen: false },
                        el(TextControl, { label: 'Copyright Text', value: attributes.footerText, onChange: function(v) { setAttributes({ footerText: v }); } })
                    )
                ),

                // Preview
                el('div', blockProps,
                    el('div', { style: { padding: '30px', backgroundColor: '#0a0a0f', color: '#fff', textAlign: 'center', borderRadius: '8px' } },
                        el('div', { style: { fontSize: '24px', marginBottom: '12px' } }, '☰'),
                        el('p', { style: { margin: 0, fontSize: '14px', fontWeight: '600' } }, 'Fullscreen Navigation'),
                        el('p', { style: { margin: '8px 0 0', fontSize: '12px', opacity: 0.6 } }, attributes.menuItems.length + ' menu items'),
                        el('code', { style: { display: 'block', marginTop: '12px', fontSize: '10px', opacity: 0.5 } }, 'Trigger: data-nav-trigger="' + attributes.triggerId + '"')
                    )
                )
            );
        },
        save: function() { return null; }
    });
})(window.wp);
