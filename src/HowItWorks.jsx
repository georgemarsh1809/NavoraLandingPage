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
                        <span>The GBM Way </span>
                        <br />
                        <span className="highlight">
                            Discover. Prototype. Launch.
                        </span>
                    </h1>
                    <p>
                        Practical steps that add up to real results. End-to-end
                        solutions delivered with clear communication and a clean
                        handover.
                    </p>
                    <div className="buttons">
                        <a className="btn" href="#cta">
                            Book a Free Data Audit
                        </a>
                    </div>
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
                                    <strong>Unify your data.</strong> One source
                                    of truth across finance, ops, and growth.
                                </li>
                                <li>
                                    <strong>Automate reporting.</strong> Cut
                                    manual work and reduce errors.
                                </li>
                                <li>
                                    <strong>Surface what matters.</strong> Clear
                                    dashboards and alerts for the KPIs that
                                    drive decisions.
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
                                title: '1. Discover',
                                desc: 'We kick things off with a discovery call to understand your goals, your key metrics, and where your data lives. This ensures we focus on the insights that matter most to your business..',
                                icon: faMagnifyingGlass,
                            },
                            {
                                title: '2. Prototype',
                                desc: 'Next, we create a simple, interactive prototype so you can see your data come to life. This quick win gives you confidence in the approach and lets us fine-tune before we scale.',
                                icon: faWandMagicSparkles,
                            },
                            {
                                title: '3. Build',
                                desc: 'With the direction confirmed, we turn the prototype into a full solution; integrating more data, adding tailored views for teams, and creating clear, actionable reports that make decision-making effortless.',
                                icon: faGears,
                            },
                            {
                                title: '4. Launch ',
                                desc: 'We hand everything over with clear documentation and light training, so your team feels at home straight away. ',
                                icon: faRocket,
                            },
                            {
                                title: '5. Support & Improve',
                                desc: 'If you’d like ongoing support, we offer a monthly service to keep your dashboards fresh, reliable, and growing with your business.',
                                icon: faRocket,
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
