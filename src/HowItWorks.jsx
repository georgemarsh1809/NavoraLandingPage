import CTA from './CTA.jsx';
import MeetTheTeam from './MeetTheTeam.jsx';
import TechStack from './TechStack.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListCheck,
    faUsers,
    faMagnifyingGlass,
    faWandMagicSparkles,
    faGears,
    faRocket,
    faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';

export default function HowItWorks() {
    return (
        <div id="how">
            {/* Hero */}
            <section className="hero">
                <div className="container">
                    <h1>
                        <span>The GBM Way </span>
                        <br />
                        <span className="highlight">
                            KPI Data Insights for Transport & Logistics
                        </span>
                    </h1>
                    <p>
                        We build KPI Data Insights software that turns messy job
                        sheets, telematics exports, and finance spreadsheets
                        into clear dashboards so UK fleets can make faster,
                        smarter decisions.
                    </p>
                    <div className="buttons">
                        <a className="btn" href="#team">
                            Book a Free KPI Discovery Call
                        </a>
                    </div>
                    <p className="small" style={{ marginTop: 8 }}>
                        30‑min call to map your fleet KPIs.
                    </p>
                </div>
            </section>

            {/* What we do */}
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
                            <h3 style={{ marginTop: 0 }}>
                                The Problem We Solve
                            </h3>
                            <div
                                style={{
                                    margin: '12px auto 0 auto',
                                    textAlign: 'left',
                                    maxWidth: 480,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                }}
                            >
                                <div>
                                    <h4 style={{ margin: '0 0 1px 0' }}>
                                        Messy Data and Spreadsheets
                                    </h4>
                                    <p style={{ margin: 0 }}>
                                        No single source of truth for jobs,
                                        costs, or vehicles.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 1px 0' }}>
                                        Slow, Inconsistent Reporting
                                    </h4>
                                    <p style={{ margin: 0 }}>
                                        Managers spend hours each week compiling
                                        numbers instead of making decisions.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 1px 0' }}>
                                        Margin Leakage
                                    </h4>
                                    <p style={{ margin: 0 }}>
                                        Duplicate data entry, invoice disputes,
                                        and unnoticed overspending quietly erode
                                        profits.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 1px 0' }}>
                                        Customer and Compliance Pressure
                                    </h4>
                                    <p style={{ margin: 0 }}>
                                        Hard to prove KPIs, track safety, or
                                        provide transparency when asked.
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 1px 0' }}>
                                        Stress and Frustration
                                    </h4>
                                    <p style={{ margin: 0 }}>
                                        Directors feel like they’re flying
                                        blind, and staff morale drops when
                                        mistakes become routine.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--gap)',
                                height: '100%',
                            }}
                        >
                            <div className="card" data-reveal>
                                <h3>
                                    <FontAwesomeIcon
                                        icon={faListCheck}
                                        style={{ marginRight: 8 }}
                                    />
                                    How We Help
                                </h3>
                                <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                    <li>
                                        <strong>Fleet-Wide Visibility.</strong>{' '}
                                        Bring plan, cost and H&S data into a
                                        single source of truth.
                                    </li>
                                    <li>
                                        <strong>Operational Clarity.</strong>{' '}
                                        Surface safety, compliance,
                                        profitability, and absence KPIs at a
                                        glance.
                                    </li>
                                    <li>
                                        <strong>Decisions in Minutes.</strong>{' '}
                                        Alerts and dashboards highlight where to
                                        recover 5–10% margin.
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="card"
                                data-reveal
                                data-reveal-delay="60ms"
                            >
                                <h3>
                                    <FontAwesomeIcon
                                        icon={faUsers}
                                        style={{ marginRight: 8 }}
                                    />
                                    Who It’s For
                                </h3>
                                <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                    <li>
                                        Ops and finance managers in UK fleets
                                        with 10–50 vehicles who need
                                        decision-ready KPIs.
                                    </li>
                                    <li>
                                        Family-run, second-generation transport
                                        businesses modernising their reporting.
                                    </li>
                                    <li>
                                        Teams duplicating data entry across
                                        spreadsheets and spending hours
                                        compiling reports.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inline CTA above Process */}
            <div
                className="container text-center"
                style={{ marginTop: 8, marginBottom: 8 }}
            >
                <a href="#team" className="btn cta-inline">
                    Book a Free KPI Discovery Call
                </a>
            </div>

            {/* Process (zoomed in, vertical, centered) */}
            <section className="section">
                <div className="container">
                    <h2
                        className="section-title"
                        style={{ textAlign: 'center' }}
                    >
                        Our Process
                    </h2>
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
                                title: '1. Discover',
                                desc: '30‑min discovery to align on fleet goals, 3–5 critical KPIs, and where data lives. We confirm scope, data access, and success criteria before locking a plan.',
                                icon: faMagnifyingGlass,
                            },
                            {
                                title: '2. Prototype',
                                desc: 'A quick prototype (often in week one) using real spreadsheets or telematics exports to prove the insight and refine the metrics that matter most.',
                                icon: faWandMagicSparkles,
                            },
                            {
                                title: '3. Build',
                                desc: 'Connect TMS, finance, and workshop systems, automate refreshes, and layer in AI summaries or alerts. Everything ships in reviewable increments.',
                                icon: faGears,
                            },
                            {
                                title: '4. Launch',
                                desc: 'Deploy into your accounts with clear docs and light training so depot managers, drivers, and directors can use it day-to-day.',
                                icon: faRocket,
                            },
                            {
                                title: '5. Run & Improve',
                                desc: 'Optional monthly support to keep dashboards accurate, add new data sources, and continue squeezing margin leakage out of the business.',
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
