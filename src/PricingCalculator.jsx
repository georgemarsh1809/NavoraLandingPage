import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faComments,
    faChevronDown,
    faCalculator,
} from '@fortawesome/free-solid-svg-icons';

const tiers = {
    discover: {
        key: 'discover',
        name: 'Discover',
        focus: 'Identify opportunities across people, process, and data.',
        deliverables: [
            'Discovery sessions with leadership and frontline teams',
            'AI Opportunity Report outlining quick wins and risks',
            'ROI summary and roadmap you can share internally',
        ],
        duration: '1–2 weeks',
        investment:
            'Free Initial Meeting → £300–£1,000 full consultation depending on company size.',
        note: 'Ideal first step to validate value and build internal momentum before investing in delivery.',
    },
    implement: {
        key: 'implement',
        name: 'Implement',
        focus: 'Design and deploy the systems that automate the work.',
        deliverables: [
            'Prototyping to prove value using your live data',
            'Full builds: automations, dashboards, and AI assistants',
            'Documentation, training, and handover playbooks',
        ],
        duration: '2–6 weeks',
        investment: '£1,000–£5,000+ project build',
        note: 'Scope flexes with integrations, environments, and the number of workflows we automate.',
    },
    support: {
        key: 'support',
        name: 'Support',
        focus: 'Keep automation sharp and your team confident post-launch.',
        deliverables: [
            'Monthly testing and performance tracking',
            'Upgrades, change requests, and backlog shaping',
            'Cost management to keep stack spend under control',
        ],
        duration: 'Ongoing',
        investment: '£200–£1,000 per month',
        note: 'Retainers scale up or down so you get the blend of monitoring and iteration you need.',
    },
};

export default function PricingCalculator({ ctaHref = '#team' }) {
    const [selTier, setSelTier] = useState('discover');
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
                            AI Transformation Pricing Guide
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
                            Choose the phase that matches where you are in the
                            journey. We confirm scope and commercials during a
                            rapid discovery call.
                        </p>

                        <fieldset
                            style={{ border: 'none', padding: 0, margin: 0 }}
                        >
                            <legend id="tier-legend" className="small">
                                Select a phase
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
                                        aria-label="Discuss this plan with GBM"
                                    >
                                        <FontAwesomeIcon
                                            icon={faComments}
                                            style={{ marginRight: 8 }}
                                        />
                                        Discuss this plan with GBM
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
