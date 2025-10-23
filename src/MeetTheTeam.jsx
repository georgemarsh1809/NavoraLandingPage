import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function MeetTheTeam() {
    return (
        <section id="team" className="section">
            <div className="container">
                <h2
                    className="section-title"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                    }}
                >
                    <FontAwesomeIcon icon={faUsers} aria-hidden="true" />
                    Meet The Team
                </h2>
                <div className="team-card card">
                    <img
                        src="/headshot.png"
                        alt="George, founder of GBMGroup"
                        className="team-photo"
                        loading="lazy"
                    />
                    <div>
                        <h3>George — Founder &amp; Lead Engineer</h3>
                        <p>
                            George leads GBM’s AI transformation engagements,
                            blending 5+ years delivering mission-critical
                            software for Government with deep, family-rooted
                            knowledge of transport & logistics. He guides every
                            project from discovery interviews to implementation
                            and long-term support, making sure depot managers,
                            planners, finance, and compliance teams all see the
                            impact in their day-to-day work.
                        </p>
                        <div className="team-links">
                            <a
                                href="https://www.linkedin.com/in/georgemarsh1809/"
                                className="team-link"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    aria-hidden="true"
                                />
                                <span>Connect on LinkedIn</span>
                            </a>
                            <a
                                href="mailto:george@gbmgroup.io"
                                className="team-link"
                            >
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    aria-hidden="true"
                                />
                                <span>Email George</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
