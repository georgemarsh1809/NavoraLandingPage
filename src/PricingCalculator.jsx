import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComments,
    faChevronDown,
    faCalculator,
} from '@fortawesome/free-solid-svg-icons';

const tiers = {
    audit: {
        key: 'audit',
        name: 'Operational Clarity Audit',
        focus: 'A diagnostic engagement to surface bottlenecks and priorities.',
        deliverables: [
            'Top 3 operational bottlenecks limiting performance',
            'Map of data/reporting/process breakdowns',
            'Prioritised roadmap for elimination and improvement',
        ],
        duration: '14 days',
        investment: 'Confirmed after the intro call based on scope.',
        note: 'This is a diagnostic only. Implementation is optional.',
    },
};

export default function PricingCalculator({ ctaHref = '#team' }) {
    const [selTier, setSelTier] = useState('audit');
    const [pricingOpen, setPricingOpen] = useState(false);

    const tier = tiers[selTier];

    return (
        <section id="pricing" className="section">
            <div className="container">
                <div
                    className={`card pricing-card${
                        pricingOpen ? ' is-open' : ''
                    }`}
                >
                    <div className="collapsible-header">
                        <h3
                            id="pricing-guide-title"
                            style={{
                                margin: 0,
                                fontSize: '1.35rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCalculator}
                                aria-hidden="true"
                            />
                            Operational Clarity Audit Details
                        </h3>
                        <button
                            type="button"
                            className={`collapsible-toggle${
                                pricingOpen ? ' is-open' : ''
                            }`}
                            onClick={() => setPricingOpen((v) => !v)}
                            aria-expanded={pricingOpen}
                            aria-controls="pricing-body"
                            aria-labelledby="pricing-guide-title"
                        >
                            <span>
                                {pricingOpen ? 'Hide Details' : 'Show Details'}
                            </span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                    <div
                        id="pricing-body"
                        className={`collapsible-body${
                            pricingOpen ? ' is-open' : ''
                        }`}
                        aria-hidden={!pricingOpen}
                    >
                        <p className="small" style={{ marginTop: 16 }}>
                            A focused, time-bound diagnostic to confirm what to
                            fix first and why.
                        </p>

                        <fieldset
                            style={{ border: 'none', padding: 0, margin: 0 }}
                        >
                            <legend id="tier-legend" className="small">
                                Audit scope
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
                                            (e.key === 'Enter' ||
                                                e.key === ' ') &&
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
                                                gap: 8,
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
                                                <div>
                                                    <strong>{t.name}</strong>
                                                    <div
                                                        className="small"
                                                        style={{
                                                            color: 'var(--muted)',
                                                        }}
                                                    >
                                                        {t.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'minmax(0,1.6fr) minmax(0,1fr)',
                                gap: 20,
                                marginTop: 20,
                                alignItems: 'start',
                            }}
                        >
                            <div>
                                <div className="small">Focus</div>
                                <p style={{ marginTop: 6 }}>{tier.focus}</p>
                                <div
                                    className="small"
                                    style={{ marginTop: 18 }}
                                >
                                    What’s included
                                </div>
                                <ul
                                    style={{
                                        marginTop: 6,
                                        paddingLeft: 20,
                                        display: 'grid',
                                        gap: 8,
                                    }}
                                >
                                    {tier.deliverables.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 10,
                                        marginTop: 24,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <a
                                        className="button"
                                        href={ctaHref}
                                        aria-label="Book an audit intro call"
                                    >
                                        <FontAwesomeIcon
                                            icon={faComments}
                                            style={{ marginRight: 8 }}
                                        />
                                        Book an Audit Intro Call
                                    </a>
                                    <span
                                        className="small"
                                        style={{ width: '100%' }}
                                    >
                                        We’ll confirm scope, timing, and any
                                        system add-ons together.
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'grid',
                                    gap: 12,
                                }}
                            >
                                <div>
                                    <div className="small">
                                        Typical duration
                                    </div>
                                    <p style={{ marginTop: 4 }}>
                                        {tier.duration}
                                    </p>
                                </div>
                                <div>
                                    <div className="small">
                                        Typical investment
                                    </div>
                                    <p style={{ marginTop: 4 }}>
                                        {tier.investment}
                                    </p>
                                </div>
                                <p className="small" style={{ marginTop: 8 }}>
                                    {tier.note}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
