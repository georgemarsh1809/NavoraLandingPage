import CTA from './CTA.jsx';
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
                            Discover. Prototype. Launch.
                        </span>
                    </h1>
                    <p>
                        We build digital solutions that turn scattered business
                        data into clear, actionable insights. Less manual work,
                        more time saved, and more focus on what really matters
                        for your business.
                    </p>
                    <div className="buttons">
                        <a className="btn" href="#cta">Book a Free Data Audit</a>
                    </div>
                    <p className="small" style={{ marginTop: 8 }}>
                        30‑min audit + tailored plan.
                    </p>
                </div>
            </section>

            {/* What we do */}
            <section className="section">
                <div className="container">
                    <div className="grid">
                        <div className="card" data-reveal>
                            <h3>
                                <FontAwesomeIcon
                                    icon={faListCheck}
                                    style={{ marginRight: 8 }}
                                />
                                What We Do
                            </h3>
                            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                <li>
                                    <strong>Unify Your Data.</strong> One source of truth across finance, ops, and growth.
                                </li>
                                <li>
                                    <strong>Gain Insight.</strong> Get the clarity of a data team at a fraction of the cost.
                                </li>
                                <li>
                                    <strong>Make Smarter Decisions.</strong> Clear dashboards and alerts for the KPIs that drive business.
                                </li>
                            </ul>
                        </div>
                        <div className="card" data-reveal data-reveal-delay="60ms">
                            <h3>
                                <FontAwesomeIcon
                                    icon={faUsers}
                                    style={{ marginRight: 8 }}
                                />
                                Who It’s For
                            </h3>
                            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                <li>
                                    Founders and leadership who need
                                    decision‑ready metrics.
                                </li>
                                <li>
                                    Ops & finance teams tired of manual
                                    reporting.
                                </li>
                                <li>
                                    SMEs & mid‑market without a full data team.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inline CTA above Process */}
            <div className="container text-center" style={{ marginTop: 8, marginBottom: 8 }}>
                <a href="#cta" className="btn cta-inline">
                    Book a Free Data Discovery Call
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
                                desc: '30‑min discovery to align on goals, 3–5 key metrics, and where your data lives. We confirm scope and success criteria, then propose a tailored plan.',
                                icon: faMagnifyingGlass,
                            },
                            {
                                title: '2. Prototype',
                                desc: 'A quick, interactive prototype (often in week one) to validate the approach on real data — typically a small dashboard or simple app replacing a spreadsheet.',
                                icon: faWandMagicSparkles,
                            },
                            {
                                title: '3. Build',
                                desc: 'Expand to the required sources, add dashboards and workflows, and wire up basic AI where useful. Ship in small, reviewable increments.',
                                icon: faGears,
                            },
                            {
                                title: '4. Launch',
                                desc: 'Deploy to your accounts with clear docs and light training. Set up access control/SSO where needed so teams can use it day‑to‑day.',
                                icon: faRocket,
                            },
                            {
                                title: '5. Run & Improve',
                                desc: 'Optional monthly support to keep things fresh: updates, monitoring, small enhancements, and ongoing AI optimisation as your needs evolve.',
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

            <CTA />
        </div>
    );
}
