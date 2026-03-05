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
    var ButtonGroup = wp.components.ButtonGroup;
    var RangeControl = wp.components.RangeControl;
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

    registerBlockType('alpacode/business-card', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            var blockProps = useBlockProps({
                className: 'alpacode-business-card-editor'
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

                    // Design Panel
                    el(PanelBody, { title: 'Design', initialOpen: false },
                        el(SelectControl, {
                            label: 'Style Variant',
                            value: attributes.variant,
                            options: [
                                { label: 'Elegant', value: 'elegant' },
                                { label: 'Minimal', value: 'minimal' },
                                { label: 'Bold', value: 'bold' },
                                { label: 'Glassmorphism', value: 'glass' }
                            ],
                            onChange: function(value) {
                                setAttributes({ variant: value });
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
                        })
                    ),

                    // Animation Panel
                    el(PanelBody, { title: 'Animations', initialOpen: false },
                        el(SelectControl, {
                            label: 'Animation Intensity',
                            value: attributes.animationIntensity,
                            options: [
                                { label: 'High', value: 'high' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'Low', value: 'low' }
                            ],
                            onChange: function(value) {
                                setAttributes({ animationIntensity: value });
                            }
                        }),
                        el(ToggleControl, {
                            label: 'Enable Particles',
                            checked: attributes.enableParticles,
                            onChange: function(value) {
                                setAttributes({ enableParticles: value });
                            }
                        }),
                        el(ToggleControl, {
                            label: 'Enable Glow Effect',
                            checked: attributes.enableGlowEffect,
                            onChange: function(value) {
                                setAttributes({ enableGlowEffect: value });
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
                        block: 'alpacode/business-card',
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
