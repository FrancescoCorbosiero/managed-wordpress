(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('cesana/page-hero', {
        edit: function() {
            return el('div', { className: 'ca-editor-placeholder' },
                el('div', { className: 'ca-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5z' })
                    )
                ),
                el('div', { className: 'ca-editor-placeholder__title' }, 'Page Hero'),
                el('div', { className: 'ca-editor-placeholder__text' }, 'Configura titolo, sottotitolo e breadcrumbs nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
