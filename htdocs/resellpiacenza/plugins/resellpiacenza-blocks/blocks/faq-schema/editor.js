/**
 * FAQ Schema Block - Editor Registration
 */
(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { useBlockProps } = wp.blockEditor;
    const { createElement: el } = wp.element;
    const { __ } = wp.i18n;

    const blockConfig = wp.blocks.getBlockType(document.currentScript?.dataset?.blockName);
    if (!blockConfig) return;

    registerBlockType(blockConfig.name, {
        ...blockConfig,
        edit: function(props) {
            const blockProps = useBlockProps();
            return el('div', blockProps,
                el('div', {
                    className: 'rp-editor-placeholder',
                    style: {
                        padding: '40px',
                        textAlign: 'center',
                        background: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #e8e5df'
                    }
                },
                    el('span', { className: 'dashicons dashicons-editor-help', style: { fontSize: '36px', color: '#d4af37', marginBottom: '12px', display: 'block' } }),
                    el('h3', { style: { margin: '0 0 8px', fontSize: '16px', color: '#0a192f' } }, blockConfig.title),
                    el('p', { style: { margin: 0, color: '#5c5750', fontSize: '14px' } }, __('Configure this block in the sidebar panel.', 'resellpiacenza-blocks'))
                )
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
