(function(wp) {
    const { registerBlockType } = wp.blocks;
    const { createElement: el } = wp.element;

    registerBlockType('golden-hive/shortcode-wrapper', {
        edit: function(props) {
            return el('div', { className: 'gh-editor-placeholder' },
                el('div', { className: 'gh-editor-placeholder__icon' },
                    el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
                        el('path', { d: 'M8 4l-6 6 6 6 1.4-1.4L4.8 10l4.6-4.6zm8 0l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z' })
                    )
                ),
                el('div', { className: 'gh-editor-placeholder__title' }, 'Shortcode Wrapper'),
                el('div', { className: 'gh-editor-placeholder__text' }, 'Configura questo blocco nel pannello laterale.')
            );
        },
        save: function() {
            return null;
        }
    });
})(window.wp);
