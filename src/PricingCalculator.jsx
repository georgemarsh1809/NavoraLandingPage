import { useMemo, useState, useEffect } from 'react';

export default function PricingCalculator() {
    const tiers = {
        simple: {
            key: 'simple',
            name: 'Basic',
            base: 1500,
            retainer: [200, 400],
            bullets: [
                '✨ 1–2 data sources',
                '📊 Single dashboard',
                '📈 3–7 key metrics',
                '⚡ 1 week delivery',
                '🔧 Basic maintenance included',
            ],
        },
        moderate: {
            key: 'moderate',
            name: 'Moderate (Most Popular)',
            base: 2500,
            retainer: [400, 800],
            bullets: [
                '🔗 3–4 data sources',
                '📊 2–3 connected dashboards',
                '🎛️ Interactive filters',
                '🤖 Process automation',
                '⚡ 2–4 weeks delivery',
                '📞 Priority support',
            ],
        },
        complex: {
            key: 'complex',
            name: 'Complex',
            base: 5000,
            retainer: [1000, 2500],
            bullets: [
                '🌐 5+ data sources',
                '📱 Multi-page dashboards',
                '👥 Accounts, roles & permissions',
                '🧠 AI integrations & forecasting',
                '⚡ 6–12 weeks delivery',
                '🏆 White-glove service',
            ],
        },
    };

    // Labels with more detailed explanations
    const tierScales = {
        simple: {
            data: [
                { key: 'low', w: 1, label: 'CSV only — simple import (×1)' },
                {
                    key: 'med',
                    w: 1.5,
                    label: 'CSV + Google Sheets — mixed sources (×1.5)',
                },
                {
                    key: 'high',
                    w: 2,
                    label: 'API or database integration (×2)',
                },
            ],
            features: [
                { key: 'low', w: 1, label: 'Single view, static charts (×1)' },
                {
                    key: 'med',
                    w: 1.5,
                    label: 'Interactive filters, export options (×1.5)',
                },
                {
                    key: 'high',
                    w: 2,
                    label: 'Automations or alerts included (×2)',
                },
            ],
        },
        moderate: {
            data: [
                {
                    key: 'low',
                    w: 1,
                    label: '≤2 sources — light complexity (×1)',
                },
                {
                    key: 'med',
                    w: 1.5,
                    label: '3–4 sources — blended data (×1.5)',
                },
                { key: 'high', w: 2, label: 'Mix of APIs + databases (×2)' },
            ],
            features: [
                { key: 'low', w: 1, label: '2 dashboards, basic KPIs (×1)' },
                {
                    key: 'med',
                    w: 1.5,
                    label: '3 dashboards + interactive filters (×1.5)',
                },
                {
                    key: 'high',
                    w: 2,
                    label: 'Automations, email reports, alerts (×2)',
                },
            ],
        },
        complex: {
            data: [
                { key: 'low', w: 1, label: '3–4 sources — manageable (×1)' },
                {
                    key: 'med',
                    w: 1.5,
                    label: '5–6 sources — advanced joins (×1.5)',
                },
                {
                    key: 'high',
                    w: 2,
                    label: '7+ sources, heavy pipelines (×2)',
                },
            ],
            features: [
                { key: 'low', w: 1, label: 'Multi-page dashboards (×1)' },
                { key: 'med', w: 1.5, label: 'Roles, permissions, SSO (×1.5)' },
                {
                    key: 'high',
                    w: 2,
                    label: 'Forecasting, AI features, ML models (×2)',
                },
            ],
        },
    };

    const [selTier, setSelTier] = useState('simple');
    // Continuous sliders: 0..100 (0=low, 50=med, 100=high)
    const [dataIdx, setDataIdx] = useState(0);
    const [featIdx, setFeatIdx] = useState(0);
    const [rush, setRush] = useState(false);
    const [contingency] = useState(false);

    useEffect(() => {
        setDataIdx(0);
        setFeatIdx(0);
    }, [selTier]);

    // Initialize from URL params
    useEffect(() => {
        const qp = new URLSearchParams(window.location.search);
        const t = qp.get('tier');
        const d = qp.get('data');
        const f = qp.get('features');
        const r = qp.get('rush');
        // Back-compat: allow older links that used `basic` to map to `simple`
        const tierKey = t === 'basic' ? 'simple' : t;
        if (tierKey && tiers[tierKey]) setSelTier(tierKey);
        if (d !== null) {
            const n = Number(d);
            if (!Number.isNaN(n)) {
                // Support old 0/1/2 values by mapping to 0/50/100
                if (n >= 0 && n <= 2 && Number.isInteger(n)) {
                    setDataIdx(n * 50);
                } else if (n >= 0 && n <= 100) {
                    setDataIdx(n);
                }
            }
        }
        if (f !== null) {
            const n = Number(f);
            if (!Number.isNaN(n)) {
                if (n >= 0 && n <= 2 && Number.isInteger(n)) {
                    setFeatIdx(n * 50);
                } else if (n >= 0 && n <= 100) {
                    setFeatIdx(n);
                }
            }
        }
        if (r !== null) setRush(r === '1');
    }, []);

    // Map continuous slider position to the nearest band (low/med/high)
    const nearestBandIdx = (p) => {
        const targets = [0, 50, 100];
        let best = 0;
        let dist = Infinity;
        for (let i = 0; i < targets.length; i++) {
            const d = Math.abs(p - targets[i]);
            if (d < dist) {
                dist = d;
                best = i;
            }
        }
        return best; // 0, 1, or 2
    };

    const estimate = useMemo(() => {
        const t = tiers[selTier];
        const scale = tierScales[selTier];
        const wData = scale.data[nearestBandIdx(dataIdx)].w;
        const wFeat = scale.features[nearestBandIdx(featIdx)].w;
        let price = t.base * wData * wFeat;
        if (rush) price *= 1.25;
        if (contingency) price *= 1.2;
        return Math.round(price / 50) * 50;
    }, [selTier, dataIdx, featIdx, rush, contingency]);

    const scaleFor = tierScales[selTier];
    const tier = tiers[selTier];

    return (
        <section id="pricing" className="section">
            <div className="container">
                {/* <h2 className="section-title">Pricing</h2> */}
                <div className="card">
                    <h3 style={{ marginTop: 0 }}>Interactive Pricing Guide</h3>
                    <p className="small">
                        Pick a tier, then adjust complexity to get an estimate
                        for pricing.
                    </p>

                    {/* Tier selector */}
                    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                        <legend id="tier-legend" className="small">
                            Select a tier
                        </legend>
                        <div
                            style={{
                                display: 'grid',
                                gap: 12,
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(260px, 1fr))',
                                marginTop: 16,
                                alignItems: 'stretch',
                            }}
                            aria-labelledby="tier-legend"
                            role="radiogroup"
                        >
                            {Object.values(tiers).map((t) => (
                                <label
                                    key={t.key}
                                    className="card"
                                    style={{
                                        cursor: 'pointer',
                                        borderColor:
                                            selTier === t.key
                                                ? 'var(--accent)'
                                                : 'var(--line)',
                                        boxShadow:
                                            selTier === t.key
                                                ? 'var(--shadow)'
                                                : 'none',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 10,
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="tier"
                                                value={t.key}
                                                checked={selTier === t.key}
                                                onChange={() =>
                                                    setSelTier(t.key)
                                                }
                                            />
                                            <strong>{t.name}</strong>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {/* Sliders take full width */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20,
                            marginTop: 20,
                        }}
                    >
                        <TierSlider
                            label="Data Complexity"
                            value={dataIdx}
                            onChange={setDataIdx}
                            ticks={scaleFor.data}
                        />
                        <TierSlider
                            label="Features"
                            value={featIdx}
                            onChange={setFeatIdx}
                            ticks={scaleFor.features}
                        />
                    </div>

                    {/* Toggles */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 16,
                            flexWrap: 'wrap',
                            marginTop: 16,
                        }}
                    >
                        <label
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={rush}
                                onChange={(e) => setRush(e.target.checked)}
                            />
                            Faster delivery (+25%)
                        </label>
                    </div>

                    {/* Output */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            alignItems: 'start',
                            marginTop: 20,
                            columnGap: 16,
                            rowGap: 12,
                        }}
                    >
                        <div>
                            <div className="small">Estimated build price</div>
                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 800,
                                    fontVariantNumeric: 'tabular-nums',
                                }}
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                £{estimate.toLocaleString()}
                            </div>
                            <div className="small">
                                Typical monthly support: £{tier.retainer[0]}–£
                                {tier.retainer[1]}/mo
                            </div>
                            <div className="small">
                                Final pricing confirmed after a 30‑minute
                                discovery call.
                            </div>
                            {/* Removed "What’s included" list for a cleaner output */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TierSlider({ label, value, onChange, ticks }) {
    return (
        <div className="card" style={{ padding: 16, width: '100%' }}>
            <label>
                <strong>{label}</strong>
            </label>
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                style={{ width: '100%', marginTop: 10 }}
            />
            <div className="slider-ticks" style={{ marginTop: 10 }}>
                {ticks.map((t, i) => (
                    <span
                        key={t.key}
                        className={(() => {
                            const targets = [0, 50, 100];
                            const nearest = targets.reduce((a, b) =>
                                Math.abs(b - value) < Math.abs(a - value)
                                    ? b
                                    : a
                            );
                            return nearest === targets[i] ? 'is-active' : '';
                        })()}
                    >
                        {t.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
