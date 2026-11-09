import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Offer } from '../content/types';
import Offers from './Offers';

const baseOffer: Offer = {
  id: 'mentoring',
  enabled: true,
  title: '1:1 mentoring',
  audience: 'For new managers.',
  points: ['Your first 90 days', 'Hard conversations'],
  format: '45 minutes on video.',
  price: null,
  ctaLabel: 'Book a session',
  topic: 'Mentoring',
  bookingUrl: null,
};

describe('Offers', () => {
  it('renders each offer with its points', () => {
    render(<Offers offers={[baseOffer]} onSelectTopic={vi.fn()} />);
    const offer = screen.getByRole('article', { name: '1:1 mentoring' });
    expect(within(offer).getByText('Your first 90 days')).toBeInTheDocument();
    expect(within(offer).getByText('Hard conversations')).toBeInTheDocument();
  });

  it('asks people to get in touch when no price is set', () => {
    render(<Offers offers={[baseOffer]} onSelectTopic={vi.fn()} />);
    expect(screen.getByText('45 minutes on video. Get in touch for pricing.')).toBeInTheDocument();
  });

  it('shows the price once it is set', () => {
    render(<Offers offers={[{ ...baseOffer, price: 'A$150 a session.' }]} onSelectTopic={vi.fn()} />);
    expect(screen.getByText('45 minutes on video. A$150 a session.')).toBeInTheDocument();
  });

  it('sends people to the contact form and passes the topic when there is no booking link', async () => {
    const user = userEvent.setup();
    const onSelectTopic = vi.fn();
    render(<Offers offers={[baseOffer]} onSelectTopic={onSelectTopic} />);

    const cta = screen.getByRole('link', { name: 'Book a session' });
    expect(cta).toHaveAttribute('href', '#contact');
    await user.click(cta);

    expect(onSelectTopic).toHaveBeenCalledWith('Mentoring');
  });

  it('uses the booking link in a new tab when one is set', () => {
    const bookingUrl = 'https://cal.com/ankurpawar/mentoring';
    render(<Offers offers={[{ ...baseOffer, bookingUrl }]} onSelectTopic={vi.fn()} />);
    const cta = screen.getByRole('link', { name: 'Book a session' });
    expect(cta).toHaveAttribute('href', bookingUrl);
    expect(cta).toHaveAttribute('target', '_blank');
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('counts the offers in the intro', () => {
    render(
      <Offers
        offers={[baseOffer, { ...baseOffer, id: 'two', title: 'Second' }, { ...baseOffer, id: 'three', title: 'Third' }]}
        onSelectTopic={vi.fn()}
      />,
    );
    expect(screen.getByText(/^Three things I do well\./)).toBeInTheDocument();
  });
});
