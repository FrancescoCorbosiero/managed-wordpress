(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, TextControl, SelectControl, ToggleControl, Button, ColorPicker } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    registerBlockType('sneakersselection/sneaker-hero', {
        edit: function(props) {
            const { attributes, setAttributes } = props;
            const {
                eyebrow, heading, subheading,
                primaryButtonText, primaryButtonUrl,
                secondaryButtonText, secondaryButtonUrl,
                imageUrl, imageId, imageAlt,
                backgroundColor, textColor, layout, showFloatingEffect
            } = attributes;

            const blockProps = useBlockProps({
                className: `ss-block ss-sneaker-hero ss-sneaker-hero--${layout}`,
                style: {
                    '--ss-hero-bg': backgroundColor,
                    '--ss-hero-text': textColor
                }
            });

            const onSelectImage = (media) => {
                setAttributes({
                    imageUrl: media.url,
                    imageId: media.id,
                    imageAlt: media.alt || heading
                });
            };

            const onRemoveImage = () => {
                setAttributes({ imageUrl: '', imageId: 0, imageAlt: '' });
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
                        el(TextControl, {
                            label: __('Subheading', 'sneakersselection-blocks'),
                            value: subheading,
                            onChange: (value) => setAttributes({ subheading: value })
                        })
                    ),
                    el(PanelBody, { title: __('Buttons', 'sneakersselection-blocks'), initialOpen: false },
                        el(TextControl, {
                            label: __('Primary Button Text', 'sneakersselection-blocks'),
                            value: primaryButtonText,
                            onChange: (value) => setAttributes({ primaryButtonText: value })
                        }),
                        el(TextControl, {
                            label: __('Primary Button URL', 'sneakersselection-blocks'),
                            value: primaryButtonUrl,
                            onChange: (value) => setAttributes({ primaryButtonUrl: value })
                        }),
                        el(TextControl, {
                            label: __('Secondary Button Text', 'sneakersselection-blocks'),
                            value: secondaryButtonText,
                            onChange: (value) => setAttributes({ secondaryButtonText: value })
                        }),
                        el(TextControl, {
                            label: __('Secondary Button URL', 'sneakersselection-blocks'),
                            value: secondaryButtonUrl,
                            onChange: (value) => setAttributes({ secondaryButtonUrl: value })
                        })
                    ),
                    el(PanelBody, { title: __('Layout', 'sneakersselection-blocks'), initialOpen: false },
                        el(SelectControl, {
                            label: __('Layout Style', 'sneakersselection-blocks'),
                            value: layout,
                            options: [
                                { label: __('Image Right', 'sneakersselection-blocks'), value: 'image-right' },
                                { label: __('Image Left', 'sneakersselection-blocks'), value: 'image-left' },
                                { label: __('Image Center', 'sneakersselection-blocks'), value: 'image-center' }
                            ],
                            onChange: (value) => setAttributes({ layout: value })
                        }),
                        el(ToggleControl, {
                            label: __('Floating Animation', 'sneakersselection-blocks'),
                            checked: showFloatingEffect,
                            onChange: (value) => setAttributes({ showFloatingEffect: value })
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
                    el('div', { className: 'ss-container ss-sneaker-hero__container' },
                        el('div', { className: 'ss-sneaker-hero__content' },
                            eyebrow && el('span', { className: 'ss-label ss-sneaker-hero__eyebrow' }, eyebrow),
                            el('h1', { className: 'ss-heading ss-heading--display ss-sneaker-hero__heading' }, heading || __('Add Heading...', 'sneakersselection-blocks')),
                            subheading && el('p', { className: 'ss-text ss-text--lg ss-sneaker-hero__subheading' }, subheading),
                            el('div', { className: 'ss-sneaker-hero__buttons' },
                                primaryButtonText && el('span', { className: 'ss-button ss-button--primary ss-button--large' }, primaryButtonText),
                                secondaryButtonText && el('span', { className: 'ss-button ss-button--secondary ss-button--large' }, secondaryButtonText)
                            )
                        ),
                        el('div', { className: 'ss-sneaker-hero__image' },
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: onSelectImage,
                                    allowedTypes: ['image'],
                                    value: imageId,
                                    render: ({ open }) => {
                                        return imageUrl
                                            ? el('div', { className: 'ss-sneaker-hero__image-wrapper' },
                                                el('img', { src: imageUrl, alt: imageAlt }),
                                                el(Button, { onClick: onRemoveImage, isDestructive: true, className: 'ss-editor-remove-image' }, __('Remove', 'sneakersselection-blocks'))
                                            )
                                            : el('div', { className: 'ss-editor-image-placeholder', onClick: open },
                                                el('svg', { width: 48, height: 48, viewBox: '0 0 24 24', fill: 'currentColor' },
                                                    el('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
                                                ),
                                                el('span', { className: 'ss-editor-image-placeholder__text' }, __('Click to upload sneaker image', 'sneakersselection-blocks'))
                                            );
                                    }
                                })
                            )
                        )
                    )
                )
            );
        }
    });
})(window.wp);
