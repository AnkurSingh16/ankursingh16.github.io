import type { SiteContent } from './types';

/**
 * Everything the site says lives here. Edit this file to change copy, prices,
 * links or to switch features on. See TODO.md for what is still to decide.
 */
export const site: SiteContent = {
  name: 'Ankur Pawar',
  location: 'Sydney, Australia',

  photo: { src: `${import.meta.env.BASE_URL}images/ankur.jpg`, alt: 'Ankur Pawar' },

  headline: 'I help businesses get technology right, and engineers reach their next level.',
  intro: [
    "I'm Ankur Pawar, an engineering leader based in Sydney. Over eleven years I've built and led engineering teams in telecommunications and banking, including the teams behind the Vodafone, TPG and iiNet customer apps and the Auth0 identity platform at TPG Telecom.",
    'Alongside my career in engineering leadership, I take on a small number of engagements: fractional leadership and software delivery for small businesses, and mentoring and interview preparation for engineers at every level.',
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
      id: 'services',
      // TODO(services): confirm scope and how the delivery team is described.
      enabled: true,
      title: 'Software services',
      audience: 'For businesses that need a product built, improved or rescued.',
      points: [
        'Web and mobile apps, from first version to launch',
        'Secure customer login and identity with Auth0',
        'Modernising legacy systems and improving reliability',
      ],
      format: 'Fixed-scope projects, delivered with a small, trusted team.',
      price: null, // TODO(pricing)
      ctaLabel: 'Discuss a project',
      topic: 'Software services',
      bookingUrl: null,
    },
    {
      id: 'mentoring',
      enabled: true,
      title: 'Career and leadership mentoring',
      audience:
        'For engineers at every stage: junior, mid-level and senior engineers, tech leads, staff and principal engineers, and engineering managers.',
      points: [
        'Growing from junior to senior: ownership, scope and impact',
        'Choosing between the technical (staff and principal) and management paths',
        'Your first 90 days as a tech lead or manager',
        'Influencing stakeholders and leading without authority',
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
        'For software engineers at every level, from junior to principal, and for Engineering Manager, Senior Engineering Manager and Head of Engineering roles.',
      points: [
        'Mock technical, system design and behavioural interviews, with written feedback',
        'Leadership interviews for tech lead, staff, principal and management roles',
        'CV and LinkedIn reviews tailored to the role you want',
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
      positions: ['Senior Software Engineering Manager', 'Software Engineering Manager', 'Principal Engineer'],
      summary:
        'Engineering leadership for the Vodafone, TPG and iiNet customer apps and the Auth0 customer identity platform.',
      highlights: [
        'Led five engineering teams across consumer apps and customer identity',
        'Grew from Principal Engineer, leading 14 engineers and 3 testers, to Senior Software Engineering Manager',
        'First-level approver for hiring and spend, reporting to the Head of Engineering',
      ],
    },
    {
      company: 'Tata Consultancy Services',
      dates: '6 years',
      positions: ['Team Lead', 'Software Engineer'],
      summary: 'Built and supported banking software for Westpac Group.',
      highlights: [
        'Delivered software for St.George, BankSA and Bank of Melbourne',
        'Led a delivery team from 2019',
      ],
    },
  ],

  education: [{ qualification: 'Bachelor of Engineering, Computer Engineering', institution: null, year: 2015 }],

  // TODO(skills): add a technical group (languages, cloud, tools) once confirmed.
  skills: [
    {
      name: 'Leadership',
      skills: [
        'Building and leading multiple engineering teams',
        'Hiring and growing engineers',
        'Planning and delivery across teams',
        'Stakeholder management',
        'Budget and spend approval',
        'Mentoring and coaching',
      ],
    },
    {
      name: 'Domains',
      skills: [
        'Telecommunications',
        'Banking',
        'Customer identity and access management (CIAM)',
        'Consumer mobile and web apps',
      ],
    },
  ],

  // TODO(credentials): add certifications, awards and badges, e.g.
  // { title: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: 2024, kind: 'certification', url: 'https://…' }
  credentials: [],

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
