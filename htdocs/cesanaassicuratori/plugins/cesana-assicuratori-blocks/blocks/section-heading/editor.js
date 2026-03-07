(function(wp) {
    const { registerBlockType }                    = wp.blocks;
    const { createElement: el, Fragment }          = wp.element;
    const { InspectorControls, MediaUpload,
            MediaUploadCheck }                     = wp.blockEditor;
    const { PanelBody, TextControl, SelectControl,
            Button, TextareaControl }              = wp.components;

    registerBlockType('cesana/section-heading', {
        edit: function({ attributes, setAttributes }) {
            var eyebrow       = attributes.eyebrow;
            var title         = attributes.title;
            var description   = attributes.description;
            var textAlign     = attributes.textAlign;
            var headingLevel  = attributes.headingLevel;
            var imageUrl      = attributes.imageUrl;
            var imageAlt      = attributes.imageAlt;
            var imagePosition = attributes.imagePosition;

            return el(Fragment, null,

                // ── Sidebar ──────────────────────────────────────────────
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Contenuti', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            value: eyebrow,
                            onChange: function(val) { setAttributes({ eyebrow: val }); }
                        }),
                        el(TextControl, {
                            label: 'Titolo',
                            value: title,
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),
                        el(TextareaControl, {
                            label: 'Descrizione',
                            value: description,
                            rows: 4,
                            onChange: function(val) { setAttributes({ description: val }); }
                        })
                    ),
                    el(PanelBody, { title: 'Aspetto', initialOpen: true },
                        el(SelectControl, {
                            label: 'Allineamento testo',
                            value: textAlign,
                            options: [
                                { label: 'Sinistra', value: 'left' },
                                { label: 'Centro', value: 'center' },
                                { label: 'Destra', value: 'right' }
                            ],
                            onChange: function(val) { setAttributes({ textAlign: val }); }
                        }),
                        el(SelectControl, {
                            label: 'Livello heading',
                            value: headingLevel,
                            options: [
                                { label: 'H1', value: 1 },
                                { label: 'H2', value: 2 },
                                { label: 'H3', value: 3 },
                                { label: 'H4', value: 4 }
                            ],
                            onChange: function(val) { setAttributes({ headingLevel: parseInt(val, 10) }); }
                        })
                    ),
                    el(PanelBody, { title: 'Immagine', initialOpen: false },
                        el('div', { style: { marginBottom: '12px' } },
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: function(media) {
                                        setAttributes({ imageUrl: media.url, imageAlt: media.alt || '' });
                                    },
                                    allowedTypes: ['image'],
                                    value: imageUrl,
                                    render: function(obj) {
                                        return el(Fragment, null,
                                            imageUrl
                                                ? el('img', { src: imageUrl, style: { width: '100%', marginBottom: '8px', borderRadius: '4px' } })
                                                : null,
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: imageUrl ? 'secondary' : 'primary',
                                                style: { width: '100%' }
                                            }, imageUrl ? 'Cambia immagine' : 'Seleziona immagine'),
                                            imageUrl
                                                ? el(Button, {
                                                    onClick: function() { setAttributes({ imageUrl: '', imageAlt: '' }); },
                                                    variant: 'tertiary',
                                                    isDestructive: true,
                                                    style: { width: '100%', marginTop: '4px' }
                                                  }, 'Rimuovi immagine')
                                                : null
                                        );
                                    }
                                })
                            )
                        ),
                        imageUrl
                            ? el(Fragment, null,
                                el(TextControl, {
                                    label: 'Testo alternativo',
                                    value: imageAlt,
                                    onChange: function(val) { setAttributes({ imageAlt: val }); }
                                }),
                                el(SelectControl, {
                                    label: 'Posizione immagine',
                                    value: imagePosition,
                                    options: [
                                        { label: 'Destra', value: 'right' },
                                        { label: 'Sinistra', value: 'left' },
                                        { label: 'Sopra', value: 'top' },
                                        { label: 'Sotto', value: 'bottom' }
                                    ],
                                    onChange: function(val) { setAttributes({ imagePosition: val }); }
                                })
                              )
                            : null
                    )
                ),

                // ── Canvas placeholder ────────────────────────────────────
                el('div', { className: 'ca-editor-placeholder' },
                    el('div', { className: 'ca-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M5 4v3h5.5v12h3V7H19V4z' })
                        )
                    ),
                    el('div', { className: 'ca-editor-placeholder__title' }, 'Section Heading'),
                    el('div', { className: 'ca-editor-placeholder__text' },
                        title
                            ? (eyebrow ? eyebrow + ' — ' : '') + title
                                + ' (' + textAlign + (imageUrl ? ', con immagine ' + imagePosition : '') + ')'
                            : 'Configura il blocco dal pannello laterale.'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
