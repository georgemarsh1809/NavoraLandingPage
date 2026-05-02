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
                        <h3>George Marsh · Founder &amp; Lead Consultant</h3>
                        <p>
                            Five years delivering mission-critical software for UK government criminal justice systems. Now applies that same rigour to operational reporting for SMEs. Leads every engagement from diagnosis through to delivery.
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
                <div className="team-card card">
                    <img
                        src="/bigTheadshot3.png"
                        alt="Tony, founder of GBMGroup"
                        className="team-photo"
                        loading="lazy"
                    />
                    <div>
                        <h3>
                            Tony Marsh · Co-founder &amp; Operations Consultant
                        </h3>
                        <p>
                            Thirty years leading depot teams, managing national contracts, and overseeing large-scale transport and logistics networks across the UK. Brings operator-level credibility to every diagnostic. Knows what good operational visibility looks like from the inside.
                        </p>
                        <div className="team-links">
                            <a
                                href="https://www.linkedin.com/in/tony-marsh-7a5745178/"
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
                                href="mailto:tony@gbmgroup.io"
                                className="team-link"
                            >
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    aria-hidden="true"
                                />
                                <span>Email Tony</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
