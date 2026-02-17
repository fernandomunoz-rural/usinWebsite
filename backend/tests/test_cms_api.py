"""
Backend API Tests for UISN Landing Page CMS
Tests all CMS endpoints and form submission functionality
"""

import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestCMSPrograms:
    """Tests for /api/cms/programs endpoint"""
    
    def test_get_programs_returns_list(self):
        """Verify programs endpoint returns a list"""
        response = requests.get(f"{BASE_URL}/api/cms/programs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Programs returned: {len(data)}")
    
    def test_get_programs_returns_4_default_programs(self):
        """Verify we have 4 default programs"""
        response = requests.get(f"{BASE_URL}/api/cms/programs")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 4, f"Expected at least 4 programs, got {len(data)}"
        
    def test_programs_have_required_fields(self):
        """Verify program structure has required fields"""
        response = requests.get(f"{BASE_URL}/api/cms/programs")
        assert response.status_code == 200
        data = response.json()
        assert len(data) > 0, "No programs returned"
        
        required_fields = ['id', 'title', 'description', 'frequency', 'location', 'impact', 'icon', 'color', 'active', 'slug']
        for program in data:
            for field in required_fields:
                assert field in program, f"Missing field '{field}' in program: {program.get('title', 'unknown')}"


class TestCMSStats:
    """Tests for /api/cms/stats endpoint"""
    
    def test_get_stats_returns_list(self):
        """Verify stats endpoint returns a list"""
        response = requests.get(f"{BASE_URL}/api/cms/stats")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Stats returned: {len(data)}")
        
    def test_get_stats_returns_4_stats(self):
        """Verify we have 4 stats"""
        response = requests.get(f"{BASE_URL}/api/cms/stats")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 4, f"Expected at least 4 stats, got {len(data)}"
        
    def test_stats_have_required_fields(self):
        """Verify stats have required fields"""
        response = requests.get(f"{BASE_URL}/api/cms/stats")
        assert response.status_code == 200
        data = response.json()
        assert len(data) > 0, "No stats returned"
        
        required_fields = ['id', 'label', 'value', 'description', 'icon', 'color']
        for stat in data:
            for field in required_fields:
                assert field in stat, f"Missing field '{field}' in stat"


class TestCMSAbout:
    """Tests for /api/cms/about endpoint"""
    
    def test_get_about_returns_content(self):
        """Verify about endpoint returns content"""
        response = requests.get(f"{BASE_URL}/api/cms/about")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        
    def test_about_has_mission_and_story(self):
        """Verify about has mission and story fields"""
        response = requests.get(f"{BASE_URL}/api/cms/about")
        assert response.status_code == 200
        data = response.json()
        assert 'mission' in data, "Missing 'mission' field"
        assert 'story' in data, "Missing 'story' field"
        assert len(data['mission']) > 0, "Mission content is empty"
        assert len(data['story']) > 0, "Story content is empty"


class TestCMSEvents:
    """Tests for /api/cms/events endpoint"""
    
    def test_get_events_returns_list(self):
        """Verify events endpoint returns a list"""
        response = requests.get(f"{BASE_URL}/api/cms/events")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Events returned: {len(data)}")


class TestCMSImpactStories:
    """Tests for /api/cms/impact-stories endpoint"""
    
    def test_get_impact_stories_returns_list(self):
        """Verify impact-stories endpoint returns a list"""
        response = requests.get(f"{BASE_URL}/api/cms/impact-stories")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Impact stories returned: {len(data)}")


class TestFormSubmission:
    """Tests for /api/forms/submit endpoint"""
    
    def test_volunteer_form_submission(self):
        """Test volunteer form submission"""
        form_data = {
            "formType": "volunteer",
            "data": {
                "name": "TEST_John Doe",
                "email": "test_volunteer@test.com",
                "phone": "(801) 555-0123",
                "university": "Test University",
                "areaOfInterest": "Education & Tutoring",
                "availability": ["Weekdays", "Evenings"],
                "message": "This is a test volunteer submission"
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/forms/submit",
            json=form_data,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data.get('success') == True
        assert 'message' in data
        
    def test_partner_form_submission(self):
        """Test partner form submission"""
        form_data = {
            "formType": "partner",
            "data": {
                "organizationName": "TEST_Community Center",
                "contactName": "Jane Smith",
                "email": "test_partner@test.com",
                "phone": "(801) 555-0456",
                "organizationType": "nonprofit",
                "message": "Test partnership request"
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/forms/submit",
            json=form_data,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data.get('success') == True
        
    def test_newsletter_form_submission(self):
        """Test newsletter subscription"""
        form_data = {
            "formType": "newsletter",
            "data": {
                "email": "test_newsletter@test.com"
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/forms/submit",
            json=form_data,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data.get('success') == True
        
    def test_contact_form_submission(self):
        """Test contact form submission"""
        form_data = {
            "formType": "contact",
            "data": {
                "name": "TEST_Contact User",
                "email": "test_contact@test.com",
                "subject": "Test Contact",
                "message": "This is a test contact message"
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/forms/submit",
            json=form_data,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data.get('success') == True
        
    def test_chapter_form_submission(self):
        """Test chapter application form"""
        form_data = {
            "formType": "chapter",
            "data": {
                "name": "TEST_Chapter Leader",
                "email": "test_chapter@test.com",
                "phone": "(801) 555-0789",
                "university": "Test University",
                "reason": "To expand service opportunities",
                "experience": "Student body president"
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/forms/submit",
            json=form_data,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data.get('success') == True
        
    def test_leadership_form_submission(self):
        """Test leadership application form"""
        form_data = {
            "formType": "leadership",
            "data": {
                "name": "TEST_Leadership Applicant",
                "email": "test_leadership@test.com",
                "phone": "(801) 555-1234",
                "university": "Test University",
                "leadershipExperience": "Club president for 2 years",
                "desiredRole": "ambassador",
                "commitment": "10-15",
                "skills": "Leadership, communication, project management",
                "vision": "To expand UISN to more campuses",
                "references": "John Doe - john@test.com"
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/forms/submit",
            json=form_data,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data.get('success') == True


class TestFormSubmissionRetrieval:
    """Tests for form submission retrieval"""
    
    def test_get_all_submissions(self):
        """Verify we can retrieve form submissions"""
        response = requests.get(f"{BASE_URL}/api/forms/submissions")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Total submissions: {len(data)}")
        
    def test_filter_submissions_by_type(self):
        """Verify we can filter submissions by form type"""
        response = requests.get(f"{BASE_URL}/api/forms/submissions?form_type=volunteer")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        # All returned submissions should be volunteer type
        for submission in data:
            assert submission.get('formType') == 'volunteer', f"Got non-volunteer submission: {submission.get('formType')}"


class TestCMSSettings:
    """Tests for /api/cms/settings endpoint"""
    
    def test_get_settings(self):
        """Verify settings endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/cms/settings")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        assert 'donateEnabled' in data
        assert 'emailNotifications' in data


class TestCMSInitialize:
    """Tests for CMS initialization"""
    
    def test_initialize_idempotent(self):
        """Verify initialize endpoint is idempotent"""
        # Call initialize twice - should not duplicate data
        response1 = requests.post(f"{BASE_URL}/api/cms/initialize")
        assert response1.status_code == 200
        
        response2 = requests.post(f"{BASE_URL}/api/cms/initialize")
        assert response2.status_code == 200
        
        # Should still have only 4 programs
        programs_response = requests.get(f"{BASE_URL}/api/cms/programs")
        programs = programs_response.json()
        assert len(programs) == 4, f"Expected 4 programs after double init, got {len(programs)}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
