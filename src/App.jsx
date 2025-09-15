import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPuzzlePiece,
    faCircleQuestion,
    faClock,
    faGaugeHigh,
    faSeedling,
    faLayerGroup,
    faSitemap,
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
    return <NavoraLanding />;
}

function NavoraLanding() {
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

    return (
        <header className="header">
            <div className="container flex-between">
                <a href="/" className="logo">
                    GBMGroup
                </a>
                <nav className="nav">
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
                <a href="#cta" className="btn">
                    Book a Call
                </a>

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
                                stroke="#ddd"
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
                                stroke="#ddd"
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
                <h1>
                    <span>Transform Data Chaos Into</span>
                    <br />
                    <span className="highlight">Actionable Insights</span>
                </h1>
                <p>
                    We help founders, operations & finance teams make smarter
                    decisions based on their data. No fuss, no manual reporting,
                    just reliable dashboards and digital solutions.
                </p>
                <div className="buttons">
                    <a href="#cta" className="btn">
                        This is a test
                    </a>
                    <a href="#pricing" className="btn btn-outline">
                        See Pricing & Plans
                    </a>
                </div>
                <p className="small" style={{ marginTop: 8 }}>
                    20‑min audit + tailored plan.
                </p>
            </div>
        </section>
    );
}

function ValueProps() {
    const items = [
        {
            title: 'Unify your data',
            desc: 'One source of truth across finance, ops, and growth.',
            icon: faSitemap,
        },
        {
            title: 'Get Insights',
            desc: 'Get the clarity of a data team at a fraction of the cost.',
            icon: faClock,
        },
        {
            title: 'Surface what matters',
            desc: 'Clear dashboards and alerts for the KPIs that drive decisions.',
            icon: faGaugeHigh,
        },
    ];
    return (
        <section id="value" className="section">
            <div className="container">
                <div className="grid">
                    {items.map((it, idx) => (
                        <div
                            key={it.title}
                            className="card"
                            data-reveal
                            data-reveal-delay={`${idx * 60}ms`}
                        >
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
            title: 'Package A — Decision Preview (Prototype, 7–10 days)',
            bullets: [
                'Deliverables: 1 connected data pipe (e.g., Sheets/CSV), 1 KPI set (3–7), 1 dashboard, 1 automated email report.',
                'Outcome: Validate the metrics & workflow on real data.',
                'Risk reducer: If it doesn’t earn a rollout, you don’t pay.',
            ],
            price: '£1,000–£2,500 + £200-£500/mo',
        },
        {
            title: 'Package B — Ops Visibility Pack (Core Build, 2–4 weeks)',
            bullets: [
                'Deliverables: 2 dashboards (Exec + Ops), source modeling, data dictionary, anomaly alerts, daily refresh by 9am.',
                'Outcome: Cut manual reporting by 70–90%; leaders get the same numbers, every day.',
            ],
            price: '£2,500–£8,000 + £400–£800/mo',
        },
        {
            title: 'Package C — Run & Automate Suite (Scale, 6–12 weeks)',
            bullets: [
                'Deliverables: 5–10 sources, role-based access, multi-page boards, SLAs, incident monitoring, forecasting.',
                'Outcome: One source of truth across teams; proactive alerts, not reactive fire-drills.',
            ],
            price: '£8,000–£20,000 + £1,000–£2,500/mo',
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
                    {items.map((card, idx) => {
                        const { label, name, meta } = splitTitle(card.title);
                        const icon = card.title.includes('Decision Preview')
                            ? faSeedling
                            : card.title.includes('Ops Visibility')
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
                            <div
                                key={card.title}
                                className="card"
                                data-reveal
                                data-reveal-delay={`${idx * 60}ms`}
                            >
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
