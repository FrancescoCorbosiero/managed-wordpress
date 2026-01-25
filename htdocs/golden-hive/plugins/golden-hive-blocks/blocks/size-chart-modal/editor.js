(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('golden-hive/size-chart-modal', {
        edit: function(props) {
            return el('div', { className: 'gh-editor-placeholder' },
                el('div', { className: 'gh-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H4c-1.1 0-2 .9-2 2v3h20V5c0-1.1-.9-2-2-2zM2 19c0 1.1.9 2 2 2h3V10H2v9z' })
                    )
                ),
                el('div', { className: 'gh-editor-placeholder__title' }, 'Size Chart Modal'),
                el('div', { className: 'gh-editor-placeholder__text' }, 'Configura questo blocco nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
