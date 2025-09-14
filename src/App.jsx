import './App.css';
import { useState, useEffect } from 'react';
import PricingCalculator from './calc';

export default function NavoraLanding() {
    return (
        <div className="page">
            <Header />
            <Hero />
            <ValueProps />
            <Offerings />
            <PricingCalculator />
            <CTA />
            <FAQ />
            <Footer />
        </div>
    );
}

function Header() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('');
    const close = () => setOpen(false);

    // Track active section via viewport center for stable highlighting
    useEffect(() => {
        const ids = ['value', 'offerings', 'pricing', 'faq', 'cta'];
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

    const navClass = (id) => (current === id ? 'active' : '');

    return (
        <header className="header">
            <div className="container flex-between">
                <div className="logo">Navora</div>
                <nav className="nav">
                    <a href="#value" className={navClass('value')}>
                        Who We Are
                    </a>
                    <a href="#offerings" className={navClass('offerings')}>
                        Offerings
                    </a>
                    <a href="#pricing" className={navClass('pricing')}>
                        Pricing
                    </a>
                    <a href="#faq" className={navClass('faq')}>
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
                                onClick={close}
                            >
                                Who We Are
                            </a>
                            <a
                                href="#offerings"
                                className={navClass('offerings')}
                                onClick={close}
                            >
                                Offerings
                            </a>
                            <a
                                href="#pricing"
                                className={navClass('pricing')}
                                onClick={close}
                            >
                                Pricing
                            </a>
                            <a
                                href="#faq"
                                className={navClass('faq')}
                                onClick={close}
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
                    Custom data insights and digital solutions, tailored to your
                    business needs.
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
            title: 'Full Data Integration',
            desc: 'We connect your spreadsheets, Google Sheets, or APIs and do the messy joins for you, delivering end-to-end solutions.',
        },
        {
            title: 'Transparent Pricing',
            desc: 'Clear tiers with a complexity calculator. No hidden fees, no surprises — know exactly what you pay for.',
        },
        {
            title: 'Ongoing Support',
            desc: 'Full support post-implementation, including improved functionality and new metrics as requested.',
        },
    ];
    return (
        <section id="value" className="section">
            <div className="container">
                <h2 className="section-title">Who We Are</h2>
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

function Offerings() {
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
            price: '£1,500 build + £200–£400/m',
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
            price: '£2,500–£4,000 build + £400–£800/m',
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
            price: '£5,000–£12,000 build + £1,000–£2,500/m',
        },
    ];
    return (
        <section id="offerings" className="section">
            <div className="container">
                <h2 className="section-title">Offerings</h2>
                <div className="grid">
                    {items.map((card) => (
                        <div key={card.title} className="card">
                            <h3>{card.title}</h3>
                            <ul>
                                {card.bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                            <p>{card.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section id="cta" className="section">
            <div className="container card text-center">
                <h2 className="section-title">Get Started</h2>
                <h3>Book your Data Discovery Call</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert('Thanks! I’ll get back to you within 24 hours.');
                    }}
                    className="form"
                >
                    <input placeholder="Name" required />
                    <input type="email" placeholder="Work email" required />
                    <button type="submit" className="btn">
                        Request a slot
                    </button>
                </form>
            </div>
        </section>
    );
}

function FAQ() {
    const items = [
        {
            q: 'What tools do you use?',
            a: 'Tier 1 often ships on Looker Studio. Tier 2–3 use React/Next.js with FastAPI & Postgres.',
        },
        {
            q: 'Who’s behind Navora?',
            a: 'I’m George Marsh — a full-stack engineer who likes turning chaos into clarity.',
        },
        {
            q: 'How do retainers work?',
            a: 'Monthly in advance. Clear scope. 30-minute monthly review.',
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
                <div>Navora</div>
                <p className="small">
                    © {new Date().getFullYear()} Navora. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
