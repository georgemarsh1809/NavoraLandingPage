import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPuzzlePiece,
    faCircleQuestion,
    faClock,
    faGaugeHigh,
    faHandshake,
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
                        Pricing
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
                        Start with a Free Data Audit
                    </a>
                </div>
            </div>
        </section>
    );
}

function ValueProps() {
    const items = [
        {
            title: 'Save Time, Reduce Errors',
            desc: 'Turn scattered spreadsheets into a single source of truth. Automate reporting, cut manual work, and eliminate costly mistakes. ',
            icon: faClock,
        },
        {
            title: 'Affordable Insights',
            desc: 'Get the clarity of a data team at a fraction of the cost. Transparent build pricing and simple monthly retainers keep your budget in control.',
            icon: faGaugeHigh,
        },
        {
            title: 'Personal, Reliable Partnership',
            desc: 'Work directly with one engineer you can trust. Fast prototypes, clear communication, and ongoing support.',
            icon: faHandshake,
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
            title: 'Tier 1 – Basic',
            bullets: [
                '1 data source integration',
                'Single dashboard',
                '3–7 key metrics',
                '1 week delivery',
                'Basic maintenance included',
            ],
            price: '£1,500 build + £200–£300/mo',
        },
        {
            title: 'Tier 2 – Moderate',
            bullets: [
                '2–4 data sources',
                '2–3 connected dashboards',
                'Interactive filters',
                'Process automation',
                '2–4 weeks delivery',
                'Priority support',
            ],
            price: '£2,500–£4,000 build + £400–£800/mo',
        },
        {
            title: 'Tier 3 – Complex',
            bullets: [
                '5+ data sources',
                'Multi‑page dashboards',
                'User roles & permissions',
                'Advanced forecasting',
                'AI integrations',
                '6–12 weeks delivery',
                'White‑glove service',
            ],
            price: '£5,000–£20,000 build + £1,000–£4000/mo',
        },
    ];
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
                    {items.map((card) => (
                        <div key={card.title} className="card">
                            <h3>
                                <FontAwesomeIcon
                                    icon={
                                        card.title.includes('Basic')
                                            ? faSeedling
                                            : card.title.includes('Moderate')
                                            ? faLayerGroup
                                            : faSitemap
                                    }
                                    style={{ marginRight: 8 }}
                                />
                                {card.title}
                            </h3>
                            <ul>
                                {card.bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                            <p>
                                {(() => {
                                    const parts = card.price.split(' build + ');
                                    if (parts.length === 2) {
                                        return (
                                            <>
                                                {parts[0]} build
                                                <br />
                                                <span className="retainer">
                                                    {parts[1]} ongoing support
                                                </span>
                                            </>
                                        );
                                    }
                                    return card.price;
                                })()}
                            </p>
                        </div>
                    ))}
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
