(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/why-broker', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Perché Scegliere Cesana'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Configura le motivazioni nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
