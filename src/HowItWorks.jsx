import CTAHome from './CTA.jsx';

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
                            Direct, transparent, outcome‑focused
                        </span>
                    </h1>
                    <p>
                        Practical steps that add up to real results. End-to-end
                        solutions delivered with clear communication and a clean
                        handover.
                    </p>
                    <div className="buttons">
                        <a className="btn" href="#cta">
                            Book your Data Discovery Call
                        </a>
                    </div>
                </div>
            </section>

            {/* What we do */}
            <section className="section">
                <div className="container">
                    <div className="grid">
                        <div className="card">
                            <h3>What We Do</h3>
                            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                <li>
                                    Turn scattered spreadsheets into a single
                                    source of truth
                                </li>
                                <li>
                                    Automate reporting to cut manual work and
                                    reduce errors
                                </li>
                                <li>
                                    Build clear dashboards that surface the KPIs
                                    that matter
                                </li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>Who It’s For</h3>
                            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                                <li>
                                    Founders and leadership needing
                                    decision‑ready metrics
                                </li>
                                <li>
                                    Ops and finance teams aiming to cut manual
                                    reporting
                                </li>
                                <li>
                                    SMEs and mid‑market companies without a full
                                    data team
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

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
                                title: '1) Discovery',
                                desc: 'Goals, KPIs, and data sources — time‑boxed and actionable.',
                            },
                            {
                                title: '2) Prototype',
                                desc: 'Quick proof of value with a simple view or automation.',
                            },
                            {
                                title: '3) Build',
                                desc: 'Expand what works: metrics, dashboards, and small workflows.',
                            },
                            {
                                title: '4) Handover',
                                desc: 'Clear docs, light training, and optional monthly support.',
                            },
                        ].map((s) => (
                            <div
                                key={s.title}
                                className="card"
                                style={{
                                    maxWidth: 720,
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                <h3 style={{ marginTop: 0 }}>{s.title}</h3>
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

            {/* CTA from homepage */}
            <CTAHome />
        </div>
    );
}
