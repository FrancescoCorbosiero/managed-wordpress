(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, ToggleControl, Button, FormTokenField } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/product-showcase', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                brand, name, colorway, styleCode,
                price, originalPrice, currency, badge, description,
                mainImage, mainImageId, galleryImages,
                sizes, unavailableSizes,
                buttonText, buttonUrl, showSizeSelector, showGallery
            } = attributes;

            const blockProps = useBlockProps({
                className: 'ss-block ss-product-showcase'
            });

            const badgeLabels = {
                '': __('None', 'sneakersselection-blocks'),
                'new': __('New', 'sneakersselection-blocks'),
                'sale': __('Sale', 'sneakersselection-blocks'),
                'limited': __('Limited', 'sneakersselection-blocks'),
                'soldout': __('Sold Out', 'sneakersselection-blocks')
            };

            const onSelectMainImage = (media) => {
                setAttributes({ mainImage: media.url, mainImageId: media.id });
            };

            const onSelectGalleryImages = (media) => {
                setAttributes({
                    galleryImages: media.map(img => ({ url: img.url, id: img.id }))
                });
            };

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Product Info', 'sneakersselection-blocks'), initialOpen: true },
                        el(TextControl, {
                            label: __('Brand', 'sneakersselection-blocks'),
                            value: brand,
                            onChange: (value) => setAttributes({ brand: value })
                        }),
                        el(TextControl, {
                            label: __('Product Name', 'sneakersselection-blocks'),
                            value: name,
                            onChange: (value) => setAttributes({ name: value })
                        }),
                        el(TextControl, {
                            label: __('Colorway', 'sneakersselection-blocks'),
                            value: colorway,
                            onChange: (value) => setAttributes({ colorway: value })
                        }),
                        el(TextControl, {
                            label: __('Style Code', 'sneakersselection-blocks'),
                            value: styleCode,
                            onChange: (value) => setAttributes({ styleCode: value })
                        }),
                        el(TextareaControl, {
                            label: __('Description', 'sneakersselection-blocks'),
                            value: description,
                            onChange: (value) => setAttributes({ description: value })
                        })
                    ),
                    el(PanelBody, { title: __('Pricing', 'sneakersselection-blocks'), initialOpen: false },
                        el(TextControl, {
                            label: __('Currency Symbol', 'sneakersselection-blocks'),
                            value: currency,
                            onChange: (value) => setAttributes({ currency: value })
                        }),
                        el(TextControl, {
                            label: __('Price', 'sneakersselection-blocks'),
                            value: price,
                            onChange: (value) => setAttributes({ price: value })
                        }),
                        el(TextControl, {
                            label: __('Original Price (for sale)', 'sneakersselection-blocks'),
                            value: originalPrice,
                            onChange: (value) => setAttributes({ originalPrice: value }),
                            help: __('Leave empty if not on sale', 'sneakersselection-blocks')
                        }),
                        el(SelectControl, {
                            label: __('Badge', 'sneakersselection-blocks'),
                            value: badge,
                            options: Object.entries(badgeLabels).map(([value, label]) => ({ value, label })),
                            onChange: (value) => setAttributes({ badge: value })
                        })
                    ),
                    el(PanelBody, { title: __('Sizes', 'sneakersselection-blocks'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Show Size Selector', 'sneakersselection-blocks'),
                            checked: showSizeSelector,
                            onChange: (value) => setAttributes({ showSizeSelector: value })
                        }),
                        el(FormTokenField, {
                            label: __('Available Sizes', 'sneakersselection-blocks'),
                            value: sizes,
                            onChange: (value) => setAttributes({ sizes: value })
                        }),
                        el(FormTokenField, {
                            label: __('Unavailable Sizes', 'sneakersselection-blocks'),
                            value: unavailableSizes,
                            onChange: (value) => setAttributes({ unavailableSizes: value }),
                            help: __('These sizes will appear crossed out', 'sneakersselection-blocks')
                        })
                    ),
                    el(PanelBody, { title: __('Button', 'sneakersselection-blocks'), initialOpen: false },
                        el(TextControl, {
                            label: __('Button Text', 'sneakersselection-blocks'),
                            value: buttonText,
                            onChange: (value) => setAttributes({ buttonText: value })
                        }),
                        el(TextControl, {
                            label: __('Button URL', 'sneakersselection-blocks'),
                            value: buttonUrl,
                            onChange: (value) => setAttributes({ buttonUrl: value })
                        })
                    ),
                    el(PanelBody, { title: __('Gallery', 'sneakersselection-blocks'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Show Gallery Thumbnails', 'sneakersselection-blocks'),
                            checked: showGallery,
                            onChange: (value) => setAttributes({ showGallery: value })
                        }),
                        el('div', { style: { marginTop: '16px' } },
                            el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
                                __('Gallery Images', 'sneakersselection-blocks')
                            ),
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: onSelectGalleryImages,
                                    allowedTypes: ['image'],
                                    multiple: true,
                                    gallery: true,
                                    value: galleryImages.map(img => img.id),
                                    render: ({ open }) => el(Button, { onClick: open, variant: 'secondary' },
                                        galleryImages.length ? __('Edit Gallery', 'sneakersselection-blocks') : __('Add Gallery Images', 'sneakersselection-blocks')
                                    )
                                })
                            )
                        )
                    )
                ),
                el('section', blockProps,
                    el('div', { className: 'ss-container ss-product-showcase__container' },
                        el('div', { className: 'ss-product-showcase__gallery' },
                            badge && el('span', { className: `ss-badge ss-badge--${badge} ss-product-showcase__badge` }, badgeLabels[badge]),
                            el('div', { className: 'ss-product-showcase__main-image' },
                                el(MediaUploadCheck, null,
                                    el(MediaUpload, {
                                        onSelect: onSelectMainImage,
                                        allowedTypes: ['image'],
                                        value: mainImageId,
                                        render: ({ open }) => mainImage
                                            ? el('div', { onClick: open, style: { cursor: 'pointer' } },
                                                el('img', { src: mainImage, alt: name })
                                            )
                                            : el('div', { className: 'ss-editor-image-placeholder', onClick: open },
                                                el('svg', { width: 64, height: 64, viewBox: '0 0 24 24', fill: 'currentColor' },
                                                    el('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
                                                ),
                                                el('span', { className: 'ss-editor-image-placeholder__text' }, __('Click to upload product image', 'sneakersselection-blocks'))
                                            )
                                    })
                                )
                            )
                        ),
                        el('div', { className: 'ss-product-showcase__details' },
                            el('div', { className: 'ss-product-showcase__header' },
                                brand && el('span', { className: 'ss-label ss-product-showcase__brand' }, brand),
                                el('h2', { className: 'ss-heading ss-heading--2 ss-product-showcase__name' }, name),
                                colorway && el('p', { className: 'ss-text ss-product-showcase__colorway' }, colorway),
                                styleCode && el('p', { className: 'ss-text ss-text--sm ss-product-showcase__style-code' }, 'Style: ' + styleCode)
                            ),
                            el('div', { className: 'ss-price ss-product-showcase__price' },
                                el('span', { className: 'ss-price__current' }, currency + price),
                                originalPrice && el('span', { className: 'ss-price__original' }, currency + originalPrice)
                            ),
                            description && el('p', { className: 'ss-text ss-product-showcase__description' }, description),
                            showSizeSelector && sizes.length > 0 && el('div', { className: 'ss-product-showcase__sizes' },
                                el('div', { className: 'ss-product-showcase__sizes-header' },
                                    el('span', { className: 'ss-label' }, 'Select Size')
                                ),
                                el('div', { className: 'ss-sizes' },
                                    sizes.map(size => el('button', {
                                        key: size,
                                        className: `ss-size ${unavailableSizes.includes(size) ? 'ss-size--disabled' : ''}`
                                    }, size))
                                )
                            ),
                            el('div', { className: 'ss-product-showcase__actions' },
                                el('span', { className: 'ss-button ss-button--primary ss-button--large' }, buttonText)
                            )
                        )
                    )
                )
            );
        }
    });
})(window.wp);
