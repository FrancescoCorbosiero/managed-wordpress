(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('golden-hive/parallax-section', {
        edit: function(props) {
            return el('div', { className: 'gh-editor-placeholder' },
                el('div', { className: 'gh-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M21 3H3v18h18V3zM5 19V5h14v14H5z' })
                    )
                ),
                el('div', { className: 'gh-editor-placeholder__title' }, 'Parallax Section'),
                el('div', { className: 'gh-editor-placeholder__text' }, 'Configura questo blocco nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
