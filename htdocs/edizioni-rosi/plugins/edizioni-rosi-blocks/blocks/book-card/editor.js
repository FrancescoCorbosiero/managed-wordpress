(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;

    registerBlockType('edizioni-rosi/book-card', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Dettagli Libro', initialOpen: true },
                        el(TextControl, {
                            label: 'Titolo',
                            value: attributes.title || '',
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),
                        el(TextControl, {
                            label: 'Autore',
                            value: attributes.author || '',
                            onChange: function(val) { setAttributes({ author: val }); }
                        }),
                        el(TextControl, {
                            label: 'URL (Amazon, etc.)',
                            value: attributes.url || '',
                            onChange: function(val) { setAttributes({ url: val }); }
                        }),
                        el('div', { style: { marginTop: '16px' } },
                            el('p', { style: { marginBottom: '8px', fontWeight: 600 } }, 'Copertina'),
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: function(media) { setAttributes({ cover: media.url }); },
                                    allowedTypes: ['image'],
                                    value: attributes.cover,
                                    render: function(obj) {
                                        return el(Fragment, null,
                                            attributes.cover
                                                ? el('img', { src: attributes.cover, style: { width: '100%', marginBottom: '8px', borderRadius: '4px' } })
                                                : null,
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: attributes.cover ? 'secondary' : 'primary',
                                                style: { width: '100%' }
                                            }, attributes.cover ? 'Cambia copertina' : 'Seleziona copertina'),
                                            attributes.cover
                                                ? el(Button, {
                                                    onClick: function() { setAttributes({ cover: '' }); },
                                                    variant: 'tertiary',
                                                    isDestructive: true,
                                                    style: { width: '100%', marginTop: '4px' }
                                                  }, 'Rimuovi copertina')
                                                : null
                                        );
                                    }
                                })
                            )
                        )
                    )
                ),

                el('div', { className: 'er-editor-placeholder er-editor-placeholder--dark',
                            style: { padding: '16px 24px', textAlign: 'left' } },
                    el('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                        attributes.cover
                            ? el('img', { src: attributes.cover, style: { width: '48px', height: '67px', objectFit: 'cover', borderRadius: '2px' } })
                            : el('div', { style: { width: '48px', height: '67px', background: '#2a2a2a', borderRadius: '2px' } }),
                        el('div', null,
                            el('div', { style: { fontSize: '10px', color: '#c9a55c', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' } },
                                attributes.author || 'Autore'
                            ),
                            el('div', { style: { fontSize: '14px', color: '#e8e8e8' } },
                                attributes.title || 'Titolo libro'
                            )
                        )
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
