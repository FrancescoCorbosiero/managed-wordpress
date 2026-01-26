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

    var socialPlatforms = [
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter/X', value: 'twitter' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'GitHub', value: 'github' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Dribbble', value: 'dribbble' },
        { label: 'TikTok', value: 'tiktok' }
    ];

    registerBlockType('alpacode/business-card-bento', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var blockProps = useBlockProps({
                className: 'alpacode-business-card-bento-editor'
            });

            function updateSocial(index, key, value) {
                var newSocials = attributes.socials.slice();
                newSocials[index] = Object.assign({}, newSocials[index], { [key]: value });
                setAttributes({ socials: newSocials });
            }

            function addSocial() {
                var newSocials = attributes.socials.slice();
                newSocials.push({ platform: 'linkedin', url: '' });
                setAttributes({ socials: newSocials });
            }

            function removeSocial(index) {
                var newSocials = attributes.socials.slice();
                newSocials.splice(index, 1);
                setAttributes({ socials: newSocials });
            }

            function updateStat(index, key, value) {
                var newStats = attributes.stats.slice();
                newStats[index] = Object.assign({}, newStats[index], { [key]: value });
                setAttributes({ stats: newStats });
            }

            function addStat() {
                var newStats = attributes.stats.slice();
                newStats.push({ value: '', label: '' });
                setAttributes({ stats: newStats });
            }

            function removeStat(index) {
                var newStats = attributes.stats.slice();
                newStats.splice(index, 1);
                setAttributes({ stats: newStats });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    // Logo Panel
                    el(PanelBody, { title: 'Logo Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Logo Style',
                            value: attributes.logoStyle,
                            options: [
                                { label: 'Square', value: 'square' },
                                { label: 'Rectangular', value: 'rectangular' }
                            ],
                            onChange: function(value) {
                                setAttributes({ logoStyle: value });
                            }
                        }),
                        el('div', { className: 'alpacode-editor-media-row' },
                            el('label', { className: 'components-base-control__label' }, 'Square Logo'),
                            el(MediaUpload, {
                                onSelect: function(media) {
                                    setAttributes({ logoSquare: media.url });
                                },
                                allowedTypes: ['image'],
                                value: attributes.logoSquare,
                                render: function(obj) {
                                    return el('div', { className: 'alpacode-editor-media-upload' },
                                        attributes.logoSquare
                                            ? el('img', {
                                                src: attributes.logoSquare,
                                                style: { maxWidth: '100px', maxHeight: '100px' }
                                            })
                                            : null,
                                        el(Button, {
                                            onClick: obj.open,
                                            variant: 'secondary',
                                            isSmall: true
                                        }, attributes.logoSquare ? 'Replace' : 'Upload'),
                                        attributes.logoSquare && el(Button, {
                                            onClick: function() { setAttributes({ logoSquare: '' }); },
                                            variant: 'link',
                                            isDestructive: true,
                                            isSmall: true
                                        }, 'Remove')
                                    );
                                }
                            })
                        ),
                        el('div', { className: 'alpacode-editor-media-row', style: { marginTop: '16px' } },
                            el('label', { className: 'components-base-control__label' }, 'Rectangular Logo'),
                            el(MediaUpload, {
                                onSelect: function(media) {
                                    setAttributes({ logoRectangular: media.url });
                                },
                                allowedTypes: ['image'],
                                value: attributes.logoRectangular,
                                render: function(obj) {
                                    return el('div', { className: 'alpacode-editor-media-upload' },
                                        attributes.logoRectangular
                                            ? el('img', {
                                                src: attributes.logoRectangular,
                                                style: { maxWidth: '200px', maxHeight: '80px' }
                                            })
                                            : null,
                                        el(Button, {
                                            onClick: obj.open,
                                            variant: 'secondary',
                                            isSmall: true
                                        }, attributes.logoRectangular ? 'Replace' : 'Upload'),
                                        attributes.logoRectangular && el(Button, {
                                            onClick: function() { setAttributes({ logoRectangular: '' }); },
                                            variant: 'link',
                                            isDestructive: true,
                                            isSmall: true
                                        }, 'Remove')
                                    );
                                }
                            })
                        )
                    ),

                    // Content Panel
                    el(PanelBody, { title: 'Content', initialOpen: true },
                        el(TextControl, {
                            label: 'Tagline',
                            value: attributes.tagline,
                            onChange: function(value) {
                                setAttributes({ tagline: value });
                            },
                            placeholder: 'Crafting Digital Excellence'
                        }),
                        el(TextControl, {
                            label: 'Name',
                            value: attributes.name,
                            onChange: function(value) {
                                setAttributes({ name: value });
                            },
                            placeholder: 'John Doe'
                        }),
                        el(TextControl, {
                            label: 'Title / Position',
                            value: attributes.title,
                            onChange: function(value) {
                                setAttributes({ title: value });
                            },
                            placeholder: 'Creative Director'
                        }),
                        el(TextareaControl, {
                            label: 'Short Bio',
                            value: attributes.bio,
                            onChange: function(value) {
                                setAttributes({ bio: value });
                            },
                            placeholder: 'A brief description about yourself...'
                        })
                    ),

                    // Contact Information Panel
                    el(PanelBody, { title: 'Contact Information', initialOpen: false },
                        el(TextControl, {
                            label: 'Email',
                            value: attributes.email,
                            onChange: function(value) {
                                setAttributes({ email: value });
                            },
                            type: 'email',
                            placeholder: 'hello@example.com'
                        }),
                        el(TextControl, {
                            label: 'Phone',
                            value: attributes.phone,
                            onChange: function(value) {
                                setAttributes({ phone: value });
                            },
                            type: 'tel',
                            placeholder: '+1 (555) 123-4567'
                        }),
                        el(TextControl, {
                            label: 'Website',
                            value: attributes.website,
                            onChange: function(value) {
                                setAttributes({ website: value });
                            },
                            type: 'url',
                            placeholder: 'https://example.com'
                        }),
                        el(TextareaControl, {
                            label: 'Address',
                            value: attributes.address,
                            onChange: function(value) {
                                setAttributes({ address: value });
                            },
                            placeholder: '123 Main St, City, Country'
                        })
                    ),

                    // Social Links Panel
                    el(PanelBody, { title: 'Social Links', initialOpen: false },
                        attributes.socials.map(function(social, index) {
                            return el('div', {
                                key: index,
                                className: 'alpacode-editor-social-item',
                                style: {
                                    marginBottom: '16px',
                                    padding: '12px',
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
                                    },
                                    type: 'url',
                                    placeholder: 'https://...'
                                }),
                                el(Button, {
                                    onClick: function() { removeSocial(index); },
                                    variant: 'link',
                                    isDestructive: true,
                                    isSmall: true
                                }, 'Remove')
                            );
                        }),
                        el(Button, {
                            onClick: addSocial,
                            variant: 'secondary',
                            isSmall: true
                        }, 'Add Social Link')
                    ),

                    // Stats Panel
                    el(PanelBody, { title: 'Statistics', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Show Statistics',
                            checked: attributes.showStats,
                            onChange: function(value) {
                                setAttributes({ showStats: value });
                            }
                        }),
                        attributes.showStats && attributes.stats.map(function(stat, index) {
                            return el('div', {
                                key: index,
                                className: 'alpacode-editor-stat-item',
                                style: {
                                    marginBottom: '16px',
                                    padding: '12px',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '4px'
                                }
                            },
                                el(TextControl, {
                                    label: 'Value',
                                    value: stat.value,
                                    onChange: function(value) {
                                        updateStat(index, 'value', value);
                                    },
                                    placeholder: '10+'
                                }),
                                el(TextControl, {
                                    label: 'Label',
                                    value: stat.label,
                                    onChange: function(value) {
                                        updateStat(index, 'label', value);
                                    },
                                    placeholder: 'Years Experience'
                                }),
                                el(Button, {
                                    onClick: function() { removeStat(index); },
                                    variant: 'link',
                                    isDestructive: true,
                                    isSmall: true
                                }, 'Remove')
                            );
                        }),
                        attributes.showStats && el(Button, {
                            onClick: addStat,
                            variant: 'secondary',
                            isSmall: true
                        }, 'Add Statistic')
                    ),

                    // CTA Panel
                    el(PanelBody, { title: 'Call to Action', initialOpen: false },
                        el(TextControl, {
                            label: 'CTA Text',
                            value: attributes.ctaText,
                            onChange: function(value) {
                                setAttributes({ ctaText: value });
                            },
                            placeholder: "Let's Work Together"
                        }),
                        el(TextControl, {
                            label: 'CTA URL',
                            value: attributes.ctaUrl,
                            onChange: function(value) {
                                setAttributes({ ctaUrl: value });
                            },
                            type: 'url',
                            placeholder: '#contact'
                        })
                    ),

                    // Design Panel
                    el(PanelBody, { title: 'Design', initialOpen: false },
                        el(SelectControl, {
                            label: 'Grid Layout',
                            value: attributes.gridLayout,
                            options: [
                                { label: 'Classic', value: 'classic' },
                                { label: 'Alternative', value: 'alt' },
                                { label: 'Compact', value: 'compact' }
                            ],
                            onChange: function(value) {
                                setAttributes({ gridLayout: value });
                            }
                        }),
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
                        el('div', { style: { marginBottom: '16px' } },
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

                    // Animation Panel
                    el(PanelBody, { title: 'Animations', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Enable Particles',
                            checked: attributes.enableParticles,
                            onChange: function(value) {
                                setAttributes({ enableParticles: value });
                            }
                        }),
                        el(ToggleControl, {
                            label: 'Enable Hover Effects',
                            checked: attributes.enableHoverEffects,
                            onChange: function(value) {
                                setAttributes({ enableHoverEffects: value });
                            }
                        }),
                        el(ToggleControl, {
                            label: 'Enable Magnetic Buttons',
                            checked: attributes.enableMagneticButtons,
                            onChange: function(value) {
                                setAttributes({ enableMagneticButtons: value });
                            }
                        })
                    )
                ),

                // Block Preview
                el('div', blockProps,
                    el(ServerSideRender, {
                        block: 'alpacode/business-card-bento',
                        attributes: attributes
                    })
                )
            );
        },

        save: function() {
            return null; // Server-side rendered
        }
    });
})(window.wp);
