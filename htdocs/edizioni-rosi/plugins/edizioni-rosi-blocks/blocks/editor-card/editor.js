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
    var Button = wp.components.Button;

    registerBlockType('edizioni-rosi/editor-card', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Dettagli Autore', initialOpen: true },
                        el(TextControl, {
                            label: 'Nome',
                            value: attributes.name || '',
                            onChange: function(val) { setAttributes({ name: val }); }
                        }),
                        el(TextControl, {
                            label: 'Ruolo',
                            value: attributes.role || '',
                            onChange: function(val) { setAttributes({ role: val }); }
                        }),
                        el(TextareaControl, {
                            label: 'Bio',
                            value: attributes.bio || '',
                            onChange: function(val) { setAttributes({ bio: val }); }
                        }),
                        el(TextControl, {
                            label: 'URL profilo',
                            value: attributes.url || '',
                            onChange: function(val) { setAttributes({ url: val }); }
                        }),
                        el('div', { style: { marginTop: '16px' } },
                            el('p', { style: { marginBottom: '8px', fontWeight: 600 } }, 'Foto'),
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: function(media) { setAttributes({ photo: media.url }); },
                                    allowedTypes: ['image'],
                                    value: attributes.photo,
                                    render: function(obj) {
                                        return el(Fragment, null,
                                            attributes.photo
                                                ? el('img', { src: attributes.photo, style: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%', marginBottom: '8px' } })
                                                : null,
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: attributes.photo ? 'secondary' : 'primary',
                                                style: { width: '100%' }
                                            }, attributes.photo ? 'Cambia foto' : 'Seleziona foto'),
                                            attributes.photo
                                                ? el(Button, {
                                                    onClick: function() { setAttributes({ photo: '' }); },
                                                    variant: 'tertiary',
                                                    isDestructive: true,
                                                    style: { width: '100%', marginTop: '4px' }
                                                  }, 'Rimuovi foto')
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
                        attributes.photo
                            ? el('img', { src: attributes.photo, style: { width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%' } })
                            : el('div', { style: { width: '48px', height: '48px', background: '#2a2a2a', borderRadius: '50%' } }),
                        el('div', null,
                            el('div', { style: { fontSize: '14px', color: '#e8e8e8', marginBottom: '2px' } },
                                attributes.name || 'Nome autore'
                            ),
                            el('div', { style: { fontSize: '10px', color: '#c9a55c', textTransform: 'uppercase', letterSpacing: '0.1em' } },
                                attributes.role || 'Ruolo'
                            )
                        )
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
