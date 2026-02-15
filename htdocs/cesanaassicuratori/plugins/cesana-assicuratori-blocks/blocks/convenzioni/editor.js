(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/convenzioni', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Convenzioni'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Galleria di convenzioni con immagini. Configura nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
