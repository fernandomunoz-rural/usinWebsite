from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB connection - optimized for cold starts
mongo_url = os.environ['MONGO_URL']
_client = None
_db = None

def get_db():
    global _client, _db
    if _client is None:
        logger.info("Creating MongoDB connection...")
        if mongo_url.startswith('mongodb+srv'):
            import certifi
            _client = AsyncIOMotorClient(
                mongo_url, 
                tlsCAFile=certifi.where(),
                maxPoolSize=5,
                minPoolSize=1,
                serverSelectionTimeoutMS=10000,
                connectTimeoutMS=10000,
                socketTimeoutMS=20000,
                retryWrites=True,
                w=1,  # Faster writes (don't wait for majority)
                journal=False,  # Faster for non-critical data
            )
        else:
            _client = AsyncIOMotorClient(
                mongo_url,
                maxPoolSize=5,
                minPoolSize=1,
                serverSelectionTimeoutMS=5000,
                connectTimeoutMS=5000
            )
        _db = _client[os.environ['DB_NAME']]
        logger.info("MongoDB connection created")
    return _db

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Health check endpoint - no DB required
@api_router.get("/health")
async def health_check():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}

# Warm up endpoint - lightweight DB ping
@api_router.get("/ping")
async def ping():
    try:
        database = get_db()
        await database.command('ping')
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        logger.error(f"Ping failed: {e}")
        return {"status": "ok", "db": "connecting"}

# Helper to get database - lazy initialization
def db():
    return get_db()

# ============ MODELS ============

class Program(BaseModel):
    id: str
    title: str
    description: str
    frequency: str
    location: str
    impact: str
    icon: str
    color: str
    active: bool
    slug: str

class Event(BaseModel):
    id: str
    title: str
    date: str
    time: Optional[str] = None
    location: str
    description: Optional[str] = None
    registrationLink: Optional[str] = None
    image: Optional[str] = None
    active: bool

class Announcement(BaseModel):
    id: str
    title: str
    content: str
    date: str
    priority: str
    active: bool

class Opportunity(BaseModel):
    id: str
    title: str
    description: str
    category: Optional[str] = None
    commitment: Optional[str] = None
    skills: List[str] = []
    active: bool

class Stat(BaseModel):
    id: str
    label: str
    value: str
    description: str
    icon: str
    color: str

class ImpactStory(BaseModel):
    id: str
    title: str
    description: str
    image: str
    active: bool

class AboutContent(BaseModel):
    mission: str
    story: str

class Settings(BaseModel):
    donateEnabled: bool
    emailNotifications: str

# Form Submissions
class FormSubmission(BaseModel):
    formType: str
    data: Dict[str, Any]
    submittedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============ EMAIL FUNCTION ============

async def send_email(subject: str, body: str, to_email: str = None):
    """Send email using Gmail SMTP"""
    try:
        from_email = os.environ.get('GMAIL_USER', 'utahintercollegiateservicenetw@gmail.com')
        password = os.environ.get('GMAIL_APP_PASSWORD', '')
        to_email = to_email or from_email
        
        if not password:
            logging.warning("No Gmail password configured. Email not sent.")
            return False
        
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, password)
        server.send_message(msg)
        server.quit()
        
        logging.info(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
        return False

# ============ CMS ENDPOINTS ============

# Programs
@api_router.get("/cms/programs", response_model=List[Program])
async def get_programs():
    programs = await db().programs.find({}, {"_id": 0}).to_list(100)
    return programs

@api_router.post("/cms/programs")
async def create_program(program: Program):
    await db().programs.insert_one(program.model_dump())
    return {"success": True}

@api_router.put("/cms/programs/{program_id}")
async def update_program(program_id: str, program: Program):
    await db().programs.update_one({"id": program_id}, {"$set": program.model_dump()})
    return {"success": True}

@api_router.delete("/cms/programs/{program_id}")
async def delete_program(program_id: str):
    await db().programs.delete_one({"id": program_id})
    return {"success": True}

# Events
@api_router.get("/cms/events", response_model=List[Event])
async def get_events():
    events = await db().events.find({}, {"_id": 0}).to_list(100)
    return events

@api_router.post("/cms/events")
async def create_event(event: Event):
    await db().events.insert_one(event.model_dump())
    return {"success": True}

@api_router.put("/cms/events/{event_id}")
async def update_event(event_id: str, event: Event):
    await db().events.update_one({"id": event_id}, {"$set": event.model_dump()})
    return {"success": True}

@api_router.delete("/cms/events/{event_id}")
async def delete_event(event_id: str):
    await db().events.delete_one({"id": event_id})
    return {"success": True}

# Stats
@api_router.get("/cms/stats", response_model=List[Stat])
async def get_stats():
    stats = await db().stats.find({}, {"_id": 0}).to_list(100)
    return stats

@api_router.put("/cms/stats/{stat_id}")
async def update_stat(stat_id: str, stat: Stat):
    await db().stats.update_one({"id": stat_id}, {"$set": stat.model_dump()})
    return {"success": True}

# Impact Stories
@api_router.get("/cms/impact-stories", response_model=List[ImpactStory])
async def get_impact_stories():
    stories = await db().impact_stories.find({}, {"_id": 0}).to_list(100)
    return stories

@api_router.post("/cms/impact-stories")
async def create_impact_story(story: ImpactStory):
    await db().impact_stories.insert_one(story.model_dump())
    return {"success": True}

@api_router.put("/cms/impact-stories/{story_id}")
async def update_impact_story(story_id: str, story: ImpactStory):
    await db().impact_stories.update_one({"id": story_id}, {"$set": story.model_dump()})
    return {"success": True}

@api_router.delete("/cms/impact-stories/{story_id}")
async def delete_impact_story(story_id: str):
    await db().impact_stories.delete_one({"id": story_id})
    return {"success": True}

# About Content
@api_router.get("/cms/about", response_model=AboutContent)
async def get_about():
    about = await db().about.find_one({}, {"_id": 0})
    if not about:
        return AboutContent(mission="", story="")
    return about

@api_router.put("/cms/about")
async def update_about(about: AboutContent):
    await db().about.replace_one({}, about.model_dump(), upsert=True)
    return {"success": True}

# Announcements
@api_router.get("/cms/announcements", response_model=List[Announcement])
async def get_announcements():
    announcements = await db().announcements.find({}, {"_id": 0}).to_list(100)
    return announcements

@api_router.post("/cms/announcements")
async def create_announcement(announcement: Announcement):
    await db().announcements.insert_one(announcement.model_dump())
    return {"success": True}

@api_router.put("/cms/announcements/{announcement_id}")
async def update_announcement(announcement_id: str, announcement: Announcement):
    await db().announcements.update_one({"id": announcement_id}, {"$set": announcement.model_dump()})
    return {"success": True}

@api_router.delete("/cms/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str):
    await db().announcements.delete_one({"id": announcement_id})
    return {"success": True}

# Opportunities
@api_router.get("/cms/opportunities", response_model=List[Opportunity])
async def get_opportunities():
    opportunities = await db().opportunities.find({}, {"_id": 0}).to_list(100)
    return opportunities

@api_router.post("/cms/opportunities")
async def create_opportunity(opportunity: Opportunity):
    await db().opportunities.insert_one(opportunity.model_dump())
    return {"success": True}

@api_router.put("/cms/opportunities/{opportunity_id}")
async def update_opportunity(opportunity_id: str, opportunity: Opportunity):
    await db().opportunities.update_one({"id": opportunity_id}, {"$set": opportunity.model_dump()})
    return {"success": True}

@api_router.delete("/cms/opportunities/{opportunity_id}")
async def delete_opportunity(opportunity_id: str):
    await db().opportunities.delete_one({"id": opportunity_id})
    return {"success": True}

# Settings
@api_router.get("/cms/settings", response_model=Settings)
async def get_settings():
    settings = await db().settings.find_one({}, {"_id": 0})
    if not settings:
        return Settings(donateEnabled=False, emailNotifications="utahintercollegiateservicenetw@gmail.com")
    return settings

@api_router.put("/cms/settings")
async def update_settings(settings: Settings):
    await db().settings.replace_one({}, settings.model_dump(), upsert=True)
    return {"success": True}

# Combined endpoint - fetch all CMS data in one request for faster loading
@api_router.get("/cms/all")
async def get_all_cms_data():
    """Fetch all CMS content in a single request for faster page load"""
    database = db()
    
    programs, events, stats, impact_stories, about, announcements, opportunities = await asyncio.gather(
        database.programs.find({}, {"_id": 0}).to_list(100),
        database.events.find({}, {"_id": 0}).to_list(100),
        database.stats.find({}, {"_id": 0}).to_list(100),
        database.impact_stories.find({}, {"_id": 0}).to_list(100),
        database.about.find_one({}, {"_id": 0}),
        database.announcements.find({}, {"_id": 0}).to_list(100),
        database.opportunities.find({}, {"_id": 0}).to_list(100),
    )
    
    return {
        "programs": programs,
        "events": events,
        "stats": stats,
        "impactStories": impact_stories,
        "about": about or {"mission": "", "story": ""},
        "announcements": announcements,
        "opportunities": opportunities,
    }

# Initialize CMS data
@api_router.post("/cms/initialize")
async def initialize_cms():
    """Initialize database with default data if empty"""
    # Check if data exists
    program_count = await db().programs.count_documents({})
    
    if program_count > 0:
        return {"message": "Data already exists"}
    
    # Insert default data (copy from cmsStorage.js DEFAULT_DATA)
    default_programs = [
        {"id": "1", "title": "Create a UISN Chapter at Your School", "description": "Start an official UISN chapter on your campus. Access toolkits, branding, and support to lead service initiatives locally and connect with other universities in Utah.", "frequency": "Year-round", "location": "Your Campus", "impact": "Statewide network", "icon": "GraduationCap", "color": "secondary", "active": True, "slug": "create-chapter"},
        {"id": "2", "title": "Host a UISN Service Event", "description": "Evening service-focused events including community projects, donation drives, and volunteering. Designed for students with busy schedules - 1–2 hours, low commitment, high impact.", "frequency": "Flexible", "location": "Your Community", "impact": "Quick & impactful", "icon": "Calendar", "color": "accent", "active": True, "slug": "service-event"},
        {"id": "3", "title": "Join the Utah Intercollegiate Service Network", "description": "Become part of a statewide student service coalition. Collaborate with students from other colleges, share resources, events, and impact reports.", "frequency": "Ongoing", "location": "Statewide", "impact": "9+ universities", "icon": "Heart", "color": "secondary", "active": True, "slug": "join-network"},
        {"id": "4", "title": "Join the UISN Leadership Team", "description": "Take on a leadership role within UISN and help shape the future of student service in Utah. Gain valuable experience, earn service hours, access possible stipends, and expand your network.", "frequency": "Ongoing Commitment", "location": "Statewide", "impact": "Leadership & Growth", "icon": "Users", "color": "accent", "active": True, "slug": "leadership"},
    ]
    await db().programs.insert_many(default_programs)
    
    default_stats = [
        {"id": "1", "label": "Active Volunteers", "value": "1,000+", "description": "Students making a difference", "icon": "Users", "color": "secondary"},
        {"id": "2", "label": "Service Hours", "value": "5,000+", "description": "Contributed since 2026", "icon": "Clock", "color": "accent"},
        {"id": "3", "label": "Community Partners", "value": "5", "description": "Organizations served", "icon": "Heart", "color": "secondary"},
        {"id": "4", "label": "Partner Universities", "value": "9+", "description": "Colleges across Utah", "icon": "TrendingUp", "color": "accent"},
    ]
    await db().stats.insert_many(default_stats)
    
    default_about = {
        "mission": "To mobilize and empower college students across Utah to serve their communities, develop leadership skills, and create lasting positive impact through coordinated volunteer initiatives that address real community needs.",
        "story": "Founded in 2026 at Snow College by a passionate group of students who saw the need for coordinated service across Utah's universities. With the support and guidance of UServeUtah, we launched UISN to create a statewide network where college students could collaborate on meaningful service projects. What started as a small group at Snow College has grown into a movement spanning 9+ universities, with over 1,000 active volunteers making a real difference in their communities."
    }
    await db().about.insert_one(default_about)
    
    # Insert default impact stories
    default_impact_stories = [
        {"id": "1", "title": "Building Community Together", "description": "In our first year, UISN volunteers have contributed over 5,000 hours of service across Utah communities.", "image": "https://images.unsplash.com/photo-1758599667729-a6f0f8bd213b?w=800&q=80", "active": True},
        {"id": "2", "title": "Growing Network", "description": "Started at Snow College, we've expanded to partner with 9 universities across Utah, creating a statewide movement.", "image": "https://images.unsplash.com/photo-1615856210162-9ae33390b1a2?w=800&q=80", "active": True},
        {"id": "3", "title": "Student-Led Impact", "description": "Over 1,000 student volunteers are actively participating in service projects, proving that young people can create lasting change.", "image": "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80", "active": True},
    ]
    await db().impact_stories.insert_many(default_impact_stories)
    
    # Insert default event
    default_events = [
        {"id": "1", "title": "Spring Kickoff Service Day", "date": "2026-03-15", "time": "9:00 AM - 3:00 PM", "location": "Salt Lake City", "description": "Join us for our inaugural service day! Multiple project sites available.", "registrationLink": "#", "active": True},
    ]
    await db().events.insert_many(default_events)
    
    return {"message": "Database initialized successfully"}

# ============ FORM SUBMISSIONS ============

@api_router.post("/forms/submit")
async def submit_form(submission: FormSubmission):
    """Handle all form submissions - optimized for speed"""
    try:
        # Save to database first (quick operation)
        doc = submission.model_dump()
        doc['submittedAt'] = doc['submittedAt'].isoformat()
        await db().form_submissions.insert_one(doc)
        
        # Prepare email (do not await - fire and forget)
        form_type = submission.formType
        data = submission.data
        
        # Format email based on form type
        if form_type == 'volunteer':
            subject = f"New Volunteer Registration - {data.get('name')}"
            body = f"""
New Volunteer Registration

Name: {data.get('name')}
Email: {data.get('email')}
Phone: {data.get('phone')}
University: {data.get('university')}
Area of Interest: {data.get('areaOfInterest')}
Availability: {', '.join(data.get('availability', []))}

Message:
{data.get('message', 'N/A')}
"""
        elif form_type == 'partner':
            subject = f"New Partnership Request - {data.get('organizationName')}"
            body = f"""
New Partnership Request

Organization: {data.get('organizationName')}
Contact: {data.get('contactName')}
Email: {data.get('email')}
Phone: {data.get('phone')}
Type: {data.get('organizationType')}

Message:
{data.get('message')}
"""
        elif form_type == 'newsletter':
            subject = f"New Newsletter Subscription - {data.get('email')}"
            body = f"""
New Newsletter Subscription

Email: {data.get('email')}
Subscribed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        elif form_type == 'contact':
            subject = f"Contact Form - {data.get('subject')}"
            body = f"""
Contact Form Submission

Name: {data.get('name')}
Email: {data.get('email')}
Subject: {data.get('subject')}

Message:
{data.get('message')}
"""
        elif form_type in ['chapter', 'event', 'network', 'leadership']:
            subject = f"Program Application - {form_type.title()} - {data.get('name', data.get('organizerName'))}"
            body = f"""
Program Application: {form_type.title()}

{chr(10).join([f'{k}: {v}' for k, v in data.items()])}
"""
        else:
            subject = f"Form Submission - {form_type}"
            body = str(data)
        
        # Send email in background (non-blocking)
        asyncio.create_task(send_email(subject, body, 'utahintercollegiateservicenetw@gmail.com'))
        
        return {"success": True, "message": "Form submitted successfully"}
    except Exception as e:
        logger.error(f"Form submission error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/forms/submissions")
async def get_submissions(form_type: Optional[str] = None):
    """Get all form submissions, optionally filtered by type"""
    query = {"formType": form_type} if form_type else {}
    submissions = await db().form_submissions.find(query, {"_id": 0}).sort("submittedAt", -1).to_list(1000)
    return submissions

# ============ INCLUDE ROUTER ============
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@app.on_event("shutdown")
async def shutdown_db_client():
    if _client:
        _client.close()
