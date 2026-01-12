/**
 * Services Block - Editor Script
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
        const { heading, subheading } = attributes;
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
                        label: 'Subheading',
                        value: subheading,
                        onChange: function (value) { setAttributes({ subheading: value }); }
                    }),
                    el(TextControl, {
                        label: 'Heading',
                        value: heading,
                        onChange: function (value) { setAttributes({ heading: value }); }
                    }),
                    el('p', {
                        style: { color: '#71717a', fontSize: '12px', marginTop: '12px' }
                    }, 'Edit individual services in the Code Editor or via PHP.')
                )
            ),
            el(ServerSideRender, {
                block: 'alpacode/services',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/services');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/services', {
                edit: Edit
            });
        }
    });

})(window.wp);