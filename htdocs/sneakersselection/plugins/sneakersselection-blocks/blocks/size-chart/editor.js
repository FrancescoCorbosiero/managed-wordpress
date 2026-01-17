(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, ToggleControl } = wp.components;
    const { createElement: el, Fragment, useState } = wp.element;
    const { __ } = wp.i18n;

    const mensSizes = [
        { us: '6', uk: '5.5', eu: '38.5', cm: '24' },
        { us: '7', uk: '6', eu: '40', cm: '25' },
        { us: '8', uk: '7', eu: '41', cm: '26' },
        { us: '9', uk: '8', eu: '42.5', cm: '27' },
        { us: '10', uk: '9', eu: '44', cm: '28' },
        { us: '11', uk: '10', eu: '45', cm: '29' },
        { us: '12', uk: '11', eu: '46', cm: '30' },
    ];

    registerBlockType('sneakersselection/size-chart', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { heading, description, gender, showUS, showUK, showEU, showCM, highlightSize } = attributes;

            const [activeTab, setActiveTab] = useState(gender);

            const blockProps = useBlockProps({
                className: 'ss-block ss-size-chart'
            });

            const genderLabels = {
                mens: __("Men's", 'sneakersselection-blocks'),
                womens: __("Women's", 'sneakersselection-blocks'),
                kids: __("Kids'", 'sneakersselection-blocks')
            };

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Content', 'sneakersselection-blocks'), initialOpen: true },
                        el(TextControl, {
                            label: __('Heading', 'sneakersselection-blocks'),
                            value: heading,
                            onChange: (value) => setAttributes({ heading: value })
                        }),
                        el(TextareaControl, {
                            label: __('Description', 'sneakersselection-blocks'),
                            value: description,
                            onChange: (value) => setAttributes({ description: value })
                        }),
                        el(SelectControl, {
                            label: __('Default Gender', 'sneakersselection-blocks'),
                            value: gender,
                            options: [
                                { label: __("Men's", 'sneakersselection-blocks'), value: 'mens' },
                                { label: __("Women's", 'sneakersselection-blocks'), value: 'womens' },
                                { label: __("Kids'", 'sneakersselection-blocks'), value: 'kids' }
                            ],
                            onChange: (value) => setAttributes({ gender: value })
                        })
                    ),
                    el(PanelBody, { title: __('Display Columns', 'sneakersselection-blocks'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Show US Sizes', 'sneakersselection-blocks'),
                            checked: showUS,
                            onChange: (value) => setAttributes({ showUS: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show UK Sizes', 'sneakersselection-blocks'),
                            checked: showUK,
                            onChange: (value) => setAttributes({ showUK: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show EU Sizes', 'sneakersselection-blocks'),
                            checked: showEU,
                            onChange: (value) => setAttributes({ showEU: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show CM', 'sneakersselection-blocks'),
                            checked: showCM,
                            onChange: (value) => setAttributes({ showCM: value })
                        })
                    ),
                    el(PanelBody, { title: __('Highlight', 'sneakersselection-blocks'), initialOpen: false },
                        el(TextControl, {
                            label: __('Highlight Size (US)', 'sneakersselection-blocks'),
                            value: highlightSize,
                            onChange: (value) => setAttributes({ highlightSize: value }),
                            help: __('Enter a US size to highlight (e.g., "10")', 'sneakersselection-blocks')
                        })
                    )
                ),
                el('div', blockProps,
                    (heading || description) && el('div', { className: 'ss-size-chart__header' },
                        heading && el('h3', { className: 'ss-heading ss-heading--4 ss-size-chart__heading' }, heading),
                        description && el('p', { className: 'ss-text ss-size-chart__description' }, description)
                    ),
                    el('div', { className: 'ss-size-chart__tabs' },
                        el('div', { className: 'ss-size-chart__tab-list' },
                            Object.entries(genderLabels).map(([key, label]) =>
                                el('button', {
                                    key,
                                    className: `ss-size-chart__tab ${activeTab === key ? 'ss-tab--active' : ''}`,
                                    onClick: () => setActiveTab(key)
                                }, label)
                            )
                        ),
                        el('div', { className: 'ss-size-chart__table-wrapper' },
                            el('table', { className: 'ss-size-chart__table' },
                                el('thead', null,
                                    el('tr', null,
                                        showUS && el('th', null, 'US'),
                                        showUK && el('th', null, 'UK'),
                                        showEU && el('th', null, 'EU'),
                                        showCM && el('th', null, 'CM')
                                    )
                                ),
                                el('tbody', null,
                                    mensSizes.map((size, i) =>
                                        el('tr', {
                                            key: i,
                                            className: highlightSize === size.us ? 'ss-size-chart__row--highlight' : ''
                                        },
                                            showUS && el('td', null, size.us),
                                            showUK && el('td', null, size.uk),
                                            showEU && el('td', null, size.eu),
                                            showCM && el('td', null, size.cm)
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
