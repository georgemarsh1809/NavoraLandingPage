import { useMemo, useState, useEffect } from 'react';

export default function PricingCalculator() {
    const tiers = {
        simple: {
            key: 'basic',
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

    const [selTier, setSelTier] = useState('moderate');
    const [dataIdx, setDataIdx] = useState(1);
    const [featIdx, setFeatIdx] = useState(1);
    const [rush, setRush] = useState(false);
    const [contingency] = useState(false);

    useEffect(() => {
        setDataIdx(1);
        setFeatIdx(1);
    }, [selTier]);

    // Initialize from URL params
    useEffect(() => {
        const qp = new URLSearchParams(window.location.search);
        const t = qp.get('tier');
        const d = qp.get('data');
        const f = qp.get('features');
        const r = qp.get('rush');
        if (t && tiers[t]) setSelTier(t);
        if (d !== null) {
            const n = Number(d);
            if (!Number.isNaN(n) && n >= 0 && n <= 2) setDataIdx(n);
        }
        if (f !== null) {
            const n = Number(f);
            if (!Number.isNaN(n) && n >= 0 && n <= 2) setFeatIdx(n);
        }
        if (r !== null) setRush(r === '1');
    }, []);

    const estimate = useMemo(() => {
        const t = tiers[selTier];
        const scale = tierScales[selTier];
        const wData = scale.data[dataIdx].w;
        const wFeat = scale.features[featIdx].w;
        let price = t.base * wData * wFeat;
        if (rush) price *= 1.25;
        if (contingency) price *= 1.2;
        return Math.round(price / 50) * 50;
    }, [selTier, dataIdx, featIdx, rush, contingency]);

    const scaleFor = tierScales[selTier];
    const tier = tiers[selTier];

    const shareUrl = useMemo(() => {
        const url = new URL(window.location.href);
        const qp = url.searchParams;
        qp.set('tier', selTier);
        qp.set('data', String(dataIdx));
        qp.set('features', String(featIdx));
        qp.set('rush', rush ? '1' : '0');
        url.search = qp.toString();
        return url.toString();
    }, [selTier, dataIdx, featIdx, rush]);

    return (
        <section id="pricing" className="section">
            <div className="container">
                <h2 className="section-title">Pricing</h2>
                <div className="card">
                    <h3 style={{ marginTop: 0 }}>Interactive Pricing Guide</h3>
                    <p className="small" style={{ color: '#bbb' }}>
                        Pick a tier, then adjust complexity to get an estimate
                        for pricing.
                    </p>

                    {/* Tier selector */}
                    <div
                        style={{
                            display: 'grid',
                            gap: 12,
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(260px, 1fr))',
                            marginTop: 16,
                        }}
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
                                            onChange={() => setSelTier(t.key)}
                                        />
                                        <strong>{t.name}</strong>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>

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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        flexWrap: 'wrap',
                        gap: 16,
                    }}
                >
                    <div>
                        <div className="small" style={{ color: '#bbb' }}>
                            Estimated build price
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 800 }}>
                            £{estimate.toLocaleString()}
                        </div>
                        <div className="small" style={{ color: '#bbb' }}>
                            Typical retainer: £{tier.retainer[0]}–£
                            {tier.retainer[1]}/mo
                        </div>
                        <div className="small" style={{ color: '#9aa' }}>
                            Final pricing confirmed after a 20‑minute discovery call.
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <div className="small" style={{ color: '#bbb', marginBottom: 6 }}>
                                What’s included
                            </div>
                            <ul style={{ margin: 0, paddingLeft: 18, color: '#ccc' }}>
                                {tier.bullets.slice(0, 3).map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn-outline"
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(shareUrl);
                                    alert('Link copied');
                                } catch {
                                    prompt('Copy this link:', shareUrl);
                                }
                            }}
                        >
                            Copy link with selections
                        </button>
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
                max={2}
                step={1}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                style={{ width: '100%', marginTop: 10 }}
            />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    marginTop: 10,
                    gap: 10,
                }}
            >
                {ticks.map((t, i) => (
                    <span
                        key={t.key}
                        style={{
                            fontSize: 12,
                            color: value === i ? '#fff' : '#aaa',
                            textAlign:
                                i === 0 ? 'left' : i === 1 ? 'center' : 'right',
                        }}
                    >
                        {t.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
