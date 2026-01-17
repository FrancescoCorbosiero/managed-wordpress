(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, ToggleControl, Button, ColorPicker, DateTimePicker } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/release-countdown', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                heading, productName, releaseDate, expiredText,
                backgroundColor, textColor, accentColor,
                imageUrl, imageId, buttonText, buttonUrl,
                showDays, showHours, showMinutes, showSeconds
            } = attributes;

            const blockProps = useBlockProps({
                className: 'ss-block ss-release-countdown',
                style: {
                    '--ss-countdown-bg': backgroundColor,
                    '--ss-countdown-text': textColor,
                    '--ss-countdown-accent': accentColor
                }
            });

            const onSelectImage = (media) => {
                setAttributes({ imageUrl: media.url, imageId: media.id });
            };

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Content', 'sneakersselection-blocks'), initialOpen: true },
                        el(TextControl, {
                            label: __('Eyebrow/Heading', 'sneakersselection-blocks'),
                            value: heading,
                            onChange: (value) => setAttributes({ heading: value })
                        }),
                        el(TextControl, {
                            label: __('Product Name', 'sneakersselection-blocks'),
                            value: productName,
                            onChange: (value) => setAttributes({ productName: value })
                        }),
                        el('div', { style: { marginBottom: '16px' } },
                            el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
                                __('Release Date & Time', 'sneakersselection-blocks')
                            ),
                            el(DateTimePicker, {
                                currentDate: releaseDate || null,
                                onChange: (value) => setAttributes({ releaseDate: value }),
                                is12Hour: true
                            })
                        ),
                        el(TextControl, {
                            label: __('Expired Text', 'sneakersselection-blocks'),
                            value: expiredText,
                            onChange: (value) => setAttributes({ expiredText: value }),
                            help: __('Text to show when countdown ends', 'sneakersselection-blocks')
                        })
                    ),
                    el(PanelBody, { title: __('Display Options', 'sneakersselection-blocks'), initialOpen: false },
                        el(ToggleControl, {
                            label: __('Show Days', 'sneakersselection-blocks'),
                            checked: showDays,
                            onChange: (value) => setAttributes({ showDays: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show Hours', 'sneakersselection-blocks'),
                            checked: showHours,
                            onChange: (value) => setAttributes({ showHours: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show Minutes', 'sneakersselection-blocks'),
                            checked: showMinutes,
                            onChange: (value) => setAttributes({ showMinutes: value })
                        }),
                        el(ToggleControl, {
                            label: __('Show Seconds', 'sneakersselection-blocks'),
                            checked: showSeconds,
                            onChange: (value) => setAttributes({ showSeconds: value })
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
                    el(PanelBody, { title: __('Colors', 'sneakersselection-blocks'), initialOpen: false },
                        el('div', { style: { marginBottom: '16px' } },
                            el('label', { style: { display: 'block', marginBottom: '8px' } }, __('Background Color', 'sneakersselection-blocks')),
                            el(ColorPicker, {
                                color: backgroundColor,
                                onChangeComplete: (value) => setAttributes({ backgroundColor: value.hex })
                            })
                        ),
                        el('div', { style: { marginBottom: '16px' } },
                            el('label', { style: { display: 'block', marginBottom: '8px' } }, __('Text Color', 'sneakersselection-blocks')),
                            el(ColorPicker, {
                                color: textColor,
                                onChangeComplete: (value) => setAttributes({ textColor: value.hex })
                            })
                        ),
                        el('div', null,
                            el('label', { style: { display: 'block', marginBottom: '8px' } }, __('Accent Color', 'sneakersselection-blocks')),
                            el(ColorPicker, {
                                color: accentColor,
                                onChangeComplete: (value) => setAttributes({ accentColor: value.hex })
                            })
                        )
                    ),
                    el(PanelBody, { title: __('Image', 'sneakersselection-blocks'), initialOpen: false },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: onSelectImage,
                                allowedTypes: ['image'],
                                value: imageId,
                                render: ({ open }) => el(Button, { onClick: open, variant: 'secondary' },
                                    imageUrl ? __('Change Image', 'sneakersselection-blocks') : __('Add Product Image', 'sneakersselection-blocks')
                                )
                            })
                        ),
                        imageUrl && el(Button, {
                            isDestructive: true,
                            onClick: () => setAttributes({ imageUrl: '', imageId: 0 }),
                            style: { marginTop: '8px' }
                        }, __('Remove Image', 'sneakersselection-blocks'))
                    )
                ),
                el('section', blockProps,
                    el('div', { className: 'ss-container ss-release-countdown__container' },
                        imageUrl && el('div', { className: 'ss-release-countdown__image' },
                            el('img', { src: imageUrl, alt: productName })
                        ),
                        el('div', { className: 'ss-release-countdown__content' },
                            heading && el('span', { className: 'ss-label ss-release-countdown__eyebrow' }, heading),
                            productName && el('h2', { className: 'ss-heading ss-heading--1 ss-release-countdown__title' }, productName),
                            el('div', { className: 'ss-countdown ss-release-countdown__timer' },
                                showDays && el('div', { className: 'ss-countdown__item' },
                                    el('span', { className: 'ss-countdown__value' }, '00'),
                                    el('span', { className: 'ss-countdown__label' }, __('Days', 'sneakersselection-blocks'))
                                ),
                                showHours && el('div', { className: 'ss-countdown__item' },
                                    el('span', { className: 'ss-countdown__value' }, '00'),
                                    el('span', { className: 'ss-countdown__label' }, __('Hours', 'sneakersselection-blocks'))
                                ),
                                showMinutes && el('div', { className: 'ss-countdown__item' },
                                    el('span', { className: 'ss-countdown__value' }, '00'),
                                    el('span', { className: 'ss-countdown__label' }, __('Minutes', 'sneakersselection-blocks'))
                                ),
                                showSeconds && el('div', { className: 'ss-countdown__item' },
                                    el('span', { className: 'ss-countdown__value' }, '00'),
                                    el('span', { className: 'ss-countdown__label' }, __('Seconds', 'sneakersselection-blocks'))
                                )
                            ),
                            buttonText && el('span', { className: 'ss-button ss-button--accent ss-button--large' }, buttonText)
                        )
                    )
                )
            );
        }
    });
})(window.wp);
