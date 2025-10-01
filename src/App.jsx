import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPuzzlePiece,
    faCircleQuestion,
    faSeedling,
    faLayerGroup,
    faSitemap,
    faLightbulb,
    faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import PricingCalculator from './PricingCalculator.jsx';
import HowItWorks from './HowItWorks.jsx';
import CTA from './CTA.jsx';
import MeetTheTeam from './MeetTheTeam.jsx';

function Router() {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path === '/how-we-work') {
        return (
            <div className="page">
                <a href="#main" className="skip-link">
                    Skip to content
                </a>
                <Header />
                <main id="main">
                    <HowItWorks />
                </main>
                <Footer />
            </div>
        );
    }
    return <GBMGroupLanding />;
}

function GBMGroupLanding() {
    // Scroll to hash target on initial load (e.g., /#solutions)
    useEffect(() => {
        const hash =
            typeof window !== 'undefined'
                ? (window.location.hash || '').replace('#', '')
                : '';
        if (!hash) return;
        const el = document.getElementById(hash);
        if (!el) return;
        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    }, []);
    return (
        <div className="page">
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            <Header />
            <main id="main">
                <Hero />
                <ValueProps />
                <Solutions />
                {/* Inline CTA after Solutions on homepage */}
                <div
                    className="container text-center"
                    style={{ marginTop: 0, marginBottom: 30 }}
                >
                    <a href="#team" className="btn cta-inline">
                        Book a Free KPI Discovery Call
                    </a>
                </div>
                <PricingCalculator />
                <TechStack />
                <MeetTheTeam />
                <CTA />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}

export default Router;

function Header() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('');
    const close = () => setOpen(false);
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    const onHowItWorks = path === '/how-we-work';

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        const original = document.body.style.overflow;
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = original || '';
        return () => {
            document.body.style.overflow = original || '';
        };
    }, [open]);

    // Track active section via viewport center for stable highlighting
    // Only sections that have nav items (exclude CTA)
    useEffect(() => {
        const ids = ['value', 'solutions', 'pricing', 'faq'];
        const getEls = () =>
            ids.map((id) => document.getElementById(id)).filter(Boolean);

        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const els = getEls();
                if (!els.length) return;
                const mid = window.innerHeight / 2;
                let bestId = '';
                let bestDist = Infinity;
                for (const el of els) {
                    const r = el.getBoundingClientRect();
                    const center = r.top + r.height / 2;
                    const d = Math.abs(center - mid);
                    if (d < bestDist) {
                        bestDist = d;
                        bestId = el.id;
                    }
                }
                setCurrent(bestId);
            });
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    // Keep nav highlight in sync with hash changes and initial load
    useEffect(() => {
        const valid = new Set(['value', 'solutions', 'pricing', 'faq']);
        const setFromHash = () => {
            const id = (window.location.hash || '').replace('#', '');
            if (valid.has(id)) setCurrent(id);
        };
        setFromHash();
        window.addEventListener('hashchange', setFromHash);
        return () => window.removeEventListener('hashchange', setFromHash);
    }, []);

    const navClass = (id) => (current === id ? 'active' : '');

    // Theme selector removed; theme defaults applied in main.jsx

    return (
        <header className="header">
            <div className="container flex-between">
                <a href="/" className="logo intro">
                    GBMGroup
                </a>
                <nav className="nav intro delay-1">
                    <a
                        href={onHowItWorks ? '/#solutions' : '#solutions'}
                        className={navClass('solutions')}
                        aria-current={
                            current === 'solutions' ? 'location' : undefined
                        }
                        onClick={() => setCurrent('solutions')}
                    >
                        Solutions
                    </a>
                    <a
                        href={onHowItWorks ? '/#pricing' : '#pricing'}
                        className={navClass('pricing')}
                        aria-current={
                            current === 'pricing' ? 'location' : undefined
                        }
                        onClick={() => setCurrent('pricing')}
                    >
                        Pricing & Plans
                    </a>
                    <a
                        href={onHowItWorks ? '/#faq' : '#faq'}
                        className={navClass('faq')}
                        aria-current={
                            current === 'faq' ? 'location' : undefined
                        }
                        onClick={() => setCurrent('faq')}
                    >
                        FAQ
                    </a>
                    <a
                        href="/how-we-work"
                        className={onHowItWorks ? 'active' : ''}
                        aria-current={onHowItWorks ? 'page' : undefined}
                    >
                        How We Work
                    </a>
                </nav>
                <a href="#team" className="btn intro delay-2">
                    Book a Call
                </a>
                {/* Theme selector removed */}

                <button
                    className="menu-toggle"
                    aria-expanded={open}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? (
                        // X icon
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M4 6h16M4 12h16M4 18h16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {open && (
                <div className="mobile-menu">
                    <div className="container">
                        <nav className="mobile-nav">
                            <a
                                href="/how-we-work"
                                className={onHowItWorks ? 'active' : ''}
                                aria-current={onHowItWorks ? 'page' : undefined}
                                onClick={() => close()}
                            >
                                How We Work
                            </a>
                            <a
                                href={
                                    onHowItWorks ? '/#solutions' : '#solutions'
                                }
                                className={navClass('solutions')}
                                aria-current={
                                    current === 'solutions'
                                        ? 'location'
                                        : undefined
                                }
                                onClick={() => {
                                    setCurrent('solutions');
                                    close();
                                }}
                            >
                                Solutions
                            </a>
                            <a
                                href={onHowItWorks ? '/#pricing' : '#pricing'}
                                className={navClass('pricing')}
                                aria-current={
                                    current === 'pricing'
                                        ? 'location'
                                        : undefined
                                }
                                onClick={() => {
                                    setCurrent('pricing');
                                    close();
                                }}
                            >
                                Pricing
                            </a>
                            <a
                                href={onHowItWorks ? '/#faq' : '#faq'}
                                className={navClass('faq')}
                                aria-current={
                                    current === 'faq' ? 'location' : undefined
                                }
                                onClick={() => {
                                    setCurrent('faq');
                                    close();
                                }}
                            >
                                FAQ
                            </a>
                        </nav>
                        <a href="#team" className="btn" onClick={close}>
                            Book your KPI Discovery Call
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <h1 className="intro">
                    <span>From Chaos to Clarity</span>
                    <br />
                    <span className="highlight">
                        with Custom Tools, Built Around You
                    </span>
                </h1>
                <p className="intro delay-1">
                    Custom dashboards for UK Transport and Logistics teams that
                    turn scattered spreadsheets and messy KPIs into clear, daily
                    insights. Improve safety & cost metrics, prevent margin
                    leakage, and take back control of your business.
                </p>
                <div className="buttons intro delay-2">
                    <a href="#team" className="btn">
                        Book a Free Discovery Call
                    </a>
                    <a href="#pricing" className="btn btn-outline">
                        Explore Pricing & Plans
                    </a>
                </div>
                <p className="small intro delay-3" style={{ marginTop: 8 }}>
                    30‑min call to understand your data.
                </p>
            </div>
        </section>
    );
}

function ValueProps() {
    const items = [
        {
            title: 'Recover Hidden Margin',
            desc: 'Expose leakage across your business with dashboards designed around your context and  needs.',
            icon: faSitemap,
        },
        {
            title: 'Clarity on Critical KPIs',
            desc: 'Track safety, compliance, P&L, absence, and customer issues in one place so nothing slips. ',
            icon: faLightbulb,
        },
        {
            title: 'Decisions in Minutes',
            desc: 'Automated reporting delivers insights in seconds instead of hours, keeping teams proactive.',
            icon: faChartLine,
        },
    ];
    return (
        <section id="value" className="section">
            <div className="container">
                <div className="grid">
                    {items.map((it) => (
                        <div key={it.title} className="card">
                            <h3>
                                <FontAwesomeIcon
                                    icon={it.icon}
                                    style={{ marginRight: 8 }}
                                />
                                {it.title}
                            </h3>
                            <p>{it.desc}</p>
                        </div>
                    ))}
                </div>
                {/* Removed prominent CTA here to reduce intensity */}
            </div>
        </section>
    );
}

function Solutions() {
    const items = [
        {
            title: 'KPI Kickstart — Snapshot (1–2 weeks)',
            bullets: [
                'Live dashboard covering safety, compliance, and daily profitability KPIs for one depot or fleet segment.',
                'Automated reporting for ops and finance managers.',
                'Handover call to demonstrate business implementation.',
            ],
            price: '£1.5k–£2.5k + £150–£250/mo',
        },
        {
            title: 'Operations Control Tower — Depot Overview (2–4 weeks)',
            bullets: [
                'Combine multiple data sources for cost and plan vs. actual insight.',
                'Exception alerts for absence, unplanned downtime, and customer issues.',
                'Specific views that highlight where money can be saved each week.',
            ],
            price: '£2.5k–£5k + £250–£500/mo',
        },
        {
            title: 'Command Centre — Integrated Insights (4-6 weeks)',
            bullets: [
                'End-to-end KPI Insights software covering finance, operations, and customer service.',
                'Role-based dashboards for directors, ops, and finance teams with drill-down analytics.',
                'Optimisation, light AI forecasting, and bespoke integrations for your family-run fleet.',
            ],
            price: '£5k–£10k + £500+/mo',
        },
    ];
    const splitTitle = (t) => {
        const parts = t.split('—');
        const label = parts.length > 1 ? parts[0].trim() : '';
        let right = parts.length > 1 ? parts.slice(1).join('—').trim() : t;
        let name = right;
        let meta = '';
        const m = right.match(/^(.*)\((.*)\)$/);
        if (m) {
            name = (m[1] || '').trim();
            meta = (m[2] || '').trim();
        }
        return { label, name, meta };
    };
    return (
        <section id="solutions" className="section">
            <div className="container">
                <h2 className="section-title">
                    <FontAwesomeIcon
                        icon={faPuzzlePiece}
                        style={{ marginRight: 8 }}
                    />
                    Solutions
                </h2>
                <div className="grid">
                    {items.map((card) => {
                        const { label, name, meta } = splitTitle(card.title);
                        const title = card.title.toLowerCase();
                        const icon = title.includes('kickstart')
                            ? faSeedling
                            : title.includes('control')
                            ? faLayerGroup
                            : faSitemap;
                        const noteMatch = card.price.match(/\(([^)]+)\)/);
                        const note = noteMatch ? noteMatch[1] : '';
                        const noNote = card.price
                            .replace(/\s*\([^)]*\)\s*/g, '')
                            .trim();
                        let build = noNote;
                        let retainer = '';
                        if (noNote.includes('+')) {
                            const parts = noNote.split('+');
                            build = (parts[0] || '').trim();
                            retainer = (parts.slice(1).join('+') || '').trim();
                        }
                        return (
                            <div key={card.title} className="card">
                                {label ? (
                                    <span
                                        className="badge"
                                        style={{ marginBottom: 6 }}
                                    >
                                        {label}
                                    </span>
                                ) : null}
                                <h3
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        marginTop: 4,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={icon}
                                        style={{
                                            color: 'var(--muted)',
                                            fontSize: 14,
                                        }}
                                    />
                                    {name}
                                </h3>
                                {meta ? (
                                    <p
                                        className="small"
                                        style={{
                                            color: 'var(--muted)',
                                            marginTop: 4,
                                        }}
                                    >
                                        {meta}
                                    </p>
                                ) : null}
                                <ul>
                                    {card.bullets.map((b) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: 8 }}>
                                    <div className="price-build">{build}</div>
                                    {retainer ? (
                                        <div className="price-retainer">
                                            Scale & Improve: {retainer}
                                        </div>
                                    ) : null}
                                    {note ? (
                                        <div className="price-note small">
                                            {note}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="text-center" style={{ marginTop: 20 }}>
                    <p className="small" style={{ color: 'var(--muted)' }}>
                        <a className="underline" href="/how-we-work">
                            See our process
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const items = [
        {
            q: 'What problems do you typically solve?',
            a: 'Connecting telematics, workshop, TMS, and finance data so transport and logistics teams see safety, compliance, profitability, and absence metrics without juggling spreadsheets.',
        },
        {
            q: 'How long does a project take?',
            a: 'Fleet snapshot dashboards land in 1–2 weeks, multi-depot control towers take 2–3 weeks, and integrated command centres typically wrap in 3–5 weeks based on data access.',
        },
        {
            q: 'How is pricing structured?',
            a: 'Transparent build pricing between £1.5k and £5k depending on complexity, with optional monthly support (£150–£400+/mo) for maintenance, new data sources, and optimisation.',
        },
        {
            q: 'What do you need from us to start?',
            a: 'Clarity on the KPIs you need, a list of data sources (Sheets, TMS, telematics, ERPs), and read-only credentials where possible. We can sign an NDA and run a focused discovery to lock scope.',
        },
        {
            q: 'How do you handle data security?',
            a: 'Least-privilege access with audit trails, read-only credentials wherever feasible, encrypted secrets, and revocable access on project end. We work within your SSO and security policies.',
        },
        {
            q: 'Who owns the deliverables?',
            a: 'You do. Dashboards, source code, and assets are delivered into your accounts and repositories with handover docs so your team can run independently.',
        },
        {
            q: 'What stack do you use?',
            a: 'Whatever fits your fleet. Many MVPs use Looker Studio or Power BI for speed; custom builds lean on React/Next.js with FastAPI + Postgres, and we integrate with existing transport systems.',
        },
    ];

    return (
        <section id="faq" className="section">
            <div className="container">
                <h2 className="section-title">
                    <FontAwesomeIcon
                        icon={faCircleQuestion}
                        style={{ marginRight: 8 }}
                    />
                    FAQ
                </h2>
                {items.map((it) => (
                    <details key={it.q}>
                        <summary>
                            <FontAwesomeIcon
                                icon={faCircleQuestion}
                                style={{ marginRight: 8 }}
                            />
                            {it.q}
                        </summary>
                        <p>{it.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container flex-between">
                <div>GBMGroup</div>
                <nav className="footer-nav">
                    <a href="/how-we-work">What We Do</a>
                    <a href="#solutions">Solutions</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#faq">FAQ</a>
                    <a href="#" aria-disabled="true">
                        Privacy
                    </a>
                    <a href="#" aria-disabled="true">
                        Terms
                    </a>
                    <a href="mailto:hello@gbmgroup.io">hello@gbmgroup.io</a>
                </nav>
                <p className="small">© {new Date().getFullYear()} GBMGroup</p>
            </div>
        </footer>
    );
}

function TechStack() {
    const logos = [
        {
            name: 'React',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        {
            name: 'Next.js',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
            invertOnDark: true,
        },
        {
            name: 'FastAPI',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
        },
        {
            name: 'Express',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg',
            invertOnDark: true,
        },
        {
            name: 'Node.js',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        },
        {
            name: 'Firebase',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        },
        {
            name: 'Postgres',
            src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        },
        {
            name: 'BigQuery',
            src: 'https://cdn.simpleicons.org/googlebigquery/4285F4',
        },
    ];
    return (
        <section id="tech" className="section">
            <div className="container">
                <h2 className="section-title">
                    <FontAwesomeIcon
                        icon={faLayerGroup}
                        style={{ marginRight: 8 }}
                    />
                    Technologies We Work With
                </h2>
                <div className="tech-logos">
                    {logos.map((l) => (
                        <img
                            key={l.name}
                            src={l.src}
                            alt={l.name}
                            title={l.name}
                            loading="lazy"
                            height={40}
                            data-invert-on-dark={
                                l.invertOnDark ? 'true' : undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
