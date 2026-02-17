"""
Admin CRUD Tests for UISN Landing Page CMS
Tests complete CRUD operations for events, programs, stats, announcements, and impact stories
"""

import pytest
import requests
import os
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestEventsCRUD:
    """Full CRUD tests for Events - /api/cms/events"""
    
    def test_create_event_and_verify_persistence(self):
        """Test creating a new event and verifying it persists"""
        # Create new event
        new_event = {
            "id": f"TEST_EVENT_{datetime.now().timestamp()}",
            "title": "TEST_Community Cleanup Day",
            "date": "2026-05-20",
            "time": "10:00 AM - 2:00 PM",
            "location": "Downtown Salt Lake City",
            "description": "Join us for a community cleanup event featuring mental health awareness workshops and donation drives.",
            "registrationLink": "https://example.com/register",
            "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            "active": True
        }
        
        # POST to create
        response = requests.post(
            f"{BASE_URL}/api/cms/events",
            json=new_event,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Failed to create event: {response.text}"
        data = response.json()
        assert data.get('success') == True, "Create response should indicate success"
        
        # GET to verify persistence
        get_response = requests.get(f"{BASE_URL}/api/cms/events")
        assert get_response.status_code == 200
        events = get_response.json()
        
        # Find our created event
        created_event = next((e for e in events if e['id'] == new_event['id']), None)
        assert created_event is not None, f"Created event not found in list. Event ID: {new_event['id']}"
        assert created_event['title'] == new_event['title']
        assert created_event['date'] == new_event['date']
        assert created_event['location'] == new_event['location']
        assert created_event['description'] == new_event['description']
        print(f"Event created and verified: {new_event['title']}")
        
        return new_event['id']
        
    def test_update_event_and_verify_changes(self):
        """Test updating an event and verifying changes persist"""
        # First create an event to update
        event_id = f"TEST_UPDATE_EVENT_{datetime.now().timestamp()}"
        create_event = {
            "id": event_id,
            "title": "TEST_Original Event Title",
            "date": "2026-06-01",
            "time": "9:00 AM",
            "location": "Original Location",
            "description": "Original description",
            "registrationLink": "",
            "active": True
        }
        
        # Create
        requests.post(f"{BASE_URL}/api/cms/events", json=create_event)
        
        # Update
        updated_event = {
            **create_event,
            "title": "TEST_Updated Event Title",
            "location": "Updated Location",
            "description": "Updated description with mental health awareness"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/cms/events/{event_id}",
            json=updated_event,
            headers={"Content-Type": "application/json"}
        )
        assert update_response.status_code == 200, f"Failed to update event: {update_response.text}"
        
        # GET to verify update persisted
        get_response = requests.get(f"{BASE_URL}/api/cms/events")
        events = get_response.json()
        
        updated = next((e for e in events if e['id'] == event_id), None)
        assert updated is not None, "Updated event not found"
        assert updated['title'] == "TEST_Updated Event Title", f"Title not updated: {updated['title']}"
        assert updated['location'] == "Updated Location", f"Location not updated: {updated['location']}"
        print(f"Event updated and verified: {event_id}")
        
    def test_delete_event_and_verify_removal(self):
        """Test deleting an event and verifying it's removed"""
        # Create event to delete
        event_id = f"TEST_DELETE_EVENT_{datetime.now().timestamp()}"
        create_event = {
            "id": event_id,
            "title": "TEST_Event To Delete",
            "date": "2026-07-01",
            "time": "12:00 PM",
            "location": "Delete Location",
            "description": "This event will be deleted",
            "registrationLink": "",
            "active": True
        }
        
        # Create
        requests.post(f"{BASE_URL}/api/cms/events", json=create_event)
        
        # Verify it exists
        get_before = requests.get(f"{BASE_URL}/api/cms/events")
        events_before = get_before.json()
        assert any(e['id'] == event_id for e in events_before), "Event should exist before delete"
        
        # Delete
        delete_response = requests.delete(f"{BASE_URL}/api/cms/events/{event_id}")
        assert delete_response.status_code == 200, f"Delete failed: {delete_response.text}"
        
        # Verify deletion
        get_after = requests.get(f"{BASE_URL}/api/cms/events")
        events_after = get_after.json()
        assert not any(e['id'] == event_id for e in events_after), "Event should not exist after delete"
        print(f"Event deleted and verified: {event_id}")


class TestStatsCRUD:
    """CRUD tests for Stats - /api/cms/stats"""
    
    def test_update_stat_and_verify(self):
        """Test updating a stat value"""
        # First get existing stats
        get_response = requests.get(f"{BASE_URL}/api/cms/stats")
        assert get_response.status_code == 200
        stats = get_response.json()
        
        assert len(stats) > 0, "No stats available to update"
        
        # Get first stat to update
        stat_to_update = stats[0]
        original_value = stat_to_update['value']
        
        # Update with new value
        updated_stat = {
            **stat_to_update,
            "value": "TEST_999+",
            "description": "TEST_Updated description"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/cms/stats/{stat_to_update['id']}",
            json=updated_stat,
            headers={"Content-Type": "application/json"}
        )
        assert update_response.status_code == 200, f"Failed to update stat: {update_response.text}"
        
        # Verify update
        get_after = requests.get(f"{BASE_URL}/api/cms/stats")
        stats_after = get_after.json()
        
        updated = next((s for s in stats_after if s['id'] == stat_to_update['id']), None)
        assert updated is not None, "Updated stat not found"
        assert updated['value'] == "TEST_999+", f"Value not updated: {updated['value']}"
        
        # Restore original value
        restore_stat = {**updated, "value": original_value, "description": stat_to_update['description']}
        requests.put(f"{BASE_URL}/api/cms/stats/{stat_to_update['id']}", json=restore_stat)
        print(f"Stat updated and verified, then restored: {stat_to_update['label']}")


class TestAnnouncementsCRUD:
    """Full CRUD tests for Announcements - /api/cms/announcements"""
    
    def test_create_announcement_and_verify(self):
        """Test creating a new announcement"""
        announcement_id = f"TEST_ANN_{datetime.now().timestamp()}"
        new_announcement = {
            "id": announcement_id,
            "title": "TEST_Important Update",
            "content": "This is a test announcement content.",
            "date": "2026-01-25",
            "priority": "high",
            "active": True
        }
        
        # Create
        response = requests.post(
            f"{BASE_URL}/api/cms/announcements",
            json=new_announcement,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Failed to create announcement: {response.text}"
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/cms/announcements")
        announcements = get_response.json()
        
        created = next((a for a in announcements if a['id'] == announcement_id), None)
        assert created is not None, "Created announcement not found"
        assert created['title'] == new_announcement['title']
        assert created['content'] == new_announcement['content']
        print(f"Announcement created: {announcement_id}")
        
        return announcement_id
        
    def test_update_announcement_and_verify(self):
        """Test updating an announcement"""
        # Create first
        announcement_id = f"TEST_UPDATE_ANN_{datetime.now().timestamp()}"
        create_ann = {
            "id": announcement_id,
            "title": "TEST_Original Title",
            "content": "Original content",
            "date": "2026-01-25",
            "priority": "medium",
            "active": True
        }
        requests.post(f"{BASE_URL}/api/cms/announcements", json=create_ann)
        
        # Update
        updated_ann = {
            **create_ann,
            "title": "TEST_Updated Announcement Title",
            "content": "Updated content",
            "priority": "high"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/cms/announcements/{announcement_id}",
            json=updated_ann
        )
        assert update_response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/cms/announcements")
        announcements = get_response.json()
        
        updated = next((a for a in announcements if a['id'] == announcement_id), None)
        assert updated is not None, "Updated announcement not found"
        assert updated['title'] == "TEST_Updated Announcement Title"
        assert updated['priority'] == "high"
        print(f"Announcement updated: {announcement_id}")
        
    def test_delete_announcement_and_verify(self):
        """Test deleting an announcement"""
        # Create
        announcement_id = f"TEST_DELETE_ANN_{datetime.now().timestamp()}"
        create_ann = {
            "id": announcement_id,
            "title": "TEST_To Delete",
            "content": "This will be deleted",
            "date": "2026-01-25",
            "priority": "low",
            "active": True
        }
        requests.post(f"{BASE_URL}/api/cms/announcements", json=create_ann)
        
        # Verify exists
        get_before = requests.get(f"{BASE_URL}/api/cms/announcements")
        assert any(a['id'] == announcement_id for a in get_before.json())
        
        # Delete
        delete_response = requests.delete(f"{BASE_URL}/api/cms/announcements/{announcement_id}")
        assert delete_response.status_code == 200
        
        # Verify deleted
        get_after = requests.get(f"{BASE_URL}/api/cms/announcements")
        assert not any(a['id'] == announcement_id for a in get_after.json())
        print(f"Announcement deleted: {announcement_id}")


class TestImpactStoriesCRUD:
    """Full CRUD tests for Impact Stories - /api/cms/impact-stories"""
    
    def test_create_impact_story_and_verify(self):
        """Test creating a new impact story"""
        story_id = f"TEST_STORY_{datetime.now().timestamp()}"
        new_story = {
            "id": story_id,
            "title": "TEST_Amazing Community Impact",
            "description": "This is a test impact story about our volunteers.",
            "image": "https://images.unsplash.com/photo-1593113630400-ea4288922497",
            "active": True
        }
        
        # Create
        response = requests.post(
            f"{BASE_URL}/api/cms/impact-stories",
            json=new_story,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200, f"Failed to create impact story: {response.text}"
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/cms/impact-stories")
        stories = get_response.json()
        
        created = next((s for s in stories if s['id'] == story_id), None)
        assert created is not None, "Created impact story not found"
        assert created['title'] == new_story['title']
        print(f"Impact story created: {story_id}")
        
        return story_id
        
    def test_update_impact_story_and_verify(self):
        """Test updating an impact story"""
        story_id = f"TEST_UPDATE_STORY_{datetime.now().timestamp()}"
        create_story = {
            "id": story_id,
            "title": "TEST_Original Story",
            "description": "Original description",
            "image": "https://example.com/image.jpg",
            "active": True
        }
        requests.post(f"{BASE_URL}/api/cms/impact-stories", json=create_story)
        
        # Update
        updated_story = {
            **create_story,
            "title": "TEST_Updated Story Title",
            "description": "Updated description with more details"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/cms/impact-stories/{story_id}",
            json=updated_story
        )
        assert update_response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/cms/impact-stories")
        stories = get_response.json()
        
        updated = next((s for s in stories if s['id'] == story_id), None)
        assert updated is not None
        assert updated['title'] == "TEST_Updated Story Title"
        print(f"Impact story updated: {story_id}")
        
    def test_delete_impact_story_and_verify(self):
        """Test deleting an impact story"""
        story_id = f"TEST_DELETE_STORY_{datetime.now().timestamp()}"
        create_story = {
            "id": story_id,
            "title": "TEST_To Delete Story",
            "description": "This will be deleted",
            "image": "https://example.com/image.jpg",
            "active": True
        }
        requests.post(f"{BASE_URL}/api/cms/impact-stories", json=create_story)
        
        # Verify exists
        get_before = requests.get(f"{BASE_URL}/api/cms/impact-stories")
        assert any(s['id'] == story_id for s in get_before.json())
        
        # Delete
        delete_response = requests.delete(f"{BASE_URL}/api/cms/impact-stories/{story_id}")
        assert delete_response.status_code == 200
        
        # Verify deleted
        get_after = requests.get(f"{BASE_URL}/api/cms/impact-stories")
        assert not any(s['id'] == story_id for s in get_after.json())
        print(f"Impact story deleted: {story_id}")


class TestAboutContentCRUD:
    """CRUD tests for About Content - /api/cms/about"""
    
    def test_update_about_content(self):
        """Test updating about content"""
        # Get original
        get_original = requests.get(f"{BASE_URL}/api/cms/about")
        original = get_original.json()
        
        # Update
        updated_about = {
            "mission": "TEST_Updated mission statement for UISN",
            "story": "TEST_Updated story about our organization"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/cms/about",
            json=updated_about,
            headers={"Content-Type": "application/json"}
        )
        assert update_response.status_code == 200
        
        # Verify
        get_after = requests.get(f"{BASE_URL}/api/cms/about")
        after = get_after.json()
        
        assert after['mission'] == updated_about['mission']
        assert after['story'] == updated_about['story']
        
        # Restore original
        requests.put(f"{BASE_URL}/api/cms/about", json=original)
        print("About content updated and restored")


class TestOpportunitiesCRUD:
    """Full CRUD tests for Opportunities - /api/cms/opportunities"""
    
    def test_create_opportunity_and_verify(self):
        """Test creating a new opportunity"""
        opp_id = f"TEST_OPP_{datetime.now().timestamp()}"
        new_opp = {
            "id": opp_id,
            "title": "TEST_New Volunteer Opportunity",
            "description": "Help organize community events",
            "category": "Events",
            "commitment": "Weekly",
            "skills": ["Communication", "Organization"],
            "active": True
        }
        
        # Create
        response = requests.post(
            f"{BASE_URL}/api/cms/opportunities",
            json=new_opp,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/cms/opportunities")
        opportunities = get_response.json()
        
        created = next((o for o in opportunities if o['id'] == opp_id), None)
        assert created is not None, "Created opportunity not found"
        assert created['title'] == new_opp['title']
        print(f"Opportunity created: {opp_id}")
        
    def test_update_opportunity_and_verify(self):
        """Test updating an opportunity"""
        opp_id = f"TEST_UPDATE_OPP_{datetime.now().timestamp()}"
        create_opp = {
            "id": opp_id,
            "title": "TEST_Original Opportunity",
            "description": "Original description",
            "category": "General",
            "commitment": "Monthly",
            "skills": [],
            "active": True
        }
        requests.post(f"{BASE_URL}/api/cms/opportunities", json=create_opp)
        
        # Update
        updated_opp = {
            **create_opp,
            "title": "TEST_Updated Opportunity",
            "description": "Updated description"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/cms/opportunities/{opp_id}",
            json=updated_opp
        )
        assert update_response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/cms/opportunities")
        opportunities = get_response.json()
        
        updated = next((o for o in opportunities if o['id'] == opp_id), None)
        assert updated is not None
        assert updated['title'] == "TEST_Updated Opportunity"
        print(f"Opportunity updated: {opp_id}")
        
    def test_delete_opportunity_and_verify(self):
        """Test deleting an opportunity"""
        opp_id = f"TEST_DELETE_OPP_{datetime.now().timestamp()}"
        create_opp = {
            "id": opp_id,
            "title": "TEST_To Delete Opp",
            "description": "This will be deleted",
            "category": "General",
            "commitment": "One-time",
            "skills": [],
            "active": True
        }
        requests.post(f"{BASE_URL}/api/cms/opportunities", json=create_opp)
        
        # Delete
        delete_response = requests.delete(f"{BASE_URL}/api/cms/opportunities/{opp_id}")
        assert delete_response.status_code == 200
        
        # Verify deleted
        get_after = requests.get(f"{BASE_URL}/api/cms/opportunities")
        assert not any(o['id'] == opp_id for o in get_after.json())
        print(f"Opportunity deleted: {opp_id}")


class TestEventDetailIntegration:
    """Test event detail page data retrieval"""
    
    def test_get_event_by_id_for_detail_page(self):
        """Verify events have all fields needed for event detail page"""
        # Create an event with all fields
        event_id = f"TEST_DETAIL_{datetime.now().timestamp()}"
        test_event = {
            "id": event_id,
            "title": "SnowServes - Community Action Day",
            "date": "2026-04-15",
            "time": "9:00 AM - 4:00 PM",
            "location": "Ephraim, Utah",
            "description": "Join us for mental health awareness sessions, community action projects, and donation drives. The event includes volunteer gala celebration.",
            "registrationLink": "https://example.com/snowserves",
            "image": "https://images.unsplash.com/photo-1593113630400-ea4288922497",
            "active": True
        }
        
        # Create
        requests.post(f"{BASE_URL}/api/cms/events", json=test_event)
        
        # Get all events and find ours
        response = requests.get(f"{BASE_URL}/api/cms/events")
        events = response.json()
        
        found_event = next((e for e in events if e['id'] == event_id), None)
        assert found_event is not None, "Test event not found"
        
        # Verify all required fields for EventDetail page
        assert 'id' in found_event
        assert 'title' in found_event
        assert 'date' in found_event
        assert 'time' in found_event
        assert 'location' in found_event
        assert 'description' in found_event
        assert 'active' in found_event
        
        # Verify description contains keywords that trigger highlights
        desc = found_event['description'].lower()
        assert 'mental health' in desc, "Description should contain 'mental health' for highlight"
        
        print(f"Event detail data verified: {event_id}")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/cms/events/{event_id}")


class TestSettingsCRUD:
    """Tests for Settings update - /api/cms/settings"""
    
    def test_update_settings_and_verify(self):
        """Test updating settings"""
        # Get original
        get_original = requests.get(f"{BASE_URL}/api/cms/settings")
        original = get_original.json()
        
        # Update
        updated_settings = {
            "donateEnabled": True,
            "emailNotifications": "test@example.com"
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/cms/settings",
            json=updated_settings
        )
        assert update_response.status_code == 200
        
        # Verify
        get_after = requests.get(f"{BASE_URL}/api/cms/settings")
        after = get_after.json()
        
        assert after['donateEnabled'] == True
        assert after['emailNotifications'] == "test@example.com"
        
        # Restore
        requests.put(f"{BASE_URL}/api/cms/settings", json=original)
        print("Settings updated and restored")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
