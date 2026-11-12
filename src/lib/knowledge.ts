import type { Offer, SiteContent } from '../content/types';

/** Public address of the site; the knowledge files link to its sections. */
export const SITE_URL = 'https://ankursingh16.github.io';

const SERVICE_TOPICS: readonly string[] = ['Fractional leadership', 'Software services'];
const MENTORING_TOPICS: readonly string[] = ['Mentoring', 'Interview preparation'];
const CREDENTIAL_LABELS = {
  certification: 'Certifications',
  award: 'Awards',
  badge: 'Badges',
} as const;

export interface KnowledgeFile {
  /** Path under /knowledge, for example "services.md". */
  path: string;
  content: string;
}

export interface KnowledgeIndex {
  source: string;
  files: { path: string; title: string }[];
}

export interface Knowledge {
  files: KnowledgeFile[];
  index: KnowledgeIndex;
}

// Offers the site shows (App.tsx filters on `enabled`), limited to the given topics.
function shownOffers(site: SiteContent, topics: readonly string[]): Offer[] {
  return site.offers.filter((offer) => offer.enabled && topics.includes(offer.topic));
}

function bullets(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

function offerSection(offer: Offer): string {
  const cta = offer.bookingUrl ?? `${SITE_URL}/#contact`;
  const price = offer.price ?? 'Get in touch for pricing.';
  return [
    `## ${offer.title}`,
    offer.audience,
    bullets(offer.points),
    `${offer.format} ${price}`,
    `To book or ask about this: ${cta}`,
  ].join('\n\n');
}

function titled(title: string, sections: readonly string[]): string {
  return [`# ${title}`, ...sections].join('\n\n') + '\n';
}

function aboutFile(site: SiteContent): string {
  return titled(site.name, [
    `Location: ${site.location}`,
    site.headline,
    ...site.intro,
  ]);
}

function careerFile(site: SiteContent): string {
  const sections: string[] = [site.career.summary];
  if (site.career.teamsLed.length > 0) {
    sections.push(`## Teams led\n\n${bullets(site.career.teamsLed)}`);
  }
  sections.push(
    '## Experience',
    ...site.roles.map((role) =>
      [
        `### ${role.company} (${role.dates})`,
        role.positions.join(', '),
        role.summary,
        ...(role.highlights.length > 0 ? [bullets(role.highlights)] : []),
      ].join('\n\n'),
    ),
  );
  if (site.education.length > 0) {
    sections.push(
      '## Education',
      bullets(
        site.education.map(
          (item) =>
            `${item.qualification}${item.institution ? `, ${item.institution}` : ''}, ${item.year}`,
        ),
      ),
    );
  }
  sections.push(
    '## Skills',
    ...site.skills.map((group) => `### ${group.name}\n\n${bullets(group.skills)}`),
  );
  for (const kind of Object.keys(CREDENTIAL_LABELS) as (keyof typeof CREDENTIAL_LABELS)[]) {
    const items = site.credentials.filter((credential) => credential.kind === kind);
    if (items.length === 0) continue;
    sections.push(
      `## ${CREDENTIAL_LABELS[kind]}`,
      bullets(
        items.map(
          (credential) =>
            `${credential.title}, ${credential.issuer}, ${credential.year}` +
            (credential.details ? `. ${credential.details}` : ''),
        ),
      ),
    );
  }
  return titled('Career', sections);
}

function servicesFile(site: SiteContent): string {
  const offers = shownOffers(site, SERVICE_TOPICS);
  return titled('Services', offers.length === 0 ? [] : offers.map(offerSection));
}

function mentoringFile(site: SiteContent): string {
  const offers = shownOffers(site, MENTORING_TOPICS);
  return titled('Mentoring', offers.length === 0 ? [] : offers.map(offerSection));
}

function writingFile(site: SiteContent): string {
  const sections = [`Articles are published on Medium: ${site.links.medium}`];
  if (site.articles.length > 0) {
    sections.push(
      '## Recent articles',
      bullets(
        site.articles.map(
          (article) =>
            `${article.title} (${article.date}${article.readMinutes ? `, ${article.readMinutes} minute read` : ''}): ${article.url}`,
        ),
      ),
    );
  }
  if (site.newsletter.name !== null && site.newsletter.subscribeUrl !== null) {
    sections.push(`## Newsletter\n\n${site.newsletter.name}: ${site.newsletter.subscribeUrl}`);
  }
  return titled('Writing', sections);
}

function contactFile(site: SiteContent): string {
  const links = [
    site.links.email !== null ? `Email: ${site.links.email}` : null,
    `LinkedIn: ${site.links.linkedin}`,
    `Medium: ${site.links.medium}`,
    site.links.github !== null ? `GitHub: ${site.links.github}` : null,
    site.links.credly !== null ? `Credly: ${site.links.credly}` : null,
  ].filter((line): line is string => line !== null);
  return titled('Contact', [
    `The fastest way to start a conversation is the contact form at ${SITE_URL}/#contact.`,
    bullets(links),
  ]);
}

/**
 * The plain-Markdown knowledge files for the portfolio chatbot, built only from what the site
 * renders. Disabled offers are left out, the same way the site hides them.
 */
export function buildKnowledge(site: SiteContent): Knowledge {
  const files: KnowledgeFile[] = [
    { path: 'about.md', content: aboutFile(site) },
    { path: 'career.md', content: careerFile(site) },
    { path: 'services.md', content: servicesFile(site) },
    { path: 'mentoring.md', content: mentoringFile(site) },
    { path: 'writing.md', content: writingFile(site) },
    { path: 'contact.md', content: contactFile(site) },
  ];
  const index: KnowledgeIndex = {
    source: 'src/content/site.ts',
    files: files.map((file) => ({
      path: file.path,
      title: /^# (.+)$/m.exec(file.content)?.[1] ?? file.path,
    })),
  };
  return { files, index };
}
