// Simple CMS storage using localStorage
// In production, this would be replaced with a real backend API

const STORAGE_KEYS = {
  PROGRAMS: 'uisn_programs',
  EVENTS: 'uisn_events',
  ANNOUNCEMENTS: 'uisn_announcements',
  OPPORTUNITIES: 'uisn_opportunities',
  STATS: 'uisn_stats',
  IMPACT_STORIES: 'uisn_impact_stories',
  ABOUT_CONTENT: 'uisn_about_content',
};

// Initialize default data
const DEFAULT_DATA = {
  programs: [
    {
      id: '1',
      title: 'Create a UISN Chapter at Your School',
      description: 'Start an official UISN chapter on your campus. Access toolkits, branding, and support to lead service initiatives locally and connect with other universities in Utah.',
      frequency: 'Year-round',
      location: 'Your Campus',
      impact: 'Statewide network',
      icon: 'GraduationCap',
      color: 'secondary',
      active: true,
    },
    {
      id: '2',
      title: 'Host a UISN Service Night',
      description: 'Evening service-focused events including community projects, donation drives, and volunteering. Designed for students with busy schedules - 1–2 hours, low commitment, high impact.',
      frequency: 'Flexible',
      location: 'Your Community',
      impact: 'Quick & impactful',
      icon: 'Calendar',
      color: 'accent',
      active: true,
    },
    {
      id: '3',
      title: 'Join the Utah Intercollegiate Service Network',
      description: 'Become part of a statewide student service coalition. Collaborate with students from other colleges, share resources, events, and impact reports.',
      frequency: 'Ongoing',
      location: 'Statewide',
      impact: '9+ universities',
      icon: 'Heart',
      color: 'secondary',
      active: true,
    },
    {
      id: '4',
      title: 'Join the UISN Leadership Team',
      description: 'Take on a leadership role within UISN and help shape the future of student service in Utah. Gain valuable experience, earn service hours, access possible stipends, and expand your network.',
      frequency: 'Ongoing Commitment',
      location: 'Statewide',
      impact: 'Leadership & Growth',
      icon: 'Users',
      color: 'accent',
      active: true,
    },
  ],
  events: [
    {
      id: '1',
      title: 'Spring Kickoff Service Day',
      date: '2026-03-15',
      time: '9:00 AM - 3:00 PM',
      location: 'Salt Lake City',
      description: 'Join us for our inaugural service day! Multiple project sites available.',
      registrationLink: '#',
      active: true,
    },
  ],
  announcements: [
    {
      id: '1',
      title: 'Welcome to UISN!',
      content: 'We are excited to launch the Utah Intercollegiate Service Network in 2026. Stay tuned for upcoming events and opportunities!',
      date: '2026-01-15',
      priority: 'high',
      active: true,
    },
  ],
  opportunities: [
    {
      id: '1',
      title: 'Campus Chapter Leaders Needed',
      description: 'We are seeking passionate student leaders to start UISN chapters at their universities.',
      category: 'Leadership',
      commitment: 'Ongoing',
      skills: ['Leadership', 'Event Planning', 'Communication'],
      active: true,
    },
  ],
  stats: [
    {
      id: '1',
      label: 'Active Volunteers',
      value: '1,000+',
      description: 'Students making a difference',
      icon: 'Users',
      color: 'secondary',
    },
    {
      id: '2',
      label: 'Service Hours',
      value: '5,000+',
      description: 'Contributed since 2026',
      icon: 'Clock',
      color: 'accent',
    },
    {
      id: '3',
      label: 'Community Partners',
      value: '5',
      description: 'Organizations served',
      icon: 'Heart',
      color: 'secondary',
    },
    {
      id: '4',
      label: 'Partner Universities',
      value: '9+',
      description: 'Colleges across Utah',
      icon: 'TrendingUp',
      color: 'accent',
    },
  ],
  impactStories: [
    {
      id: '1',
      title: 'Building Community Together',
      description: 'In our first year, UISN volunteers have contributed over 5,000 hours of service across Utah communities.',
      image: 'https://images.unsplash.com/photo-1758599667729-a6f0f8bd213b?w=800&q=80',
      active: true,
    },
    {
      id: '2',
      title: 'Growing Network',
      description: 'Started at Snow College, we\'ve expanded to partner with 9 universities across Utah, creating a statewide movement.',
      image: 'https://images.unsplash.com/photo-1615856210162-9ae33390b1a2?w=800&q=80',
      active: true,
    },
    {
      id: '3',
      title: 'Student-Led Impact',
      description: 'Over 1,000 student volunteers are actively participating in service projects, proving that young people can create lasting change.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
      active: true,
    },
  ],
  aboutContent: {
    mission: 'To mobilize and empower college students across Utah to serve their communities, develop leadership skills, and create lasting positive impact through coordinated volunteer initiatives that address real community needs.',
    story: 'Founded in 2026 at Snow College by a passionate group of students who saw the need for coordinated service across Utah\'s universities. With the support and guidance of UServeUtah, we launched UISN to create a statewide network where college students could collaborate on meaningful service projects. What started as a small group at Snow College has grown into a movement spanning 9+ universities, with over 1,000 active volunteers making a real difference in their communities.',
  },
};

// Initialize storage with default data if empty
export const initializeStorage = () => {
  Object.entries(DEFAULT_DATA).forEach(([key, value]) => {
    const storageKey = STORAGE_KEYS[key.toUpperCase()];
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  });
};

// Programs
export const getPrograms = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
  return data ? JSON.parse(data) : DEFAULT_DATA.programs;
};

export const savePrograms = (programs) => {
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
};

export const addProgram = (program) => {
  const programs = getPrograms();
  const newProgram = {
    ...program,
    id: Date.now().toString(),
    active: true,
  };
  programs.push(newProgram);
  savePrograms(programs);
  return newProgram;
};

export const updateProgram = (id, updates) => {
  const programs = getPrograms();
  const index = programs.findIndex((p) => p.id === id);
  if (index !== -1) {
    programs[index] = { ...programs[index], ...updates };
    savePrograms(programs);
  }
};

export const deleteProgram = (id) => {
  const programs = getPrograms().filter((p) => p.id !== id);
  savePrograms(programs);
};

// Events
export const getEvents = () => {
  const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
  return data ? JSON.parse(data) : DEFAULT_DATA.events;
};

export const saveEvents = (events) => {
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
};

export const addEvent = (event) => {
  const events = getEvents();
  const newEvent = {
    ...event,
    id: Date.now().toString(),
    active: true,
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
};

export const updateEvent = (id, updates) => {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updates };
    saveEvents(events);
  }
};

export const deleteEvent = (id) => {
  const events = getEvents().filter((e) => e.id !== id);
  saveEvents(events);
};

// Announcements
export const getAnnouncements = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
  return data ? JSON.parse(data) : DEFAULT_DATA.announcements;
};

export const saveAnnouncements = (announcements) => {
  localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
};

export const addAnnouncement = (announcement) => {
  const announcements = getAnnouncements();
  const newAnnouncement = {
    ...announcement,
    id: Date.now().toString(),
    active: true,
    date: new Date().toISOString().split('T')[0],
  };
  announcements.push(newAnnouncement);
  saveAnnouncements(announcements);
  return newAnnouncement;
};

export const updateAnnouncement = (id, updates) => {
  const announcements = getAnnouncements();
  const index = announcements.findIndex((a) => a.id === id);
  if (index !== -1) {
    announcements[index] = { ...announcements[index], ...updates };
    saveAnnouncements(announcements);
  }
};

export const deleteAnnouncement = (id) => {
  const announcements = getAnnouncements().filter((a) => a.id !== id);
  saveAnnouncements(announcements);
};

// Opportunities
export const getOpportunities = () => {
  const data = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
  return data ? JSON.parse(data) : DEFAULT_DATA.opportunities;
};

export const saveOpportunities = (opportunities) => {
  localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opportunities));
};

export const addOpportunity = (opportunity) => {
  const opportunities = getOpportunities();
  const newOpportunity = {
    ...opportunity,
    id: Date.now().toString(),
    active: true,
  };
  opportunities.push(newOpportunity);
  saveOpportunities(opportunities);
  return newOpportunity;
};

export const updateOpportunity = (id, updates) => {
  const opportunities = getOpportunities();
  const index = opportunities.findIndex((o) => o.id === id);
  if (index !== -1) {
    opportunities[index] = { ...opportunities[index], ...updates };
    saveOpportunities(opportunities);
  }
};

export const deleteOpportunity = (id) => {
  const opportunities = getOpportunities().filter((o) => o.id !== id);
  saveOpportunities(opportunities);
};

// Stats
export const getStats = () => {
  const data = localStorage.getItem(STORAGE_KEYS.STATS);
  return data ? JSON.parse(data) : DEFAULT_DATA.stats;
};

export const saveStats = (stats) => {
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
};

export const updateStat = (id, updates) => {
  const stats = getStats();
  const index = stats.findIndex((s) => s.id === id);
  if (index !== -1) {
    stats[index] = { ...stats[index], ...updates };
    saveStats(stats);
  }
};

// Impact Stories
export const getImpactStories = () => {
  const data = localStorage.getItem(STORAGE_KEYS.IMPACT_STORIES);
  return data ? JSON.parse(data) : DEFAULT_DATA.impactStories;
};

export const saveImpactStories = (stories) => {
  localStorage.setItem(STORAGE_KEYS.IMPACT_STORIES, JSON.stringify(stories));
};

export const addImpactStory = (story) => {
  const stories = getImpactStories();
  const newStory = {
    ...story,
    id: Date.now().toString(),
    active: true,
  };
  stories.push(newStory);
  saveImpactStories(stories);
  return newStory;
};

export const updateImpactStory = (id, updates) => {
  const stories = getImpactStories();
  const index = stories.findIndex((s) => s.id === id);
  if (index !== -1) {
    stories[index] = { ...stories[index], ...updates };
    saveImpactStories(stories);
  }
};

export const deleteImpactStory = (id) => {
  const stories = getImpactStories().filter((s) => s.id !== id);
  saveImpactStories(stories);
};

// About Content
export const getAboutContent = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ABOUT_CONTENT);
  return data ? JSON.parse(data) : DEFAULT_DATA.aboutContent;
};

export const saveAboutContent = (content) => {
  localStorage.setItem(STORAGE_KEYS.ABOUT_CONTENT, JSON.stringify(content));
};
