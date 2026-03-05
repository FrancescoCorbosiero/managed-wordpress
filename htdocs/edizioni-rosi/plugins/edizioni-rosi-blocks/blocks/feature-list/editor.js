(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    var iconOptions = [
        { label: 'Libro', value: 'book' },
        { label: 'Penna', value: 'pen' },
        { label: 'Globo', value: 'globe' },
        { label: 'Scudo', value: 'shield' },
        { label: 'Cuore', value: 'heart' },
        { label: 'Stella', value: 'star' },
        { label: 'Persone', value: 'users' },
        { label: 'Idea', value: 'lightbulb' }
    ];

    registerBlockType('edizioni-rosi/feature-list', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items || [];

            function updateItem(index, key, value) {
                var updated = items.map(function(item, i) {
                    if (i === index) {
                        var copy = {};
                        for (var k in item) copy[k] = item[k];
                        copy[key] = value;
                        return copy;
                    }
                    return item;
                });
                setAttributes({ items: updated });
            }

            function removeItem(index) {
                setAttributes({ items: items.filter(function(_, i) { return i !== index; }) });
            }

            function addItem() {
                setAttributes({ items: items.concat([{ title: '', description: '', icon: 'book' }]) });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Intestazione', initialOpen: true },
                        el(TextControl, {
                            label: 'Eyebrow',
                            value: attributes.eyebrow || '',
                            onChange: function(val) { setAttributes({ eyebrow: val }); }
                        }),
                        el(TextControl, {
                            label: 'Titolo',
                            value: attributes.title || '',
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),
                        el(TextControl, {
                            label: 'Sottotitolo',
                            value: attributes.subtitle || '',
                            onChange: function(val) { setAttributes({ subtitle: val }); }
                        })
                    ),

                    items.map(function(item, idx) {
                        return el(PanelBody, {
                            key: idx,
                            title: (idx + 1) + '. ' + (item.title || 'Elemento'),
                            initialOpen: false
                        },
                            el(TextControl, {
                                label: 'Titolo',
                                value: item.title || '',
                                onChange: function(val) { updateItem(idx, 'title', val); }
                            }),
                            el(TextareaControl, {
                                label: 'Descrizione',
                                value: item.description || '',
                                onChange: function(val) { updateItem(idx, 'description', val); }
                            }),
                            el(SelectControl, {
                                label: 'Icona',
                                value: item.icon || 'book',
                                options: iconOptions,
                                onChange: function(val) { updateItem(idx, 'icon', val); }
                            }),
                            el(Button, {
                                variant: 'tertiary',
                                isSmall: true,
                                isDestructive: true,
                                onClick: function() { removeItem(idx); }
                            }, 'Elimina')
                        );
                    }),

                    el(PanelBody, { title: 'Aggiungi Elemento', initialOpen: false },
                        el(Button, {
                            variant: 'primary',
                            onClick: addItem,
                            style: { width: '100%' }
                        }, '+ Aggiungi Elemento')
                    )
                ),

                el('div', { className: 'er-editor-placeholder' },
                    el('div', { className: 'er-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' })
                        )
                    ),
                    el('div', { className: 'er-editor-placeholder__title' }, attributes.title || 'Feature List'),
                    el('div', { className: 'er-editor-placeholder__text' },
                        items.length + ' elementi'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
