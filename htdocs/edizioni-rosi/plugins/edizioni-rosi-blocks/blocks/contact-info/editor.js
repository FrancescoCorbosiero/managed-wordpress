(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;

    registerBlockType('edizioni-rosi/contact-info', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var socialLinks = attributes.socialLinks || [];

            function updateSocial(index, key, value) {
                var updated = socialLinks.map(function(item, i) {
                    if (i === index) {
                        var copy = {};
                        for (var k in item) copy[k] = item[k];
                        copy[key] = value;
                        return copy;
                    }
                    return item;
                });
                setAttributes({ socialLinks: updated });
            }

            function removeSocial(index) {
                setAttributes({ socialLinks: socialLinks.filter(function(_, i) { return i !== index; }) });
            }

            function addSocial() {
                setAttributes({ socialLinks: socialLinks.concat([{ platform: 'instagram', url: '' }]) });
            }

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Informazioni Contatto', initialOpen: true },
                        el(TextControl, {
                            label: 'Titolo sezione',
                            value: attributes.sectionTitle || '',
                            onChange: function(val) { setAttributes({ sectionTitle: val }); }
                        }),
                        el(TextControl, {
                            label: 'Email',
                            value: attributes.email || '',
                            onChange: function(val) { setAttributes({ email: val }); }
                        }),
                        el(TextControl, {
                            label: 'Telefono',
                            value: attributes.phone || '',
                            onChange: function(val) { setAttributes({ phone: val }); }
                        }),
                        el(TextControl, {
                            label: 'Indirizzo',
                            value: attributes.address || '',
                            onChange: function(val) { setAttributes({ address: val }); }
                        })
                    ),

                    socialLinks.map(function(social, idx) {
                        return el(PanelBody, {
                            key: idx,
                            title: 'Social ' + (idx + 1) + ' \u2014 ' + (social.platform || ''),
                            initialOpen: false
                        },
                            el(SelectControl, {
                                label: 'Piattaforma',
                                value: social.platform || 'instagram',
                                options: [
                                    { label: 'Instagram', value: 'instagram' },
                                    { label: 'Facebook', value: 'facebook' },
                                    { label: 'Twitter', value: 'twitter' },
                                    { label: 'LinkedIn', value: 'linkedin' },
                                    { label: 'WhatsApp', value: 'whatsapp' }
                                ],
                                onChange: function(val) { updateSocial(idx, 'platform', val); }
                            }),
                            el(TextControl, {
                                label: 'URL',
                                value: social.url || '',
                                onChange: function(val) { updateSocial(idx, 'url', val); }
                            }),
                            el(Button, {
                                variant: 'tertiary',
                                isSmall: true,
                                isDestructive: true,
                                onClick: function() { removeSocial(idx); }
                            }, 'Elimina')
                        );
                    }),

                    el(PanelBody, { title: 'Aggiungi Social', initialOpen: false },
                        el(Button, {
                            variant: 'primary',
                            onClick: addSocial,
                            style: { width: '100%' }
                        }, '+ Aggiungi Social')
                    )
                ),

                el('div', { className: 'er-editor-placeholder' },
                    el('div', { className: 'er-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                            el('path', { d: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' })
                        )
                    ),
                    el('div', { className: 'er-editor-placeholder__title' }, 'Contact Info'),
                    el('div', { className: 'er-editor-placeholder__text' },
                        [
                            attributes.email || 'email',
                            attributes.phone || 'telefono',
                            socialLinks.length + ' social'
                        ].join(' \u2022 ')
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
