(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, RangeControl, ToggleControl, Button, SelectControl } = wp.components;
    const { createElement: el, Fragment, useState } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/sneaker-grid', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                heading, eyebrow, columns, products, currency,
                showBrand, showPrice, enableHoverEffect,
                viewAllText, viewAllUrl
            } = attributes;

            const [editingProduct, setEditingProduct] = useState(null);

            const blockProps = useBlockProps({
                className: 'ss-block ss-sneaker-grid'
            });

            const updateProduct = (index, key, value) => {
                const newProducts = [...products];
                newProducts[index] = { ...newProducts[index], [key]: value };
                setAttributes({ products: newProducts });
            };

            const addProduct = () => {
                const newProduct = {
                    id: Date.now(),
                    brand: 'Brand',
                    name: 'New Sneaker',
                    price: '100',
                    image: '',
                    url: '#',
                    badge: ''
                };
                setAttributes({ products: [...products, newProduct] });
            };

            const removeProduct = (index) => {
                const newProducts = products.filter((_, i) => i !== index);
                setAttributes({ products: newProducts });
                setEditingProduct(null);
            };

            const badgeOptions = [
                { label: __('None', 'sneakersselection-blocks'), value: '' },
                { label: __('New', 'sneakersselection-blocks'), value: 'new' },
                { label: __('Sale', 'sneakersselection-blocks'), value: 'sale' },
                { label: __('Limited', 'sneakersselection-blocks'), value: 'limited' },
                { label: __('Sold Out', 'sneakersselection-blocks'), value: 'soldout' }
            ];

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Section Settings', 'sneakersselection-blocks'), initialOpen: true },
                        el(TextControl, {
                            label: __('Eyebrow Text', 'sneakersselection-blocks'),
                            value: eyebrow,
                            onChange: (value) => setAttributes({ eyebrow: value })
                        }),
                        el(TextControl, {
                            label: __('Heading', 'sneakersselection-blocks'),
                            value: heading,
                            onChange: (value) => setAttributes({ heading: value })
                        }),
                        el(TextControl, {
                            label: __('View All Text', 'sneakersselection-blocks'),
                            value: viewAllText,
                            onChange: (value) => setAttributes({ viewAllText: value })
                        }),
                        el(TextControl, {
                            label: __('View All URL', 'sneakersselection-blocks'),
                            value: viewAllUrl,
                            onChange: (value) => setAttributes({ viewAllUrl: value })
                        })
                    ),
                    el(PanelBody, { title: __('Grid Settings', 'sneakersselection-blocks'), initialOpen: false },
                        el(RangeControl, {
                            label: __('Columns', 'sneakersselection-blocks'),
                            value: columns,
                            onChange: (value) => setAttributes({ columns: value }),
                            min: 2,
                            max: 4
                        }),
                        el(TextControl, {
                            label: __('Currency Symbol', 'sneakersselection-blocks'),
                            value: currency,
                            onChange: (value) => setAttributes({ currency: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show Brand', 'sneakersselection-blocks'),
                            checked: showBrand,
                            onChange: (value) => setAttributes({ showBrand: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show Price', 'sneakersselection-blocks'),
                            checked: showPrice,
                            onChange: (value) => setAttributes({ showPrice: value })
                        }),
                        el(ToggleControl, {
                            label: __('Hover Effects', 'sneakersselection-blocks'),
                            checked: enableHoverEffect,
                            onChange: (value) => setAttributes({ enableHoverEffect: value })
                        })
                    ),
                    el(PanelBody, { title: __('Products', 'sneakersselection-blocks'), initialOpen: false },
                        el('div', { className: 'ss-editor-repeater' },
                            products.map((product, index) =>
                                el('div', { key: product.id, className: 'ss-editor-repeater__item' },
                                    el('div', { className: 'ss-editor-repeater__item-header' },
                                        el('span', { className: 'ss-editor-repeater__item-title' }, product.name),
                                        el(Button, {
                                            isSmall: true,
                                            onClick: () => setEditingProduct(editingProduct === index ? null : index)
                                        }, editingProduct === index ? __('Close', 'sneakersselection-blocks') : __('Edit', 'sneakersselection-blocks'))
                                    ),
                                    editingProduct === index && el('div', { style: { marginTop: '12px' } },
                                        el(TextControl, {
                                            label: __('Brand', 'sneakersselection-blocks'),
                                            value: product.brand,
                                            onChange: (value) => updateProduct(index, 'brand', value)
                                        }),
                                        el(TextControl, {
                                            label: __('Name', 'sneakersselection-blocks'),
                                            value: product.name,
                                            onChange: (value) => updateProduct(index, 'name', value)
                                        }),
                                        el(TextControl, {
                                            label: __('Price', 'sneakersselection-blocks'),
                                            value: product.price,
                                            onChange: (value) => updateProduct(index, 'price', value)
                                        }),
                                        el(TextControl, {
                                            label: __('URL', 'sneakersselection-blocks'),
                                            value: product.url,
                                            onChange: (value) => updateProduct(index, 'url', value)
                                        }),
                                        el(SelectControl, {
                                            label: __('Badge', 'sneakersselection-blocks'),
                                            value: product.badge,
                                            options: badgeOptions,
                                            onChange: (value) => updateProduct(index, 'badge', value)
                                        }),
                                        el(MediaUploadCheck, null,
                                            el(MediaUpload, {
                                                onSelect: (media) => updateProduct(index, 'image', media.url),
                                                allowedTypes: ['image'],
                                                render: ({ open }) => el(Button, { onClick: open, variant: 'secondary', style: { marginBottom: '8px' } },
                                                    product.image ? __('Change Image', 'sneakersselection-blocks') : __('Add Image', 'sneakersselection-blocks')
                                                )
                                            })
                                        ),
                                        el(Button, { isDestructive: true, isSmall: true, onClick: () => removeProduct(index) },
                                            __('Remove Product', 'sneakersselection-blocks')
                                        )
                                    )
                                )
                            ),
                            el('button', { className: 'ss-editor-repeater__add', onClick: addProduct },
                                '+ ' + __('Add Product', 'sneakersselection-blocks')
                            )
                        )
                    )
                ),
                el('section', blockProps,
                    el('div', { className: 'ss-container' },
                        (eyebrow || heading || viewAllText) && el('div', { className: 'ss-section__header ss-sneaker-grid__header' },
                            el('div', { className: 'ss-sneaker-grid__header-content' },
                                eyebrow && el('span', { className: 'ss-section__eyebrow' }, eyebrow),
                                heading && el('h2', { className: 'ss-heading ss-heading--2' }, heading)
                            ),
                            viewAllText && el('span', { className: 'ss-button ss-button--secondary' }, viewAllText, ' →')
                        ),
                        el('div', { className: `ss-grid ss-grid--${columns} ss-sneaker-grid__grid` },
                            products.map((product, index) =>
                                el('div', { key: product.id, className: 'ss-card ss-sneaker-grid__item' },
                                    el('div', { className: 'ss-card__image' },
                                        product.badge && el('div', { className: 'ss-card__badges' },
                                            el('span', { className: `ss-badge ss-badge--${product.badge}` },
                                                badgeOptions.find(b => b.value === product.badge)?.label
                                            )
                                        ),
                                        product.image
                                            ? el('img', { src: product.image, alt: product.name })
                                            : el('div', { className: 'ss-sneaker-grid__placeholder' },
                                                el('svg', { width: 48, height: 48, viewBox: '0 0 24 24', fill: 'currentColor' },
                                                    el('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
                                                )
                                            )
                                    ),
                                    el('div', { className: 'ss-card__content' },
                                        showBrand && product.brand && el('span', { className: 'ss-card__brand' }, product.brand),
                                        el('h3', { className: 'ss-card__title' }, product.name),
                                        showPrice && product.price && el('div', { className: 'ss-price' },
                                            el('span', { className: 'ss-price__current' }, currency + product.price)
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    });
})(window.wp);
