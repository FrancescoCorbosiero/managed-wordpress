(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/trust-indicators', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Trust Indicators'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Configura gli indicatori di fiducia nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
