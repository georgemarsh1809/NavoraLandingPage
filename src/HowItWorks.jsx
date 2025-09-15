import CTA from './CTA.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListCheck,
    faUsers,
    faMagnifyingGlass,
    faWandMagicSparkles,
    faGears,
    faRocket,
} from '@fortawesome/free-solid-svg-icons';

export default function HowItWorks() {
    return (
        <div id="how">
            {/* Hero */}
            <section className="hero">
                <div className="container">
                    <h1>
                        <span>How We Work</span>
                        <br />
                        <span className="highlight">
                            Discover → Validate → Scale
                        </span>
                    </h1>
                    <p>
                        Practical steps that add up to real results. End-to-end
                        solutions delivered with clear communication and a clean
                        handover.
                    </p>
                    <div className="buttons">
                        <a className="btn" href="#cta">
                            Start with a Free Data Audit
                        </a>
                    </div>
                </div>
            </section>

            {/* What we do */}
            <section className="section">
                <div className="container">
                    <div className="grid">
                        <div className="card">
                            <h3>
                                <FontAwesomeIcon
                                    icon={faListCheck}
                                    style={{ marginRight: 8 }}
                                />
                                What We Do
                            </h3>
                            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                <li>
                                    <strong>Unify your data </strong> — bring
                                    scattered spreadsheets and systems into one
                                    reliable source of truth.
                                </li>
                                <li>
                                    <strong>Automate reporting</strong> — save
                                    hours of manual work while eliminating
                                    costly errors.
                                </li>
                                <li>
                                    <strong>Build clarity</strong> — create
                                    dashboards that highlight the KPIs that
                                    truly drive your business forward.
                                </li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>
                                <FontAwesomeIcon
                                    icon={faUsers}
                                    style={{ marginRight: 8 }}
                                />
                                Who It’s For
                            </h3>
                            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                <li>
                                    <strong>Founders and Leadership</strong> -
                                    who need decision-ready metrics at their
                                    fingertips.
                                </li>
                                <li>
                                    <strong>Ops and Finance Teams</strong> -
                                    looking to cut down manual reporting and
                                    focus on metrics that matters.
                                </li>
                                <li>
                                    <strong>SMEs & Mid-Market Companies</strong>{' '}
                                    — who want data insights without the cost of
                                    a full in-house data team.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inline CTA above Process */}
            <div
                className="container text-center"
                style={{ marginTop: 8, marginBottom: 8 }}
            >
                <a href="#cta" className="btn cta-inline">
                    Yes, This Is Me — Let’s Talk
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
                                title: '1. Discover & Align',
                                desc: 'We kick things off with a discovery call to understand your goals, your key metrics, and where your data lives. This ensures we focus on the insights that matter most to your business.',
                                icon: faMagnifyingGlass,
                            },
                            {
                                title: '2. Prototype & Validate',
                                desc: 'Next, we create a simple, interactive prototype so you can see your data come to life. This quick win gives you confidence in the approach and lets us fine-tune before we scale.',
                                icon: faWandMagicSparkles,
                            },
                            {
                                title: '3. Build & Expand',
                                desc: 'With the direction confirmed, we turn the prototype into a full dashboard solution: integrating more data, adding tailored views for teams, and creating clear, actionable reports that make decision-making effortless.',
                                icon: faGears,
                            },
                            {
                                title: '4. Launch & Support',
                                desc: 'We hand everything over with clear documentation and light training, so your team feels at home straight away. And if you’d like ongoing support, we offer a monthly service to keep your dashboards fresh, reliable, and growing with your business.',
                                icon: faRocket,
                            },
                        ].map((s) => (
                            <div
                                key={s.title}
                                className="card"
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
