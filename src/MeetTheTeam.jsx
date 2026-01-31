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
                            George leads GBM’s operational clarity engagements,
                            blending 5+ years delivering mission-critical
                            software for Government with deep, family-rooted
                            knowledge of transport & logistics. He guides each
                            engagement from diagnosis through to elimination
                            support, ensuring teams see measurable impact in
                            time saved and decision quality.
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
                            Tony brings 30+ years of hands-on experience across
                            transport & logistics. Having led depot teams,
                            managed national contracts, and overseen large-scale
                            networks, he understands the daily realities that
                            drive operational performance. He combines decades
                            of practical leadership with a direct, operator-led
                            approach to help teams improve utilisation,
                            strengthen compliance, and regain daily decision
                            visibility.
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
