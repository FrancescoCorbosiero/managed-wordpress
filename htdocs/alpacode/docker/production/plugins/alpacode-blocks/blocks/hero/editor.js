/**
 * Hero Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl, ToggleControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                el(
                    PanelBody,
                    { title: 'Hero Settings', initialOpen: true },
                    el(TextControl, {
                        label: 'Eyebrow Text',
                        value: attributes.eyebrow,
                        onChange: function (value) { setAttributes({ eyebrow: value }); }
                    }),
                    el(TextControl, {
                        label: 'Heading',
                        value: attributes.heading,
                        onChange: function (value) { setAttributes({ heading: value }); }
                    }),
                    el(TextControl, {
                        label: 'Description',
                        value: attributes.description,
                        onChange: function (value) { setAttributes({ description: value }); }
                    }),
                    el(ToggleControl, {
                        label: 'Show Buttons',
                        checked: attributes.showButtons,
                        onChange: function (value) { setAttributes({ showButtons: value }); }
                    }),
                    attributes.showButtons && el(
                        Fragment,
                        null,
                        el(TextControl, {
                            label: 'Primary Button Text',
                            value: attributes.primaryButtonText,
                            onChange: function (value) { setAttributes({ primaryButtonText: value }); }
                        }),
                        el(TextControl, {
                            label: 'Primary Button URL',
                            value: attributes.primaryButtonUrl,
                            onChange: function (value) { setAttributes({ primaryButtonUrl: value }); }
                        }),
                        el(TextControl, {
                            label: 'Secondary Button Text',
                            value: attributes.secondaryButtonText,
                            onChange: function (value) { setAttributes({ secondaryButtonText: value }); }
                        }),
                        el(TextControl, {
                            label: 'Secondary Button URL',
                            value: attributes.secondaryButtonUrl,
                            onChange: function (value) { setAttributes({ secondaryButtonUrl: value }); }
                        })
                    )
                )
            ),
            el(ServerSideRender, {
                block: 'alpacode/hero',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/hero');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/hero', {
                edit: Edit
            });
        }
    });

})(window.wp);