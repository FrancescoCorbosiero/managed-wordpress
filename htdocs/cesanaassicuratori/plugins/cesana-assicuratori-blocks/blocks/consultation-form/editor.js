(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/consultation-form', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Consultation Form'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Form "Ottieni una consulenza gratuita". Configura nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
