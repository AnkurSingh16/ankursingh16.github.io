import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { site } from '../content/site';
import Background from './Background';

describe('Background', () => {
  it('lists roles in the order given, most recent first', () => {
    render(<Background career={site.career} roles={site.roles} education={[]} quotes={[]} />);
    const companies = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(companies).toEqual(site.roles.map((role) => role.company));
    expect(companies[0]).toBe('TPG Telecom');
  });

  it('shows the positions held and each highlight', () => {
    const role = {
      company: 'Acme',
      dates: '3 years',
      positions: ['Engineering Manager', 'Senior Engineer'],
      summary: 'Ran the payments team.',
      highlights: ['Shipped the new checkout', 'Hired four engineers'],
    };
    render(<Background career={site.career} roles={[role]} education={[]} quotes={[]} />);
    expect(screen.getByText('Engineering Manager, Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Shipped the new checkout')).toBeInTheDocument();
    expect(screen.getByText('Hired four engineers')).toBeInTheDocument();
  });

  it('shows education, leaving out the institution when it is not set', () => {
    render(
      <Background
        career={site.career}
        roles={site.roles}
        education={[{ qualification: 'Bachelor of Engineering, Computer Engineering', institution: null, year: 2015 }]}
        quotes={[]}
      />,
    );
    expect(screen.getByText('Bachelor of Engineering, Computer Engineering, 2015')).toBeInTheDocument();
  });

  it('hides the quotes block while there are no quotes', () => {
    const { container } = render(<Background career={site.career} roles={site.roles} education={[]} quotes={[]} />);
    expect(container.querySelector('blockquote')).toBeNull();
  });

  it('shows each quote with who said it', () => {
    render(
      <Background
        career={site.career}
        roles={site.roles}
        education={[]}
        quotes={[{ text: 'Ankur made me a better manager.', name: 'Sam Lee', role: 'Engineering Manager, Acme' }]}
      />,
    );
    expect(screen.getByRole('heading', { name: 'What colleagues and clients say' })).toBeInTheDocument();
    expect(screen.getByText('Ankur made me a better manager.')).toBeInTheDocument();
    expect(screen.getByText('Sam Lee, Engineering Manager, Acme')).toBeInTheDocument();
  });

  it('shows the career summary and the teams led', () => {
    render(<Background career={site.career} roles={site.roles} education={[]} quotes={[]} />);
    expect(screen.getByText(site.career.summary)).toBeInTheDocument();
    for (const team of site.career.teamsLed) {
      expect(screen.getByText(team)).toBeInTheDocument();
    }
  });
});
