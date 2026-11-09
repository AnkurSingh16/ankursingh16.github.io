import { useState } from 'react';
import { site } from './content/site';
import { TOPICS, type SiteContent, type Topic } from './content/types';
import Header from './components/Header';
import Hero from './components/Hero';
import Offers from './components/Offers';
import Background from './components/Background';
import Skills from './components/Skills';
import Writing from './components/Writing';
import Contact from './components/Contact';
import Footer from './components/Footer';

interface AppProps {
  content?: SiteContent;
}

export default function App({ content = site }: AppProps) {
  const [topic, setTopic] = useState<Topic>(TOPICS[0]);
  const enabledOffers = content.offers.filter((offer) => offer.enabled);
  const hasNewsletter = Boolean(content.newsletter.subscribeUrl);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header name={content.name} showWork={enabledOffers.length > 0} />
      <main id="main">
        <Hero
          headline={content.headline}
          intro={content.intro}
          photo={content.photo}
          location={content.location}
          showNewsletterLink={hasNewsletter}
        />
        {enabledOffers.length > 0 && <Offers offers={enabledOffers} onSelectTopic={setTopic} />}
        <Background roles={content.roles} education={content.education} quotes={content.quotes} />
        <Skills groups={content.skills} credentials={content.credentials} />
        <Writing
          newsletter={content.newsletter}
          articles={content.articles}
          mediumUrl={content.links.medium}
          linkedinUrl={content.links.linkedin}
        />
        <Contact
          links={content.links}
          formEndpoint={content.contactFormEndpoint}
          topic={topic}
          onTopicChange={setTopic}
        />
      </main>
      <Footer name={content.name} location={content.location} />
    </>
  );
}
