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
        'Led 25+ engineers across 15 digital and identity platforms',
        'Reduced production incidents from more than 50 a month to near zero',
        'Delivered US$600K in vendor savings',
        'Grew from Principal Engineer to Senior Software Engineering Manager, with first-level approval of hiring and spend',
      ],
    },
    {
      company: 'Tata Consultancy Services',
      dates: '6 years',
      positions: ['Team Lead', 'Software Engineer'],
      summary: 'Built and supported banking software for Westpac Group.',
      highlights: [
        'Delivered digital projects for St.George, BankSA and Bank of Melbourne, including work on AWS and Adobe',
        'Led a delivery team from 2019',
      ],
    },
  ],

  education: [
    {
      qualification: 'Bachelor of Engineering, Computer Engineering',
      institution: "SSVPS's Bapusaheb Shivajirao Deore College of Engineering, Dhule",
      year: 2015,
    },
  ],

  skills: [
    {
      name: 'Leadership',
      skills: [
        'Building and leading multiple engineering teams',
        'Hiring and growing engineers',
        'Organisational and product leadership',
        'Delivery transformation and planning',
        'Stakeholder engagement',
        'Vendor and budget management',
        'Mentoring and coaching',
      ],
    },
    {
      name: 'Engineering',
      skills: [
        'Cloud architecture on AWS',
        'APIs and systems design',
        'React and React Native',
        'Reliability, monitoring and incident management',
        'CI/CD, blue/green releases and Terraform',
      ],
    },
    {
      name: 'Identity and security',
      skills: [
        'Customer identity and access management (CIAM) with Auth0',
        'OAuth, SAML and role-based access control',
        'Multi-factor authentication and attack protection',
        'API security and rate limiting',
      ],
    },
    {
      name: 'AI',
      skills: [
        'Generative AI strategy for business',
        'AI governance and ethics',
        'AI-assisted app building and prompt engineering',
      ],
    },
    {
      name: 'Domains',
      skills: ['Telecommunications', 'Banking', 'Consumer mobile and web apps'],
    },
  ],

  credentials: [
    {
      title: 'Organizational Leadership',
      issuer: 'Northwestern University',
      year: 2026,
      kind: 'certification',
    },
    {
      title: 'Product Leadership in Complex Organizations',
      issuer: 'Stanford Online',
      year: 2026,
      kind: 'certification',
      details:
        'Plus four related courses: Foundations of Product Strategy, From Product Strategy to Product Leadership, Building and Leading Product Organizations, and Leading Products Through Growth and Scale.',
    },
    {
      title: 'Generative AI for Executives and Business Leaders Specialization',
      issuer: 'IBM',
      year: 2026,
      kind: 'certification',
      url: 'https://www.credly.com/badges/016be3a4-9f7c-44a4-bb1f-12beac6f33ee',
      details: 'Three courses covering an introduction to generative AI, use-case design and integration strategy.',
    },
    {
      title: 'Google AI Professional Certificate',
      issuer: 'Google',
      year: 2026,
      kind: 'certification',
      url: 'https://www.credly.com/badges/ed323f72-fbcc-4303-b39f-a934a195fa6e',
      details:
        'Eight courses: AI fundamentals, research, writing, content creation, data analysis, planning, app building and app deployment.',
    },
    {
      title: 'Auth0 identity and security',
      issuer: 'Okta',
      year: 2026,
      kind: 'badge',
      url: 'https://www.credly.com/users/ankur-mahendrasingh-pawar',
      details:
        '11 badges, including Extend Auth0 with Actions, Secure Auth0 Apps with MFA, Protect Your API Endpoints with Auth0, and Session and Token Management Best Practices.',
    },
    {
      title: 'Superstar Award',
      issuer: 'TPG Telecom',
      year: 2025,
      kind: 'award',
      details:
        'For resolving a major production incident quickly during the iPhone pre-launch, limiting the impact on customers and revenue.',
    },
    {
      title: 'Superstar Award',
      issuer: 'TPG Telecom',
      year: 2024,
      kind: 'award',
      details: "For digital platform readiness for the iPhone pre-sale, one of the company's highest-revenue events.",
    },
    {
      title: 'On the Spot Award, four times',
      issuer: 'Tata Consultancy Services',
      year: 2019,
      kind: 'award',
      details: 'Awarded between 2017 and 2019 for work with Westpac Group.',
    },
    {
      title: 'Best Performer Award',
      issuer: 'Tata Consultancy Services, Westpac relationship',
      year: 2017,
      kind: 'award',
    },
    {
      title: 'Best Team Award',
      issuer: 'Tata Consultancy Services',
      year: 2017,
      kind: 'award',
    },
  ],

  // From LinkedIn recommendations (public). Excerpts are word for word.
  quotes: [
    {
      text: 'Ankur is a professional and highly skilled development lead. He has a talent not only for understanding technical problems and applying practical, intelligent solutions, but also for communicating these solutions back to stakeholders.',
      name: 'Tristan Foster',
      role: 'Founder and Principal Consultant, Grand West Consulting',
    },
    {
      text: "As the Project Manager I look for competence and agility, Ankur had exceeded my expectations in every interaction I had with him. … Should our paths cross one day, I'd work with you again in a heartbeat.",
      name: 'Nizar Abrahams',
      role: 'Project Manager on a digital transformation project',
    },
    {
      text: 'Having him in the team is great comfort as he is quite proactive and sincere. Being a quick learner, his competency list is always growing.',
      name: 'Sudhakar Naik',
      role: 'Former manager at Tata Consultancy Services',
    },
    {
      text: 'I have worked with Ankur for the last 3 years, he is knowledgeable, experienced and very helpful.',
      name: 'Peter Barratt',
      role: 'Cloud Banking and Digital Experience, Westpac',
    },
  ],

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
    credly: 'https://www.credly.com/users/ankur-mahendrasingh-pawar',
    email: null, // TODO(domain): e.g. 'hello@ankurpawar.com'
  },

  // Formspree form "Ankur Pawar website contact" (fields: name, email, topic, message).
  contactFormEndpoint: 'https://formspree.io/f/mwllddon',
};
