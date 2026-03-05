(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    registerBlockType('cesana/blog-cover', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Contenuti', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            help: 'Etichetta sopra il titolo (es. categoria, rubrica).',
                            value: attributes.eyebrow || '',
                            onChange: function(val) { setAttributes({ eyebrow: val }); }
                        }),
                        el(TextControl, {
                            label: 'Titolo',
                            help: 'Lascia vuoto per usare il titolo del post/pagina.',
                            value: attributes.title || '',
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),
                        el(TextControl, {
                            label: 'Estratto',
                            value: attributes.excerpt || '',
                            onChange: function(val) { setAttributes({ excerpt: val }); }
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
                    ),

                    el(PanelBody, { title: 'Meta', initialOpen: false },
                        el(TextControl, {
                            label: 'Nome autore',
                            value: attributes.authorName || '',
                            onChange: function(val) { setAttributes({ authorName: val }); }
                        }),
                        el(TextControl, {
                            label: 'Data',
                            help: 'Es. "15 Gennaio 2026"',
                            value: attributes.date || '',
                            onChange: function(val) { setAttributes({ date: val }); }
                        }),
                        el(TextControl, {
                            label: 'Tempo di lettura',
                            help: 'Es. "5 min di lettura"',
                            value: attributes.readingTime || '',
                            onChange: function(val) { setAttributes({ readingTime: val }); }
                        })
                    ),

                    el(PanelBody, { title: 'Stile', initialOpen: false },
                        el(RangeControl, {
                            label: 'Opacit\u00e0 overlay',
                            value: attributes.overlayOpacity || 70,
                            min: 30,
                            max: 90,
                            step: 5,
                            onChange: function(val) { setAttributes({ overlayOpacity: val }); }
                        }),
                        el(SelectControl, {
                            label: 'Allineamento testo',
                            value: attributes.textAlign || 'left',
                            options: [
                                { label: 'Sinistra', value: 'left' },
                                { label: 'Centro', value: 'center' }
                            ],
                            onChange: function(val) { setAttributes({ textAlign: val }); }
                        })
                    )
                ),

                el('div', { className: 'ca-editor-placeholder ca-editor-placeholder--dark',
                            style: { padding: '32px 24px', textAlign: 'left' } },
                    attributes.eyebrow
                        ? el('div', { style: { fontSize: '10px', color: '#B8973F', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' } },
                            '\u2014 ' + attributes.eyebrow
                          )
                        : null,
                    el('div', { style: { fontFamily: "'DM Serif Display', serif", fontSize: '20px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.2, marginBottom: '8px' } },
                        attributes.title || 'Blog Cover'
                    ),
                    attributes.excerpt
                        ? el('div', { style: { fontSize: '12px', color: '#8B91A0', marginBottom: '10px' } }, attributes.excerpt)
                        : null,
                    el('div', { style: { width: '2.5rem', height: '2px', background: '#B8973F', marginBottom: '10px' } }),
                    el('div', { style: { fontSize: '11px', color: '#8B91A0' } },
                        [
                            attributes.authorName || 'autore',
                            attributes.date || 'data',
                            attributes.readingTime || 'lettura'
                        ].join(' \u00b7 ')
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
