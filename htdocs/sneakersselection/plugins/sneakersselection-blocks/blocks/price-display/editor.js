(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { PanelBody, TextControl, SelectControl, ToggleControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/price-display', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                retailPrice, resalePrice, currency,
                retailLabel, resaleLabel,
                showResale, showDifference, layout, highlightPrice
            } = attributes;

            const blockProps = useBlockProps({
                className: `ss-block ss-price-display ss-price-display--${layout}`
            });

            const retailNum = parseFloat(retailPrice.replace(',', '')) || 0;
            const resaleNum = parseFloat(resalePrice.replace(',', '')) || 0;
            const difference = resaleNum - retailNum;
            const percentage = retailNum > 0 ? Math.round((difference / retailNum) * 100) : 0;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Prices', 'sneakersselection-blocks'), initialOpen: true },
                        el(TextControl, {
                            label: __('Currency Symbol', 'sneakersselection-blocks'),
                            value: currency,
                            onChange: (value) => setAttributes({ currency: value })
                        }),
                        el(TextControl, {
                            label: __('Retail Price', 'sneakersselection-blocks'),
                            value: retailPrice,
                            onChange: (value) => setAttributes({ retailPrice: value })
                        }),
                        el(TextControl, {
                            label: __('Retail Label', 'sneakersselection-blocks'),
                            value: retailLabel,
                            onChange: (value) => setAttributes({ retailLabel: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show Resale Price', 'sneakersselection-blocks'),
                            checked: showResale,
                            onChange: (value) => setAttributes({ showResale: value })
                        }),
                        showResale && el(TextControl, {
                            label: __('Resale Price', 'sneakersselection-blocks'),
                            value: resalePrice,
                            onChange: (value) => setAttributes({ resalePrice: value })
                        }),
                        showResale && el(TextControl, {
                            label: __('Resale Label', 'sneakersselection-blocks'),
                            value: resaleLabel,
                            onChange: (value) => setAttributes({ resaleLabel: value })
                        }),
                        showResale && el(ToggleControl, {
                            label: __('Show Price Difference', 'sneakersselection-blocks'),
                            checked: showDifference,
                            onChange: (value) => setAttributes({ showDifference: value })
                        })
                    ),
                    el(PanelBody, { title: __('Display', 'sneakersselection-blocks'), initialOpen: false },
                        el(SelectControl, {
                            label: __('Layout', 'sneakersselection-blocks'),
                            value: layout,
                            options: [
                                { label: __('Horizontal', 'sneakersselection-blocks'), value: 'horizontal' },
                                { label: __('Vertical', 'sneakersselection-blocks'), value: 'vertical' },
                                { label: __('Compact', 'sneakersselection-blocks'), value: 'compact' }
                            ],
                            onChange: (value) => setAttributes({ layout: value })
                        }),
                        el(SelectControl, {
                            label: __('Highlight Price', 'sneakersselection-blocks'),
                            value: highlightPrice,
                            options: [
                                { label: __('Retail', 'sneakersselection-blocks'), value: 'retail' },
                                { label: __('Resale', 'sneakersselection-blocks'), value: 'resale' },
                                { label: __('None', 'sneakersselection-blocks'), value: 'none' }
                            ],
                            onChange: (value) => setAttributes({ highlightPrice: value })
                        })
                    )
                ),
                el('div', blockProps,
                    el('div', { className: 'ss-price-display__prices' },
                        el('div', { className: `ss-price-display__item ${highlightPrice === 'retail' ? 'ss-price-display__item--highlight' : ''}` },
                            el('span', { className: 'ss-label ss-price-display__label' }, retailLabel),
                            el('span', { className: 'ss-price-display__value' }, currency + retailPrice)
                        ),
                        showResale && el(Fragment, null,
                            el('div', { className: 'ss-price-display__separator' },
                                el('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
                                    el('path', { d: 'M5 12h14M12 5l7 7-7 7' })
                                )
                            ),
                            el('div', { className: `ss-price-display__item ${highlightPrice === 'resale' ? 'ss-price-display__item--highlight' : ''}` },
                                el('span', { className: 'ss-label ss-price-display__label' }, resaleLabel),
                                el('span', { className: 'ss-price-display__value' }, currency + resalePrice)
                            )
                        )
                    ),
                    showResale && showDifference && difference !== 0 && el('div', {
                        className: `ss-price-display__difference ${difference > 0 ? 'ss-price-display__difference--up' : 'ss-price-display__difference--down'}`
                    },
                        el('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
                            difference > 0
                                ? el('path', { d: 'M7 14l5-5 5 5H7z' })
                                : el('path', { d: 'M7 10l5 5 5-5H7z' })
                        ),
                        el('span', null, (difference > 0 ? '+' : '') + currency + difference.toLocaleString()),
                        el('span', { className: 'ss-price-display__percentage' }, `(${difference > 0 ? '+' : ''}${percentage}%)`)
                    )
                )
            );
        }
    });
})(window.wp);
