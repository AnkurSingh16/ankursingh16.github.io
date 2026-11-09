import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { site } from '../content/site';
import Background from './Background';

describe('Background', () => {
  it('lists roles in the order given, most recent first', () => {
    render(<Background roles={site.roles} quotes={[]} />);
    const companies = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(companies).toEqual(site.roles.map((role) => role.company));
    expect(companies[0]).toBe('TPG Telecom');
  });

  it('hides the quotes block while there are no quotes', () => {
    const { container } = render(<Background roles={site.roles} quotes={[]} />);
    expect(container.querySelector('blockquote')).toBeNull();
  });

  it('shows each quote with who said it', () => {
    render(
      <Background
        roles={site.roles}
        quotes={[{ text: 'Ankur made me a better manager.', name: 'Sam Lee', role: 'Engineering Manager, Acme' }]}
      />,
    );
    expect(screen.getByText('Ankur made me a better manager.')).toBeInTheDocument();
    expect(screen.getByText('Sam Lee, Engineering Manager, Acme')).toBeInTheDocument();
  });
});
