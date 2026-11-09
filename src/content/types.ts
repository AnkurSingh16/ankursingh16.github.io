export const TOPICS = [
  'Fractional leadership',
  'Software services',
  'Mentoring',
  'Interview preparation',
  'Something else',
] as const;

export type Topic = (typeof TOPICS)[number];

export interface Offer {
  id: string;
  /** Set to false to hide the offer without deleting its content. */
  enabled: boolean;
  title: string;
  audience: string;
  points: string[];
  /** Session length or engagement model, e.g. "45 minutes on video." */
  format: string;
  /** Shown after the format. null shows a "get in touch for pricing" line instead. */
  price: string | null;
  ctaLabel: string;
  /** Topic pre-selected in the contact form when the button is used. */
  topic: Topic;
  /** Topmate, Cal.com or Calendly link. null sends people to the contact form. */
  bookingUrl: string | null;
}

export interface Role {
  company: string;
  /** A duration such as "5 years". */
  dates: string;
  /** Positions held, most senior first. */
  positions: string[];
  summary: string;
  highlights: string[];
}

export interface Education {
  qualification: string;
  institution: string | null;
  year: number;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Credential {
  title: string;
  issuer: string;
  year: number;
  kind: 'certification' | 'award' | 'badge';
  /** Link to verify it (Credly, issuer page). */
  url?: string;
  /** One short sentence: what it was for, or what a group of badges covers. */
  details?: string;
}

export interface Quote {
  text: string;
  name: string;
  role: string;
}

export interface Article {
  title: string;
  url: string;
  /** e.g. "Nov 2026" */
  date: string;
  readMinutes?: number;
}

export interface Newsletter {
  /** null until the newsletter is set up; the site then shows a "coming soon" note. */
  name: string | null;
  /** e.g. "Tuesday" */
  sendDay: string | null;
  /** The provider's public subscribe page (Substack, Beehiiv, Kit or Buttondown). */
  subscribeUrl: string | null;
}

export interface Photo {
  src: string;
  alt: string;
}

export interface SiteContent {
  name: string;
  location: string;
  photo: Photo | null;
  headline: string;
  intro: string[];
  offers: Offer[];
  roles: Role[];
  education: Education[];
  skills: SkillGroup[];
  /** Certifications, awards and badges. The section stays hidden while empty. */
  credentials: Credential[];
  quotes: Quote[];
  articles: Article[];
  newsletter: Newsletter;
  links: {
    linkedin: string;
    medium: string;
    github: string | null;
    credly: string | null;
    /** null until domain email is set up. */
    email: string | null;
  };
  /** Formspree (or similar) endpoint. null shows a "message me on LinkedIn" fallback. */
  contactFormEndpoint: string | null;
}
