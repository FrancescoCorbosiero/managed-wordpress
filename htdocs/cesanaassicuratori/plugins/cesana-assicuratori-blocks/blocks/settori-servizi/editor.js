(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/settori-servizi', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder ca-editor-placeholder--dark' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Settori & Servizi'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Griglia bento asimmetrica. Configura nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
