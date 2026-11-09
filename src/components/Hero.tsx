import type { Photo } from '../content/types';

interface HeroProps {
  headline: string;
  intro: string[];
  photo: Photo | null;
  location: string;
  showNewsletterLink: boolean;
}

export default function Hero({ headline, intro, photo, location, showNewsletterLink }: HeroProps) {
  return (
    <section className={photo ? 'hero' : 'hero hero--text-only'} id="top" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-text">
          <h1 id="hero-title">{headline}</h1>
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="actions">
            <a className="btn btn-primary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn-outline" href="#mentoring">
              Book a mentoring session
            </a>
            {showNewsletterLink && (
              <a className="text-link" href="#newsletter">
                Get the weekly newsletter
              </a>
            )}
          </div>
        </div>
        {photo && (
          <figure>
            <img src={photo.src} alt={photo.alt} width={1000} height={1000} fetchPriority="high" />
            <figcaption>{location}</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
