/**
 * CTA Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl } = wp.components;
    const { createElement: el } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const { heading, description, buttonText, buttonUrl } = attributes;
        const blockProps = useBlockProps();

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                el(
                    PanelBody,
                    { title: 'Content', initialOpen: true },
                    el(TextControl, {
                        label: 'Heading',
                        value: heading,
                        onChange: function (value) { setAttributes({ heading: value }); }
                    }),
                    el(TextControl, {
                        label: 'Description',
                        value: description,
                        onChange: function (value) { setAttributes({ description: value }); }
                    })
                ),
                el(
                    PanelBody,
                    { title: 'Button', initialOpen: false },
                    el(TextControl, {
                        label: 'Button Text',
                        value: buttonText,
                        onChange: function (value) { setAttributes({ buttonText: value }); }
                    }),
                    el(TextControl, {
                        label: 'Button URL',
                        value: buttonUrl,
                        onChange: function (value) { setAttributes({ buttonUrl: value }); }
                    })
                )
            ),
            el(ServerSideRender, {
                block: 'alpacode/cta',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/cta');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/cta', {
                edit: Edit
            });
        }
    });

})(window.wp);