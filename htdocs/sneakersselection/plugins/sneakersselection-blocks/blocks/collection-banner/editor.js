(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, RangeControl, ToggleControl, Button, ColorPicker } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/collection-banner', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                eyebrow, heading, description, buttonText, buttonUrl,
                backgroundImage, backgroundImageId, backgroundColor, textColor,
                overlayOpacity, minHeight, contentPosition, showParallax
            } = attributes;

            const blockProps = useBlockProps({
                className: `ss-block ss-collection-banner ss-collection-banner--${contentPosition} ${backgroundImage ? 'ss-collection-banner--has-bg-image' : ''}`,
                style: {
                    '--ss-banner-bg': backgroundColor,
                    '--ss-banner-text': textColor,
                    '--ss-banner-overlay': overlayOpacity / 100,
                    '--ss-banner-min-height': minHeight
                }
            });

            const onSelectImage = (media) => {
                setAttributes({ backgroundImage: media.url, backgroundImageId: media.id });
            };

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Content', 'sneakersselection-blocks'), initialOpen: true },
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
                        el(TextareaControl, {
                            label: __('Description', 'sneakersselection-blocks'),
                            value: description,
                            onChange: (value) => setAttributes({ description: value })
                        }),
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
                    el(PanelBody, { title: __('Background', 'sneakersselection-blocks'), initialOpen: false },
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: onSelectImage,
                                allowedTypes: ['image'],
                                value: backgroundImageId,
                                render: ({ open }) => el(Button, { onClick: open, variant: 'secondary' },
                                    backgroundImage ? __('Change Image', 'sneakersselection-blocks') : __('Add Background Image', 'sneakersselection-blocks')
                                )
                            })
                        ),
                        backgroundImage && el(Button, {
                            isDestructive: true,
                            onClick: () => setAttributes({ backgroundImage: '', backgroundImageId: 0 }),
                            style: { marginTop: '8px', marginBottom: '16px' }
                        }, __('Remove Image', 'sneakersselection-blocks')),
                        el('div', { style: { marginBottom: '16px' } },
                            el('label', { style: { display: 'block', marginBottom: '8px' } }, __('Background Color', 'sneakersselection-blocks')),
                            el(ColorPicker, {
                                color: backgroundColor,
                                onChangeComplete: (value) => setAttributes({ backgroundColor: value.hex })
                            })
                        ),
                        backgroundImage && el(RangeControl, {
                            label: __('Overlay Opacity', 'sneakersselection-blocks'),
                            value: overlayOpacity,
                            onChange: (value) => setAttributes({ overlayOpacity: value }),
                            min: 0,
                            max: 100
                        }),
                        backgroundImage && el(ToggleControl, {
                            label: __('Parallax Effect', 'sneakersselection-blocks'),
                            checked: showParallax,
                            onChange: (value) => setAttributes({ showParallax: value })
                        })
                    ),
                    el(PanelBody, { title: __('Layout', 'sneakersselection-blocks'), initialOpen: false },
                        el(TextControl, {
                            label: __('Minimum Height', 'sneakersselection-blocks'),
                            value: minHeight,
                            onChange: (value) => setAttributes({ minHeight: value }),
                            help: __('e.g., 400px, 50vh', 'sneakersselection-blocks')
                        }),
                        el(SelectControl, {
                            label: __('Content Position', 'sneakersselection-blocks'),
                            value: contentPosition,
                            options: [
                                { label: __('Left', 'sneakersselection-blocks'), value: 'left' },
                                { label: __('Center', 'sneakersselection-blocks'), value: 'center' },
                                { label: __('Right', 'sneakersselection-blocks'), value: 'right' }
                            ],
                            onChange: (value) => setAttributes({ contentPosition: value })
                        }),
                        el('div', null,
                            el('label', { style: { display: 'block', marginBottom: '8px' } }, __('Text Color', 'sneakersselection-blocks')),
                            el(ColorPicker, {
                                color: textColor,
                                onChangeComplete: (value) => setAttributes({ textColor: value.hex })
                            })
                        )
                    )
                ),
                el('section', blockProps,
                    backgroundImage && el(Fragment, null,
                        el('div', { className: 'ss-collection-banner__bg' },
                            el('img', { src: backgroundImage, alt: '' })
                        ),
                        el('div', { className: 'ss-collection-banner__overlay' })
                    ),
                    el('div', { className: 'ss-container ss-collection-banner__container' },
                        el('div', { className: 'ss-collection-banner__content' },
                            eyebrow && el('span', { className: 'ss-label ss-collection-banner__eyebrow' }, eyebrow),
                            heading && el('h2', { className: 'ss-heading ss-heading--1 ss-collection-banner__heading' }, heading),
                            description && el('p', { className: 'ss-text ss-text--lg ss-collection-banner__description' }, description),
                            buttonText && el('span', { className: 'ss-button ss-button--accent ss-button--large' }, buttonText)
                        )
                    )
                )
            );
        }
    });
})(window.wp);
