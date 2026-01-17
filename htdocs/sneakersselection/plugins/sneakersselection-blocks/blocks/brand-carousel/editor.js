(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, RangeControl, SelectControl, ToggleControl, Button, ColorPicker } = wp.components;
    const { createElement: el, Fragment, useState } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/brand-carousel', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                heading, brands, speed, direction, pauseOnHover,
                showBrandNames, grayscale, backgroundColor
            } = attributes;

            const [editingBrand, setEditingBrand] = useState(null);

            const blockProps = useBlockProps({
                className: `ss-block ss-brand-carousel ${grayscale ? 'ss-brand-carousel--grayscale' : ''}`,
                style: { '--ss-carousel-bg': backgroundColor }
            });

            const updateBrand = (index, key, value) => {
                const newBrands = [...brands];
                newBrands[index] = { ...newBrands[index], [key]: value };
                setAttributes({ brands: newBrands });
            };

            const addBrand = () => {
                setAttributes({
                    brands: [...brands, { name: 'New Brand', logo: '', url: '#' }]
                });
            };

            const removeBrand = (index) => {
                setAttributes({
                    brands: brands.filter((_, i) => i !== index)
                });
                setEditingBrand(null);
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
                            label: __('Animation Speed (seconds)', 'sneakersselection-blocks'),
                            value: speed,
                            onChange: (value) => setAttributes({ speed: value }),
                            min: 10,
                            max: 60
                        }),
                        el(SelectControl, {
                            label: __('Direction', 'sneakersselection-blocks'),
                            value: direction,
                            options: [
                                { label: __('Left', 'sneakersselection-blocks'), value: 'left' },
                                { label: __('Right', 'sneakersselection-blocks'), value: 'right' }
                            ],
                            onChange: (value) => setAttributes({ direction: value })
                        }),
                        el(ToggleControl, {
                            label: __('Pause on Hover', 'sneakersselection-blocks'),
                            checked: pauseOnHover,
                            onChange: (value) => setAttributes({ pauseOnHover: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show Brand Names', 'sneakersselection-blocks'),
                            checked: showBrandNames,
                            onChange: (value) => setAttributes({ showBrandNames: value })
                        }),
                        el(ToggleControl, {
                            label: __('Grayscale Logos', 'sneakersselection-blocks'),
                            checked: grayscale,
                            onChange: (value) => setAttributes({ grayscale: value })
                        })
                    ),
                    el(PanelBody, { title: __('Background', 'sneakersselection-blocks'), initialOpen: false },
                        el(ColorPicker, {
                            color: backgroundColor,
                            onChangeComplete: (value) => setAttributes({ backgroundColor: value.hex })
                        })
                    ),
                    el(PanelBody, { title: __('Brands', 'sneakersselection-blocks'), initialOpen: false },
                        el('div', { className: 'ss-editor-repeater' },
                            brands.map((brand, index) =>
                                el('div', { key: index, className: 'ss-editor-repeater__item' },
                                    el('div', { className: 'ss-editor-repeater__item-header' },
                                        el('span', { className: 'ss-editor-repeater__item-title' }, brand.name),
                                        el(Button, {
                                            isSmall: true,
                                            onClick: () => setEditingBrand(editingBrand === index ? null : index)
                                        }, editingBrand === index ? __('Close', 'sneakersselection-blocks') : __('Edit', 'sneakersselection-blocks'))
                                    ),
                                    editingBrand === index && el('div', { style: { marginTop: '12px' } },
                                        el(TextControl, {
                                            label: __('Brand Name', 'sneakersselection-blocks'),
                                            value: brand.name,
                                            onChange: (value) => updateBrand(index, 'name', value)
                                        }),
                                        el(TextControl, {
                                            label: __('URL', 'sneakersselection-blocks'),
                                            value: brand.url,
                                            onChange: (value) => updateBrand(index, 'url', value)
                                        }),
                                        el(MediaUploadCheck, null,
                                            el(MediaUpload, {
                                                onSelect: (media) => updateBrand(index, 'logo', media.url),
                                                allowedTypes: ['image'],
                                                render: ({ open }) => el(Button, {
                                                    onClick: open,
                                                    variant: 'secondary',
                                                    style: { marginBottom: '8px' }
                                                }, brand.logo ? __('Change Logo', 'sneakersselection-blocks') : __('Add Logo', 'sneakersselection-blocks'))
                                            })
                                        ),
                                        el(Button, {
                                            isDestructive: true,
                                            isSmall: true,
                                            onClick: () => removeBrand(index)
                                        }, __('Remove Brand', 'sneakersselection-blocks'))
                                    )
                                )
                            ),
                            el('button', { className: 'ss-editor-repeater__add', onClick: addBrand },
                                '+ ' + __('Add Brand', 'sneakersselection-blocks')
                            )
                        )
                    )
                ),
                el('section', blockProps,
                    heading && el('div', { className: 'ss-container' },
                        el('h2', { className: 'ss-heading ss-heading--5 ss-brand-carousel__heading' }, heading)
                    ),
                    el('div', { className: 'ss-brand-carousel__preview' },
                        brands.map((brand, index) =>
                            el('div', { key: index, className: 'ss-brand-carousel__item' },
                                brand.logo
                                    ? el('img', { src: brand.logo, alt: brand.name })
                                    : el('span', { className: 'ss-brand-carousel__placeholder' }, brand.name),
                                showBrandNames && el('span', { className: 'ss-brand-carousel__name' }, brand.name)
                            )
                        )
                    )
                )
            );
        }
    });
})(window.wp);
