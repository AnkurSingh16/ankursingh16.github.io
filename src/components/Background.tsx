import type { Education, Quote, Role } from '../content/types';

interface BackgroundProps {
  roles: Role[];
  education: Education[];
  quotes: Quote[];
}

export default function Background({ roles, education, quotes }: BackgroundProps) {
  return (
    <section className="background" id="background" aria-labelledby="bg-title">
      <div className="wrap">
        <h2 id="bg-title">Experience</h2>
        <ol className="roles">
          {roles.map((role) => (
            <li className="role" key={role.company}>
              <p className="role-dates">{role.dates}</p>
              <div className="role-body">
                <h3>{role.company}</h3>
                <p className="role-title">{role.positions.join(', ')}</p>
                <p>{role.summary}</p>
                {role.highlights.length > 0 && (
                  <ul className="highlights">
                    {role.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        {education.length > 0 && (
          <div className="role education">
            <p className="role-dates">Education</p>
            <div className="role-body">
              {education.map((item) => (
                <p key={item.qualification}>
                  {item.qualification}
                  {item.institution ? `, ${item.institution}` : ''}, {item.year}
                </p>
              ))}
            </div>
          </div>
        )}

        {quotes.length > 0 && (
          <div className="quotes">
            <h3 className="quotes-title">What colleagues and clients say</h3>
            {quotes.map((quote) => (
              <figure key={quote.name}>
                <blockquote>
                  <p>{quote.text}</p>
                </blockquote>
                <figcaption>
                  {quote.name}, {quote.role}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
