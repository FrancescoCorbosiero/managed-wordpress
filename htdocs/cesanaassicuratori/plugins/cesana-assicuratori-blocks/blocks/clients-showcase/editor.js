(function(wp) {
    const { registerBlockType }                    = wp.blocks;
    const { createElement: el, Fragment }          = wp.element;
    const { InspectorControls, MediaUpload,
            MediaUploadCheck }                     = wp.blockEditor;
    const { PanelBody, TextControl, RangeControl,
            ToggleControl, Button }                = wp.components;

    registerBlockType('cesana/clients-showcase', {
        edit: function({ attributes, setAttributes }) {
            var eyebrow   = attributes.eyebrow;
            var title     = attributes.title;
            var images    = attributes.images;
            var columns   = attributes.columns;
            var grayscale = attributes.grayscale;

            function removeImage(index) {
                var updated = images.filter(function(_, i) { return i !== index; });
                setAttributes({ images: updated });
            }

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
                        })
                    ),
                    el(PanelBody, { title: 'Immagini', initialOpen: true },
                        // Current images list
                        images.length > 0
                            ? el('div', { style: { marginBottom: '12px' } },
                                images.map(function(img, i) {
                                    return el('div', {
                                        key: i,
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '8px',
                                            padding: '6px',
                                            background: '#f0f0f0',
                                            borderRadius: '4px'
                                        }
                                    },
                                        el('img', {
                                            src: img.url,
                                            style: { width: '40px', height: '30px', objectFit: 'contain' }
                                        }),
                                        el('span', {
                                            style: { flex: 1, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
                                        }, img.alt || 'Logo ' + (i + 1)),
                                        el(Button, {
                                            onClick: function() { removeImage(i); },
                                            variant: 'tertiary',
                                            isDestructive: true,
                                            isSmall: true
                                        }, '✕')
                                    );
                                })
                              )
                            : el('p', { style: { color: '#757575', fontStyle: 'italic' } }, 'Nessuna immagine aggiunta.'),

                        // Add images button
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: function(media) {
                                    var newImages = media.map(function(m) {
                                        return { id: m.id, url: m.url, alt: m.alt || '' };
                                    });
                                    setAttributes({ images: images.concat(newImages) });
                                },
                                allowedTypes: ['image'],
                                multiple: true,
                                render: function(obj) {
                                    return el(Button, {
                                        onClick: obj.open,
                                        variant: 'secondary',
                                        style: { width: '100%' }
                                    }, 'Aggiungi immagini');
                                }
                            })
                        )
                    ),
                    el(PanelBody, { title: 'Aspetto', initialOpen: false },
                        el(RangeControl, {
                            label: 'Colonne',
                            value: columns,
                            min: 2,
                            max: 6,
                            onChange: function(val) { setAttributes({ columns: val }); }
                        }),
                        el(ToggleControl, {
                            label: 'Scala di grigi',
                            help: 'I loghi appaiono in bianco/nero e diventano a colori al passaggio del mouse.',
                            checked: grayscale,
                            onChange: function(val) { setAttributes({ grayscale: val }); }
                        })
                    )
                ),

                // ── Canvas placeholder ────────────────────────────────────
                el('div', { className: 'ca-editor-placeholder' },
                    el('div', { className: 'ca-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' })
                        )
                    ),
                    el('div', { className: 'ca-editor-placeholder__title' }, 'Clients Showcase'),
                    el('div', { className: 'ca-editor-placeholder__text' },
                        images.length > 0
                            ? images.length + ' logo' + (images.length > 1 ? 'hi' : '') + ' — ' + columns + ' colonne'
                            : 'Aggiungi i loghi dal pannello laterale.'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
