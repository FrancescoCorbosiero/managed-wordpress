(function(wp) {
    const { registerBlockType }                    = wp.blocks;
    const { createElement: el, Fragment }          = wp.element;
    const { InspectorControls }                    = wp.blockEditor;
    const { PanelBody, TextControl, RangeControl,
            ToggleControl }                        = wp.components;

    registerBlockType('cesana/category-posts', {
        edit: function({ attributes, setAttributes }) {
            var categorySlug    = attributes.categorySlug;
            var postsPerPage    = attributes.postsPerPage;
            var columns         = attributes.columns;
            var showImage       = attributes.showImage;
            var showExcerpt     = attributes.showExcerpt;
            var showAuthor      = attributes.showAuthor;
            var showDate        = attributes.showDate;
            var showReadingTime = attributes.showReadingTime;

            return el(Fragment, null,

                // ── Sidebar ──────────────────────────────────────────────
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Query', initialOpen: true },
                        el(TextControl, {
                            label: 'Slug Categoria',
                            help: 'Lascia vuoto per usare la categoria corrente (archivio).',
                            value: categorySlug,
                            onChange: function(val) { setAttributes({ categorySlug: val }); }
                        }),
                        el(RangeControl, {
                            label: 'Pagine per sezione',
                            value: postsPerPage,
                            min: 1,
                            max: 24,
                            onChange: function(val) { setAttributes({ postsPerPage: val }); }
                        }),
                        el(RangeControl, {
                            label: 'Colonne',
                            value: columns,
                            min: 1,
                            max: 4,
                            onChange: function(val) { setAttributes({ columns: val }); }
                        })
                    ),
                    el(PanelBody, { title: 'Visualizzazione', initialOpen: false },
                        el(ToggleControl, {
                            label: 'Mostra immagine',
                            help: 'Disattiva per card eleganti solo testo.',
                            checked: showImage,
                            onChange: function(val) { setAttributes({ showImage: val }); }
                        }),
                        el(ToggleControl, {
                            label: 'Mostra estratto',
                            checked: showExcerpt,
                            onChange: function(val) { setAttributes({ showExcerpt: val }); }
                        }),
                        el(ToggleControl, {
                            label: 'Mostra autore',
                            checked: showAuthor,
                            onChange: function(val) { setAttributes({ showAuthor: val }); }
                        }),
                        el(ToggleControl, {
                            label: 'Mostra data',
                            checked: showDate,
                            onChange: function(val) { setAttributes({ showDate: val }); }
                        }),
                        el(ToggleControl, {
                            label: 'Mostra tempo di lettura',
                            checked: showReadingTime,
                            onChange: function(val) { setAttributes({ showReadingTime: val }); }
                        })
                    )
                ),

                // ── Canvas placeholder ────────────────────────────────────
                el('div', { className: 'ca-editor-placeholder' },
                    el('div', { className: 'ca-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z' })
                        )
                    ),
                    el('div', { className: 'ca-editor-placeholder__title' }, 'Category Posts'),
                    el('div', { className: 'ca-editor-placeholder__text' },
                        categorySlug
                            ? 'Categoria: ' + categorySlug + ' — ' + postsPerPage + ' pagine, ' + columns + ' colonne'
                                + (showImage ? '' : ' (solo testo)')
                            : 'Categoria automatica (archivio) — ' + postsPerPage + ' pagine, ' + columns + ' colonne'
                                + (showImage ? '' : ' (solo testo)')
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
