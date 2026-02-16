// Simple CMS storage using localStorage
// In production, this would be replaced with a real backend API

const STORAGE_KEYS = {
  PROGRAMS: 'uisn_programs',
  EVENTS: 'uisn_events',
  ANNOUNCEMENTS: 'uisn_announcements',
  OPPORTUNITIES: 'uisn_opportunities',
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
      impact: '15+ universities',
      icon: 'Heart',
      color: 'secondary',
      active: true,
    },
    {
      id: '4',
      title: 'Environmental Action',
      description: 'Lead conservation projects including tree planting, trail maintenance, and community garden development.',
      frequency: 'Monthly',
      location: 'Statewide',
      impact: '10,000+ trees planted',
      icon: 'Trees',
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
