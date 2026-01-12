/**
 * Stats Block - Premium Editor Script
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
        ToggleControl,
        SelectControl,
        RangeControl
    } = wp.components;
    const { createElement: el } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updateStat = function (index, key, value) {
            const newStats = [...attributes.stats];
            newStats[index] = { ...newStats[index], [key]: value };
            setAttributes({ stats: newStats });
        };

        const addStat = function () {
            const newStats = [...attributes.stats, {
                number: '0',
                prefix: '',
                suffix: '',
                label: 'New Stat',
                showProgress: false,
                progressValue: 0
            }];
            setAttributes({ stats: newStats });
        };

        const removeStat = function (index) {
            const newStats = attributes.stats.filter(function (_, i) { return i !== index; });
            setAttributes({ stats: newStats });
        };

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
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
                    })
                ),
                el(
                    PanelBody,
                    { title: 'Layout', initialOpen: false },
                    el(SelectControl, {
                        label: 'Layout Style',
                        value: attributes.layout,
                        options: [
                            { label: 'Grid', value: 'grid' },
                            { label: 'Inline', value: 'inline' }
                        ],
                        onChange: function (value) { setAttributes({ layout: value }); }
                    }),
                    el(RangeControl, {
                        label: 'Animation Duration (ms)',
                        value: attributes.animationDuration,
                        min: 500,
                        max: 5000,
                        step: 100,
                        onChange: function (value) { setAttributes({ animationDuration: value }); }
                    }),
                    el(ToggleControl, {
                        label: 'Staggered Animation',
                        checked: attributes.enableStagger,
                        onChange: function (value) { setAttributes({ enableStagger: value }); }
                    })
                ),
                el(
                    PanelBody,
                    { title: 'Stats (' + attributes.stats.length + ')', initialOpen: false },
                    attributes.stats.map(function (stat, index) {
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
                                        marginBottom: '8px'
                                    }
                                },
                                el('strong', null, 'Stat ' + (index + 1)),
                                el('button', {
                                    onClick: function () { removeStat(index); },
                                    style: {
                                        background: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }
                                }, 'Remove')
                            ),
                            el(TextControl, {
                                label: 'Number',
                                value: stat.number,
                                onChange: function (value) { updateStat(index, 'number', value); }
                            }),
                            el(TextControl, {
                                label: 'Prefix',
                                value: stat.prefix,
                                onChange: function (value) { updateStat(index, 'prefix', value); }
                            }),
                            el(TextControl, {
                                label: 'Suffix',
                                value: stat.suffix,
                                onChange: function (value) { updateStat(index, 'suffix', value); }
                            }),
                            el(TextControl, {
                                label: 'Label',
                                value: stat.label,
                                onChange: function (value) { updateStat(index, 'label', value); }
                            }),
                            el(ToggleControl, {
                                label: 'Show Progress Bar',
                                checked: stat.showProgress,
                                onChange: function (value) { updateStat(index, 'showProgress', value); }
                            }),
                            stat.showProgress && el(RangeControl, {
                                label: 'Progress Value',
                                value: stat.progressValue,
                                min: 0,
                                max: 100,
                                onChange: function (value) { updateStat(index, 'progressValue', value); }
                            })
                        );
                    }),
                    el('button', {
                        onClick: addStat,
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
                    }, '+ Add Stat')
                )
            ),
            el(ServerSideRender, {
                block: 'alpacode/stats',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/stats');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/stats', {
                edit: Edit
            });
        }
    });

})(window.wp);
