import './App.css';
import { useState, useEffect } from 'react';
import PricingCalculator from './calc';

export default function NavoraLanding() {
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
                <PricingCalculator />
                <CTA />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}

function Header() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('');
    const close = () => setOpen(false);

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
                <div className="logo">GBMGroup</div>
                <nav className="nav">
                    <a
                        href="#value"
                        className={navClass('value')}
                        aria-current={
                            current === 'value' ? 'location' : undefined
                        }
                        onClick={() => setCurrent('value')}
                    >
                        How We Help
                    </a>
                    <a
                        href="#solutions"
                        className={navClass('solutions')}
                        aria-current={
                            current === 'solutions' ? 'location' : undefined
                        }
                        onClick={() => setCurrent('solutions')}
                    >
                        Solutions
                    </a>
                    <a
                        href="#pricing"
                        className={navClass('pricing')}
                        aria-current={
                            current === 'pricing' ? 'location' : undefined
                        }
                        onClick={() => setCurrent('pricing')}
                    >
                        Pricing
                    </a>
                    <a
                        href="#faq"
                        className={navClass('faq')}
                        aria-current={
                            current === 'faq' ? 'location' : undefined
                        }
                        onClick={() => setCurrent('faq')}
                    >
                        FAQ
                    </a>
                </nav>

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
                                href="#value"
                                className={navClass('value')}
                                aria-current={
                                    current === 'value' ? 'location' : undefined
                                }
                                onClick={() => {
                                    setCurrent('value');
                                    close();
                                }}
                            >
                                How We Help
                            </a>
                            <a
                                href="#solutions"
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
                                href="#pricing"
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
                                href="#faq"
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
                    <span>Transform Scattered Data Into</span>
                    <br />
                    <span className="highlight">Actionable Insights</span>
                </h1>
                <p>
                    Dashboards and tools for ops and internal teams that cut
                    reporting time and surface the KPIs that matter.
                </p>
                <div className="buttons">
                    <a href="#cta" className="btn">
                        Book your Data Discovery Call
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
        },
        {
            title: 'Affordable Insights',
            desc: 'Get the clarity of a data team at a fraction of the cost. Transparent build pricing and simple monthly retainers keep your budget in control.',
        },
        {
            title: 'Personal, Reliable Partnership',
            desc: 'Work directly with one engineer you can trust. Fast prototypes, clear communication, and ongoing support.',
        },
    ];
    return (
        <section id="value" className="section">
            <div className="container">
                <div className="grid">
                    {items.map((it) => (
                        <div key={it.title} className="card">
                            <h3>{it.title}</h3>
                            <p>{it.desc}</p>
                        </div>
                    ))}
                </div>
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
            price: '£1,500 build + £200–£400/mo',
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
            price: '£5,000–£12,000 build + £1,000–£2,500/mo',
        },
    ];
    return (
        <section id="solutions" className="section">
            <div className="container">
                <h2 className="section-title">Solutions</h2>
                <div className="grid">
                    {items.map((card) => (
                        <div key={card.title} className="card">
                            <h3>{card.title}</h3>
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
            </div>
        </section>
    );
}

function CTA() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [note, setNote] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email) {
            setError('Please enter your name and work email.');
            return;
        }
        const subject = `Discovery Call Request — ${name}`;
        const body = `Name: ${name}%0AEmail: ${email}%0A${
            note ? `Notes: ${encodeURIComponent(note)}` : ''
        }`;
        const mailto = `mailto:hello@gbmgroup.io?subject=${encodeURIComponent(
            subject
        )}&body=${body}`;
        // Open email client; also show an inline confirmation
        window.location.href = mailto;
        setSent(true);
    };

    return (
        <section id="cta" className="section">
            <div className="container card">
                <div className="cta-head">
                    <h2 className="section-title">Get Started</h2>
                    <h3>Book your Data Discovery Call</h3>
                    <p className="small" style={{ color: '#bbb' }}>
                        Typically replies within 1 business day.
                    </p>
                </div>
                <form onSubmit={onSubmit} className="form" noValidate>
                    <div className="form-row">
                        <label htmlFor="cta-name">Name</label>
                        <input
                            id="cta-name"
                            name="name"
                            placeholder="Jane Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="cta-email">Work email</label>
                        <input
                            id="cta-email"
                            name="email"
                            type="email"
                            placeholder="jane@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="cta-note">Notes (optional)</label>
                        <textarea
                            id="cta-note"
                            name="note"
                            placeholder="Share context or preferred times"
                            rows={3}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn">
                        Request a slot
                    </button>

                    <div
                        className="small"
                        role="status"
                        aria-live="polite"
                        style={{ color: sent ? '#9edfd8' : '#ffb4b4' }}
                    >
                        {sent
                            ? 'Thanks — your email client should open. If not, contact hello@gbmgroup.io.'
                            : error || ''}
                    </div>
                </form>

                <p
                    className="small"
                    style={{
                        marginTop: '0.75rem',
                        color: '#9aa',
                        maxWidth: 420,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        textAlign: 'left',
                    }}
                >
                    Prefer email? Write to{' '}
                    <a className="underline" href="mailto:hello@gbmgroup.io">
                        hello@gbmgroup.io
                    </a>
                </p>
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
                <h2 className="section-title">FAQ</h2>
                {items.map((it) => (
                    <details key={it.q}>
                        <summary>{it.q}</summary>
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
                    <a href="#value">What We Do</a>
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
