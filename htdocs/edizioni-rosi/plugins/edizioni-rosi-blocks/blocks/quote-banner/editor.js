(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var SelectControl = wp.components.SelectControl;

    registerBlockType('edizioni-rosi/quote-banner', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Citazione', initialOpen: true },
                        el(TextareaControl, {
                            label: 'Testo citazione',
                            value: attributes.quote || '',
                            onChange: function(val) { setAttributes({ quote: val }); }
                        }),
                        el(TextControl, {
                            label: 'Nome autore',
                            value: attributes.authorName || '',
                            onChange: function(val) { setAttributes({ authorName: val }); }
                        }),
                        el(TextControl, {
                            label: 'Ruolo / descrizione',
                            help: 'Es. "Autore", "Critico letterario"',
                            value: attributes.authorRole || '',
                            onChange: function(val) { setAttributes({ authorRole: val }); }
                        }),
                        el(TextControl, {
                            label: 'Opera di riferimento',
                            help: 'Titolo del libro da cui proviene la citazione.',
                            value: attributes.sourceTitle || '',
                            onChange: function(val) { setAttributes({ sourceTitle: val }); }
                        })
                    ),
                    el(PanelBody, { title: 'Aspetto', initialOpen: false },
                        el(SelectControl, {
                            label: 'Variante',
                            value: attributes.variant || 'dark',
                            options: [
                                { label: 'Scuro', value: 'dark' },
                                { label: 'Oro', value: 'gold' }
                            ],
                            onChange: function(val) { setAttributes({ variant: val }); }
                        })
                    )
                ),

                el('div', { className: 'er-editor-placeholder er-editor-placeholder--dark',
                            style: { padding: '24px', textAlign: 'center', position: 'relative' } },
                    el('div', { style: { fontSize: '48px', fontFamily: "'Playfair Display', serif", color: 'rgba(201,165,92,0.15)', lineHeight: 1, marginBottom: '-8px' } }, '\u201C'),
                    el('div', { style: { fontSize: '14px', fontStyle: 'italic', color: '#e8e8e8', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 12px' } },
                        attributes.quote || 'Inserisci una citazione dal pannello laterale.'
                    ),
                    (attributes.authorName || attributes.sourceTitle)
                        ? el('div', { style: { fontSize: '11px', color: '#c9a55c' } },
                            [attributes.authorName, attributes.sourceTitle].filter(Boolean).join(' \u2014 ')
                          )
                        : null
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
