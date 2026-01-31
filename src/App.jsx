import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faSun,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
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
                <Solutions ctaHref={ctaHref} />
                <WhoItsFor />
                <HowItWorksSteps />
                <div
                    className="container text-center"
                    style={{ marginTop: 0, marginBottom: 30 }}
                >
                    <a href={ctaHref} className="btn cta-inline">
                        Get an Operational Clarity Audit
                    </a>
                </div>
                <About />
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
            : 'dark',
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
        onHowItWorks
            ? ''
            : current === id
              ? 'active'
              : typeof id === 'string'
                ? current === id
                : '';

    return (
        <header className="header">
            <div className="container flex-between">
                <a href="/" className="logo intro">
                    GBMGroup
                </a>
                <nav className="nav intro delay-1">
                    <a
                        href={onHowItWorks ? '/#hero' : '#hero'}
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
                        Audit
                    </a>
                    <a
                        href="/how-we-work"
                        className={onHowItWorks ? 'active' : ''}
                        aria-current={onHowItWorks ? 'page' : undefined}
                    >
                        How We Work
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
                <div className="header-controls">
                    <a href={ctaHref} className="btn intro delay-2">
                        Book a Call
                    </a>
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
            </div>
            {open && (
                <div className="mobile-menu">
                    <div className="container">
                        <nav className="mobile-nav">
                            <a
                                href={onHowItWorks ? '/#hero' : '#hero'}
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
                                Audit
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
                            <a href={ctaHref} className="btn" onClick={close}>
                                Get an Operational Clarity Audit
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
                    Remove daily bottlenecks. Regain decision clarity.
                </h1>
                <p className="intro delay-1">
                    We work with founders and leadership teams to identify and
                    eliminate the operational friction that keeps them stuck in
                    the business, freeing their time to work on the business.
                </p>
                <div className="buttons intro delay-2">
                    <a href={ctaHref} className="btn">
                        Get an Operational Clarity Audit
                    </a>
                    <a href="#how" className="btn btn-outline">
                        See How It Works
                    </a>
                </div>
                <p className="small intro delay-3" style={{ marginTop: 8 }}>
                    30‑minute call to understand your operation, decision needs,
                    and bottlenecks.
                </p>
            </div>
        </section>
    );
}

function ValueProps() {
    return (
        <section id="value" className="section">
            <div className="container">
                <h2 className="section-title">What We Do</h2>
                <p>
                    Most growing businesses don’t have a technology problem.
                    They have a visibility and prioritisation problem.
                </p>
                <ul>
                    <li>Data becomes fragmented</li>
                    <li>Decisions become reactive</li>
                    <li>
                        Leaders spend more time chasing information than acting
                        on it
                    </li>
                </ul>
                <p>
                    GBM helps you see where the business is leaking time, money,
                    or attention, and gives you a clear path to eliminate it.
                </p>
                <ul>
                    <li>
                        Clarify what leadership actually needs to see, daily and
                        weekly
                    </li>
                    <li>Identify the highest-impact operational bottlenecks</li>
                    <li>
                        Design simple, durable systems that reduce manual work
                        rather than add to it
                    </li>
                </ul>
            </div>
        </section>
    );
}

function Solutions({ ctaHref = '#team' }) {
    return (
        <section id="solutions" className="section">
            <div className="container">
                <h2 className="section-title">The Operational Clarity Audit</h2>
                <p className="section-lede">
                    A short, time-bound engagement designed to give you
                    immediate clarity on where to focus.
                </p>
                <p>In 14 days, we will:</p>
                <ul>
                    <li>
                        Identify the top 3 operational bottlenecks limiting
                        performance or decision-making
                    </li>
                    <li>
                        Map where data, reporting, or process breakdowns are
                        creating friction
                    </li>
                    <li>
                        Deliver a clear, prioritised roadmap for elimination and
                        improvement
                    </li>
                </ul>
                <p>
                    This is not a build. It’s a diagnostic designed to help you
                    decide what is actually worth fixing.
                </p>
                <div className="text-center" style={{ marginTop: 20 }}>
                    <a href={ctaHref} className="btn cta-inline">
                        Book an Audit Intro Call
                    </a>
                </div>
                <div className="text-center" style={{ marginTop: 16 }}>
                    <p className="small" style={{ color: 'var(--muted)' }}>
                        <a className="underline" href="/how-we-work">
                            See how it works end-to-end
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

function WhoItsFor() {
    return (
        <section id="who" className="section">
            <div className="container">
                <h2 className="section-title">Who this is for</h2>
                <div
                    style={{
                        display: 'grid',
                        gap: 'var(--gap)',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(260px, 1fr))',
                    }}
                >
                    <div className="card">
                        <h3 style={{ marginTop: 0 }}>This is for you if:</h3>
                        <ul>
                            <li>
                                You lead an operations-heavy business with 20 to
                                200 staff
                            </li>
                            <li>
                                You feel the business has outgrown its systems
                            </li>
                            <li>
                                Decisions rely on spreadsheets, manual reports,
                                or chasing people
                            </li>
                            <li>
                                You want clarity without adding more meetings or
                                admin
                            </li>
                        </ul>
                    </div>
                    <div className="card">
                        <h3 style={{ marginTop: 0 }}>
                            This is not for you if:
                        </h3>
                        <ul>
                            <li>You’re looking for a quick AI tool</li>
                            <li>
                                You already have clear, trusted daily
                                operational visibility
                            </li>
                            <li>
                                You want a generic dashboard without context
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HowItWorksSteps() {
    const steps = [
        {
            title: 'Diagnose',
            desc: 'We interview key stakeholders and review how decisions are currently made.',
        },
        {
            title: 'Identify',
            desc: 'We pinpoint where friction, delay, or blind spots are costing you leverage.',
        },
        {
            title: 'Eliminate',
            desc: 'We define a practical roadmap to remove those bottlenecks with minimal disruption.',
        },
        {
            title: 'Support (Optional)',
            desc: 'For teams that want help implementing, we offer focused elimination sprints or ongoing support.',
        },
    ];
    return (
        <section id="how" className="section">
            <div className="container">
                <h2 className="section-title">How it works</h2>
                <div
                    style={{
                        display: 'grid',
                        gap: 'var(--gap)',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(240px, 1fr))',
                    }}
                >
                    {steps.map((step) => (
                        <div key={step.title} className="card">
                            <h3 style={{ marginTop: 0 }}>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About</h2>
                <p>
                    GBM was founded to help operators and founders escape
                    reactive decision-making.
                </p>
                <p>Most leaders aren’t short on data, but short on clarity.</p>
                <p>
                    GBM exists to reduce unnecessary operational noise, surface
                    what actually matters, and help leadership teams spend more
                    time growing the business, not firefighting it.
                </p>
                <p>We are deliberately small, focused, and outcome-driven.</p>
            </div>
        </section>
    );
}

function FAQ() {
    const items = [
        {
            q: 'What is the Operational Clarity Audit?',
            body: (
                <>
                    <p>
                        A focused, time-bound diagnostic to surface the biggest
                        operational bottlenecks and a clear path to eliminate
                        them.
                    </p>
                </>
            ),
        },
        {
            q: 'Who is it for?',
            body: (
                <>
                    <p>
                        Operations-led businesses with 20–200 staff where
                        decision-making is slowed by fragmented data, manual
                        reporting, and unclear priorities.
                    </p>
                </>
            ),
        },
        {
            q: 'What do we receive at the end?',
            body: (
                <>
                    <p>
                        A practical, prioritised roadmap that shows what to fix
                        first and why. You’ll see:
                    </p>
                    <ul>
                        <li>The top 3 bottlenecks limiting performance</li>
                        <li>
                            Where data or process breakdowns create friction
                        </li>
                        <li>A clear elimination and improvement plan</li>
                    </ul>
                </>
            ),
        },
        {
            q: 'Do you build anything during the audit?',
            body: (
                <p>
                    No. The audit is a diagnostic. If you want help removing
                    bottlenecks afterward, we can support focused elimination
                    sprints or ongoing work.
                </p>
            ),
        },
        {
            q: 'Do you need to replace your systems?',
            body: (
                <>
                    <p>
                        No. We start with what you already use and identify the
                        smallest changes that create the biggest operational
                        lift.
                    </p>
                </>
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
                    <a href="#solutions">Audit</a>
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
