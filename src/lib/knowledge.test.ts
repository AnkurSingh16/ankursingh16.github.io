import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { site } from '../content/site';
import type { SiteContent } from '../content/types';
import { buildKnowledge } from './knowledge';

const knowledgeDir = join(process.cwd(), 'public', 'knowledge');

async function committed(path: string): Promise<string> {
  return readFile(join(knowledgeDir, path), 'utf8');
}

describe('knowledge files', () => {
  it('match what the generator builds from site.ts', async () => {
    const { files, index } = buildKnowledge(site);
    for (const file of files) {
      expect(await committed(file.path), file.path).toBe(file.content);
    }
    expect(JSON.parse(await committed('index.json'))).toEqual(index);
  });

  it('leave out disabled offers, as the site does', () => {
    const offers = site.offers.map((offer) =>
      offer.id === 'services' ? { ...offer, enabled: false } : offer,
    );
    const withoutServices: SiteContent = { ...site, offers };
    const { files } = buildKnowledge(withoutServices);
    const services = files.find((file) => file.path === 'services.md')?.content ?? '';
    const disabled = site.offers.find((offer) => offer.id === 'services');
    expect(disabled).toBeDefined();
    expect(services).not.toContain(disabled?.title ?? '');
    expect(services).not.toContain(disabled?.audience ?? '');
  });

  it('keeps offers in their own files and only lists the offers that are enabled', () => {
    const { files } = buildKnowledge(site);
    const content = (path: string) => files.find((file) => file.path === path)?.content ?? '';
    expect(content('services.md')).toContain('## Fractional engineering leadership');
    expect(content('services.md')).not.toContain('## Career and leadership mentoring');
    expect(content('mentoring.md')).toContain('## Career and leadership mentoring');
    expect(content('mentoring.md')).toContain('## Interview preparation');
  });

  it('never mentions pay, redundancy, current employment or a job search', () => {
    const forbidden =
      /salary|redundan|job search|job-hunting|looking for (a )?(new )?(role|job|work)|open to (work|opportunities)|notice period|currently employed|current employer|unemployed|between roles/i;
    for (const file of buildKnowledge(site).files) {
      expect(file.content, file.path).not.toMatch(forbidden);
    }
  });
});
