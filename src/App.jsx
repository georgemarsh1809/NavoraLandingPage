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
                <SecondaryOffer ctaHref={ctaHref} />
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

function Hero({ ctaHref = "#team" }) {
    return (
        <section className="hero" id="hero">
            <div className="container">
                <h1 className="intro">
                    Your team already knows the report is wrong before they send it.
                </h1>
                <p className="intro delay-1">
                    They send it anyway because there's nothing better. By the time the numbers reach leadership they're already out of date, manually compiled, and quietly doubted by everyone in the room. We build ops-heavy businesses a single source of truth for their operations. One live view their leadership can trust, without waiting for someone to compile it.
                </p>
                <div className="buttons intro delay-2">
                    <a href={ctaHref} className="btn">
                        Book a Free 30-Minute Call
                    </a>
                    <a href="#how" className="btn btn-outline">
                        See How It Works
                    </a>
                </div>
                <p className="small intro delay-3" style={{ marginTop: 8 }}>
                    30 minutes to understand your operation and whether we can help. No pitch until we have earned the right.
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
                    Most ops-heavy businesses don’t have a data problem. They have a trust problem. The data exists. It’s just fragmented across spreadsheets, systems, and one person’s inbox. By the time it reaches the people who need to act on it, it’s already approximate, already late, and already being quietly questioned. We fix that. Not with a six-month transformation project. With a scoped, four-week build that gives your leadership team one place to see what’s actually happening in the business, updated automatically, accurate enough to act on. What changes for your business: reporting that previously took hours each week now updates automatically, KPIs your leadership team actually trusts, decisions made in the meeting room rather than deferred until someone can go and check, and no single person owning a critical spreadsheet that falls apart when they’re away.
                </p>
            </div>
        </section>
    );
}

function Solutions({ ctaHref = "#team" }) {
    return (
        <section id="solutions" className="section">
            <div className="container">
                <h2 className="section-title">The Ops Clarity System</h2>
                <p className="section-lede">
                    A done-for-you operational dashboard and reporting layer, built in four weeks. We unify your existing data sources into one live view, define and automate the KPIs your leadership actually needs, and eliminate the manual reporting work your team is currently doing by hand. Fixed scope. Fixed price: £3,500 to £5,000. Fully remote. Delivered in four weeks. Optional retainer available for ongoing maintenance and iteration at £500 to £1,000 per month. Guarantee: fully built and live in four weeks, or we keep working until it is. No invoice until you are satisfied.
                </p>
                <div className="text-center" style={{ marginTop: 20 }}>
                    <a href={ctaHref} className="btn cta-inline">
                        Book a Free 30-Minute Call
                    </a>
                </div>
                <div className="text-center" style={{ marginTop: 16 }}>
                    <p className="small" style={{ color: "var(--muted)" }}>
                        <a className="underline" href="/how-we-work">
                            See how it works end-to-end
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

function SecondaryOffer({ ctaHref = "#team" }) {
    return (
        <section id="secondary-offer" className="section">
            <div className="container">
                <h2 className="section-title">Not ready for a full build yet?</h2>
                <p className="section-lede">
                    Start with an Operational Clarity Audit. A 14-day diagnostic that identifies your top three reporting and operational bottlenecks, maps where data and process breakdowns are creating friction, and delivers a clear prioritised roadmap for what is actually worth fixing. This is a diagnostic, not a build. It is designed to give you clarity on where to focus before committing to anything larger.
                </p>
                <div className="text-center" style={{ marginTop: 20 }}>
                    <a href={ctaHref} className="btn cta-inline">
                        Book a Free 30-Minute Call
                    </a>
                </div>
                <div className="text-center" style={{ marginTop: 16 }}>
                    <p className="small" style={{ color: "var(--muted)" }}>
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
                <h2 className="section-title">Who This Is For</h2>
                <div
                    style={{
                        display: "grid",
                        gap: "var(--gap)",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(260px, 1fr))",
                    }}
                >
                    <div className="card">
                        <h3 style={{ marginTop: 0 }}>This is for you if:</h3>
                        <ul>
                            <li>
                                You lead an ops-heavy business with 20 to 200 staff
                            </li>
                            <li>
                                Your reporting is manual, slow, or quietly distrusted by the people using it
                            </li>
                            <li>
                                Decisions in leadership meetings get deferred because numbers can’t be verified in the room
                            </li>
                            <li>
                                You’ve said we really need to sort our data out more than twice in the last year
                            </li>
                        </ul>
                    </div>
                    <div className="card">
                        <h3 style={{ marginTop: 0 }}>
                            This is not for you if:
                        </h3>
                        <ul>
                            <li>You’re looking for a generic dashboard without operational context</li>
                            <li>
                                You already have live trusted visibility on your operations
                            </li>
                            <li>
                                You want a long consulting engagement with no tangible deliverable at the end
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
            title: "Week 1 Diagnose",
            desc: "We interview key stakeholders and map how decisions are currently made. We identify where the data lives, where trust breaks down, and what your leadership team actually needs to see.",
        },
        {
            title: "Week 2 Design",
            desc: "We define the right KPIs, agree the data sources, and design the reporting layer before any build begins. No assumptions, no scope creep.",
        },
        {
            title: "Weeks 3 and 4 Build and Deploy",
            desc: "We build and deploy the system. You get a live, working dashboard your team can use from day one.",
        },
        {
            title: "Ongoing Optional",
            desc: "A light monthly retainer for maintenance, iteration, and support as your operation evolves.",
        },
    ];
    return (
        <section id="how" className="section">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <div
                    style={{
                        display: "grid",
                        gap: "var(--gap)",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(240px, 1fr))",
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
                <h2 className="section-title">Why GBM</h2>
                <p>
                    GBM was founded by George and Tony Marsh, a software engineer with five years delivering mission-critical systems for UK government, and an operations leader with thirty years on the ground in transport and logistics. Most firms that build reporting systems understand the technology but not the operation. Most operations consultants understand the business but cannot build anything. We sit in between, which is why what we deliver actually gets used. We are deliberately small, focused, and outcome-driven. We take on a small number of projects at a time so every engagement gets our full attention.
                </p>
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
