import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCheck,
    faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';

export default function CTA() {
    const qs = typeof window !== 'undefined' ? window.location.search : '';
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
                    Book Your Free Data Discovery Call
                </h2>
                <p
                    style={{
                        color: '#888',
                        maxWidth: 540,
                        margin: '0 auto 1.5rem auto',
                    }}
                >
                    Find out how we can turn your business data into actionable
                    insights.
                </p>

                <a
                    className="btn btn-primary"
                    href={`https://calendly.com/georgemarsh1809/30min${
                        qs || ''
                    }`}
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
                    style={{ marginTop: '0.5rem', color: '#9aa' }}
                >
                    20‑min audit + tailored plan.
                </p>

                <p
                    className="small"
                    style={{
                        marginTop: '1rem',
                        color: '#9aa',
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
                        color: '#bbb',
                    }}
                >
                    Typically replies within 1 business day
                </p>
            </div>
        </section>
    );
}
