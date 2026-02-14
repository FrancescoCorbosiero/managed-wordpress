(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/testimonial-stats', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Testimonial Stats'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Configura le statistiche animate nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
