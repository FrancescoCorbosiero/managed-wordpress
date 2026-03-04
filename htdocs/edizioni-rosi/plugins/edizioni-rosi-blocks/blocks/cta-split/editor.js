(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var SelectControl = wp.components.SelectControl;
    var RangeControl = wp.components.RangeControl;
    var Button = wp.components.Button;

    registerBlockType('edizioni-rosi/cta-split', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            function mediaButton(label, attr, onSelect) {
                return el('div', { style: { marginTop: '16px' } },
                    el('p', { style: { marginBottom: '8px', fontWeight: 600 } }, label),
                    el(MediaUploadCheck, null,
                        el(MediaUpload, {
                            onSelect: function(media) { setAttributes(onSelect(media)); },
                            allowedTypes: ['image'],
                            value: attributes[attr],
                            render: function(obj) {
                                return el(Fragment, null,
                                    attributes[attr]
                                        ? el('img', { src: attributes[attr], style: { width: '100%', marginBottom: '8px', borderRadius: '4px' } })
                                        : null,
                                    el(Button, {
                                        onClick: obj.open,
                                        variant: attributes[attr] ? 'secondary' : 'primary',
                                        style: { width: '100%' }
                                    }, attributes[attr] ? 'Cambia immagine' : 'Seleziona immagine'),
                                    attributes[attr]
                                        ? el(Button, {
                                            onClick: function() {
                                                var reset = {};
                                                reset[attr] = '';
                                                setAttributes(reset);
                                            },
                                            variant: 'tertiary',
                                            isDestructive: true,
                                            style: { width: '100%', marginTop: '4px' }
                                          }, 'Rimuovi immagine')
                                        : null
                                );
                            }
                        })
                    )
                );
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Contenuti', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            help: 'Etichetta sopra il titolo.',
                            value: attributes.eyebrow || '',
                            onChange: function(val) { setAttributes({ eyebrow: val }); }
                        }),
                        el(TextControl, {
                            label: 'Titolo',
                            value: attributes.title || '',
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),
                        el(TextareaControl, {
                            label: 'Testo',
                            value: attributes.text || '',
                            onChange: function(val) { setAttributes({ text: val }); }
                        }),
                        el(TextControl, {
                            label: 'Testo pulsante',
                            value: attributes.buttonText || '',
                            onChange: function(val) { setAttributes({ buttonText: val }); }
                        }),
                        el(TextControl, {
                            label: 'URL pulsante',
                            value: attributes.buttonUrl || '',
                            onChange: function(val) { setAttributes({ buttonUrl: val }); }
                        })
                    ),
                    el(PanelBody, { title: 'Immagine in evidenza', initialOpen: true },
                        mediaButton('Immagine affiancata', 'image', function(media) {
                            return { image: media.url, imageAlt: media.alt || '' };
                        }),
                        el(TextControl, {
                            label: 'Alt text',
                            value: attributes.imageAlt || '',
                            onChange: function(val) { setAttributes({ imageAlt: val }); },
                            style: { marginTop: '12px' }
                        })
                    ),
                    el(PanelBody, { title: 'Aspetto', initialOpen: false },
                        el(SelectControl, {
                            label: 'Variante',
                            value: attributes.variant || 'dark',
                            options: [
                                { label: 'Scuro (nero/oro)', value: 'dark' },
                                { label: 'Oro (gold/nero)', value: 'gold' }
                            ],
                            onChange: function(val) { setAttributes({ variant: val }); }
                        }),
                        el(SelectControl, {
                            label: 'Posizione immagine',
                            value: attributes.imagePosition || 'right',
                            options: [
                                { label: 'Destra', value: 'right' },
                                { label: 'Sinistra', value: 'left' }
                            ],
                            onChange: function(val) { setAttributes({ imagePosition: val }); }
                        }),
                        mediaButton('Immagine di sfondo', 'backgroundImage', function(media) {
                            return { backgroundImage: media.url };
                        }),
                        attributes.backgroundImage
                            ? el(RangeControl, {
                                label: 'Opacità overlay',
                                value: attributes.overlayOpacity || 80,
                                min: 30,
                                max: 95,
                                onChange: function(val) { setAttributes({ overlayOpacity: val }); },
                                style: { marginTop: '12px' }
                              })
                            : null
                    )
                ),

                el('div', { className: 'er-editor-placeholder er-editor-placeholder--dark',
                            style: { padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' } },
                    el('div', { style: { flex: 1 } },
                        attributes.eyebrow
                            ? el('div', { style: { fontSize: '10px', color: '#c9a55c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' } }, attributes.eyebrow)
                            : null,
                        el('div', { style: { fontSize: '16px', fontWeight: 500, color: '#e8e8e8', marginBottom: '4px' } },
                            attributes.title || 'CTA Split'
                        ),
                        el('div', { style: { fontSize: '11px', color: '#8a8a8a' } },
                            (attributes.text || 'Configura dal pannello laterale.') +
                            ' — img: ' + (attributes.imagePosition || 'right') +
                            ', variante: ' + (attributes.variant || 'dark')
                        )
                    ),
                    attributes.image
                        ? el('img', { src: attributes.image, style: { width: '100px', height: '80px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 } })
                        : el('div', { style: { width: '100px', height: '80px', background: '#2a2a2a', borderRadius: '4px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#666' } }, 'Immagine')
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
