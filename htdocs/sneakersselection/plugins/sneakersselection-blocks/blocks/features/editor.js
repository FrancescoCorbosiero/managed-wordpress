/**
 * Block Editor Registration
 */
(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps, InspectorControls } = wp.blockEditor;
    const { PanelBody, TextControl, ToggleControl, RangeControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    const blockConfig = wp.blocks.getBlockType(document.currentScript?.dataset?.blockName);
    if (!blockConfig) return;

    registerBlockType(blockConfig.name, {
        ...blockConfig,
        edit: function(props) {
            const blockProps = useBlockProps();
            return el('div', blockProps,
                el('div', { className: 'ss-editor-placeholder', style: { padding: '40px', textAlign: 'center', background: '#f5f5f5', borderRadius: '8px' } },
                    el('h3', { style: { margin: '0 0 8px', fontSize: '16px' } }, blockConfig.title),
                    el('p', { style: { margin: 0, color: '#666', fontSize: '14px' } }, __('Configure this block in the sidebar panel.', 'sneakersselection-blocks'))
                )
            );
        },
        save: function() {
            return null; // Server-side rendered
        }
    });
})(window.wp);
