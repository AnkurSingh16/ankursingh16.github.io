import type { Article, Newsletter } from '../content/types';

interface WritingProps {
  newsletter: Newsletter;
  articles: Article[];
  mediumUrl: string;
  linkedinUrl: string;
}

export default function Writing({ newsletter, articles, mediumUrl, linkedinUrl }: WritingProps) {
  return (
    <section className="writing" id="writing" aria-label="Writing">
      <div className="wrap">
        <div className="col" id="newsletter">
          {newsletter.subscribeUrl ? (
            <>
              <h2>{newsletter.name ?? 'Newsletter'}</h2>
              <p className="intro">
                One email {newsletter.sendDay ? `every ${newsletter.sendDay}` : 'a week'}: a lesson from running
                engineering teams, one thing worth reading, and a question I'm still thinking about. Unsubscribe
                whenever you like.
              </p>
              <a className="btn btn-dark" href={newsletter.subscribeUrl} target="_blank" rel="noopener noreferrer">
                Subscribe
              </a>
            </>
          ) : (
            <>
              <h2>A weekly newsletter is on the way</h2>
              <p className="intro">
                Lessons from running engineering teams, one thing worth reading, and a question I'm still thinking
                about. Until it launches, follow along on LinkedIn.
              </p>
              <a className="btn btn-dark" href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                Follow on LinkedIn
              </a>
            </>
          )}
        </div>

        <div className="col articles">
          <h2>{articles.length > 0 ? 'Recent articles' : 'Articles'}</h2>
          {articles.length > 0 ? (
            <ul>
              {articles.map((article) => (
                <li key={article.url}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                  <p className="meta">
                    {article.date}
                    {article.readMinutes ? `, ${article.readMinutes} minute read` : ''}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="intro">I write on Medium about engineering leadership, teams and building software.</p>
          )}
          <a className="all" href={mediumUrl} target="_blank" rel="noopener noreferrer">
            Read everything on Medium
          </a>
        </div>
      </div>
    </section>
  );
}
