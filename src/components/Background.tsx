import type { Quote, Role } from '../content/types';

interface BackgroundProps {
  roles: Role[];
  quotes: Quote[];
}

export default function Background({ roles, quotes }: BackgroundProps) {
  return (
    <section className="background" id="background" aria-labelledby="bg-title">
      <div className="wrap">
        <h2 id="bg-title">Where I've worked</h2>
        <ol className="roles">
          {roles.map((role) => (
            <li className="role" key={role.company}>
              <p className="role-dates">{role.dates}</p>
              <div className="role-body">
                <h3>{role.company}</h3>
                <p className="role-title">{role.titles}</p>
                <p>{role.summary}</p>
              </div>
            </li>
          ))}
        </ol>

        {quotes.length > 0 && (
          <div className="quotes" aria-label="What people say">
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
