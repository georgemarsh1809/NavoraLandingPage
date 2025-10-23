import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCheck,
    faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';

const CALENDLY_URL = 'https://calendly.com/georgemarsh1809/30min';

export default function CTA() {
    const calendlyHref = CALENDLY_URL;
    return (
        <section id="cta" className="section">
            <div className="container">
                <div className="cta-card">
                    <h2
                        className="section-title"
                        style={{ marginBottom: '0.5rem' }}
                    >
                        <FontAwesomeIcon
                            icon={faCalendarCheck}
                            style={{ marginRight: 8 }}
                        />
                        Book Your AI Discovery Session
                    </h2>
                    <p
                        style={{
                            color: 'var(--muted)',
                            maxWidth: 540,
                            margin: '0 auto 1.5rem auto',
                        }}
                    >
                        Map out the AI opportunities in your operation, what
                        data we will use, and the quickest route to results.
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
                        style={{
                            marginTop: '0.5rem',
                            color: 'var(--muted-2)',
                        }}
                    >
                        Free 30‑minute focused session. No obligation — just
                        clarity on your next steps.
                    </p>

                    <p
                        className="small"
                        style={{
                            marginTop: '1rem',
                            color: 'var(--muted-2)',
                        }}
                    >
                        Prefer email? Reach us at{' '}
                        <a
                            className="underline"
                            href="mailto:hello@gbmgroup.io"
                        >
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
                        We typically reply within 1 working day.
                    </p>
                </div>
            </div>
        </section>
    );
}
