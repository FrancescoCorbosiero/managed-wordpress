(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var InnerBlocks = wp.blockEditor.InnerBlocks;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;

    var ALLOWED_BLOCKS = ['edizioni-rosi/editor-card'];

    registerBlockType('edizioni-rosi/editor-grid', {
        edit: function(props) {
            var sectionTitle = props.attributes.sectionTitle || '';

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Impostazioni Griglia', initialOpen: true },
                        el(TextControl, {
                            label: 'Titolo sezione',
                            value: sectionTitle,
                            onChange: function(val) { props.setAttributes({ sectionTitle: val }); }
                        })
                    )
                ),

                el('div', { className: 'er-editor-placeholder' },
                    el('div', { className: 'er-editor-placeholder__title' },
                        'Editor Grid' + (sectionTitle ? ' \u2014 ' + sectionTitle : '')
                    ),
                    el('div', { className: 'er-editor-placeholder__text' },
                        'Aggiungi editor-card come blocchi interni.'
                    ),
                    el('div', { style: { marginTop: '16px' } },
                        el(InnerBlocks, {
                            allowedBlocks: ALLOWED_BLOCKS,
                            template: [['edizioni-rosi/editor-card', {}]],
                            renderAppender: InnerBlocks.ButtonBlockAppender
                        })
                    )
                )
            );
        },

        save: function() {
            return el(InnerBlocks.Content);
        }
    });
})(window.wp);
