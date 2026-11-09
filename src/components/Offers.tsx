import type { Offer, Topic } from '../content/types';

interface OffersProps {
  offers: Offer[];
  onSelectTopic: (topic: Topic) => void;
}

export default function Offers({ offers, onSelectTopic }: OffersProps) {
  return (
    <section className="offers" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <h2 id="work-title">Ways to work with me</h2>
        <p className="lede">
          {offers.length === 1 ? 'One thing I do well.' : `${countWord(offers.length)} things I do well.`} If
          what you need sits between them, write to me anyway.
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

function countWord(n: number): string {
  const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  return words[n] ?? String(n);
}
