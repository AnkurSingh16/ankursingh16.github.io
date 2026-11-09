import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

const props = {
  headline: 'I help teams ship good software.',
  intro: ['First paragraph.', 'Second paragraph.'],
  location: 'Sydney, Australia',
  showNewsletterLink: false,
};

describe('Hero', () => {
  it('renders the headline and every intro paragraph', () => {
    render(<Hero {...props} photo={null} />);
    expect(screen.getByRole('heading', { level: 1, name: props.headline })).toBeInTheDocument();
    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
  });

  it('leaves out the photo until one is set', () => {
    render(<Hero {...props} photo={null} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows the photo with its alt text and the location caption', () => {
    render(<Hero {...props} photo={{ src: '/images/ankur.jpg', alt: 'Ankur Pawar' }} />);
    expect(screen.getByRole('img', { name: 'Ankur Pawar' })).toHaveAttribute('src', '/images/ankur.jpg');
    expect(screen.getByText('Sydney, Australia')).toBeInTheDocument();
  });

  it('shows the newsletter link only when asked to', () => {
    const { rerender } = render(<Hero {...props} photo={null} />);
    expect(screen.queryByRole('link', { name: 'Get the weekly newsletter' })).not.toBeInTheDocument();
    rerender(<Hero {...props} photo={null} showNewsletterLink />);
    expect(screen.getByRole('link', { name: 'Get the weekly newsletter' })).toBeInTheDocument();
  });
});
