import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('shows the current year, so it never goes stale', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2030-03-01T00:00:00Z'));

    render(<Footer name="Ankur Pawar" location="Sydney, Australia" />);

    expect(screen.getByText('© 2030 Ankur Pawar. Sydney, Australia.')).toBeInTheDocument();
  });

  it('links back to the top of the page', () => {
    render(<Footer name="Ankur Pawar" location="Sydney, Australia" />);
    expect(screen.getByRole('link', { name: 'Back to top' })).toHaveAttribute('href', '#top');
  });
});
