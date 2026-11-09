import type { SiteContent } from './types';

/**
 * Everything the site says lives here. Edit this file to change copy, prices,
 * links or to switch features on. See TODO.md for what is still to decide.
 */
export const site: SiteContent = {
  name: 'Ankur Pawar',
  location: 'Sydney, Australia',

  photo: { src: `${import.meta.env.BASE_URL}images/ankur.jpg`, alt: 'Ankur Pawar' },

  headline: 'I help teams ship good software, and engineers grow into leaders.',
  intro: [
    "I'm Ankur, an engineering leader in Sydney with eleven years in Australian telco and banking. Most recently I was Senior Software Engineering Manager at TPG Telecom, leading five teams across the Vodafone, TPG and iiNet apps and the Auth0 customer identity platform.",
    'Now I take on software projects with a small team, and mentor engineers and managers who want to get better at the job.',
  ],

  offers: [
    {
      id: 'services',
      // TODO(services): confirm scope, team description and pricing model.
      enabled: true,
      title: 'Software services',
      audience: 'For founders and businesses who need a product built, or an existing one put right.',
      points: [
        'Web and mobile apps, from first version to app store release',
        'Customer login and identity on Auth0, set up properly the first time',
        'Rescuing stalled projects and modernising legacy platforms',
      ],
      format: 'Fixed price or monthly.',
      price: null, // TODO(pricing)
      ctaLabel: 'Discuss a project',
      topic: 'A software project',
      bookingUrl: null,
    },
    {
      id: 'mentoring',
      enabled: true,
      title: '1:1 mentoring',
      audience: 'For senior engineers moving into management, and managers in their first couple of years.',
      points: [
        'Your first 90 days managing a team',
        'Hiring, one-on-ones and hard performance conversations',
        'Working with product managers, stakeholders and your own boss',
      ],
      format: '45 minutes on video.',
      price: null, // TODO(pricing)
      ctaLabel: 'Book a session',
      topic: 'Mentoring',
      bookingUrl: null, // TODO(booking)
    },
    {
      id: 'interviews',
      enabled: true,
      title: 'Interview preparation',
      audience: 'For people going for Engineering Manager, Senior EM and Head of Engineering roles.',
      points: [
        'Mock leadership and behavioural interviews, with written feedback',
        "System design from a manager's seat: trade-offs, not trivia",
        'CV and LinkedIn review for leadership roles',
      ],
      format: '60 minutes on video.',
      price: null, // TODO(pricing)
      ctaLabel: 'Book a mock interview',
      topic: 'Interview preparation',
      bookingUrl: null, // TODO(booking)
    },
  ],

  roles: [
    {
      company: 'TPG Telecom',
      dates: '2021 to 2026',
      titles:
        'Principal Engineer, then Software Engineering Manager, then Senior Software Engineering Manager',
      summary:
        'Led around five teams building the Vodafone, TPG and iiNet customer apps and the Auth0 identity platform behind them. First-level approver for hiring and spend, reporting to the Head of Engineering.',
    },
    {
      company: 'Tata Consultancy Services, for Westpac Group',
      dates: '2015 to 2021',
      titles: 'Engineer, then team lead from 2019',
      summary: 'Banking software for St.George, BankSA and Bank of Melbourne.',
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
