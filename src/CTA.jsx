import { useState } from 'react';
import './App.css';

export default function CTA() {
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
        window.location.href = mailto;
        setSent(true);
    };

    return (
        <section id="cta" className="section">
            <div className="container card">
                <div className="cta-head">
                    <h2 className="section-title">Get In Touch</h2>
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
                        Send
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
