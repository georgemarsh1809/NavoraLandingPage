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

export default function HowItWorks({ ctaHref = '#team' }) {
    return (
        <div id="how">
            <section className="hero">
                <div className="container">
                    <h1>
                        <span>The GBM Approach</span>
                        <br />
                        <span className="highlight">
                            Clarity to build trust. Honesty to build
                            partnerships.
                        </span>
                    </h1>
                    <p>
                        Discovery-to-support engagements that replace
                        spreadsheet chaos with AI co-pilots, live dashboards,
                        and operations-ready system builds.
                    </p>
                    <div className="buttons">
                        <a className="btn" href={ctaHref}>
                            Book an AI Discovery Call
                        </a>
                    </div>
                    <p className="small" style={{ marginTop: 8 }}>
                        30‑minute session to map depots, data, and quick wins.
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
                                        body: 'CRMs, spreadsheets, trackers, and finance tools rarely speak to one another, so teams waste time stitching together the story.',
                                    },
                                    {
                                        title: 'Reactive planning & reporting',
                                        body: 'Leaders chase updates and compile reports by hand, meaning insights arrive after the moment to act has passed.',
                                    },
                                    {
                                        title: 'Siloed Communication',
                                        body: 'Information lives in emails, chat threads, and isolated systems, causing delays, duplication, and missed opportunities for collaboration.',
                                    },
                                    {
                                        title: 'Compliance & customer pressure',
                                        body: 'Boards, auditors, and clients expect rapid evidence, even when the team is already stretched thin.',
                                    },
                                    {
                                        title: 'Limited build capacity',
                                        body: 'You can see the value in automation, but internal teams lack the time and specialist skills to ship and maintain it.',
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
                                            label: 'Discovery sessions',
                                            body: 'Structured sprints to pinpoint opportunities.',
                                        },
                                        {
                                            label: 'Implementation cycles',
                                            body: 'Focused delivery that ships powerful solutions.',
                                        },
                                        {
                                            label: 'Support & evolution',
                                            body: 'CI, testing, and release notes so the solutions keep up.',
                                        },
                                    ],
                                },
                                {
                                    title: 'Who It’s For',
                                    icon: faUsers,
                                    items: [
                                        {
                                            label: 'Ops-led organisations',
                                            body: 'Operations-heavy teams ready to modernise.',
                                        },
                                        {
                                            label: 'Multi-system environments',
                                            body: 'Businesses juggling multiple tools, compliance requirements, and customer expectations.',
                                        },
                                        {
                                            label: 'Ambitious leaders',
                                            body: 'Leaders who want to use AI to unlock measurable gains.',
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
                    Build Your Roadmap
                </a>
            </div>

            <section className="section">
                <div className="container">
                    <h2
                        className="section-title"
                        style={{ textAlign: 'center' }}
                    >
                        Our Process
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
                        There is never any obligation to move from one phase to the next. Each phase is scoped, delivered, and closed independently—and we only advance when it makes sense for your business.
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
                                title: '1. Discovery',
                                desc: 'Initial sprint with stakeholder and team interviews, data audit, and AI opportunity canvas aligned to your KPIs and metrics.',
                                icon: faMagnifyingGlass,
                            },
                            {
                                title: '2. Prototype & Pilot',
                                desc: 'Rapid proof using live data to validate automations, dashboards, or workflow co-pilots before scaling.',
                                icon: faWandMagicSparkles,
                            },
                            {
                                title: '3. Implementation',
                                desc: 'Integrate ops, finance, HR, and compliance data with weekly increments you can get to work and quickly see a ROI.',
                                icon: faGears,
                            },
                            {
                                title: '4. Launch & Adoption',
                                desc: 'Training, documentation, and playbooks so leads and stakeholders adopt with confidence.',
                                icon: faRocket,
                            },
                            {
                                title: '5. Support & Evolution',
                                desc: 'Optional retainers for CI, enhancements, and new AI initiatives as your roadmap grows.',
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
