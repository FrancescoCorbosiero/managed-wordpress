(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/page-loader', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder ca-editor-placeholder--dark' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Page Loader'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Splash screen animato con logo e tagline. Visibile solo al primo caricamento.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
