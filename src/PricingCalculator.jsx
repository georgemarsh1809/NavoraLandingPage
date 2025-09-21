import { useMemo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const fmtGBP = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});

// Compact GBP formatter: £10k instead of £10,000
function formatGBPCompact(n) {
    const abs = Math.abs(n);
    if (abs >= 1000) {
        const v = n / 1000;
        const s = Number.isInteger(v) ? String(v) : v.toFixed(1).replace(/\.0$/, '');
        return `£${s}k`;
    }
    return fmtGBP.format(n);
}

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
            name: 'Starter — Digital Essentials',
            buildRange: [1500, 2500],
            retainer: [200, 300],
            eta: '1–2 weeks',
        },
        moderate: {
            key: 'moderate',
            name: 'Growth — Operations Upgrade',
            buildRange: [4000, 8000],
            retainer: [400, 700],
            eta: '2–4 weeks',
        },
        complex: {
            key: 'complex',
            name: 'Pro — AI‑Driven Business',
            buildRange: [10000, 18000],
            // Show "+" in UI by leaving upper undefined
            retainer: [1500, null],
            eta: '4–6 weeks',
        },
    };

    const tierScales = {
        simple: {
            data: [
                { key: 'low', label: '1 source (Sheets/CSV)' },
                { key: 'med', label: '1–2 sources (mix)' },
                { key: 'high', label: '2–3 sources' },
            ],
            features: [
                { key: 'low', label: 'KPIs + email reports' },
                { key: 'med', label: 'Dashboard + alerts' },
                { key: 'high', label: 'Dashboard + simple app' },
            ],
        },
        moderate: {
            data: [
                { key: 'low', label: '2–4 sources' },
                { key: 'med', label: '4–6 sources' },
                { key: 'high', label: '6–8 sources' },
            ],
            features: [
                { key: 'low', label: 'Multi-dashboards' },
                { key: 'med', label: 'Workflow automations' },
                { key: 'high', label: 'Basic AI + access control' },
            ],
        },
        complex: {
            data: [
                { key: 'low', label: '5–8 sources' },
                { key: 'med', label: '8–12 sources' },
                { key: 'high', label: '12+ sources/DBs' },
            ],
            features: [
                { key: 'low', label: 'Dashboards + automations' },
                { key: 'med', label: 'Advanced AI (forecasting/NLQ)' },
                { key: 'high', label: 'Assistants + multi‑dept' },
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
        const min = tier.buildRange[0];
        const max = tier.buildRange[1];
        const di = bandOf(dataIdx) / 2; // 0, .5, 1
        const fi = bandOf(featIdx) / 2; // 0, .5, 1
        const t = (di + fi) / 2; // average slider position 0..1
        let price = min + t * (max - min);
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
                        This estimate helps you budget confidently. We finalise
                        scope and pricing after a short discovery call. <br />
                        Not sure which tier fits? Pick your best guess — we’ll
                        guide you the rest of the way.
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
                            <div className="small">Estimated Build Price</div>
                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 800,
                                    fontVariantNumeric: 'tabular-nums',
                                }}
                                aria-live="polite"
                            >
                                {formatGBPCompact(estimate)}
                            </div>
                            <div className="small">
                                Typical Run & Improve:{' '}
                                {(() => {
                                    const [lo, hi] = tier.retainer;
                                    if (hi == null) {
                                        return `${fmtGBP.format(lo)}+/mo`;
                                    }
                                    return `${fmtGBP.format(lo)}–${fmtGBP.format(hi)}/mo`;
                                })()}
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
                                    href="#cta"
                                    aria-label="Pressure-test my estimate with an expert"
                                >
                                    <FontAwesomeIcon
                                        icon={faComments}
                                        style={{ marginRight: 8 }}
                                    />
                                    Discuss My Plan
                                </a>
                                <div
                                    className="small"
                                    style={{ width: '100%' }}
                                >
                                    We’ll discuss data scope and confirm a fixed
                                    price.
                                </div>
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
