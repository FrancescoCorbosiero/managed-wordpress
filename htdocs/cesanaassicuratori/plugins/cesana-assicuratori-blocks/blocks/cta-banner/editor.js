(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/cta-banner', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M18 11v2h4v-2h-4zm-2 6.46l2.95 2.09.81-1.29-2.95-2.09-.81 1.29zM20.24 5.46l-.81-1.29-2.95 2.09.81 1.29 2.95-2.09zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'CTA Banner'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Configura il banner call-to-action nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
