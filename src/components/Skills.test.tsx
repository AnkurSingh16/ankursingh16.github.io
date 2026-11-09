import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Credential, SkillGroup } from '../content/types';
import Skills from './Skills';

const groups: SkillGroup[] = [
  { name: 'Leadership', skills: ['Hiring and growing engineers', 'Stakeholder management'] },
  { name: 'Domains', skills: ['Telecommunications', 'Banking'] },
];

const credentials: Credential[] = [
  { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: 2021, kind: 'certification' },
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: 2024,
    kind: 'certification',
    url: 'https://www.credly.com/badges/example',
  },
  { title: 'Engineering Excellence Award', issuer: 'Acme', year: 2023, kind: 'award' },
];

describe('Skills', () => {
  it('shows each skill group with its skills', () => {
    render(<Skills groups={groups} credentials={[]} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Leadership' })).toBeInTheDocument();
    expect(screen.getByText('Stakeholder management')).toBeInTheDocument();
    expect(screen.getByText('Banking')).toBeInTheDocument();
  });

  it('hides credentials entirely while there are none', () => {
    render(<Skills groups={groups} credentials={[]} />);
    expect(screen.queryByRole('heading', { name: 'Certifications' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Awards' })).not.toBeInTheDocument();
  });

  it('groups credentials by kind, newest first, linking those that can be verified', () => {
    render(<Skills groups={groups} credentials={credentials} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Skills and credentials' })).toBeInTheDocument();

    const certs = screen.getByRole('heading', { name: 'Certifications' }).parentElement!;
    const items = within(certs).getAllByRole('listitem').map((li) => li.textContent);
    expect(items[0]).toContain('Solutions Architect');
    expect(items[1]).toContain('Cloud Practitioner');
    expect(within(certs).getByRole('link', { name: /Solutions Architect/ })).toHaveAttribute(
      'href',
      'https://www.credly.com/badges/example',
    );
    expect(within(certs).getByText('Amazon Web Services, 2024')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Awards' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Badges' })).not.toBeInTheDocument();
  });
});
