# UISN Landing Page - Product Requirements Document

## Overview
A modern, user-friendly landing page and CMS for the **Utah Intercollegiate Service Network (UISN)**, a non-profit organization connecting college students across Utah for volunteer service.

## Original Problem Statement
Create a multi-section landing page with:
- Hero, About, Programs, Events, Impact/Stats, Testimonials, Contact, Newsletter sections
- Content Management System (CMS) for admins to update website content
- Admin authentication with "UISN Council" access
- Database persistence for all content and form submissions
- Custom program pages with unique application forms
- Email notifications for form submissions (to utahintercollegiateservicenetw@gmail.com)

## Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn/ui, react-router-dom
- **Backend:** Python, FastAPI, Pydantic, motor (async MongoDB)
- **Database:** MongoDB (Atlas for production)
- **Deployment:** Netlify (Frontend) + Railway (Backend)

## Deployment Status
- ✅ **Backend:** Successfully deployed on Railway
- ✅ **Frontend:** Successfully deployed on Netlify
- ✅ **Database:** MongoDB Atlas connected
- ✅ **Email:** Gmail SMTP working

## Core Features

### Implemented (Complete)
- [x] Full landing page with all sections
- [x] Custom design system with UISN brand colors
- [x] FastAPI backend with MongoDB integration
- [x] All CMS API endpoints (programs, events, stats, about, impact stories, etc.)
- [x] Combined `/api/cms/all` endpoint for faster loading
- [x] Form submission API with database persistence
- [x] Email notifications for form submissions
- [x] Frontend-Backend integration with caching layer
- [x] Admin authentication system
- [x] Admin panel with content managers for all sections
- [x] Custom program pages with unique application forms
- [x] Dynamic event detail pages (/event/:id)
- [x] UISN logo in hero section
- [x] SnowServes event with building image
- [x] Loading skeletons for better UX
- [x] Mobile responsive design (all sections)

### Future (P2)
- [ ] Custom domain configuration
- [ ] Form submissions dashboard in admin panel
- [ ] Social sharing for events

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cms/all` | GET | Fetch all CMS data (optimized) |
| `/api/cms/programs` | GET, POST, PUT, DELETE | Manage programs |
| `/api/cms/events` | GET, POST, PUT, DELETE | Manage events |
| `/api/cms/stats` | GET, PUT | Manage statistics |
| `/api/cms/about` | GET, PUT | Manage about content |
| `/api/cms/impact-stories` | GET, POST, PUT, DELETE | Manage impact stories |
| `/api/cms/announcements` | GET, POST, PUT, DELETE | Manage announcements |
| `/api/cms/opportunities` | GET, POST, PUT, DELETE | Manage opportunities |
| `/api/cms/settings` | GET, PUT | Manage site settings |
| `/api/cms/initialize` | POST | Initialize database with defaults |
| `/api/forms/submit` | POST | Submit any form type |
| `/api/forms/submissions` | GET | View form submissions |

## Database Collections
- `programs`, `events`, `announcements`, `opportunities`
- `stats`, `impact_stories`, `about`, `settings`
- `form_submissions`

## Admin Credentials
- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `uisn2026`

## Key Files
- `/app/backend/server.py` - FastAPI backend
- `/app/frontend/src/utils/cmsStorage.js` - API integration layer with caching
- `/app/frontend/src/App.js` - Main React app
- `/app/frontend/src/components/admin/*` - Admin panel components
- `/app/frontend/src/pages/ProgramDetail.jsx` - Program application forms
- `/app/frontend/src/pages/EventDetail.jsx` - Dynamic event detail page

## Performance Optimizations (Feb 2026)
- Added combined `/api/cms/all` endpoint
- Implemented client-side caching (30s cache duration)
- Added MongoDB connection pooling
- Added loading skeletons for better perceived performance
- Prefetch CMS data on app initialization

## Testing Status
- Backend: All endpoints working
- Frontend: All sections display correctly with API data
- Admin Panel: All CRUD operations working
- Forms: All submissions persist to database and trigger emails
- Mobile: Responsive design verified

## Last Updated
February 2026 - Performance optimizations, loading states, mobile responsive fixes, form submissions fixed, donate button removed
