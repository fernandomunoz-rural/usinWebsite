import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllCMSData } from '../utils/cmsStorage';

const CMSContext = createContext(null);

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export const CMSProvider = ({ children }) => {
  const [data, setData] = useState({
    programs: [],
    events: [],
    stats: [],
    impactStories: [],
    about: { mission: '', story: '' },
    announcements: [],
    opportunities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cmsData = await getAllCMSData();
        setData(cmsData);
      } catch (err) {
        console.error('Failed to load CMS data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const cmsData = await getAllCMSData();
      setData(cmsData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CMSContext.Provider value={{ ...data, loading, error, refreshData }}>
      {children}
    </CMSContext.Provider>
  );
};

export default CMSContext;
