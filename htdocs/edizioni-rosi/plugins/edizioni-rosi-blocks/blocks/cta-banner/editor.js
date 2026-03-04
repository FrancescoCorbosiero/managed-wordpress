(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    registerBlockType('edizioni-rosi/cta-banner', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Contenuti', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            help: 'Etichetta sopra il titolo (es. "Novità", "In Evidenza").',
                            value: attributes.eyebrow || '',
                            onChange: function(val) { setAttributes({ eyebrow: val }); }
                        }),
                        el(TextControl, {
                            label: 'Titolo',
                            value: attributes.title || '',
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),
                        el(TextControl, {
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
                        el('div', { style: { marginTop: '16px' } },
                            el('p', { style: { marginBottom: '8px', fontWeight: 600 } }, 'Immagine di sfondo'),
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: function(media) { setAttributes({ backgroundImage: media.url }); },
                                    allowedTypes: ['image'],
                                    value: attributes.backgroundImage,
                                    render: function(obj) {
                                        return el(Fragment, null,
                                            attributes.backgroundImage
                                                ? el('img', { src: attributes.backgroundImage, style: { width: '100%', marginBottom: '8px', borderRadius: '4px' } })
                                                : null,
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: attributes.backgroundImage ? 'secondary' : 'primary',
                                                style: { width: '100%' }
                                            }, attributes.backgroundImage ? 'Cambia immagine' : 'Seleziona immagine'),
                                            attributes.backgroundImage
                                                ? el(Button, {
                                                    onClick: function() { setAttributes({ backgroundImage: '' }); },
                                                    variant: 'tertiary',
                                                    isDestructive: true,
                                                    style: { width: '100%', marginTop: '4px' }
                                                  }, 'Rimuovi immagine')
                                                : null
                                        );
                                    }
                                })
                            )
                        )
                    )
                ),

                el('div', { className: 'er-editor-placeholder er-editor-placeholder--dark',
                            style: { padding: '24px', textAlign: 'center' } },
                    el('div', { style: { fontSize: '10px', color: '#c9a55c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' } },
                        attributes.eyebrow || ''
                    ),
                    el('div', { style: { fontSize: '18px', fontWeight: 500, color: '#e8e8e8', marginBottom: '6px' } },
                        attributes.title || 'CTA Banner'
                    ),
                    el('div', { style: { fontSize: '12px', color: '#8a8a8a' } },
                        (attributes.text || 'Configura dal pannello laterale.') +
                        ' — variante ' + (attributes.variant || 'dark')
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
