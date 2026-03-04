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

    registerBlockType('edizioni-rosi/site-header', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var logoUrl = attributes.logoUrl || '';
            var siteName = attributes.siteName || '';
            var navItems = attributes.navItems || [];

            function updateNavItem(index, key, value) {
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

            function removeNavItem(index) {
                setAttributes({ navItems: navItems.filter(function(_, i) { return i !== index; }) });
            }

            function addNavItem() {
                setAttributes({ navItems: navItems.concat([{ href: '/', label: '' }]) });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Logo', initialOpen: true },
                        el(TextControl, {
                            label: 'Nome sito',
                            value: siteName,
                            onChange: function(val) { setAttributes({ siteName: val }); }
                        }),
                        el('div', { style: { marginBottom: '16px' } },
                            el('p', { style: { marginBottom: '8px', fontWeight: 600 } }, 'Immagine logo'),
                            el(MediaUploadCheck, null,
                                el(MediaUpload, {
                                    onSelect: function(media) { setAttributes({ logoUrl: media.url }); },
                                    allowedTypes: ['image'],
                                    value: logoUrl,
                                    render: function(obj) {
                                        return el(Fragment, null,
                                            logoUrl
                                                ? el('img', { src: logoUrl, style: { width: '100%', marginBottom: '8px', borderRadius: '4px' } })
                                                : null,
                                            el(Button, {
                                                onClick: obj.open,
                                                variant: logoUrl ? 'secondary' : 'primary',
                                                style: { width: '100%' }
                                            }, logoUrl ? 'Cambia logo' : 'Seleziona logo'),
                                            logoUrl
                                                ? el(Button, {
                                                    onClick: function() { setAttributes({ logoUrl: '' }); },
                                                    variant: 'tertiary',
                                                    isDestructive: true,
                                                    style: { width: '100%', marginTop: '4px' }
                                                  }, 'Rimuovi logo')
                                                : null
                                        );
                                    }
                                })
                            )
                        )
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
                                onChange: function(val) { updateNavItem(idx, 'label', val); }
                            }),
                            el(TextControl, {
                                label: 'URL',
                                value: item.href || '',
                                onChange: function(val) { updateNavItem(idx, 'href', val); }
                            }),
                            el(Button, {
                                variant: 'tertiary',
                                isSmall: true,
                                isDestructive: true,
                                onClick: function() { removeNavItem(idx); }
                            }, 'Elimina')
                        );
                    }),

                    el(PanelBody, { title: 'Aggiungi Link', initialOpen: false },
                        el(Button, {
                            variant: 'primary',
                            onClick: addNavItem,
                            style: { width: '100%' }
                        }, '+ Aggiungi Link')
                    )
                ),

                el('div', { className: 'er-editor-placeholder' },
                    el('div', { className: 'er-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' })
                        )
                    ),
                    el('div', { className: 'er-editor-placeholder__title' }, 'Site Header'),
                    el('div', { className: 'er-editor-placeholder__text' },
                        siteName + ' \u2014 ' + navItems.length + ' link di navigazione'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
