import type { Offer, Topic } from '../content/types';

interface OffersProps {
  offers: Offer[];
  onSelectTopic: (topic: Topic) => void;
}

export default function Offers({ offers, onSelectTopic }: OffersProps) {
  return (
    <section className="offers" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <h2 id="work-title">How I can help</h2>
        <p className="lede">
          If what you need doesn't fit neatly into one of these, get in touch anyway.
        </p>
        {offers.map((offer) => (
          <OfferRow key={offer.id} offer={offer} onSelectTopic={onSelectTopic} />
        ))}
      </div>
    </section>
  );
}

function OfferRow({ offer, onSelectTopic }: { offer: Offer; onSelectTopic: (topic: Topic) => void }) {
  const headingId = `offer-${offer.id}`;
  return (
    <article className="offer" id={offer.id} aria-labelledby={headingId}>
      <div className="offer-head">
        <h3 id={headingId}>{offer.title}</h3>
        <p>{offer.audience}</p>
      </div>
      <ul>
        {offer.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="offer-cta">
        <p>
          {offer.format} {offer.price ? offer.price : 'Get in touch for pricing.'}
        </p>
        {offer.bookingUrl ? (
          <a className="btn btn-primary btn-sm" href={offer.bookingUrl} target="_blank" rel="noopener noreferrer">
            {offer.ctaLabel}
          </a>
        ) : (
          <a className="btn btn-primary btn-sm" href="#contact" onClick={() => onSelectTopic(offer.topic)}>
            {offer.ctaLabel}
          </a>
        )}
      </div>
    </article>
  );
}
