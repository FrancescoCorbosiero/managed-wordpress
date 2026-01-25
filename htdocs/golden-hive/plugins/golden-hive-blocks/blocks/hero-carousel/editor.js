(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('golden-hive/hero-carousel', {
        edit: function(props) {
            return el('div', { className: 'gh-editor-placeholder' },
                el('div', { className: 'gh-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M4 4h16v12H4V4zm0 14h16v2H4v-2z' })
                    )
                ),
                el('div', { className: 'gh-editor-placeholder__title' }, 'Hero Carousel'),
                el('div', { className: 'gh-editor-placeholder__text' }, 'Configura questo blocco nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
