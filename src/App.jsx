import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPuzzlePiece,
    faCircleQuestion,
    faSeedling,
    faLayerGroup,
    faLifeRing,
    faGears,
    faDiagramProject,
    faChartLine,
    faSun,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import PricingCalculator from './PricingCalculator.jsx';
import HowItWorks from './HowItWorks.jsx';
import CTA from './CTA.jsx';
import MeetTheTeam from './MeetTheTeam.jsx';
import useIsMobile from './hooks/useIsMobile.js';

function Router() {
    const isMobile = useIsMobile();
    const ctaHref = isMobile ? '#cta' : '#team';
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path === '/how-we-work') {
        return (
            <div className="page">
                <a href="#main" className="skip-link">
                    Skip to content
                </a>
                <Header ctaHref={ctaHref} />
                <main id="main">
                    <HowItWorks ctaHref={ctaHref} />
                </main>
                <Footer />
            </div>
        );
    }
    return <GBMGroupLanding ctaHref={ctaHref} />;
}

export default Router;

function GBMGroupLanding({ ctaHref = '#team' }) {
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
            <Header ctaHref={ctaHref} />
            <main id="main">
                <Hero ctaHref={ctaHref} />
                <ValueProps />
                <Solutions />
                <div
                    className="container text-center"
                    style={{ marginTop: 0, marginBottom: 30 }}
                >
                    <a href={ctaHref} className="btn cta-inline">
                        Book a Free Discovery Call
                    </a>
                </div>
                <PricingCalculator ctaHref={ctaHref} />
                <MeetTheTeam />
                <CTA />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}

function Header({ ctaHref = '#team' }) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState('');
    const [theme, setTheme] = useState(() =>
        typeof document !== 'undefined'
            ? document.body.getAttribute('data-theme') || 'dark'
            : 'dark'
    );
    const close = () => setOpen(false);
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    const onHowItWorks = path === '/how-we-work';

    useEffect(() => {
        const original = document.body.style.overflow;
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = original || '';
        return () => {
            document.body.style.overflow = original || '';
        };
    }, [open]);

    useEffect(() => {
        if (onHowItWorks) return () => {};
        const ids = ['hero', 'value', 'solutions', 'pricing', 'team', 'faq'];
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
    }, [onHowItWorks]);

    useEffect(() => {
        if (onHowItWorks) return () => {};
        const valid = new Set([
            'hero',
            'value',
            'solutions',
            'pricing',
            'team',
            'faq',
        ]);
        const setFromHash = () => {
            const id = (window.location.hash || '').replace('#', '');
            if (valid.has(id)) setCurrent(id);
        };
        setFromHash();
        window.addEventListener('hashchange', setFromHash);
        return () => window.removeEventListener('hashchange', setFromHash);
    }, [onHowItWorks]);

    useEffect(() => {
        const syncTheme = (event) => {
            const next =
                event?.detail || document.body.getAttribute('data-theme');
            setTheme(next === 'light' ? 'light' : 'dark');
        };
        syncTheme();
        window.addEventListener('themechange', syncTheme);
        return () => window.removeEventListener('themechange', syncTheme);
    }, []);

    const handleThemeToggle = () => {
        if (typeof window === 'undefined') return;
        if (typeof window.__toggleTheme === 'function') {
            window.__toggleTheme();
            return;
        }
        if (typeof window.__setTheme === 'function') {
            window.__setTheme(theme === 'light' ? 'dark' : 'light');
        }
    };

    const navClass = (id) =>
        onHowItWorks ? '' : current === id ? 'active' : '';

    return (
        <header className="header">
            <div className="container flex-between">
                <a href="/" className="logo intro">
                    GBMGroup
                </a>
                <nav className="nav intro delay-1">
                    <a
                        href={onHowItWorks ? '/#top' : '#top'}
                        className={navClass('hero')}
                        aria-current={
                            !onHowItWorks && current === 'hero'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => setCurrent('hero')}
                    >
                        Home
                    </a>
                    <a
                        href={onHowItWorks ? '/#solutions' : '#solutions'}
                        className={navClass('solutions')}
                        aria-current={
                            !onHowItWorks && current === 'solutions'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => setCurrent('solutions')}
                    >
                        Services
                    </a>
                    <a
                        href="/how-we-work"
                        className={onHowItWorks ? 'active' : ''}
                        aria-current={onHowItWorks ? 'page' : undefined}
                    >
                        How We Work
                    </a>
                    <a
                        href={onHowItWorks ? '/#pricing' : '#pricing'}
                        className={navClass('pricing')}
                        aria-current={
                            !onHowItWorks && current === 'pricing'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => setCurrent('pricing')}
                    >
                        Pricing
                    </a>
                    <a
                        href={onHowItWorks ? '/#team' : '#team'}
                        className={navClass('team')}
                        aria-current={
                            !onHowItWorks && current === 'team'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => setCurrent('team')}
                    >
                        Team
                    </a>
                    <a
                        href={onHowItWorks ? '/#faq' : '#faq'}
                        className={navClass('faq')}
                        aria-current={
                            !onHowItWorks && current === 'faq'
                                ? 'location'
                                : undefined
                        }
                        onClick={() => setCurrent('faq')}
                    >
                        FAQ
                    </a>
                </nav>
                <div className="header-actions">
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={handleThemeToggle}
                        aria-label={`Switch to ${
                            theme === 'light' ? 'dark' : 'light'
                        } mode`}
                    >
                        <FontAwesomeIcon
                            icon={theme === 'light' ? faMoon : faSun}
                            aria-hidden="true"
                        />
                        <span className="sr-only">
                            Toggle to {theme === 'light' ? 'dark' : 'light'}{' '}
                            mode
                        </span>
                    </button>
                    <a href={ctaHref} className="btn intro delay-2">
                        Book a Call
                    </a>
                </div>
                <button
                    className="menu-toggle"
                    aria-expanded={open}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? (
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
                                href={onHowItWorks ? '/#top' : '#top'}
                                className={navClass('hero')}
                                aria-current={
                                    !onHowItWorks && current === 'hero'
                                        ? 'location'
                                        : undefined
                                }
                                onClick={() => {
                                    setCurrent('hero');
                                    close();
                                }}
                            >
                                Home
                            </a>
                            <a
                                href={
                                    onHowItWorks ? '/#solutions' : '#solutions'
                                }
                                className={navClass('solutions')}
                                aria-current={
                                    !onHowItWorks && current === 'solutions'
                                        ? 'location'
                                        : undefined
                                }
                                onClick={() => {
                                    setCurrent('solutions');
                                    close();
                                }}
                            >
                                Services
                            </a>
                            <a
                                href="/how-we-work"
                                className={onHowItWorks ? 'active' : ''}
                                aria-current={onHowItWorks ? 'page' : undefined}
                                onClick={() => close()}
                            >
                                How We Work
                            </a>
                            <a
                                href={onHowItWorks ? '/#pricing' : '#pricing'}
                                className={navClass('pricing')}
                                aria-current={
                                    !onHowItWorks && current === 'pricing'
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
                                href={onHowItWorks ? '/#team' : '#team'}
                                className={navClass('team')}
                                aria-current={
                                    !onHowItWorks && current === 'team'
                                        ? 'location'
                                        : undefined
                                }
                                onClick={() => {
                                    setCurrent('team');
                                    close();
                                }}
                            >
                                Team
                            </a>
                            <a
                                href={onHowItWorks ? '/#faq' : '#faq'}
                                className={navClass('faq')}
                                aria-current={
                                    !onHowItWorks && current === 'faq'
                                        ? 'location'
                                        : undefined
                                }
                                onClick={() => {
                                    setCurrent('faq');
                                    close();
                                }}
                            >
                                FAQ
                            </a>
                        </nav>
                        <div className="mobile-actions">
                            <button
                                type="button"
                                className="theme-toggle"
                                onClick={handleThemeToggle}
                                aria-label={`Switch to ${
                                    theme === 'light' ? 'dark' : 'light'
                                } mode`}
                            >
                                <FontAwesomeIcon
                                    icon={theme === 'light' ? faMoon : faSun}
                                    aria-hidden="true"
                                />
                                <span className="sr-only">
                                    Toggle to{' '}
                                    {theme === 'light' ? 'dark' : 'light'} mode
                                </span>
                            </button>
                            <a href={ctaHref} className="btn" onClick={close}>
                                Book your AI Discovery Call
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

function Hero({ ctaHref = '#team' }) {
    return (
        <section className="hero" id="hero">
            <div className="container">
                <h1 className="intro">
                    <span>AI Transformation for SMEs</span>
                    <br />
                    <span className="highlight">
                        Discover. Implement. Evolve.
                    </span>
                </h1>
                <p className="intro delay-1">
                    We help operations-heavy businesses turn fragmented data and
                    manual workflows into efficient, automated systems that save
                    you money, and give you back the time to focus on what
                    really matters.
                </p>
                <div className="buttons intro delay-2">
                    <a href={ctaHref} className="btn">
                        Book a Free Discovery Call
                    </a>
                    <a href="#solutions" className="btn btn-outline">
                        Explore Services
                    </a>
                </div>
                <p className="small intro delay-3" style={{ marginTop: 8 }}>
                    30‑minute call to understand your operation, data sources,
                    and opportunities.
                </p>
            </div>
        </section>
    );
}

function ValueProps() {
    const items = [
        {
            title: 'Streamline Operations',
            desc: 'Eliminate repetitive manual work, reduce admin overhead and free up your team’s time through smart automation. Focus on the tasks that truly drive growth and service quality.',
            icon: faGears,
        },
        {
            title: 'Connect Data Sources',
            desc: 'Bring together data from multiple systems into clear, real-time dashboards and reports, to gain visibility across your operations and make faster, more confident decisions.',
            icon: faDiagramProject,
        },
        {
            title: 'Deliver Measurable ROI',
            desc: 'Every system is designed to show real, quantifiable impact in time saved, costs reduced, or revenue uplifted. AI isn’t about hype, it’s about building tools that pay for themselves.',
            icon: faChartLine,
        },
    ];
    return (
        <section id="value" className="section">
            <div className="container">
                <h2 className="section-title">Why Teams Partner with GBM</h2>
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
            </div>
        </section>
    );
}

function Solutions() {
    const items = [
        {
            title: 'Discovery',
            icon: faSeedling,
            bullets: [
                'Focused interviews across teams and independent stakeholders.',
                'Data, process and systems audit with AI opportunity map and ROI summary.',
                'Board-ready plan covering AI use cases, roadmap, and risks.',
            ],
        },
        {
            title: 'Implementation',
            icon: faLayerGroup,
            bullets: [
                'Integrate high-impact automations and solutions with live data.',
                'Integrate with current processes, from finance and HR, to customer and compliance.',
                'Weekly updates & training so team leads can adopt fast, without friction.',
            ],
        },
        {
            title: 'Support & Evolution',
            icon: faLifeRing,
            bullets: [
                'Testing, monitoring, and CI to keep solutions sharp & up-to-date.',
                'New data sources, system enhancements, and change requests bundled.',
                'Continued direct communications with GBM for stakeholders.',
            ],
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
                    Services
                </h2>
                <div className="grid">
                    {items.map((card) => (
                        <div key={card.title} className="card">
                            <h3
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginTop: 4,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={card.icon}
                                    style={{
                                        color: 'var(--muted)',
                                        fontSize: 14,
                                    }}
                                />
                                {card.title}
                            </h3>
                            <ul>
                                {card.bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: 20 }}>
                    <p className="small" style={{ color: 'var(--muted)' }}>
                        <a className="underline" href="/how-we-work">
                            See how a project flows end-to-end
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
            q: 'What exactly do you do?',
            body: (
                <>
                    <p>
                        We help small and medium businesses identify where AI
                        and automation can simplify operations, reduce manual
                        work, and improve visibility.
                    </p>
                    <p>
                        That typically means running a Discovery Phase to
                        pinpoint opportunities, then implementing tailored
                        systems such as automated workflows, dashboards, or AI
                        assistants.
                    </p>
                </>
            ),
        },
        {
            q: 'What kinds of businesses do you work with?',
            body: (
                <>
                    <p>
                        We usually partner with operations-heavy firms, like
                        transport, logistics, property management, and other
                        service companies, where time and data inefficiencies
                        are obvious.
                    </p>
                    <p>
                        If your teams rely on spreadsheets, repetitive admin, or
                        fragmented tools, automation can almost certainly unlock
                        quick wins.
                    </p>
                </>
            ),
        },
        {
            q: 'What does the Discovery Phase involve?',
            body: (
                <>
                    <p>
                        It’s a structured review of your workflows, systems, and
                        data flows. You’ll receive an AI Opportunity Report
                        outlining:
                    </p>
                    <ul>
                        <li>Quick wins for automation</li>
                        <li>Medium-term system improvements</li>
                        <li>A roadmap and ROI summary</li>
                    </ul>
                    <p>
                        That way you can see exactly what’s possible before
                        committing to any implementation.
                    </p>
                </>
            ),
        },
        {
            q: 'What are examples of the kinds of systems you build?',
            body: (
                <ul>
                    <li>Automated KPI and finance dashboards</li>
                    <li>Document and compliance trackers</li>
                    <li>Internal chat assistants for data lookups</li>
                    <li>
                        Workflow automations linking tools like Google Sheets,
                        email, and CRMs
                    </li>
                    <li>Tailored AI systems built around your processes</li>
                </ul>
            ),
        },
        {
            q: 'Do you replace staff with AI?',
            body: (
                <>
                    <p>Absolutely not.</p>
                    <p>
                        The aim is to augment your team; automating routine work
                        so people can focus on decisions, clients, and
                        higher-value tasks.
                    </p>
                </>
            ),
        },
        {
            q: 'How do you ensure data security and privacy?',
            body: (
                <>
                    <p>
                        Every build follows a data-minimisation approach.
                        Sensitive information stays within your systems wherever
                        possible.
                    </p>
                    <p>
                        We rely on trusted, GDPR-compliant providers such as
                        Google Cloud, n8n, and the OpenAI API, and you retain
                        full control over credentials and access.
                    </p>
                </>
            ),
        },
        {
            q: 'How long does an implementation take?',
            body: (
                <>
                    <p>
                        It depends on complexity, but most systems go live
                        within 2–6 weeks after the Discovery Phase.
                    </p>
                    <p>
                        Quick wins, such as dashboards or targeted automations,
                        are often prototyped in a matter of days.
                    </p>
                </>
            ),
        },
        {
            q: 'What ongoing support do you offer?',
            body: (
                <p>
                    Every system comes with a Support &amp; Maintenance option.
                    We test, enhance, and cost-manage your automations each
                    month so they continue to deliver value as your business and
                    technology evolve.
                </p>
            ),
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
                        <div className="faq-body">{it.body}</div>
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
                    <a href="#value">Home</a>
                    <a href="#solutions">Services</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#team">Team</a>
                    <a href="#faq">FAQ</a>
                    <a href="mailto:hello@gbmgroup.io">hello@gbmgroup.io</a>
                </nav>
                <p className="small">© {new Date().getFullYear()} GBMGroup</p>
            </div>
        </footer>
    );
}
