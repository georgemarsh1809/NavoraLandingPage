import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const logos = [
    {
        name: 'React',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
        name: 'Next.js',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
        invertOnDark: true,
    },
    {
        name: 'FastAPI',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    },
    {
        name: 'Express',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg',
        invertOnDark: true,
    },
    {
        name: 'Node.js',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
        name: 'Firebase',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    },
    {
        name: 'Postgres',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    {
        name: 'BigQuery',
        src: 'https://cdn.simpleicons.org/googlebigquery/4285F4',
    },
];

export default function TechStack() {
    return (
        <section id="tech" className="section">
            <div className="container">
                <h2 className="section-title">
                    <FontAwesomeIcon
                        icon={faLayerGroup}
                        style={{ marginRight: 8 }}
                    />
                    Technologies We Work With
                </h2>
                <div className="tech-logos">
                    {logos.map((l) => (
                        <img
                            key={l.name}
                            src={l.src}
                            alt={l.name}
                            title={l.name}
                            loading="lazy"
                            height={40}
                            data-invert-on-dark={
                                l.invertOnDark ? 'true' : undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
