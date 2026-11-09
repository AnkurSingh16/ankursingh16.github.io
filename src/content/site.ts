import type { SiteContent } from './types';

/**
 * Everything the site says lives here. Edit this file to change copy, prices,
 * links or to switch features on. See TODO.md for what is still to decide.
 */
export const site: SiteContent = {
  name: 'Ankur Pawar',
  location: 'Sydney, Australia',

  photo: { src: `${import.meta.env.BASE_URL}images/ankur.jpg`, alt: 'Ankur Pawar' },

  headline: 'I help businesses get technology right, and engineers grow into leaders.',
  intro: [
    "I'm Ankur Pawar, an engineering leader based in Sydney. Over eleven years I've built and led engineering teams in telecommunications and banking, including the teams behind the Vodafone, TPG and iiNet customer apps and the Auth0 identity platform at TPG Telecom.",
    'Through this practice, I work with small businesses as a fractional engineering leader, and mentor engineers and managers who want to reach the next stage of their careers.',
  ],

  offers: [
    {
      id: 'fractional',
      // TODO(services): confirm scope and engagement model.
      enabled: true,
      title: 'Fractional engineering leadership',
      audience:
        'For small businesses and startups that need senior technology leadership without a full-time hire.',
      points: [
        'A technology strategy and roadmap your team can actually deliver',
        'Hiring and growing your first engineering team',
        'Choosing and managing vendors, agencies and contractors',
        'Getting stalled projects back on track',
      ],
      format: 'A few days a month, or a fixed-scope engagement.',
      price: null, // TODO(pricing)
      ctaLabel: "Let's talk",
      topic: 'Fractional leadership',
      bookingUrl: null,
    },
    {
      id: 'mentoring',
      enabled: true,
      title: 'Leadership mentoring',
      audience:
        'For engineers stepping into leadership, and managers ready for the next stage of their careers.',
      points: [
        'Your first 90 days leading a team',
        'Hiring, one-on-ones and difficult performance conversations',
        'Working effectively with product managers, stakeholders and your own manager',
      ],
      format: '45-minute video sessions.',
      price: null, // TODO(pricing)
      ctaLabel: 'Book a session',
      topic: 'Mentoring',
      bookingUrl: null, // TODO(booking)
    },
    {
      id: 'interviews',
      enabled: true,
      title: 'Interview preparation',
      audience:
        'For candidates applying for Engineering Manager, Senior Engineering Manager and Head of Engineering roles.',
      points: [
        'Mock leadership and behavioural interviews, with written feedback',
        "System design from a leader's perspective: trade-offs, not trivia",
        'CV and LinkedIn reviews for leadership roles',
      ],
      format: '60-minute video sessions.',
      price: null, // TODO(pricing)
      ctaLabel: 'Book a mock interview',
      topic: 'Interview preparation',
      bookingUrl: null, // TODO(booking)
    },
  ],

  // Durations rather than date ranges: the experience matters, not the calendar.
  roles: [
    {
      company: 'TPG Telecom',
      dates: '5 years',
      titles: 'Principal Engineer, Software Engineering Manager and Senior Software Engineering Manager',
      summary:
        'Led five engineering teams responsible for the Vodafone, TPG and iiNet customer apps and the Auth0 customer identity platform. Responsible for hiring and budget across those teams, reporting to the Head of Engineering.',
    },
    {
      company: 'Tata Consultancy Services',
      dates: '6 years',
      titles: 'Software Engineer and Team Lead, working with Westpac Group',
      summary: 'Built and supported banking software for St.George, BankSA and Bank of Melbourne.',
    },
  ],

  // TODO(quotes): add 2 or 3 real quotes. The section stays hidden while this is empty.
  quotes: [],

  // TODO(articles): add your latest Medium posts. While empty, the site links to your Medium profile.
  articles: [],

  // TODO(newsletter): fill in once the platform is chosen.
  newsletter: {
    name: null,
    sendDay: null,
    subscribeUrl: null,
  },

  links: {
    linkedin: 'https://www.linkedin.com/in/ankur-pawar-262746125',
    medium: 'https://medium.com/@ankursingh2k14',
    github: 'https://github.com/AnkurSingh16',
    email: null, // TODO(domain): e.g. 'hello@ankurpawar.com'
  },

  // TODO(contact-form): create a free Formspree form and paste its endpoint here,
  // e.g. 'https://formspree.io/f/abcdwxyz'
  contactFormEndpoint: null,
};
