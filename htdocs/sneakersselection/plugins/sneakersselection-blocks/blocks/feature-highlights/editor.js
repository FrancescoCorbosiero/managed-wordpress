(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, RangeControl, Button } = wp.components;
    const { createElement: el, Fragment, useState } = wp.element;
    const { __ } = wp.i18n;

    const iconOptions = [
        { label: __('Comfort', 'sneakersselection-blocks'), value: 'comfort' },
        { label: __('Durability', 'sneakersselection-blocks'), value: 'durability' },
        { label: __('Lightweight', 'sneakersselection-blocks'), value: 'lightweight' },
        { label: __('Style', 'sneakersselection-blocks'), value: 'style' },
        { label: __('Breathable', 'sneakersselection-blocks'), value: 'breathable' },
        { label: __('Traction', 'sneakersselection-blocks'), value: 'traction' },
        { label: __('Support', 'sneakersselection-blocks'), value: 'support' },
        { label: __('Waterproof', 'sneakersselection-blocks'), value: 'waterproof' }
    ];

    registerBlockType('sneakersselection/feature-highlights', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { heading, features, columns, layout, iconStyle } = attributes;

            const [editingFeature, setEditingFeature] = useState(null);

            const blockProps = useBlockProps({
                className: `ss-block ss-feature-highlights ss-feature-highlights--${layout} ss-feature-highlights--icons-${iconStyle}`
            });

            const updateFeature = (index, key, value) => {
                const newFeatures = [...features];
                newFeatures[index] = { ...newFeatures[index], [key]: value };
                setAttributes({ features: newFeatures });
            };

            const addFeature = () => {
                setAttributes({
                    features: [...features, { icon: 'style', title: 'New Feature', description: 'Feature description' }]
                });
            };

            const removeFeature = (index) => {
                setAttributes({ features: features.filter((_, i) => i !== index) });
                setEditingFeature(null);
            };

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Settings', 'sneakersselection-blocks'), initialOpen: true },
                        el(TextControl, {
                            label: __('Heading', 'sneakersselection-blocks'),
                            value: heading,
                            onChange: (value) => setAttributes({ heading: value })
                        }),
                        el(RangeControl, {
                            label: __('Columns', 'sneakersselection-blocks'),
                            value: columns,
                            onChange: (value) => setAttributes({ columns: value }),
                            min: 2,
                            max: 4
                        }),
                        el(SelectControl, {
                            label: __('Layout', 'sneakersselection-blocks'),
                            value: layout,
                            options: [
                                { label: __('Grid', 'sneakersselection-blocks'), value: 'grid' },
                                { label: __('List', 'sneakersselection-blocks'), value: 'list' }
                            ],
                            onChange: (value) => setAttributes({ layout: value })
                        }),
                        el(SelectControl, {
                            label: __('Icon Style', 'sneakersselection-blocks'),
                            value: iconStyle,
                            options: [
                                { label: __('Filled', 'sneakersselection-blocks'), value: 'filled' },
                                { label: __('Outlined', 'sneakersselection-blocks'), value: 'outlined' },
                                { label: __('Minimal', 'sneakersselection-blocks'), value: 'minimal' }
                            ],
                            onChange: (value) => setAttributes({ iconStyle: value })
                        })
                    ),
                    el(PanelBody, { title: __('Features', 'sneakersselection-blocks'), initialOpen: false },
                        el('div', { className: 'ss-editor-repeater' },
                            features.map((feature, index) =>
                                el('div', { key: index, className: 'ss-editor-repeater__item' },
                                    el('div', { className: 'ss-editor-repeater__item-header' },
                                        el('span', { className: 'ss-editor-repeater__item-title' }, feature.title),
                                        el(Button, {
                                            isSmall: true,
                                            onClick: () => setEditingFeature(editingFeature === index ? null : index)
                                        }, editingFeature === index ? __('Close', 'sneakersselection-blocks') : __('Edit', 'sneakersselection-blocks'))
                                    ),
                                    editingFeature === index && el('div', { style: { marginTop: '12px' } },
                                        el(SelectControl, {
                                            label: __('Icon', 'sneakersselection-blocks'),
                                            value: feature.icon,
                                            options: iconOptions,
                                            onChange: (value) => updateFeature(index, 'icon', value)
                                        }),
                                        el(TextControl, {
                                            label: __('Title', 'sneakersselection-blocks'),
                                            value: feature.title,
                                            onChange: (value) => updateFeature(index, 'title', value)
                                        }),
                                        el(TextareaControl, {
                                            label: __('Description', 'sneakersselection-blocks'),
                                            value: feature.description,
                                            onChange: (value) => updateFeature(index, 'description', value)
                                        }),
                                        el(Button, {
                                            isDestructive: true,
                                            isSmall: true,
                                            onClick: () => removeFeature(index)
                                        }, __('Remove Feature', 'sneakersselection-blocks'))
                                    )
                                )
                            ),
                            el('button', { className: 'ss-editor-repeater__add', onClick: addFeature },
                                '+ ' + __('Add Feature', 'sneakersselection-blocks')
                            )
                        )
                    )
                ),
                el('section', blockProps,
                    el('div', { className: 'ss-container' },
                        heading && el('h2', { className: 'ss-heading ss-heading--3 ss-feature-highlights__heading' }, heading),
                        el('div', { className: `ss-grid ss-grid--${columns} ss-feature-highlights__grid` },
                            features.map((feature, index) =>
                                el('div', { key: index, className: 'ss-feature-highlights__item' },
                                    el('div', { className: 'ss-feature-highlights__icon' },
                                        el('span', null, '★')
                                    ),
                                    feature.title && el('h3', { className: 'ss-heading ss-heading--5 ss-feature-highlights__title' }, feature.title),
                                    feature.description && el('p', { className: 'ss-text ss-text--sm ss-feature-highlights__description' }, feature.description)
                                )
                            )
                        )
                    )
                )
            );
        }
    });
})(window.wp);
