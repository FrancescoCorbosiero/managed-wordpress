(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var ToggleControl = wp.components.ToggleControl;
    var Button = wp.components.Button;

    registerBlockType('edizioni-rosi/faq-section', {
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
                setAttributes({ items: items.concat([{ question: '', answer: '' }]) });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Intestazione', initialOpen: true },
                        el(TextControl, {
                            label: 'Titolo',
                            value: attributes.title || '',
                            onChange: function(val) { setAttributes({ title: val }); }
                        }),
                        el(TextControl, {
                            label: 'Sottotitolo',
                            value: attributes.subtitle || '',
                            onChange: function(val) { setAttributes({ subtitle: val }); }
                        }),
                        el(ToggleControl, {
                            label: 'Apri più risposte contemporaneamente',
                            checked: attributes.allowMultiple || false,
                            onChange: function(val) { setAttributes({ allowMultiple: val }); }
                        })
                    ),

                    items.map(function(item, idx) {
                        return el(PanelBody, {
                            key: idx,
                            title: 'FAQ ' + (idx + 1) + (item.question ? ' \u2014 ' + item.question.substring(0, 30) : ''),
                            initialOpen: false
                        },
                            el(TextControl, {
                                label: 'Domanda',
                                value: item.question || '',
                                onChange: function(val) { updateItem(idx, 'question', val); }
                            }),
                            el(TextareaControl, {
                                label: 'Risposta',
                                value: item.answer || '',
                                onChange: function(val) { updateItem(idx, 'answer', val); }
                            }),
                            el(Button, {
                                variant: 'tertiary',
                                isSmall: true,
                                isDestructive: true,
                                onClick: function() { removeItem(idx); }
                            }, 'Elimina')
                        );
                    }),

                    el(PanelBody, { title: 'Aggiungi FAQ', initialOpen: false },
                        el(Button, {
                            variant: 'primary',
                            onClick: addItem,
                            style: { width: '100%' }
                        }, '+ Aggiungi Domanda')
                    )
                ),

                el('div', { className: 'er-editor-placeholder' },
                    el('div', { className: 'er-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z' })
                        )
                    ),
                    el('div', { className: 'er-editor-placeholder__title' }, attributes.title || 'FAQ Section'),
                    el('div', { className: 'er-editor-placeholder__text' },
                        items.length + ' domande \u2022 Schema FAQPage incluso'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
