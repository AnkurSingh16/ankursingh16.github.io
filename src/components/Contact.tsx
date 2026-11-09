import type { SiteContent, Topic } from '../content/types';
import ContactForm from './ContactForm';

interface ContactProps {
  links: SiteContent['links'];
  formEndpoint: string | null;
  topic: Topic;
  onTopicChange: (topic: Topic) => void;
}

export default function Contact({ links, formEndpoint, topic, onTopicChange }: ContactProps) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-intro">
          <h2 id="contact-title">Get in touch</h2>
          <p>
            Tell me a little about what you need, whether it's a project, mentoring or interview prep, and I'll get
            back to you.
          </p>
          <ul className="contact-links">
            {links.email && (
              <li>
                <a href={`mailto:${links.email}`}>{links.email}</a>
              </li>
            )}
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.medium} target="_blank" rel="noopener noreferrer">
                Medium
              </a>
            </li>
            {links.github && (
              <li>
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </div>

        {formEndpoint ? (
          <ContactForm endpoint={formEndpoint} topic={topic} onTopicChange={onTopicChange} />
        ) : (
          <div className="contact-fallback">
            <p>The quickest way to reach me right now is a message on LinkedIn. Mention what it's about:</p>
            <p className="contact-topic">{topic}</p>
            <a className="btn btn-primary" href={links.linkedin} target="_blank" rel="noopener noreferrer">
              Message me on LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
