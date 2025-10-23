import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const logos = [
    { name: 'OpenAI', src: 'https://cdn.simpleicons.org/openai/412991' },
    { name: 'LangChain', src: 'https://cdn.simpleicons.org/langchain/2B59FF' },
    {
        name: 'FastAPI',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    },
    {
        name: 'PostgreSQL',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    { name: 'n8n', src: 'https://cdn.simpleicons.org/n8n/F36E43' },
    {
        name: 'Google Workspace',
        src: 'https://cdn.simpleicons.org/google/4285F4',
    },

    { name: 'Make.com', src: 'https://cdn.simpleicons.org/make/6F4EF2' },
    {
        name: 'React',
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
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
                    Platforms &amp; Tools We Use
                </h2>
                <p className="section-lede">
                    From data pipelines to AI orchestration, we work with the
                    stack your transport business already owns — or help you
                    select the right fit for growth.
                </p>
                <div className="tech-logos">
                    {logos.map((l) => (
                        <img
                            key={l.name}
                            src={l.src}
                            alt={l.name}
                            title={l.name}
                            loading="lazy"
                            height={40}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
