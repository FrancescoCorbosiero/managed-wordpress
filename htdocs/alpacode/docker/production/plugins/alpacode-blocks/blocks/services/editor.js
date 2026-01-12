/**
 * Services Block - Premium Editor Script
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
        SelectControl,
        RangeControl
    } = wp.components;
    const { createElement: el } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const iconOptions = [
        { label: 'Code', value: 'code' },
        { label: 'Server', value: 'server' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'Shield', value: 'shield' },
        { label: 'Zap', value: 'zap' },
        { label: 'Users', value: 'users' },
        { label: 'Globe', value: 'globe' },
        { label: 'Database', value: 'database' },
        { label: 'Cloud', value: 'cloud' },
        { label: 'Terminal', value: 'terminal' },
        { label: 'Layers', value: 'layers' },
        { label: 'Settings', value: 'settings' }
    ];

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updateService = function (index, key, value) {
            const newServices = [...attributes.services];
            newServices[index] = { ...newServices[index], [key]: value };
            setAttributes({ services: newServices });
        };

        const addService = function () {
            const newServices = [...attributes.services, {
                icon: 'code',
                title: 'New Service',
                description: 'Description of the new service.'
            }];
            setAttributes({ services: newServices });
        };

        const removeService = function (index) {
            const newServices = attributes.services.filter(function (_, i) { return i !== index; });
            setAttributes({ services: newServices });
        };

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                // Content Panel
                el(
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
                        label: 'Subheading',
                        value: attributes.subheading,
                        rows: 2,
                        onChange: function (value) { setAttributes({ subheading: value }); }
                    })
                ),
                // Layout Panel
                el(
                    PanelBody,
                    { title: 'Layout', initialOpen: false },
                    el(RangeControl, {
                        label: 'Columns',
                        value: attributes.columns,
                        min: 2,
                        max: 4,
                        onChange: function (value) { setAttributes({ columns: value }); }
                    }),
                    el(SelectControl, {
                        label: 'Card Style',
                        value: attributes.cardStyle,
                        options: [
                            { label: 'Default (Filled)', value: 'default' },
                            { label: 'Bordered', value: 'bordered' },
                            { label: 'Glass', value: 'glass' }
                        ],
                        onChange: function (value) { setAttributes({ cardStyle: value }); }
                    })
                ),
                // Animation Panel
                el(
                    PanelBody,
                    { title: 'Animations', initialOpen: false },
                    el(ToggleControl, {
                        label: 'Enable 3D Tilt Effect',
                        help: 'Cards tilt towards the cursor on hover',
                        checked: attributes.enableTilt,
                        onChange: function (value) { setAttributes({ enableTilt: value }); }
                    }),
                    el(ToggleControl, {
                        label: 'Staggered Entrance',
                        help: 'Cards appear one by one on scroll',
                        checked: attributes.enableStagger,
                        onChange: function (value) { setAttributes({ enableStagger: value }); }
                    })
                ),
                // Services Panel
                el(
                    PanelBody,
                    { title: 'Services (' + attributes.services.length + ')', initialOpen: false },
                    attributes.services.map(function (service, index) {
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
                                        marginBottom: '8px'
                                    }
                                },
                                el('strong', null, 'Service ' + (index + 1)),
                                el(
                                    'button',
                                    {
                                        onClick: function () { removeService(index); },
                                        style: {
                                            background: '#dc2626',
                                            color: 'white',
                                            border: 'none',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }
                                    },
                                    'Remove'
                                )
                            ),
                            el(SelectControl, {
                                label: 'Icon',
                                value: service.icon,
                                options: iconOptions,
                                onChange: function (value) { updateService(index, 'icon', value); }
                            }),
                            el(TextControl, {
                                label: 'Title',
                                value: service.title,
                                onChange: function (value) { updateService(index, 'title', value); }
                            }),
                            el(TextareaControl, {
                                label: 'Description',
                                value: service.description,
                                rows: 2,
                                onChange: function (value) { updateService(index, 'description', value); }
                            })
                        );
                    }),
                    el(
                        'button',
                        {
                            onClick: addService,
                            style: {
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: '2px dashed #c4c4c4',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: '#757575',
                                fontWeight: '500'
                            }
                        },
                        '+ Add Service'
                    )
                )
            ),
            el(ServerSideRender, {
                block: 'alpacode/services',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/services');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/services', {
                edit: Edit
            });
        }
    });

})(window.wp);
