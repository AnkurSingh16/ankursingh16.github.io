import { site } from '../content/site';
import type { SiteContent } from '../content/types';

/** A deep copy of the real site content, with any fields overridden. */
export function makeContent(overrides: Partial<SiteContent> = {}): SiteContent {
  const copy = JSON.parse(JSON.stringify(site)) as SiteContent;
  return { ...copy, ...overrides };
}

export const ENDPOINT = 'https://formspree.io/f/test123';
