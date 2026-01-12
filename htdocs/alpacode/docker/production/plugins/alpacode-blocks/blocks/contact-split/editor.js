/**
 * Contact Split Block - Premium Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    var InspectorControls = wp.blockEditor.InspectorControls;
    var useBlockProps = wp.blockEditor.useBlockProps;

    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;
    var ToggleControl = wp.components.ToggleControl;
    var SelectControl = wp.components.SelectControl;

    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var ServerSideRender = wp.serverSideRender;

    var Edit = function (props) {
        var attributes = props.attributes;
        var setAttributes = props.setAttributes;
        var blockProps = useBlockProps();

        var updateContactCard = function (index, key, value) {
            var newCards = attributes.contactCards.map(function (card, i) {
                if (i === index) {
                    var updated = {};
                    for (var k in card) {
                        updated[k] = card[k];
                    }
                    updated[key] = value;
                    return updated;
                }
                return card;
            });
            setAttributes({ contactCards: newCards });
        };

        var addContactCard = function () {
            var newCards = attributes.contactCards.slice();
            newCards.push({
                icon: 'email',
                label: 'Label',
                value: 'Value',
                link: ''
            });
            setAttributes({ contactCards: newCards });
        };

        var removeContactCard = function (index) {
            var newCards = attributes.contactCards.filter(function (_, i) {
                return i !== index;
            });
            setAttributes({ contactCards: newCards });
        };

        var updateFormField = function (index, key, value) {
            var newFields = attributes.formFields.map(function (field, i) {
                if (i === index) {
                    var updated = {};
                    for (var k in field) {
                        updated[k] = field[k];
                    }
                    updated[key] = value;
                    return updated;
                }
                return field;
            });
            setAttributes({ formFields: newFields });
        };

        var addFormField = function () {
            var newFields = attributes.formFields.slice();
            newFields.push({
                name: 'field_' + Date.now(),
                label: 'New Field',
                type: 'text',
                required: false,
                placeholder: ''
            });
            setAttributes({ formFields: newFields });
        };

        var removeFormField = function (index) {
            var newFields = attributes.formFields.filter(function (_, i) {
                return i !== index;
            });
            setAttributes({ formFields: newFields });
        };

        var updateSocialLink = function (index, key, value) {
            var newLinks = attributes.socialLinks.map(function (link, i) {
                if (i === index) {
                    var updated = {};
                    for (var k in link) {
                        updated[k] = link[k];
                    }
                    updated[key] = value;
                    return updated;
                }
                return link;
            });
            setAttributes({ socialLinks: newLinks });
        };

        var addSocialLink = function () {
            var newLinks = attributes.socialLinks.slice();
            newLinks.push({
                platform: 'twitter',
                url: '#'
            });
            setAttributes({ socialLinks: newLinks });
        };

        var removeSocialLink = function (index) {
            var newLinks = attributes.socialLinks.filter(function (_, i) {
                return i !== index;
            });
            setAttributes({ socialLinks: newLinks });
        };

        // Header Panel
        var headerPanel = el(
            PanelBody,
            { title: 'Header', initialOpen: true },
            el(TextControl, {
                label: 'Eyebrow',
                value: attributes.eyebrow,
                onChange: function (value) { setAttributes({ eyebrow: value }); }
            }),
            el(TextControl, {
                label: 'Heading',
                value: attributes.heading,
                onChange: function (value) { setAttributes({ heading: value }); }
            }),
            el(TextareaControl, {
                label: 'Description',
                value: attributes.description,
                rows: 3,
                onChange: function (value) { setAttributes({ description: value }); }
            })
        );

        // Layout Panel
        var layoutPanel = el(
            PanelBody,
            { title: 'Layout', initialOpen: false },
            el(SelectControl, {
                label: 'Form Position',
                value: attributes.layout,
                options: [
                    { label: 'Form on Right', value: 'left' },
                    { label: 'Form on Left', value: 'right' }
                ],
                onChange: function (value) { setAttributes({ layout: value }); }
            }),
            el(SelectControl, {
                label: 'Split Ratio',
                value: attributes.splitRatio,
                options: [
                    { label: '50/50', value: '50-50' },
                    { label: '60/40', value: '60-40' },
                    { label: '40/60', value: '40-60' }
                ],
                onChange: function (value) { setAttributes({ splitRatio: value }); }
            }),
            el(SelectControl, {
                label: 'Card Style',
                value: attributes.cardStyle,
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Bordered', value: 'bordered' },
                    { label: 'Glass', value: 'glass' }
                ],
                onChange: function (value) { setAttributes({ cardStyle: value }); }
            })
        );

        // Contact Cards Panel
        var contactCardsPanels = attributes.contactCards.map(function (card, index) {
            return el(
                'div',
                {
                    key: index,
                    style: {
                        padding: '12px',
                        marginBottom: '12px',
                        background: 'rgba(0,0,0,0.05)',
                        borderRadius: '8px'
                    }
                },
                el(SelectControl, {
                    label: 'Icon',
                    value: card.icon,
                    options: [
                        { label: 'Email', value: 'email' },
                        { label: 'Phone', value: 'phone' },
                        { label: 'Location', value: 'location' },
                        { label: 'Clock', value: 'clock' }
                    ],
                    onChange: function (value) { updateContactCard(index, 'icon', value); }
                }),
                el(TextControl, {
                    label: 'Label',
                    value: card.label,
                    onChange: function (value) { updateContactCard(index, 'label', value); }
                }),
                el(TextControl, {
                    label: 'Value',
                    value: card.value,
                    onChange: function (value) { updateContactCard(index, 'value', value); }
                }),
                el(TextControl, {
                    label: 'Link (optional)',
                    value: card.link,
                    onChange: function (value) { updateContactCard(index, 'link', value); }
                }),
                el(Button, {
                    isDestructive: true,
                    size: 'small',
                    onClick: function () { removeContactCard(index); },
                    style: { marginTop: '8px' }
                }, 'Remove')
            );
        });

        var contactCardsPanel = el(
            PanelBody,
            { title: 'Contact Cards (' + attributes.contactCards.length + ')', initialOpen: false },
            el(Fragment, null, contactCardsPanels),
            el(Button, {
                variant: 'secondary',
                onClick: addContactCard,
                style: { marginTop: '12px' }
            }, '+ Add Contact Card')
        );

        // Social Links Panel
        var socialLinksPanels = attributes.socialLinks.map(function (social, index) {
            return el(
                'div',
                {
                    key: index,
                    style: {
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '8px',
                        alignItems: 'flex-end'
                    }
                },
                el(SelectControl, {
                    label: index === 0 ? 'Platform' : '',
                    value: social.platform,
                    options: [
                        { label: 'Twitter/X', value: 'twitter' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'GitHub', value: 'github' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'Facebook', value: 'facebook' }
                    ],
                    onChange: function (value) { updateSocialLink(index, 'platform', value); },
                    style: { marginBottom: 0 }
                }),
                el(TextControl, {
                    label: index === 0 ? 'URL' : '',
                    value: social.url,
                    onChange: function (value) { updateSocialLink(index, 'url', value); },
                    style: { flex: 1, marginBottom: 0 }
                }),
                el(Button, {
                    icon: 'trash',
                    isDestructive: true,
                    size: 'small',
                    onClick: function () { removeSocialLink(index); }
                })
            );
        });

        var socialLinksPanel = el(
            PanelBody,
            { title: 'Social Links', initialOpen: false },
            el(ToggleControl, {
                label: 'Show Social Links',
                checked: attributes.showSocialLinks,
                onChange: function (value) { setAttributes({ showSocialLinks: value }); }
            }),
            attributes.showSocialLinks && el(Fragment, null, socialLinksPanels),
            attributes.showSocialLinks && el(Button, {
                variant: 'secondary',
                onClick: addSocialLink,
                style: { marginTop: '8px' }
            }, '+ Add Social Link')
        );

        // Map Panel
        var mapPanel = el(
            PanelBody,
            { title: 'Map', initialOpen: false },
            el(ToggleControl, {
                label: 'Show Map Section',
                checked: attributes.showMap,
                onChange: function (value) { setAttributes({ showMap: value }); }
            }),
            attributes.showMap && el(TextareaControl, {
                label: 'Map Embed Code',
                help: 'Paste Google Maps or other embed iframe code here',
                value: attributes.mapEmbed,
                rows: 4,
                onChange: function (value) { setAttributes({ mapEmbed: value }); }
            }),
            attributes.showMap && !attributes.mapEmbed && el(TextControl, {
                label: 'Placeholder Text',
                value: attributes.mapPlaceholderText,
                onChange: function (value) { setAttributes({ mapPlaceholderText: value }); }
            })
        );

        // Form Panel
        var formFieldsPanels = attributes.formFields.map(function (field, index) {
            return el(
                'div',
                {
                    key: index,
                    style: {
                        padding: '12px',
                        marginBottom: '12px',
                        background: 'rgba(0,0,0,0.05)',
                        borderRadius: '8px'
                    }
                },
                el(TextControl, {
                    label: 'Field Name',
                    value: field.name,
                    onChange: function (value) { updateFormField(index, 'name', value); }
                }),
                el(TextControl, {
                    label: 'Label',
                    value: field.label,
                    onChange: function (value) { updateFormField(index, 'label', value); }
                }),
                el(SelectControl, {
                    label: 'Type',
                    value: field.type,
                    options: [
                        { label: 'Text', value: 'text' },
                        { label: 'Email', value: 'email' },
                        { label: 'Phone', value: 'tel' },
                        { label: 'Textarea', value: 'textarea' }
                    ],
                    onChange: function (value) { updateFormField(index, 'type', value); }
                }),
                el(TextControl, {
                    label: 'Placeholder',
                    value: field.placeholder,
                    onChange: function (value) { updateFormField(index, 'placeholder', value); }
                }),
                el(ToggleControl, {
                    label: 'Required',
                    checked: field.required,
                    onChange: function (value) { updateFormField(index, 'required', value); }
                }),
                el(Button, {
                    isDestructive: true,
                    size: 'small',
                    onClick: function () { removeFormField(index); }
                }, 'Remove Field')
            );
        });

        var formPanel = el(
            PanelBody,
            { title: 'Contact Form', initialOpen: false },
            el(SelectControl, {
                label: 'Form Type',
                value: attributes.formType,
                options: [
                    { label: 'Built-in Form', value: 'builtin' },
                    { label: 'Shortcode (CF7, WPForms, etc.)', value: 'shortcode' },
                    { label: 'No Form', value: 'none' }
                ],
                onChange: function (value) { setAttributes({ formType: value }); }
            }),
            attributes.formType === 'shortcode' && el(TextControl, {
                label: 'Form Shortcode',
                help: 'e.g., [contact-form-7 id="123"]',
                value: attributes.formShortcode,
                onChange: function (value) { setAttributes({ formShortcode: value }); }
            }),
            attributes.formType === 'builtin' && el(TextControl, {
                label: 'Form Action URL',
                help: 'Leave empty for default behavior',
                value: attributes.formAction,
                onChange: function (value) { setAttributes({ formAction: value }); }
            }),
            attributes.formType === 'builtin' && el(TextControl, {
                label: 'Submit Button Text',
                value: attributes.submitButtonText,
                onChange: function (value) { setAttributes({ submitButtonText: value }); }
            }),
            attributes.formType === 'builtin' && el('hr', { style: { margin: '16px 0' } }),
            attributes.formType === 'builtin' && el('strong', null, 'Form Fields'),
            attributes.formType === 'builtin' && el(Fragment, null, formFieldsPanels),
            attributes.formType === 'builtin' && el(Button, {
                variant: 'secondary',
                onClick: addFormField,
                style: { marginTop: '12px' }
            }, '+ Add Field')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                headerPanel,
                layoutPanel,
                contactCardsPanel,
                socialLinksPanel,
                mapPanel,
                formPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/contact-split',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        var blockSettings = wp.blocks.getBlockType('alpacode/contact-split');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/contact-split', {
                edit: Edit
            });
        }
    });

})(window.wp);
