import CTA from './CTA.jsx';
import MeetTheTeam from './MeetTheTeam.jsx';
import TechStack from './TechStack.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListCheck,
    faUsers,
    faMagnifyingGlass,
    faGears,
    faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';

export default function HowItWorks({ ctaHref = '#team' }) {
    return (
        <div id="how">
            <section className="hero">
                <div className="container">
                    <h1>
                        <span>The GBM Approach</span>
                        <br />
                        <span className="highlight">
                            Decision clarity before any build.
                        </span>
                    </h1>
                    <p>
                        Outcome-driven engagements that remove operational
                        friction and restore daily decision visibility without
                        adding noise.
                    </p>
                    <div className="buttons">
                        <a className="btn" href={ctaHref}>
                            Book an Audit Intro Call
                        </a>
                    </div>
                    <p className="small" style={{ marginTop: 8 }}>
                        30‑minute session to confirm fit for the Operational
                        Clarity Audit.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div
                        style={{
                            display: 'grid',
                            gap: 'var(--gap)',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(280px, 1fr))',
                            alignItems: 'stretch',
                        }}
                    >
                        <div
                            className="card"
                            data-reveal
                            style={{
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <h3 style={{ marginTop: 0 }}>Where We Focus</h3>
                            <div
                                style={{
                                    margin: '12px auto 0 auto',
                                    textAlign: 'left',
                                    maxWidth: 520,
                                    display: 'grid',
                                    gap: 18,
                                }}
                            >
                                {[
                                    {
                                        title: 'Fragmented systems & data',
                                        body: 'CRMs, spreadsheets, trackers, and finance tools rarely align, so leaders lose the story behind the numbers.',
                                    },
                                    {
                                        title: 'Reactive planning & reporting',
                                        body: 'Reporting is manual and late, so decisions follow problems instead of preventing them.',
                                    },
                                    {
                                        title: 'Siloed Communication',
                                        body: 'Information lives in emails and chat threads, creating delays, duplication, and missed accountability.',
                                    },
                                    {
                                        title: 'Compliance & customer pressure',
                                        body: 'Boards, auditors, and clients still expect rapid evidence, even when the team is stretched thin.',
                                    },
                                    {
                                        title: 'Limited build capacity',
                                        body: 'Teams know what should change, but lack the time and bandwidth to fix it properly.',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        style={{
                                            display: 'grid',
                                            gap: 6,
                                            background:
                                                'rgba(47, 165, 160, 0.08)',
                                            border: '1px solid rgba(47, 165, 160, 0.18)',
                                            borderRadius: 12,
                                            padding: '14px 16px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <h4
                                            style={{
                                                margin: 0,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.04em',
                                                fontSize: '0.78rem',
                                                color: 'var(--muted)',
                                            }}
                                        >
                                            {item.title}
                                        </h4>
                                        <p style={{ margin: 0 }}>{item.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gap: 'var(--gap)',
                                height: '100%',
                            }}
                        >
                            {[
                                {
                                    title: 'How We Help',
                                    icon: faListCheck,
                                    items: [
                                        {
                                            label: 'Operational Clarity Audit',
                                            body: 'A focused diagnostic to surface bottlenecks and priorities.',
                                        },
                                        {
                                            label: 'Elimination sprints',
                                            body: 'Targeted work to remove the highest-impact friction points.',
                                        },
                                        {
                                            label: 'Support (optional)',
                                            body: 'Ongoing help to keep decision visibility durable.',
                                        },
                                    ],
                                },
                                {
                                    title: 'Who It’s For',
                                    icon: faUsers,
                                    items: [
                                        {
                                            label: 'Ops-led teams',
                                            body: 'Businesses where daily decisions depend on operational clarity.',
                                        },
                                        {
                                            label: 'Multi-system environments',
                                            body: 'Teams juggling spreadsheets, trackers, and manual reporting.',
                                        },
                                        {
                                            label: 'Decision-makers',
                                            body: 'Leaders who want visibility and focus without extra admin.',
                                        },
                                    ],
                                    delay: '60ms',
                                },
                            ].map((column) => (
                                <div
                                    key={column.title}
                                    className="card"
                                    data-reveal
                                    {...(column.delay
                                        ? { 'data-reveal-delay': column.delay }
                                        : {})}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 16,
                                    }}
                                >
                                    <h3>
                                        <FontAwesomeIcon
                                            icon={column.icon}
                                            style={{ marginRight: 8 }}
                                        />
                                        {column.title}
                                    </h3>
                                    <div
                                        style={{
                                            display: 'grid',
                                            gap: 16,
                                        }}
                                    >
                                        {column.items.map((item) => (
                                            <div
                                                key={item.label}
                                                style={{
                                                    background:
                                                        'rgba(47, 165, 160, 0.08)',
                                                    border: '1px solid rgba(47, 165, 160, 0.18)',
                                                    borderRadius: 12,
                                                    padding: '14px 16px',
                                                    display: 'grid',
                                                    gap: 6,
                                                }}
                                            >
                                                <strong
                                                    style={{
                                                        textTransform:
                                                            'uppercase',
                                                        letterSpacing: '0.04em',
                                                        fontSize: '0.78rem',
                                                        color: 'var(--muted)',
                                                    }}
                                                >
                                                    {item.label}
                                                </strong>
                                                <p style={{ margin: 0 }}>
                                                    {item.body}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div
                className="container text-center"
                style={{ marginTop: 8, marginBottom: 8 }}
            >
                <a href={ctaHref} className="btn cta-inline">
                    Book an Audit Intro Call
                </a>
            </div>

            <section className="section">
                <div className="container">
                    <h2
                        className="section-title"
                        style={{ textAlign: 'center' }}
                    >
                        How it works
                    </h2>
                    <p
                        className="small"
                        style={{
                            textAlign: 'center',
                            maxWidth: 620,
                            margin: '0 auto',
                            color: 'var(--muted)',
                        }}
                    >
                        Each phase is scoped, delivered, and closed
                        independently. We only move forward when it makes sense
                        for your business.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 16,
                            marginTop: 16,
                        }}
                    >
                        {[
                            {
                                title: '1. Diagnose',
                                desc: 'We interview key stakeholders and review how decisions are currently made.',
                                icon: faMagnifyingGlass,
                            },
                            {
                                title: '2. Identify',
                                desc: 'We pinpoint where friction, delay, or blind spots are costing you leverage.',
                                icon: faListCheck,
                            },
                            {
                                title: '3. Eliminate',
                                desc: 'We define a practical roadmap to remove those bottlenecks with minimal disruption.',
                                icon: faGears,
                            },
                            {
                                title: '4. Support (Optional)',
                                desc: 'For teams that want help implementing, we offer focused elimination sprints or ongoing support.',
                                icon: faArrowsRotate,
                            },
                        ].map((s, i) => (
                            <div
                                key={s.title}
                                className="card"
                                data-reveal
                                data-reveal-delay={`${i * 80}ms`}
                                style={{
                                    maxWidth: 720,
                                    width: '100%',
                                    textAlign: 'left',
                                }}
                            >
                                <h3 style={{ marginTop: 0 }}>
                                    <FontAwesomeIcon
                                        icon={s.icon}
                                        style={{ marginRight: 8 }}
                                    />
                                    {s.title}
                                </h3>
                                <p
                                    className="small"
                                    style={{ fontSize: '1rem' }}
                                >
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TechStack />
            <MeetTheTeam />
            <CTA />
        </div>
    );
}
