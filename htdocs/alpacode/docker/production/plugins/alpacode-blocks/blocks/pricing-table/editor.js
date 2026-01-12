/**
 * Pricing Block - Premium Editor Script
 */

(function (wp) {
    'use strict';

    if (!wp || !wp.blockEditor || !wp.components || !wp.element) {
        return;
    }

    var InspectorControls = wp.blockEditor.InspectorControls;
    var useBlockProps = wp.blockEditor.useBlockProps;

    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var Button = wp.components.Button;
    var ToggleControl = wp.components.ToggleControl;
    var RangeControl = wp.components.RangeControl;
    var SelectControl = wp.components.SelectControl;

    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var ServerSideRender = wp.serverSideRender;

    var Edit = function (props) {
        var attributes = props.attributes;
        var setAttributes = props.setAttributes;
        var blockProps = useBlockProps();

        var updatePlan = function (index, key, value) {
            var newPlans = attributes.plans.map(function (plan, i) {
                if (i === index) {
                    var updated = {};
                    for (var k in plan) {
                        updated[k] = plan[k];
                    }
                    updated[key] = value;
                    return updated;
                }
                return plan;
            });
            setAttributes({ plans: newPlans });
        };

        var updateFeature = function (planIndex, featureIndex, key, value) {
            var newPlans = attributes.plans.map(function (plan, i) {
                if (i === planIndex) {
                    var updated = {};
                    for (var k in plan) {
                        updated[k] = plan[k];
                    }
                    updated.features = plan.features.map(function (feature, j) {
                        if (j === featureIndex) {
                            if (typeof feature === 'string') {
                                return { text: key === 'text' ? value : feature, included: key === 'included' ? value : true };
                            }
                            var updatedFeature = {};
                            for (var fk in feature) {
                                updatedFeature[fk] = feature[fk];
                            }
                            updatedFeature[key] = value;
                            return updatedFeature;
                        }
                        return feature;
                    });
                    return updated;
                }
                return plan;
            });
            setAttributes({ plans: newPlans });
        };

        var addFeature = function (planIndex) {
            var newPlans = attributes.plans.map(function (plan, i) {
                if (i === planIndex) {
                    var updated = {};
                    for (var k in plan) {
                        updated[k] = plan[k];
                    }
                    updated.features = plan.features.slice();
                    updated.features.push({ text: 'New feature', included: true });
                    return updated;
                }
                return plan;
            });
            setAttributes({ plans: newPlans });
        };

        var removeFeature = function (planIndex, featureIndex) {
            var newPlans = attributes.plans.map(function (plan, i) {
                if (i === planIndex) {
                    var updated = {};
                    for (var k in plan) {
                        updated[k] = plan[k];
                    }
                    updated.features = plan.features.filter(function (_, j) {
                        return j !== featureIndex;
                    });
                    return updated;
                }
                return plan;
            });
            setAttributes({ plans: newPlans });
        };

        var addPlan = function () {
            var newPlans = attributes.plans.slice();
            newPlans.push({
                name: 'New Plan',
                monthlyPrice: '99',
                annualPrice: '79',
                currency: '$',
                description: 'Plan description',
                features: [
                    { text: 'Feature 1', included: true },
                    { text: 'Feature 2', included: true }
                ],
                buttonText: 'Get Started',
                buttonUrl: '#',
                featured: false,
                badge: ''
            });
            setAttributes({ plans: newPlans });
        };

        var removePlan = function (index) {
            var newPlans = attributes.plans.filter(function (_, i) {
                return i !== index;
            });
            setAttributes({ plans: newPlans });
        };

        // Header Panel
        var headerPanel = el(
            PanelBody,
            { title: 'Header', initialOpen: true },
            el(TextControl, {
                label: 'Eyebrow',
                value: attributes.eyebrow,
                onChange: function (value) { setAttributes({ eyebrow: value }); }
            }),
            el(TextControl, {
                label: 'Heading',
                value: attributes.heading || attributes.sectionTitle,
                onChange: function (value) { setAttributes({ heading: value }); }
            }),
            el(TextareaControl, {
                label: 'Description',
                value: attributes.description,
                rows: 2,
                onChange: function (value) { setAttributes({ description: value }); }
            })
        );

        // Toggle Panel
        var togglePanel = el(
            PanelBody,
            { title: 'Billing Toggle', initialOpen: false },
            el(ToggleControl, {
                label: 'Enable Monthly/Annual Toggle',
                checked: attributes.enableToggle,
                onChange: function (value) { setAttributes({ enableToggle: value }); }
            }),
            attributes.enableToggle && el(TextControl, {
                label: 'Monthly Label',
                value: attributes.monthlyLabel,
                onChange: function (value) { setAttributes({ monthlyLabel: value }); }
            }),
            attributes.enableToggle && el(TextControl, {
                label: 'Annual Label',
                value: attributes.annualLabel,
                onChange: function (value) { setAttributes({ annualLabel: value }); }
            }),
            attributes.enableToggle && el(RangeControl, {
                label: 'Annual Discount (%)',
                value: attributes.annualDiscount,
                onChange: function (value) { setAttributes({ annualDiscount: value }); },
                min: 0,
                max: 50,
                step: 5
            })
        );

        // Style Panel
        var stylePanel = el(
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

        // Plans Panels
        var planPanels = attributes.plans.map(function (plan, planIndex) {
            var featureControls = (plan.features || []).map(function (feature, featureIndex) {
                var featureText = typeof feature === 'string' ? feature : (feature.text || '');
                var featureIncluded = typeof feature === 'string' ? true : (feature.included !== false);

                return el(
                    'div',
                    {
                        key: featureIndex,
                        style: {
                            display: 'flex',
                            gap: '8px',
                            marginTop: '8px',
                            alignItems: 'center'
                        }
                    },
                    el(TextControl, {
                        value: featureText,
                        onChange: function (value) { updateFeature(planIndex, featureIndex, 'text', value); },
                        style: { flex: 1, marginBottom: 0 }
                    }),
                    el(ToggleControl, {
                        checked: featureIncluded,
                        onChange: function (value) { updateFeature(planIndex, featureIndex, 'included', value); },
                        style: { marginBottom: 0 }
                    }),
                    el(Button, {
                        icon: 'trash',
                        isDestructive: true,
                        size: 'small',
                        onClick: function () { removeFeature(planIndex, featureIndex); }
                    })
                );
            });

            return el(
                PanelBody,
                {
                    key: planIndex,
                    title: 'Plan ' + (planIndex + 1) + ': ' + (plan.name || 'Unnamed'),
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
                    rows: 2,
                    onChange: function (value) { updatePlan(planIndex, 'description', value); }
                }),
                el(TextControl, {
                    label: 'Currency Symbol',
                    value: plan.currency || '$',
                    onChange: function (value) { updatePlan(planIndex, 'currency', value); }
                }),
                el(TextControl, {
                    label: 'Monthly Price',
                    value: plan.monthlyPrice || plan.price,
                    onChange: function (value) { updatePlan(planIndex, 'monthlyPrice', value); }
                }),
                attributes.enableToggle && el(TextControl, {
                    label: 'Annual Price (per month)',
                    value: plan.annualPrice,
                    onChange: function (value) { updatePlan(planIndex, 'annualPrice', value); }
                }),
                el(ToggleControl, {
                    label: 'Featured Plan',
                    checked: plan.featured,
                    onChange: function (value) { updatePlan(planIndex, 'featured', value); }
                }),
                plan.featured && el(TextControl, {
                    label: 'Badge Text',
                    value: plan.badge || 'Most Popular',
                    onChange: function (value) { updatePlan(planIndex, 'badge', value); }
                }),
                el(TextControl, {
                    label: 'Button Text',
                    value: plan.buttonText,
                    onChange: function (value) { updatePlan(planIndex, 'buttonText', value); }
                }),
                el(TextControl, {
                    label: 'Button URL',
                    type: 'url',
                    value: plan.buttonUrl,
                    onChange: function (value) { updatePlan(planIndex, 'buttonUrl', value); }
                }),
                el('hr', { style: { margin: '20px 0' } }),
                el('strong', null, 'Features'),
                el('p', { style: { fontSize: '12px', color: '#757575', marginTop: '4px' } }, 'Toggle = included/excluded'),
                el(Fragment, null, featureControls),
                el(Button, {
                    variant: 'secondary',
                    onClick: function () { addFeature(planIndex); },
                    style: { marginTop: '12px' }
                }, '+ Add Feature'),
                el('hr', { style: { margin: '20px 0' } }),
                el(Button, {
                    isDestructive: true,
                    onClick: function () { removePlan(planIndex); }
                }, 'Remove Plan')
            );
        });

        // Add Plan Panel
        var addPlanPanel = el(
            PanelBody,
            { title: 'Plans (' + attributes.plans.length + ')', initialOpen: false },
            el(Fragment, null, planPanels),
            el(Button, {
                variant: 'primary',
                onClick: addPlan,
                style: { marginTop: '12px', width: '100%', justifyContent: 'center' }
            }, '+ Add Plan')
        );

        return el(
            'div',
            blockProps,
            el(
                InspectorControls,
                null,
                headerPanel,
                togglePanel,
                stylePanel,
                addPlanPanel
            ),
            el(ServerSideRender, {
                block: 'alpacode/pricing',
                attributes: attributes
            })
        );
    };

    wp.domReady(function () {
        var blockSettings = wp.blocks.getBlockType('alpacode/pricing');
        if (blockSettings) {
            wp.blocks.updateBlockType('alpacode/pricing', {
                edit: Edit
            });
        }
    });

})(window.wp);
