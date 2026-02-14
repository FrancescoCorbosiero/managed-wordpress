(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/hero-banner', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M4 4h16v12H4V4zm0 14h16v2H4v-2z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Hero Banner'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Configura le slide, titoli e CTA nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
