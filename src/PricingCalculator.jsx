import { useMemo, useState, useEffect } from 'react';

const fmtGBP = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});

const BANDS = [0, 50, 100];
const bandOf = (p) => {
    let best = 0,
        dist = Infinity;
    for (let i = 0; i < BANDS.length; i++) {
        const d = Math.abs(p - BANDS[i]);
        if (d < dist) {
            dist = d;
            best = i;
        }
    }
    return best; // 0,1,2
};

export default function PricingCalculator() {
    const tiers = {
        simple: {
            key: 'simple',
            name: 'Basic',
            base: 1500,
            retainer: [200, 400],
            eta: '~1 week',
        },
        moderate: {
            key: 'moderate',
            name: 'Moderate (Most Popular)',
            base: 2500,
            retainer: [400, 800],
            eta: '~2–4 weeks',
        },
        complex: {
            key: 'complex',
            name: 'Complex',
            base: 5000,
            retainer: [1000, 2500],
            eta: '~6–12 weeks',
        },
    };

    const tierScales = {
        simple: {
            data: [
                { key: 'low', w: 1, label: 'CSV only (×1)' },
                { key: 'med', w: 1.5, label: 'CSV + Sheets (×1.5)' },
                { key: 'high', w: 2, label: 'API/DB (×2)' },
            ],
            features: [
                { key: 'low', w: 1, label: 'Static charts (×1)' },
                { key: 'med', w: 1.5, label: 'Filters & export (×1.5)' },
                { key: 'high', w: 2, label: 'Automations/alerts (×2)' },
            ],
        },
        moderate: {
            data: [
                { key: 'low', w: 1, label: '≤2 sources (×1)' },
                { key: 'med', w: 1.5, label: '3–4 blended (×1.5)' },
                { key: 'high', w: 2, label: 'APIs + DBs (×2)' },
            ],
            features: [
                { key: 'low', w: 1, label: '2 dashboards (×1)' },
                { key: 'med', w: 1.5, label: '3 dashboards + filters (×1.5)' },
                { key: 'high', w: 2, label: 'Automations, reports (×2)' },
            ],
        },
        complex: {
            data: [
                { key: 'low', w: 1, label: '3–4 sources (×1)' },
                { key: 'med', w: 1.5, label: '5–6 sources (×1.5)' },
                { key: 'high', w: 2, label: '7+ pipelines (×2)' },
            ],
            features: [
                { key: 'low', w: 1, label: 'Multi-page (×1)' },
                { key: 'med', w: 1.5, label: 'Roles/SSO (×1.5)' },
                { key: 'high', w: 2, label: 'Forecasting/AI (×2)' },
            ],
        },
    };

    const [selTier, setSelTier] = useState('simple');
    const [dataIdx, setDataIdx] = useState(0); // 0/50/100
    const [featIdx, setFeatIdx] = useState(0); // 0/50/100
    const [rush, setRush] = useState(false);

    // Init from URL
    useEffect(() => {
        const qp = new URLSearchParams(window.location.search);
        const t = qp.get('tier');
        const d = qp.get('data');
        const f = qp.get('features');
        const r = qp.get('rush');
        const tierKey = t === 'basic' ? 'simple' : t;
        if (tierKey && tiers[tierKey]) setSelTier(tierKey);
        if (d !== null) setDataIdx(normalizeBandParam(d));
        if (f !== null) setFeatIdx(normalizeBandParam(f));
        if (r !== null) setRush(r === '1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync URL on changes (debounced feel without timer: write immediately; it’s fine here)
    useEffect(() => {
        const qp = new URLSearchParams(window.location.search);
        qp.set('tier', selTier);
        qp.set('data', String(dataIdx));
        qp.set('features', String(featIdx));
        qp.set('rush', rush ? '1' : '0');
        const url = `${window.location.pathname}?${qp.toString()}`;
        window.history.replaceState({}, '', url);
    }, [selTier, dataIdx, featIdx, rush]);

    // Reset bands when tier changes
    useEffect(() => {
        setDataIdx(0);
        setFeatIdx(0);
    }, [selTier]);

    const scale = tierScales[selTier];
    const tier = tiers[selTier];

    const estimate = useMemo(() => {
        const wData = scale.data[bandOf(dataIdx)].w;
        const wFeat = scale.features[bandOf(featIdx)].w;
        let price = tier.base * wData * wFeat;
        if (rush) price *= 1.25;
        // Round to nearest £100 for friendlier numbers
        return Math.round(price / 100) * 100;
    }, [selTier, dataIdx, featIdx, rush]);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <section id="pricing" className="section">
            <div className="container">
                <div className="card">
                    <h3 style={{ marginTop: 0 }}>Interactive Pricing Guide</h3>
                    <p className="small">
                        This estimate is designed to help you budget
                        confidently. We finalise scope & pricing after a short
                        discovery call. <br />
                        Not sure which tier fits? Pick your best guess — we’ll
                        guide you.
                    </p>
                    <p className="small"></p>
                    {/* Tier selector */}
                    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                        <legend id="tier-legend" className="small">
                            Select a tier
                        </legend>
                        <div
                            role="radiogroup"
                            aria-labelledby="tier-legend"
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
                                    tabIndex={0}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        setSelTier(t.key)
                                    }
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
                                                aria-label={t.name}
                                            />
                                            <strong>{t.name}</strong>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                    {/* Discrete “slider” controls */}
                    <BandSlider
                        label="Data Complexity"
                        value={dataIdx}
                        onChange={setDataIdx}
                        ticks={scale.data}
                    />
                    <BandSlider
                        label="Features"
                        value={featIdx}
                        onChange={setFeatIdx}
                        ticks={scale.features}
                    />
                    {/* Rush toggle */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 16,
                            flexWrap: 'wrap',
                            marginTop: 12,
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
                    {/* Output + CTA */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            alignItems: 'start',
                            marginTop: 16,
                            columnGap: 16,
                            rowGap: 12,
                        }}
                    >
                        <div>
                            <div className="small">
                                Estimated build price (ex. VAT)
                            </div>
                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 800,
                                    fontVariantNumeric: 'tabular-nums',
                                }}
                                aria-live="polite"
                            >
                                {fmtGBP.format(estimate)}
                            </div>
                            <div className="small">
                                Typical monthly support:{' '}
                                {fmtGBP.format(tier.retainer[0])}–
                                {fmtGBP.format(tier.retainer[1])}/mo
                            </div>
                            <div className="small">
                                Final pricing confirmed after a 30-minute
                                discovery call.
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    gap: 10,
                                    marginTop: 20,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <a
                                    className="button"
                                    href={`/book?${new URLSearchParams({
                                        tier: selTier,
                                        data: String(dataIdx),
                                        features: String(featIdx),
                                        rush: rush ? '1' : '0',
                                    })}`}
                                >
                                    Book My Free Data Audit
                                </a>
                            </div>
                        </div>
                        <div
                            style={{
                                alignSelf: 'start',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <button
                                className="button secondary"
                                type="button"
                                onClick={() => {
                                    navigator.clipboard?.writeText(shareUrl);
                                }}
                                aria-label="Copy shareable estimate link"
                            >
                                Copy share link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function normalizeBandParam(nStr) {
    const n = Number(nStr);
    if (Number.isNaN(n)) return 0;
    // Support old 0/1/2 values
    if (Number.isInteger(n) && n >= 0 && n <= 2) return n * 50;
    // Clamp to 0/50/100
    if (n <= 25) return 0;
    if (n <= 75) return 50;
    return 100;
}

function BandSlider({ label, value, onChange, ticks }) {
    const i = bandOf(value); // 0/1/2
    const active = ticks[i];
    return (
        <div
            className="card"
            style={{ padding: 16, width: '100%', marginTop: 16 }}
            role="group"
            aria-label={label}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 12,
                }}
            >
                <strong>{label}</strong>
                <span className="small" aria-live="polite">
                    {active.label}
                </span>
            </div>
            <input
                type="range"
                min={0}
                max={100}
                step={50}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                aria-valuetext={`${label}: ${active.label}`}
                style={{ width: '100%', marginTop: 10 }}
            />
            <div
                className="slider-ticks"
                style={{
                    marginTop: 10,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3,1fr)',
                    gap: 8,
                }}
            >
                {ticks.map((t, idx) => (
                    <span
                        key={t.key}
                        className={i === idx ? 'is-active' : ''}
                        style={{ textAlign: 'center' }}
                    >
                        {t.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
