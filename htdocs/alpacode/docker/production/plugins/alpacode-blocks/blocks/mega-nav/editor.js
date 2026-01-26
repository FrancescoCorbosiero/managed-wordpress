(function(wp) {
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var SelectControl = wp.components.SelectControl;
    var ToggleControl = wp.components.ToggleControl;
    var Button = wp.components.Button;
    var ColorPicker = wp.components.ColorPicker;
    var ServerSideRender = wp.serverSideRender;
    var registerBlockType = wp.blocks.registerBlockType;

    var iconOptions = [
        { label: 'Globe', value: 'globe' },
        { label: 'Smartphone', value: 'smartphone' },
        { label: 'Camera', value: 'camera' },
        { label: 'Eye', value: 'eye' },
        { label: 'File Text', value: 'file-text' },
        { label: 'Mail', value: 'mail' }
    ];

    var socialPlatforms = [
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter/X', value: 'twitter' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'GitHub', value: 'github' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'YouTube', value: 'youtube' }
    ];

    registerBlockType('alpacode/mega-nav', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var blockProps = useBlockProps({
                className: 'alpacode-mega-nav-editor'
            });

            // Menu items management
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
                    image: '',
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

            // Social links management
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
                    // Logo Panel
                    el(PanelBody, { title: 'Logo & Branding', initialOpen: true },
                        el(TextControl, {
                            label: 'Logo Text',
                            value: attributes.logoText,
                            onChange: function(value) {
                                setAttributes({ logoText: value });
                            }
                        }),
                        el('div', { className: 'alpacode-editor-media-row' },
                            el('label', { className: 'components-base-control__label' }, 'Logo Image'),
                            el(MediaUpload, {
                                onSelect: function(media) {
                                    setAttributes({ logoUrl: media.url });
                                },
                                allowedTypes: ['image'],
                                value: attributes.logoUrl,
                                render: function(obj) {
                                    return el('div', null,
                                        attributes.logoUrl
                                            ? el('img', {
                                                src: attributes.logoUrl,
                                                style: { maxWidth: '150px', maxHeight: '50px', marginBottom: '8px', display: 'block' }
                                            })
                                            : null,
                                        el(Button, {
                                            onClick: obj.open,
                                            variant: 'secondary',
                                            isSmall: true
                                        }, attributes.logoUrl ? 'Replace' : 'Upload'),
                                        attributes.logoUrl && el(Button, {
                                            onClick: function() { setAttributes({ logoUrl: '' }); },
                                            variant: 'link',
                                            isDestructive: true,
                                            isSmall: true,
                                            style: { marginLeft: '8px' }
                                        }, 'Remove')
                                    );
                                }
                            })
                        )
                    ),

                    // Menu Items Panel
                    el(PanelBody, { title: 'Menu Items', initialOpen: true },
                        attributes.menuItems.map(function(item, index) {
                            return el('div', {
                                key: index,
                                style: {
                                    marginBottom: '16px',
                                    padding: '12px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '4px',
                                    borderLeft: '3px solid #6366f1'
                                }
                            },
                                el('strong', { style: { display: 'block', marginBottom: '8px' } },
                                    'Item ' + (index + 1) + ': ' + item.label
                                ),
                                el(TextControl, {
                                    label: 'Label',
                                    value: item.label,
                                    onChange: function(value) {
                                        updateMenuItem(index, 'label', value);
                                    }
                                }),
                                el(TextControl, {
                                    label: 'URL',
                                    value: item.url,
                                    onChange: function(value) {
                                        updateMenuItem(index, 'url', value);
                                    }
                                }),
                                el(SelectControl, {
                                    label: 'Icon',
                                    value: item.icon,
                                    options: iconOptions,
                                    onChange: function(value) {
                                        updateMenuItem(index, 'icon', value);
                                    }
                                }),
                                el(TextControl, {
                                    label: 'Description',
                                    value: item.description,
                                    onChange: function(value) {
                                        updateMenuItem(index, 'description', value);
                                    }
                                }),

                                // Children
                                el('div', { style: { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #ddd' } },
                                    el('strong', { style: { fontSize: '12px' } }, 'Sub-items:'),
                                    item.children && item.children.map(function(child, childIndex) {
                                        return el('div', {
                                            key: childIndex,
                                            style: {
                                                marginTop: '8px',
                                                padding: '8px',
                                                backgroundColor: '#fff',
                                                borderRadius: '4px'
                                            }
                                        },
                                            el(TextControl, {
                                                label: 'Sub-item Label',
                                                value: child.label,
                                                onChange: function(value) {
                                                    updateChildItem(index, childIndex, 'label', value);
                                                }
                                            }),
                                            el(TextControl, {
                                                label: 'Sub-item URL',
                                                value: child.url,
                                                onChange: function(value) {
                                                    updateChildItem(index, childIndex, 'url', value);
                                                }
                                            }),
                                            el(TextControl, {
                                                label: 'Sub-item Description',
                                                value: child.description,
                                                onChange: function(value) {
                                                    updateChildItem(index, childIndex, 'description', value);
                                                }
                                            }),
                                            el(Button, {
                                                onClick: function() { removeChildItem(index, childIndex); },
                                                variant: 'link',
                                                isDestructive: true,
                                                isSmall: true
                                            }, 'Remove Sub-item')
                                        );
                                    }),
                                    el(Button, {
                                        onClick: function() { addChildItem(index); },
                                        variant: 'secondary',
                                        isSmall: true,
                                        style: { marginTop: '8px' }
                                    }, 'Add Sub-item')
                                ),

                                el(Button, {
                                    onClick: function() { removeMenuItem(index); },
                                    variant: 'link',
                                    isDestructive: true,
                                    isSmall: true,
                                    style: { marginTop: '8px' }
                                }, 'Remove Item')
                            );
                        }),
                        el(Button, {
                            onClick: addMenuItem,
                            variant: 'primary',
                            style: { marginTop: '8px' }
                        }, 'Add Menu Item')
                    ),

                    // CTA Panel
                    el(PanelBody, { title: 'Call to Action', initialOpen: false },
                        el(TextControl, {
                            label: 'CTA Text',
                            value: attributes.ctaText,
                            onChange: function(value) {
                                setAttributes({ ctaText: value });
                            }
                        }),
                        el(TextControl, {
                            label: 'CTA URL',
                            value: attributes.ctaUrl,
                            onChange: function(value) {
                                setAttributes({ ctaUrl: value });
                            }
                        })
                    ),

                    // Design Panel
                    el(PanelBody, { title: 'Design', initialOpen: false },
                        el(SelectControl, {
                            label: 'Color Scheme',
                            value: attributes.colorScheme,
                            options: [
                                { label: 'Dark', value: 'dark' },
                                { label: 'Light', value: 'light' }
                            ],
                            onChange: function(value) {
                                setAttributes({ colorScheme: value });
                            }
                        }),
                        el(SelectControl, {
                            label: 'Variant',
                            value: attributes.variant,
                            options: [
                                { label: 'Fullscreen', value: 'fullscreen' },
                                { label: 'Slideout', value: 'slideout' }
                            ],
                            onChange: function(value) {
                                setAttributes({ variant: value });
                            }
                        }),
                        el(SelectControl, {
                            label: 'Position',
                            value: attributes.position,
                            options: [
                                { label: 'Fixed', value: 'fixed' },
                                { label: 'Static', value: 'static' }
                            ],
                            onChange: function(value) {
                                setAttributes({ position: value });
                            }
                        }),
                        el('div', { style: { marginTop: '16px' } },
                            el('label', {
                                className: 'components-base-control__label',
                                style: { display: 'block', marginBottom: '8px' }
                            }, 'Accent Color'),
                            el(ColorPicker, {
                                color: attributes.accentColor,
                                onChangeComplete: function(color) {
                                    setAttributes({ accentColor: color.hex });
                                },
                                disableAlpha: true
                            })
                        )
                    ),

                    // Social Links Panel
                    el(PanelBody, { title: 'Social Links', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Show Social Links',
                            checked: attributes.showSocialLinks,
                            onChange: function(value) {
                                setAttributes({ showSocialLinks: value });
                            }
                        }),
                        attributes.showSocialLinks && attributes.socialLinks.map(function(social, index) {
                            return el('div', {
                                key: index,
                                style: {
                                    marginBottom: '12px',
                                    padding: '8px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '4px'
                                }
                            },
                                el(SelectControl, {
                                    label: 'Platform',
                                    value: social.platform,
                                    options: socialPlatforms,
                                    onChange: function(value) {
                                        updateSocial(index, 'platform', value);
                                    }
                                }),
                                el(TextControl, {
                                    label: 'URL',
                                    value: social.url,
                                    onChange: function(value) {
                                        updateSocial(index, 'url', value);
                                    }
                                }),
                                el(Button, {
                                    onClick: function() { removeSocial(index); },
                                    variant: 'link',
                                    isDestructive: true,
                                    isSmall: true
                                }, 'Remove')
                            );
                        }),
                        attributes.showSocialLinks && el(Button, {
                            onClick: addSocial,
                            variant: 'secondary',
                            isSmall: true
                        }, 'Add Social Link')
                    ),

                    // Footer Panel
                    el(PanelBody, { title: 'Footer', initialOpen: false },
                        el(TextControl, {
                            label: 'Copyright Text',
                            value: attributes.footerText,
                            onChange: function(value) {
                                setAttributes({ footerText: value });
                            }
                        })
                    ),

                    // Effects Panel
                    el(PanelBody, { title: 'Effects', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Enable Cursor Effect',
                            checked: attributes.enableCursorEffect,
                            onChange: function(value) {
                                setAttributes({ enableCursorEffect: value });
                            }
                        })
                    )
                ),

                // Block Preview
                el('div', blockProps,
                    el('div', {
                        style: {
                            padding: '20px',
                            backgroundColor: '#1a1a2e',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: '4px'
                        }
                    },
                        el('p', { style: { margin: 0, fontSize: '14px' } },
                            'Mega Navigation Block - Preview in frontend'
                        ),
                        el('p', { style: { margin: '8px 0 0', fontSize: '12px', opacity: 0.7 } },
                            attributes.menuItems.length + ' menu items configured'
                        )
                    )
                )
            );
        },

        save: function() {
            return null; // Server-side rendered
        }
    });
})(window.wp);
