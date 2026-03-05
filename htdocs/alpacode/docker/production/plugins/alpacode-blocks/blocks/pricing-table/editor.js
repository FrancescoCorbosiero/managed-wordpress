/**
 * Pricing Table Block - Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, TextControl, TextareaControl, SelectControl, RangeControl, ToggleControl, Button } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const ServerSideRender = wp.serverSideRender;

    const Edit = function (props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();

        const updatePlan = function (index, key, value) {
            const newPlans = attributes.plans.slice();
            newPlans[index] = Object.assign({}, newPlans[index], { [key]: value });
            setAttributes({ plans: newPlans });
        };

        const updateFeature = function (planIndex, featureIndex, key, value) {
            const newPlans = attributes.plans.slice();
            const newFeatures = newPlans[planIndex].features.slice();
            newFeatures[featureIndex] = Object.assign({}, newFeatures[featureIndex], { [key]: value });
            newPlans[planIndex] = Object.assign({}, newPlans[planIndex], { features: newFeatures });
            setAttributes({ plans: newPlans });
        };

        const addFeature = function (planIndex) {
            const newPlans = attributes.plans.slice();
            const newFeatures = newPlans[planIndex].features.slice();
            newFeatures.push({ text: 'New feature', included: true });
            newPlans[planIndex] = Object.assign({}, newPlans[planIndex], { features: newFeatures });
            setAttributes({ plans: newPlans });
        };

        const removeFeature = function (planIndex, featureIndex) {
            const newPlans = attributes.plans.slice();
            const newFeatures = newPlans[planIndex].features.slice();
            newFeatures.splice(featureIndex, 1);
            newPlans[planIndex] = Object.assign({}, newPlans[planIndex], { features: newFeatures });
            setAttributes({ plans: newPlans });
        };

        const addPlan = function () {
            const newPlans = attributes.plans.slice();
            newPlans.push({
                name: 'New Plan',
                monthlyPrice: '0',
                annualPrice: '0',
                currency: '$',
                description: 'Plan description',
                features: [
                    { text: 'Feature 1', included: true },
                    { text: 'Feature 2', included: true },
                    { text: 'Feature 3', included: false }
                ],
                buttonText: 'Get Started',
                buttonUrl: '#',
                featured: false,
                badge: ''
            });
            setAttributes({ plans: newPlans });
        };

        const removePlan = function (index) {
            const newPlans = attributes.plans.slice();
            newPlans.splice(index, 1);
            setAttributes({ plans: newPlans });
        };

        const movePlan = function (index, direction) {
            const newPlans = attributes.plans.slice();
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= newPlans.length) return;
            var temp = newPlans[index];
            newPlans[index] = newPlans[newIndex];
            newPlans[newIndex] = temp;
            setAttributes({ plans: newPlans });
        };

        const sectionPanel = el(
            PanelBody,
            { title: 'Section Settings', initialOpen: true },
            el(TextControl, {
                label: 'Eyebrow Text',
                value: attributes.eyebrow,
                onChange: function (value) { setAttributes({ eyebrow: value }); }
            }),
            el(TextControl, {
                label: 'Heading',
                value: attributes.heading,
                onChange: function (value) { setAttributes({ heading: value }); }
            }),
            el(TextareaControl, {
                label: 'Description',
                value: attributes.description,
                onChange: function (value) { setAttributes({ description: value }); },
                rows: 2
            })
        );

        const togglePanel = el(
            PanelBody,
            { title: 'Billing Toggle', initialOpen: false },
            el(ToggleControl, {
                label: 'Enable Monthly/Annual Toggle',
                checked: attributes.enableToggle,
                onChange: function (value) { setAttributes({ enableToggle: value }); }
            }),
            attributes.enableToggle && el(
                Fragment,
                null,
                el(TextControl, {
                    label: 'Monthly Label',
                    value: attributes.monthlyLabel,
                    onChange: function (value) { setAttributes({ monthlyLabel: value }); }
                }),
                el(TextControl, {
                    label: 'Annual Label',
                    value: attributes.annualLabel,
                    onChange: function (value) { setAttributes({ annualLabel: value }); }
                }),
                el(RangeControl, {
                    label: 'Annual Discount (%)',
                    value: attributes.annualDiscount,
                    onChange: function (value) { setAttributes({ annualDiscount: value }); },
                    min: 0,
                    max: 50
                })
            )
        );

        const stylePanel = el(
            PanelBody,
            { title: 'Style', initialOpen: false },
            el(SelectControl, {
                label: 'Card Style',
                value: attributes.cardStyle,
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Bordered', value: 'bordered' },
                    { label: 'Glass', value: 'glass' }
                ],
                onChange: function (value) { setAttributes({ cardStyle: value }); }
            })
        );

        const planPanels = attributes.plans.map(function (plan, planIndex) {
            var featureElements = plan.features.map(function (feature, featureIndex) {
                return el(
                    'div',
                    { key: featureIndex, style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' } },
                    el(ToggleControl, {
                        checked: feature.included,
                        onChange: function (value) { updateFeature(planIndex, featureIndex, 'included', value); },
                        __nextHasNoMarginBottom: true
                    }),
                    el(TextControl, {
                        value: feature.text,
                        onChange: function (value) { updateFeature(planIndex, featureIndex, 'text', value); },
                        __nextHasNoMarginBottom: true,
                        style: { flex: 1 }
                    }),
                    el(Button, {
                        isDestructive: true,
                        size: 'small',
                        onClick: function () { removeFeature(planIndex, featureIndex); }
                    }, '×')
                );
            });

            return el(
                PanelBody,
                {
                    key: planIndex,
                    title: 'Plan ' + (planIndex + 1) + ': ' + (plan.name || 'Unnamed') + (plan.featured ? ' ★' : ''),
                    initialOpen: false
                },
                el(TextControl, {
                    label: 'Plan Name',
                    value: plan.name,
                    onChange: function (value) { updatePlan(planIndex, 'name', value); }
                }),
                el(TextareaControl, {
                    label: 'Description',
                    value: plan.description,
                    onChange: function (value) { updatePlan(planIndex, 'description', value); },
                    rows: 2
                }),
                el('div', { style: { display: 'flex', gap: '8px' } },
                    el(TextControl, {
                        label: 'Currency',
                        value: plan.currency,
                        onChange: function (value) { updatePlan(planIndex, 'currency', value); },
                        style: { width: '60px' }
                    }),
                    el(TextControl, {
                        label: 'Monthly Price',
                        value: plan.monthlyPrice,
                        onChange: function (value) { updatePlan(planIndex, 'monthlyPrice', value); }
                    }),
                    el(TextControl, {
                        label: 'Annual Price',
                        value: plan.annualPrice,
                        onChange: function (value) { updatePlan(planIndex, 'annualPrice', value); }
                    })
                ),
                el(ToggleControl, {
                    label: 'Featured Plan',
                    checked: plan.featured,
                    onChange: function (value) { updatePlan(planIndex, 'featured', value); }
                }),
                plan.featured && el(TextControl, {
                    label: 'Badge Text',
                    value: plan.badge || '',
                    onChange: function (value) { updatePlan(planIndex, 'badge', value); },
                    placeholder: 'e.g., Most Popular'
                }),
                el(TextControl, {
                    label: 'Button Text',
                    value: plan.buttonText,
                    onChange: function (value) { updatePlan(planIndex, 'buttonText', value); }
                }),
                el(TextControl, {
                    label: 'Button URL',
                    value: plan.buttonUrl,
                    onChange: function (value) { updatePlan(planIndex, 'buttonUrl', value); },
                    type: 'url'
                }),
                el('div', { style: { marginTop: '16px' } },
                    el('strong', { style: { display: 'block', marginBottom: '8px' } }, 'Features'),
                    featureElements,
                    el(Button, {
                        variant: 'secondary',
                        size: 'small',
                        onClick: function () { addFeature(planIndex); }
                    }, '+ Add Feature')
                ),
                el('div', { style: { marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                    el(Button, {
                        variant: 'secondary',
                        size: 'small',
                        onClick: function () { movePlan(planIndex, -1); },
                        disabled: planIndex === 0
                    }, '← Left'),
                    el(Button, {
                        variant: 'secondary',
                        size: 'small',
                        onClick: function () { movePlan(planIndex, 1); },
                        disabled: planIndex === attributes.plans.length - 1
                    }, 'Right →'),
                    el(Button, {
                        isDestructive: true,
                        size: 'small',
                        onClick: function () { removePlan(planIndex); }
                    }, 'Delete Plan')
                )
            );
        });

        const managePanel = el(
            PanelBody,
            { title: 'Manage Plans', initialOpen: true },
            el('p', { style: { color: '#757575', marginBottom: '12px' } },
                attributes.plans.length + ' plan(s)'
            ),
            el(Button, {
                variant: 'primary',
                onClick: addPlan
            }, 'Add Plan')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                sectionPanel,
                togglePanel,
                stylePanel,
                managePanel,
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
