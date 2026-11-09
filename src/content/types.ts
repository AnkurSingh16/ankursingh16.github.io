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
  dates: string;
  titles: string;
  summary: string;
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
  quotes: Quote[];
  articles: Article[];
  newsletter: Newsletter;
  links: {
    linkedin: string;
    medium: string;
    github: string | null;
    /** null until domain email is set up. */
    email: string | null;
  };
  /** Formspree (or similar) endpoint. null shows a "message me on LinkedIn" fallback. */
  contactFormEndpoint: string | null;
}
