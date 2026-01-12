/**
 * Pricing Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl, Button, ToggleControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updatePlan = function (index, key, value) {
            const newPlans = attributes.plans.slice();
            newPlans[index][key] = value;
            setAttributes({ plans: newPlans });
        };

        const updateFeature = function (planIndex, featureIndex, value) {
            const newPlans = attributes.plans.slice();
            newPlans[planIndex].features[featureIndex] = value;
            setAttributes({ plans: newPlans });
        };

        const addFeature = function (planIndex) {
            const newPlans = attributes.plans.slice();
            newPlans[planIndex].features.push('New feature');
            setAttributes({ plans: newPlans });
        };

        const removeFeature = function (planIndex, featureIndex) {
            const newPlans = attributes.plans.slice();
            newPlans[planIndex].features.splice(featureIndex, 1);
            setAttributes({ plans: newPlans });
        };

        const sectionPanel = el(
            PanelBody,
            { title: 'Section Settings', initialOpen: true },
            el(TextControl, {
                label: 'Section Title',
                value: attributes.sectionTitle,
                onChange: function (value) { setAttributes({ sectionTitle: value }); }
            }),
            el(TextControl, {
                label: 'Section Subtitle',
                value: attributes.sectionSubtitle,
                onChange: function (value) { setAttributes({ sectionSubtitle: value }); }
            })
        );

        const planPanels = attributes.plans.map(function (plan, planIndex) {
            const featureControls = plan.features.map(function (feature, featureIndex) {
                return el(
                    'div',
                    {
                        key: featureIndex,
                        style: { display: 'flex', gap: '8px', marginTop: '8px' }
                    },
                    el(TextControl, {
                        value: feature,
                        onChange: function (value) { updateFeature(planIndex, featureIndex, value); },
                        style: { flex: 1 }
                    }),
                    el(Button, {
                        isDestructive: true,
                        onClick: function () { removeFeature(planIndex, featureIndex); }
                    }, 'Remove')
                );
            });

            return el(
                PanelBody,
                {
                    key: planIndex,
                    title: 'Plan ' + (planIndex + 1) + ': ' + plan.name,
                    initialOpen: false
                },
                el(TextControl, {
                    label: 'Plan Name',
                    value: plan.name,
                    onChange: function (value) { updatePlan(planIndex, 'name', value); }
                }),
                el(TextControl, {
                    label: 'Price',
                    value: plan.price,
                    onChange: function (value) { updatePlan(planIndex, 'price', value); }
                }),
                el(TextControl, {
                    label: 'Period',
                    value: plan.period,
                    onChange: function (value) { updatePlan(planIndex, 'period', value); }
                }),
                el(TextControl, {
                    label: 'Description',
                    value: plan.description,
                    onChange: function (value) { updatePlan(planIndex, 'description', value); }
                }),
                el(ToggleControl, {
                    label: 'Featured Plan',
                    checked: plan.featured,
                    onChange: function (value) { updatePlan(planIndex, 'featured', value); }
                }),
                el(TextControl, {
                    label: 'Button Text',
                    value: plan.buttonText,
                    onChange: function (value) { updatePlan(planIndex, 'buttonText', value); }
                }),
                el(TextControl, {
                    label: 'Button URL',
                    value: plan.buttonUrl,
                    onChange: function (value) { updatePlan(planIndex, 'buttonUrl', value); }
                }),
                el('hr', { style: { margin: '20px 0' } }),
                el('strong', null, 'Features'),
                el(Fragment, null, featureControls),
                el(Button, {
                    isPrimary: true,
                    onClick: function () { addFeature(planIndex); },
                    style: { marginTop: '12px' }
                }, 'Add Feature')
            );
        });

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                sectionPanel,
                el(Fragment, null, planPanels)
            ),
            el(ServerSideRender, {
                block: 'alpacode/pricing',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        const blockSettings = wp.blocks.getBlockType('alpacode/pricing');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/pricing', {
                edit: Edit
            });
        }
    });

})(window.wp);