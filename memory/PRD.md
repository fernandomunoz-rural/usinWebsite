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
- **Database:** MongoDB
- **Deployment Target:** Vercel (Frontend) + Railway (Backend)

## Core Features

### Implemented (P0 - Complete)
- [x] Full landing page with all sections
- [x] Custom design system with UISN brand colors
- [x] FastAPI backend with MongoDB integration
- [x] All CMS API endpoints (programs, events, stats, about, impact stories, etc.)
- [x] Form submission API with database persistence
- [x] Frontend-Backend integration (replaced localStorage with API calls)
- [x] Admin authentication system
- [x] Admin panel with content managers for all sections
- [x] Custom program pages with unique application forms

### Pending (P1)
- [ ] Email notifications for form submissions (requires Gmail App Password)
- [ ] Deployment guide testing

### Future (P2)
- [ ] Deploy to Vercel + Railway
- [ ] Custom domain configuration

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
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
- `/app/frontend/src/utils/cmsStorage.js` - API integration layer
- `/app/frontend/src/App.js` - Main React app
- `/app/frontend/src/components/admin/*` - Admin panel components
- `/app/frontend/src/pages/ProgramDetail.jsx` - Program application forms

## Testing
- Backend: 100% pass rate (20/20 tests)
- Frontend: All sections display correctly with API data
- Forms: All submissions persist to database

## Last Updated
December 2025 - Backend migration complete, all tests passing
