// CMS storage using backend API
// Replaces localStorage with real database persistence

const API_BASE = process.env.REACT_APP_BACKEND_URL;

// Cache for combined data to avoid multiple API calls
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 30000; // 30 seconds cache

// Default data for fallback when API is unavailable
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
      slug: 'create-chapter',
    },
    {
      id: '2',
      title: 'Host a UISN Service Event',
      description: 'Evening service-focused events including community projects, donation drives, and volunteering. Designed for students with busy schedules - 1–2 hours, low commitment, high impact.',
      frequency: 'Flexible',
      location: 'Your Community',
      impact: 'Quick & impactful',
      icon: 'Calendar',
      color: 'accent',
      active: true,
      slug: 'service-event',
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
      slug: 'join-network',
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
      slug: 'leadership',
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
      description: "Started at Snow College, we've expanded to partner with 9 universities across Utah, creating a statewide movement.",
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
    story: "Founded in 2026 at Snow College by a passionate group of students who saw the need for coordinated service across Utah's universities. With the support and guidance of UServeUtah, we launched UISN to create a statewide network where college students could collaborate on meaningful service projects. What started as a small group at Snow College has grown into a movement spanning 9+ universities, with over 1,000 active volunteers making a real difference in their communities.",
  },
  settings: {
    donateEnabled: false,
    emailNotifications: 'utahintercollegiateservicenetw@gmail.com',
  },
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Initialize storage - now calls backend to ensure data exists
export const initializeStorage = async () => {
  try {
    await apiCall('/cms/initialize', { method: 'POST' });
  } catch (error) {
    console.warn('Failed to initialize storage:', error);
  }
};

// Fetch all CMS data in a single request for faster loading
export const getAllCMSData = async () => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedData && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedData;
  }
  
  try {
    const data = await apiCall('/cms/all');
    cachedData = data;
    cacheTimestamp = now;
    return data;
  } catch (error) {
    console.error('Failed to fetch all CMS data:', error);
    return {
      programs: DEFAULT_DATA.programs,
      events: DEFAULT_DATA.events,
      stats: DEFAULT_DATA.stats,
      impactStories: DEFAULT_DATA.impactStories,
      about: DEFAULT_DATA.aboutContent,
      announcements: DEFAULT_DATA.announcements,
      opportunities: DEFAULT_DATA.opportunities,
    };
  }
};

// Clear cache (call this after any CMS update)
export const clearCache = () => {
  cachedData = null;
  cacheTimestamp = null;
};

// Programs
export const getPrograms = async () => {
  try {
    // Try to use cached data first
    if (cachedData && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      return cachedData.programs;
    }
    return await apiCall('/cms/programs');
  } catch (error) {
    return DEFAULT_DATA.programs;
  }
};

export const savePrograms = async (programs) => {
  // Not used directly - use add/update/delete instead
  console.warn('savePrograms is deprecated. Use addProgram, updateProgram, or deleteProgram instead.');
};

export const addProgram = async (program) => {
  const newProgram = {
    ...program,
    id: Date.now().toString(),
    active: true,
  };
  await apiCall('/cms/programs', {
    method: 'POST',
    body: JSON.stringify(newProgram),
  });
  return newProgram;
};

export const updateProgram = async (id, updates) => {
  const programs = await getPrograms();
  const existing = programs.find((p) => p.id === id);
  if (existing) {
    const updated = { ...existing, ...updates };
    await apiCall(`/cms/programs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
  }
};

export const deleteProgram = async (id) => {
  await apiCall(`/cms/programs/${id}`, { method: 'DELETE' });
};

// Events
export const getEvents = async () => {
  try {
    return await apiCall('/cms/events');
  } catch (error) {
    return DEFAULT_DATA.events;
  }
};

export const saveEvents = async (events) => {
  console.warn('saveEvents is deprecated. Use addEvent, updateEvent, or deleteEvent instead.');
};

export const addEvent = async (event) => {
  const newEvent = {
    ...event,
    id: Date.now().toString(),
    active: true,
  };
  await apiCall('/cms/events', {
    method: 'POST',
    body: JSON.stringify(newEvent),
  });
  return newEvent;
};

export const updateEvent = async (id, updates) => {
  const events = await getEvents();
  const existing = events.find((e) => e.id === id);
  if (existing) {
    const updated = { ...existing, ...updates };
    await apiCall(`/cms/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
  }
};

export const deleteEvent = async (id) => {
  await apiCall(`/cms/events/${id}`, { method: 'DELETE' });
};

// Announcements
export const getAnnouncements = async () => {
  try {
    return await apiCall('/cms/announcements');
  } catch (error) {
    return DEFAULT_DATA.announcements;
  }
};

export const saveAnnouncements = async (announcements) => {
  console.warn('saveAnnouncements is deprecated. Use addAnnouncement, updateAnnouncement, or deleteAnnouncement instead.');
};

export const addAnnouncement = async (announcement) => {
  const newAnnouncement = {
    ...announcement,
    id: Date.now().toString(),
    active: true,
    date: new Date().toISOString().split('T')[0],
  };
  await apiCall('/cms/announcements', {
    method: 'POST',
    body: JSON.stringify(newAnnouncement),
  });
  return newAnnouncement;
};

export const updateAnnouncement = async (id, updates) => {
  const announcements = await getAnnouncements();
  const existing = announcements.find((a) => a.id === id);
  if (existing) {
    const updated = { ...existing, ...updates };
    await apiCall(`/cms/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
  }
};

export const deleteAnnouncement = async (id) => {
  await apiCall(`/cms/announcements/${id}`, { method: 'DELETE' });
};

// Opportunities
export const getOpportunities = async () => {
  try {
    return await apiCall('/cms/opportunities');
  } catch (error) {
    return DEFAULT_DATA.opportunities;
  }
};

export const saveOpportunities = async (opportunities) => {
  console.warn('saveOpportunities is deprecated. Use addOpportunity, updateOpportunity, or deleteOpportunity instead.');
};

export const addOpportunity = async (opportunity) => {
  const newOpportunity = {
    ...opportunity,
    id: Date.now().toString(),
    active: true,
  };
  await apiCall('/cms/opportunities', {
    method: 'POST',
    body: JSON.stringify(newOpportunity),
  });
  return newOpportunity;
};

export const updateOpportunity = async (id, updates) => {
  const opportunities = await getOpportunities();
  const existing = opportunities.find((o) => o.id === id);
  if (existing) {
    const updated = { ...existing, ...updates };
    await apiCall(`/cms/opportunities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
  }
};

export const deleteOpportunity = async (id) => {
  await apiCall(`/cms/opportunities/${id}`, { method: 'DELETE' });
};

// Stats
export const getStats = async () => {
  try {
    return await apiCall('/cms/stats');
  } catch (error) {
    return DEFAULT_DATA.stats;
  }
};

export const saveStats = async (stats) => {
  console.warn('saveStats is deprecated. Use updateStat instead.');
};

export const updateStat = async (id, updates) => {
  const stats = await getStats();
  const existing = stats.find((s) => s.id === id);
  if (existing) {
    const updated = { ...existing, ...updates };
    await apiCall(`/cms/stats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
  }
};

// Impact Stories
export const getImpactStories = async () => {
  try {
    return await apiCall('/cms/impact-stories');
  } catch (error) {
    return DEFAULT_DATA.impactStories;
  }
};

export const saveImpactStories = async (stories) => {
  console.warn('saveImpactStories is deprecated. Use addImpactStory, updateImpactStory, or deleteImpactStory instead.');
};

export const addImpactStory = async (story) => {
  const newStory = {
    ...story,
    id: Date.now().toString(),
    active: true,
  };
  await apiCall('/cms/impact-stories', {
    method: 'POST',
    body: JSON.stringify(newStory),
  });
  return newStory;
};

export const updateImpactStory = async (id, updates) => {
  const stories = await getImpactStories();
  const existing = stories.find((s) => s.id === id);
  if (existing) {
    const updated = { ...existing, ...updates };
    await apiCall(`/cms/impact-stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
  }
};

export const deleteImpactStory = async (id) => {
  await apiCall(`/cms/impact-stories/${id}`, { method: 'DELETE' });
};

// About Content
export const getAboutContent = async () => {
  try {
    return await apiCall('/cms/about');
  } catch (error) {
    return DEFAULT_DATA.aboutContent;
  }
};

export const saveAboutContent = async (content) => {
  await apiCall('/cms/about', {
    method: 'PUT',
    body: JSON.stringify(content),
  });
};

// Settings
export const getSettings = async () => {
  try {
    return await apiCall('/cms/settings');
  } catch (error) {
    return DEFAULT_DATA.settings;
  }
};

export const saveSettings = async (settings) => {
  await apiCall('/cms/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
};

// Form Submissions
export const submitForm = async (formType, data) => {
  return await apiCall('/forms/submit', {
    method: 'POST',
    body: JSON.stringify({ formType, data }),
  });
};
