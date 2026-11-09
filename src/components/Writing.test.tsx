import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Newsletter } from '../content/types';
import Writing from './Writing';

const mediumUrl = 'https://medium.com/@ankursingh2k14';
const linkedinUrl = 'https://www.linkedin.com/in/ankur-pawar-262746125';
const noNewsletter: Newsletter = { name: null, sendDay: null, subscribeUrl: null };

describe('Writing', () => {
  it('says the newsletter is coming and points to LinkedIn until it is set up', () => {
    render(<Writing newsletter={noNewsletter} articles={[]} mediumUrl={mediumUrl} linkedinUrl={linkedinUrl} />);
    expect(screen.getByRole('heading', { name: 'A weekly newsletter is on the way' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Follow on LinkedIn' })).toHaveAttribute('href', linkedinUrl);
    expect(screen.queryByRole('link', { name: 'Subscribe' })).not.toBeInTheDocument();
  });

  it('shows the newsletter name, send day and subscribe link once set up', () => {
    const newsletter: Newsletter = {
      name: 'The Manager Notes',
      sendDay: 'Tuesday',
      subscribeUrl: 'https://themanagernotes.beehiiv.com/subscribe',
    };
    render(<Writing newsletter={newsletter} articles={[]} mediumUrl={mediumUrl} linkedinUrl={linkedinUrl} />);
    expect(screen.getByRole('heading', { name: 'The Manager Notes' })).toBeInTheDocument();
    expect(screen.getByText(/One email every Tuesday/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Subscribe' })).toHaveAttribute('href', newsletter.subscribeUrl);
  });

  it('lists articles with their date and read time', () => {
    render(
      <Writing
        newsletter={noNewsletter}
        articles={[{ title: 'Your first 90 days as a manager', url: 'https://medium.com/p/1', date: 'Nov 2026', readMinutes: 6 }]}
        mediumUrl={mediumUrl}
        linkedinUrl={linkedinUrl}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Recent articles' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Your first 90 days as a manager' })).toHaveAttribute(
      'href',
      'https://medium.com/p/1',
    );
    expect(screen.getByText('Nov 2026, 6 minute read')).toBeInTheDocument();
  });

  it('links to the Medium profile when no articles are listed', () => {
    render(<Writing newsletter={noNewsletter} articles={[]} mediumUrl={mediumUrl} linkedinUrl={linkedinUrl} />);
    expect(screen.queryByRole('heading', { name: 'Recent articles' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read everything on Medium' })).toHaveAttribute('href', mediumUrl);
  });
});
