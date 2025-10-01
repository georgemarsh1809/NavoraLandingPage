import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCheck,
    faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';

export default function CTA() {
    const buildCalendlyUrl = () => {
        const base = 'https://calendly.com/georgemarsh1809/30min';
        if (typeof window === 'undefined') return base;
        const qp = new URLSearchParams(window.location.search);
        const tier = qp.get('tier') || '';
        const data = qp.get('data') || '';
        const features = qp.get('features') || '';
        const rush = qp.get('rush') || '';

        const url = new URL(base);
        // Preserve original params
        qp.forEach((v, k) => url.searchParams.set(k, v));
        // UTM context
        if (tier) url.searchParams.set('utm_campaign', `tier_${tier}`);
        url.searchParams.set('utm_source', 'site');
        url.searchParams.set('utm_medium', 'pricing_calculator');
        // Custom fields a1..a4
        if (tier) url.searchParams.set('a1', `tier=${tier}`);
        if (data) url.searchParams.set('a2', `data=${data}`);
        if (features) url.searchParams.set('a3', `features=${features}`);
        if (rush) url.searchParams.set('a4', `rush=${rush}`);
        return url.toString();
    };
    const calendlyHref = buildCalendlyUrl();
    return (
        <section id="cta" className="section">
            <div
                className="container card text-center"
                style={{ padding: '2.5rem 2rem' }}
            >
                <h2
                    className="section-title"
                    style={{ marginBottom: '0.5rem' }}
                >
                    <FontAwesomeIcon
                        icon={faCalendarCheck}
                        style={{ marginRight: 8 }}
                    />
                    Book Your Transport KPI Discovery Call
                </h2>
                <p
                    style={{
                        color: 'var(--muted)',
                        maxWidth: 540,
                        margin: '0 auto 1.5rem auto',
                    }}
                >
                    Discover how KPI Data Insights recovers 5–10% margin
                    leakage and delivers decision-ready reports for UK
                    transport and logistics teams.
                </p>

                <a
                    className="btn btn-primary"
                    href={calendlyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '0.9rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        display: 'inline-block',
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{ marginRight: 8 }}
                    />
                    Book on Calendly
                </a>
                <p
                    className="small"
                    style={{ marginTop: '0.5rem', color: 'var(--muted-2)' }}
                >
                    30‑min session to map safety, cost, and performance KPIs.
                </p>

                <p
                    className="small"
                    style={{
                        marginTop: '1rem',
                        color: 'var(--muted-2)',
                    }}
                >
                    Prefer email? Reach us at{' '}
                    <a className="underline" href="mailto:hello@gbmgroup.io">
                        hello@gbmgroup.io
                    </a>
                </p>

                <p
                    className="small"
                    style={{
                        marginTop: '0.25rem',
                        color: 'var(--muted-2)',
                    }}
                >
                    Typically replies within 1 business day
                </p>
            </div>
        </section>
    );
}
