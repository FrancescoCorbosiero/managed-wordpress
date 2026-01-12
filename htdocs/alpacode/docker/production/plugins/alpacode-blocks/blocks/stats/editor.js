/**
 * Stats Counter Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl, RangeControl, Button } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updateStat = function (index, key, value) {
            const newStats = attributes.stats.slice();
            newStats[index][key] = value;
            setAttributes({ stats: newStats });
        };

        const addStat = function () {
            const newStats = attributes.stats.slice();
            newStats.push({
                number: '100',
                suffix: '+',
                label: 'New Metric',
                description: 'Description here'
            });
            setAttributes({ stats: newStats });
        };

        const removeStat = function (index) {
            const newStats = attributes.stats.slice();
            newStats.splice(index, 1);
            setAttributes({ stats: newStats });
        };

        const animationPanel = el(
            PanelBody,
            { title: 'Animation Settings', initialOpen: true },
            el(RangeControl, {
                label: 'Animation Duration (ms)',
                value: attributes.animationDuration,
                onChange: function (value) { setAttributes({ animationDuration: value }); },
                min: 500,
                max: 5000,
                step: 100
            })
        );

        const statPanels = attributes.stats.map(function (stat, index) {
            return el(
                PanelBody,
                {
                    key: index,
                    title: 'Stat ' + (index + 1) + ': ' + stat.label,
                    initialOpen: false
                },
                el(TextControl, {
                    label: 'Number',
                    value: stat.number,
                    onChange: function (value) { updateStat(index, 'number', value); },
                    help: 'Enter the number without suffix'
                }),
                el(TextControl, {
                    label: 'Suffix',
                    value: stat.suffix,
                    onChange: function (value) { updateStat(index, 'suffix', value); },
                    help: 'e.g., +, %, K, M'
                }),
                el(TextControl, {
                    label: 'Label',
                    value: stat.label,
                    onChange: function (value) { updateStat(index, 'label', value); }
                }),
                el(TextControl, {
                    label: 'Description',
                    value: stat.description,
                    onChange: function (value) { updateStat(index, 'description', value); }
                }),
                el('hr', { style: { margin: '20px 0' } }),
                el(Button, {
                    isDestructive: true,
                    onClick: function () { removeStat(index); }
                }, 'Remove Stat')
            );
        });

        const addPanel = el(
            PanelBody,
            { title: 'Add New', initialOpen: false },
            el(Button, {
                isPrimary: true,
                onClick: addStat
            }, 'Add Stat')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                animationPanel,
                el(Fragment, null, statPanels),
                addPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/stats',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/stats');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/stats', {
                edit: Edit
            });
        }
    });

})(window.wp);