(function(wp) {
    const { registerBlockType }                    = wp.blocks;
    const { createElement: el, Fragment }          = wp.element;
    const { InspectorControls, MediaUpload,
            MediaUploadCheck }                     = wp.blockEditor;
    const { PanelBody, TextControl, RangeControl,
            SelectControl, Button }                = wp.components;

    registerBlockType('cesana/page-cover', {
        edit: function({ attributes, setAttributes }) {
            var eyebrow         = attributes.eyebrow;
            var title           = attributes.title;
            var backgroundImage = attributes.backgroundImage;
            var overlayOpacity  = attributes.overlayOpacity;
            var textAlign       = attributes.textAlign;

            return el(Fragment, null,

                // ── Sidebar ──────────────────────────────────────────────
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Contenuti', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            help: 'Etichetta sopra il titolo (es. categoria, sezione).',
                            value: eyebrow,
                            onChange: function(val) { setAttributes({ eyebrow: val }); }
                        }),
                        el(TextControl, {
                            label: 'Titolo',
                            value: title,
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),

                        // Background image
                        el('div', { style: { marginTop: '16px' } },
                            el('p', { style: { marginBottom: '8px', fontWeight: 600 } }, 'Immagine di sfondo'),
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: function(media) { setAttributes({ backgroundImage: media.url }); },
                                    allowedTypes: ['image'],
                                    value: backgroundImage,
                                    render: function(obj) {
                                        return el(Fragment, null,
                                            backgroundImage
                                                ? el('img', { src: backgroundImage, style: { width: '100%', marginBottom: '8px', borderRadius: '4px' } })
                                                : null,
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: backgroundImage ? 'secondary' : 'primary',
                                                style: { width: '100%' }
                                            }, backgroundImage ? 'Cambia immagine' : 'Seleziona immagine'),
                                            backgroundImage
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
                    ),

                    el(PanelBody, { title: 'Stile', initialOpen: false },
                        el(RangeControl, {
                            label: 'Opacità overlay',
                            value: overlayOpacity,
                            min: 30,
                            max: 90,
                            step: 5,
                            onChange: function(val) { setAttributes({ overlayOpacity: val }); }
                        }),
                        el(SelectControl, {
                            label: 'Allineamento testo',
                            value: textAlign,
                            options: [
                                { label: 'Sinistra', value: 'left' },
                                { label: 'Centro', value: 'center' }
                            ],
                            onChange: function(val) { setAttributes({ textAlign: val }); }
                        })
                    )
                ),

                // ── Canvas placeholder ────────────────────────────────────
                el('div', { className: 'ca-editor-placeholder' },
                    el('div', { className: 'ca-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5z' })
                        )
                    ),
                    el('div', { className: 'ca-editor-placeholder__title' }, 'Page Cover'),
                    el('div', { className: 'ca-editor-placeholder__text' },
                        title
                            ? (eyebrow ? eyebrow + ' \u2014 ' : '') + '\u201c' + title + '\u201d'
                            : 'Configura eyebrow e titolo dal pannello laterale.'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
