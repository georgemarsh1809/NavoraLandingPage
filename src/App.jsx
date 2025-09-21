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
                    <a href="#cta" className="btn cta-inline">
                        Book a Free Data Discovery Call
                    </a>
                </div>
                <PricingCalculator />
                <TechStack />
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
                <a href="#cta" className="btn intro delay-2">
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
                        <a href="#cta" className="btn" onClick={close}>
                            Book your Data Discovery Call
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
                    <span>Transform Data Chaos Into</span>
                    <br />
                    <span className="highlight">Actionable Insights</span>
                </h1>
                <p className="intro delay-1">
                    We build digital solutions for teams make better decisions
                    based on their business data. Less manual work, more time
                    saved, and more time for you to focus on what really matters
                    for your business.
                </p>
                <div className="buttons intro delay-2">
                    <a href="#cta" className="btn">
                        Book a Free Data Audit
                    </a>
                    <a href="#pricing" className="btn btn-outline">
                        See Pricing & Plans
                    </a>
                </div>
                <p className="small intro delay-3" style={{ marginTop: 8 }}>
                    30‑min audit + tailored plan.
                </p>
            </div>
        </section>
    );
}

function ValueProps() {
    const items = [
        {
            title: 'Streamline Operations',
            desc: 'Replace clunky spreadsheets and manual processes with simple tools that save hours every week.',
            icon: faSitemap,
        },
        {
            title: 'Make Smarter Decisions',
            desc: 'Get clear visibility of your business with dashboards and insights built around your data.',
            icon: faLightbulb,
        },
        {
            title: 'Future-Proof with AI',
            desc: 'Adopt practical AI solutions tailored to your workflows to unlock growth and stay competitive.',
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
            title: 'Starter — Digital Essentials (1–2 weeks)',
            bullets: [
                'Replace 1–2 key spreadsheets with a simple custom app.',
                'Build a single dashboard to track 3–5 key metrics.',
                'Basic automation (auto-updating reports, email alerts).',
            ],
            price: '£1.5k–£2.5k + £200–£300/mo',
        },
        {
            title: 'Growth — Operations Upgrade (2–4 weeks)',
            bullets: [
                'Multiple dashboards pulling from different systems.',
                'Workflow automation (invoice handling, scheduling, CRM updates).',
                'Basic AI integration (summaries, auto-generated reports).',
                'User access control / simple login for teams.',
            ],
            price: '£4k–£8k + £400–£700/mo',
        },
        {
            title: 'Pro — AI‑Driven Business (4–6 weeks)',
            bullets: [
                'Bespoke internal platform combining dashboards + automation + AI.',
                'Advanced AI features (forecasting, natural language query, assistants).',
                'Covers multiple departments (finance, ops, sales, logistics).',
                'Ongoing AI advisory + optimisation.',
            ],
            price: '£10k–£18k + £1.5k+/mo',
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
                        const icon = title.includes('starter')
                            ? faSeedling
                            : title.includes('growth')
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
            a: 'Automated reporting, single‑source‑of‑truth dashboards, KPI consolidation across tools, and lightweight workflow automations for ops, finance, and leadership teams.',
        },
        {
            q: 'How long does a project take?',
            a: 'Basic solutions typically ship in ~1 week. Moderate builds land in 2–4 weeks. Complex, multi‑source solutions run 6–12 weeks depending on integrations and scope.',
        },
        {
            q: 'How is pricing structured?',
            a: 'Transparent build pricing by complexity (see the calculator), plus an optional monthly retainer for maintenance and small enhancements. Typical retainers range from £200–£2,500/mo.',
        },
        {
            q: 'What do you need from us to start?',
            a: 'Your objectives and KPIs, a quick list of data sources, and read‑only access where possible. We can sign an NDA and use time‑boxed discovery to finalise scope.',
        },
        {
            q: 'How do you handle data security?',
            a: 'Least‑privilege access, read‑only credentials wherever feasible, encrypted secrets, and revocable access on project end. We can work within your SSO and security policies.',
        },
        {
            q: 'Who owns the deliverables?',
            a: 'You do. Dashboards, source code, and assets are delivered into your accounts and repositories with handover docs so your team can run independently.',
        },
        {
            q: 'What stack do you use?',
            a: 'We meet you where you are. Typical setups use Looker Studio for simple needs, and React/Next.js with FastAPI + Postgres for custom apps and integrations.',
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
                    <FontAwesomeIcon icon={faLayerGroup} style={{ marginRight: 8 }} />
                    Technologies We Work With
                </h2>
                <div className="tech-logos">
                    {logos.map((l) => (
                        <img
                            key={l.name}
                            src={l.src}
                            alt={l.name}
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
