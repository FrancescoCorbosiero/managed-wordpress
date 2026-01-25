(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('golden-hive/hero-video', {
        edit: function(props) {
            return el('div', { className: 'gh-editor-placeholder' },
                el('div', { className: 'gh-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M8 5v14l11-7z' })
                    )
                ),
                el('div', { className: 'gh-editor-placeholder__title' }, 'Hero Video'),
                el('div', { className: 'gh-editor-placeholder__text' }, 'Configura questo blocco nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
