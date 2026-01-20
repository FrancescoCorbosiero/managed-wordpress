/**
 * Hero Video Block - Editor Registration
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
                        padding: '60px 40px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
                        borderRadius: '12px',
                        color: '#fff'
                    }
                },
                    el('div', {
                        style: {
                            width: '48px',
                            height: '48px',
                            margin: '0 auto 16px',
                            background: '#d4af37',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    },
                        el('span', { className: 'dashicons dashicons-video-alt3', style: { color: '#0a192f' } })
                    ),
                    el('h3', { style: { margin: '0 0 8px', fontSize: '18px', fontWeight: '600', color: '#fff' } }, blockConfig.title),
                    el('p', { style: { margin: 0, color: '#d4af37', fontSize: '14px' } }, __('Configure this block in the sidebar panel.', 'resellpiacenza-blocks'))
                )
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
