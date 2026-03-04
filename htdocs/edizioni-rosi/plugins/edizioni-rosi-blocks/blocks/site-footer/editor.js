(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;

    registerBlockType('edizioni-rosi/site-footer', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var navItems = attributes.navItems || [];

            function updateNav(index, key, value) {
                var updated = navItems.map(function(item, i) {
                    if (i === index) {
                        var copy = {};
                        for (var k in item) copy[k] = item[k];
                        copy[key] = value;
                        return copy;
                    }
                    return item;
                });
                setAttributes({ navItems: updated });
            }

            function removeNav(index) {
                setAttributes({ navItems: navItems.filter(function(_, i) { return i !== index; }) });
            }

            function addNav() {
                setAttributes({ navItems: navItems.concat([{ href: '', label: '' }]) });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Crediti', initialOpen: true },
                        el(TextControl, {
                            label: 'Testo copyright',
                            value: attributes.copyrightText || '',
                            onChange: function(val) { setAttributes({ copyrightText: val }); }
                        }),
                        el(TextControl, {
                            label: 'Nome sviluppatore',
                            value: attributes.developerName || '',
                            onChange: function(val) { setAttributes({ developerName: val }); }
                        }),
                        el(TextControl, {
                            label: 'URL sviluppatore',
                            value: attributes.developerUrl || '',
                            onChange: function(val) { setAttributes({ developerUrl: val }); }
                        })
                    ),

                    navItems.map(function(item, idx) {
                        return el(PanelBody, {
                            key: idx,
                            title: 'Link ' + (idx + 1) + (item.label ? ' \u2014 ' + item.label : ''),
                            initialOpen: false
                        },
                            el(TextControl, {
                                label: 'Etichetta',
                                value: item.label || '',
                                onChange: function(val) { updateNav(idx, 'label', val); }
                            }),
                            el(TextControl, {
                                label: 'URL',
                                value: item.href || '',
                                onChange: function(val) { updateNav(idx, 'href', val); }
                            }),
                            el(Button, {
                                variant: 'tertiary',
                                isSmall: true,
                                isDestructive: true,
                                onClick: function() { removeNav(idx); }
                            }, 'Elimina')
                        );
                    }),

                    el(PanelBody, { title: 'Aggiungi Link', initialOpen: false },
                        el(Button, {
                            variant: 'primary',
                            onClick: addNav,
                            style: { width: '100%' }
                        }, '+ Aggiungi Link')
                    )
                ),

                el('div', { className: 'er-editor-placeholder' },
                    el('div', { className: 'er-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z' })
                        )
                    ),
                    el('div', { className: 'er-editor-placeholder__title' }, 'Site Footer'),
                    el('div', { className: 'er-editor-placeholder__text' },
                        '\u00a9 ' + (attributes.copyrightText || 'Edizioni Rosi') + ' \u2022 ' + navItems.length + ' link'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
