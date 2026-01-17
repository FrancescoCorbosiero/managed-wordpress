(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { PanelBody, TextControl, SelectControl, ToggleControl, FormTokenField } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/size-selector', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                label, sizeType, sizes, unavailableSizes, lowStockSizes,
                showSizeGuideLink, sizeGuideUrl, layout
            } = attributes;

            const blockProps = useBlockProps({
                className: `ss-block ss-size-selector ss-size-selector--${layout}`
            });

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Settings', 'sneakersselection-blocks'), initialOpen: true },
                        el(TextControl, {
                            label: __('Label', 'sneakersselection-blocks'),
                            value: label,
                            onChange: (value) => setAttributes({ label: value })
                        }),
                        el(SelectControl, {
                            label: __('Size Type', 'sneakersselection-blocks'),
                            value: sizeType,
                            options: [
                                { label: 'US', value: 'US' },
                                { label: 'UK', value: 'UK' },
                                { label: 'EU', value: 'EU' }
                            ],
                            onChange: (value) => setAttributes({ sizeType: value })
                        }),
                        el(SelectControl, {
                            label: __('Layout', 'sneakersselection-blocks'),
                            value: layout,
                            options: [
                                { label: __('Grid', 'sneakersselection-blocks'), value: 'grid' },
                                { label: __('Inline', 'sneakersselection-blocks'), value: 'inline' }
                            ],
                            onChange: (value) => setAttributes({ layout: value })
                        })
                    ),
                    el(PanelBody, { title: __('Sizes', 'sneakersselection-blocks'), initialOpen: false },
                        el(FormTokenField, {
                            label: __('Available Sizes', 'sneakersselection-blocks'),
                            value: sizes,
                            onChange: (value) => setAttributes({ sizes: value })
                        }),
                        el(FormTokenField, {
                            label: __('Unavailable Sizes', 'sneakersselection-blocks'),
                            value: unavailableSizes,
                            suggestions: sizes,
                            onChange: (value) => setAttributes({ unavailableSizes: value })
                        }),
                        el(FormTokenField, {
                            label: __('Low Stock Sizes', 'sneakersselection-blocks'),
                            value: lowStockSizes,
                            suggestions: sizes,
                            onChange: (value) => setAttributes({ lowStockSizes: value }),
                            help: __('These sizes will show a warning indicator', 'sneakersselection-blocks')
                        })
                    ),
                    el(PanelBody, { title: __('Size Guide', 'sneakersselection-blocks'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Show Size Guide Link', 'sneakersselection-blocks'),
                            checked: showSizeGuideLink,
                            onChange: (value) => setAttributes({ showSizeGuideLink: value })
                        }),
                        showSizeGuideLink && el(TextControl, {
                            label: __('Size Guide URL', 'sneakersselection-blocks'),
                            value: sizeGuideUrl,
                            onChange: (value) => setAttributes({ sizeGuideUrl: value })
                        })
                    )
                ),
                el('div', blockProps,
                    el('div', { className: 'ss-size-selector__header' },
                        el('span', { className: 'ss-label ss-size-selector__label' },
                            label,
                            el('span', { className: 'ss-size-selector__type' }, ` (${sizeType})`)
                        ),
                        el('div', { className: 'ss-size-selector__actions' },
                            el('span', { className: 'ss-text ss-text--sm ss-size-selector__selected' }, '-'),
                            showSizeGuideLink && el('a', { href: '#', className: 'ss-size-selector__guide-link' }, 'Size Guide')
                        )
                    ),
                    el('div', { className: 'ss-sizes ss-size-selector__sizes' },
                        sizes.map(size => {
                            const isUnavailable = unavailableSizes.includes(size);
                            const isLowStock = lowStockSizes.includes(size) && !isUnavailable;
                            let className = 'ss-size';
                            if (isUnavailable) className += ' ss-size--disabled';
                            if (isLowStock) className += ' ss-size--low-stock';

                            return el('button', { key: size, className, disabled: isUnavailable }, size);
                        })
                    )
                )
            );
        }
    });
})(window.wp);
