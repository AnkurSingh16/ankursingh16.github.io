import { describe, expect, it } from 'vitest';
import { site } from './site';
import { TOPICS } from './types';

/** Every string anywhere in the content, with the path it was found at. */
function allStrings(value: unknown, path = 'site'): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, i) => allStrings(item, `${path}[${i}]`));
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([key, item]) => allStrings(item, `${path}.${key}`));
  return [];
}

describe('site content', () => {
  it('has no placeholder text left in it', () => {
    const placeholders = allStrings(site).filter(([, text]) => /\[[^\]]+\]|TODO|YOUR[ _-][A-Z]|[Ll]orem ipsum/.test(text));
    expect(placeholders).toEqual([]);
  });

  it('uses https for every web link', () => {
    const links = allStrings(site).filter(([path]) => /url|links\.(linkedin|medium|github|credly)$/i.test(path));
    expect(links.length).toBeGreaterThan(0);
    for (const [path, url] of links) {
      expect(url, path).toMatch(/^https:\/\//);
    }
  });

  it('gives every offer a unique id and a topic the contact form knows', () => {
    const ids = site.offers.map((offer) => offer.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const offer of site.offers) {
      expect(TOPICS).toContain(offer.topic);
    }
  });

  it('has at least one offer switched on', () => {
    expect(site.offers.some((offer) => offer.enabled)).toBe(true);
  });

  it('keeps an offer with id "mentoring", which the hero button links to', () => {
    expect(site.offers.find((offer) => offer.id === 'mentoring')?.enabled).toBe(true);
  });
});
