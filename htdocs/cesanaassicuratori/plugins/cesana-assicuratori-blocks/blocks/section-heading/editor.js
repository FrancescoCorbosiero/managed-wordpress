(function(wp) {
    const { registerBlockType }                    = wp.blocks;
    const { createElement: el, Fragment }          = wp.element;
    const { InspectorControls }                    = wp.blockEditor;
    const { PanelBody, TextControl, ToggleControl,
            SelectControl }                        = wp.components;

    registerBlockType('cesana/section-heading', {
        edit: function({ attributes, setAttributes }) {
            var eyebrow      = attributes.eyebrow;
            var title        = attributes.title;
            var description  = attributes.description;
            var centered     = attributes.centered;
            var headingLevel = attributes.headingLevel;

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
                        el(TextControl, {
                            label: 'Descrizione',
                            value: description,
                            onChange: function(val) { setAttributes({ description: val }); }
                        })
                    ),
                    el(PanelBody, { title: 'Aspetto', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Centra testo',
                            checked: centered,
                            onChange: function(val) { setAttributes({ centered: val }); }
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
                            ? (eyebrow ? eyebrow + ' — ' : '') + title + (centered ? ' (centrato)' : '')
                            : 'Configura il blocco dal pannello laterale.'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
