import type { Credential, SkillGroup } from '../content/types';

interface SkillsProps {
  groups: SkillGroup[];
  credentials: Credential[];
  credlyUrl?: string | null;
}

const KIND_LABELS: Record<Credential['kind'], string> = {
  certification: 'Certifications',
  award: 'Awards',
  badge: 'Badges',
};

export default function Skills({ groups, credentials, credlyUrl = null }: SkillsProps) {
  const kinds = (Object.keys(KIND_LABELS) as Credential['kind'][]).filter((kind) =>
    credentials.some((c) => c.kind === kind),
  );
  const title = credentials.length > 0 ? 'Skills and credentials' : 'Skills';

  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <h2 id="skills-title">{title}</h2>
        <div className="skill-groups">
          {groups.map((group) => (
            <div className="skill-group" key={group.name}>
              <h3>{group.name}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {kinds.length > 0 && (
          <div className="credentials">
            {kinds.map((kind) => (
              <div className="credential-group" key={kind}>
                <h3>{KIND_LABELS[kind]}</h3>
                <ul>
                  {credentials
                    .filter((c) => c.kind === kind)
                    .sort((a, b) => b.year - a.year)
                    .map((c) => (
                      <li key={`${c.title}-${c.year}`}>
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer">
                            {c.title}
                          </a>
                        ) : (
                          <span className="credential-title">{c.title}</span>
                        )}
                        <span className="credential-meta">
                          {c.issuer}, {c.year}
                        </span>
                        {c.details && <span className="credential-details">{c.details}</span>}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {kinds.length > 0 && credlyUrl && (
          <p className="credly-link">
            <a href={credlyUrl} target="_blank" rel="noopener noreferrer">
              See all my verified badges on Credly
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
