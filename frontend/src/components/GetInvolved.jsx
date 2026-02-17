import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { UserPlus, Building2, Loader2 } from 'lucide-react';
import { submitForm } from '../utils/cmsStorage';

export const GetInvolved = () => {
  const [activeTab, setActiveTab] = useState('volunteer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    areaOfInterest: '',
    availability: [],
    message: '',
  });

  const [partnerForm, setPartnerForm] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    organizationType: '',
    message: '',
  });

  const areasOfInterest = [
    'Education & Tutoring',
    'Environmental Conservation',
    'Community Development',
    'Health & Wellness',
    'Leadership & Event Planning',
    'Social Justice & Advocacy',
    'Arts & Culture',
    'Technology & Innovation',
  ];

  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Flexible'];

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitForm('volunteer', volunteerForm);
      toast.success('Thank you for signing up! We\'ll contact you soon with more information.');
      setVolunteerForm({
        name: '',
        email: '',
        phone: '',
        university: '',
        areaOfInterest: '',
        availability: [],
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitForm('partner', partnerForm);
      toast.success('Thank you for your interest! Our partnerships team will reach out shortly.');
      setPartnerForm({
        organizationName: '',
        contactName: '',
        email: '',
        phone: '',
        organizationType: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'volunteer', label: 'Volunteer', icon: UserPlus },
    { id: 'partner', label: 'Partner', icon: Building2 },
  ];

  return (
    <section id="get-involved" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Get Involved</h2>
          <p className="section-subheading">
            There are many ways to support our mission. Whether you want to volunteer or partner with us,
            every contribution makes a difference.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Volunteer Form */}
        {activeTab === 'volunteer' && (
          <Card className="max-w-3xl mx-auto shadow-xl">
            <CardHeader className="bg-secondary/5 border-b">
              <CardTitle className="text-2xl text-primary flex items-center space-x-2">
                <UserPlus className="text-secondary" />
                <span>Volunteer Registration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                      placeholder="john@university.edu"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={volunteerForm.phone}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                      placeholder="(801) 555-0123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University *</Label>
                    <Input
                      id="university"
                      required
                      value={volunteerForm.university}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, university: e.target.value })}
                      placeholder="University of Utah"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areaOfInterest">Area of Interest *</Label>
                  <Select
                    value={volunteerForm.areaOfInterest}
                    onValueChange={(value) => setVolunteerForm({ ...volunteerForm, areaOfInterest: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your area of interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {areasOfInterest.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Availability *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {availabilityOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={volunteerForm.availability.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setVolunteerForm({
                                ...volunteerForm,
                                availability: [...volunteerForm.availability, option],
                              });
                            } else {
                              setVolunteerForm({
                                ...volunteerForm,
                                availability: volunteerForm.availability.filter((a) => a !== option),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Why do you want to volunteer?</Label>
                  <Textarea
                    id="message"
                    value={volunteerForm.message}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                    placeholder="Tell us about your interests and goals..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="lg"
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Partner Form */}
        {activeTab === 'partner' && (
          <Card className="max-w-3xl mx-auto shadow-xl">
            <CardHeader className="bg-accent/5 border-b">
              <CardTitle className="text-2xl text-primary flex items-center space-x-2">
                <Building2 className="text-accent" />
                <span>Partnership Application</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handlePartnerSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      required
                      value={partnerForm.organizationName}
                      onChange={(e) =>
                        setPartnerForm({ ...partnerForm, organizationName: e.target.value })
                      }
                      placeholder="Community Center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      required
                      value={partnerForm.contactName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                      placeholder="Jane Smith"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="partnerEmail">Email *</Label>
                    <Input
                      id="partnerEmail"
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      placeholder="contact@organization.org"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partnerPhone">Phone Number *</Label>
                    <Input
                      id="partnerPhone"
                      type="tel"
                      required
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      placeholder="(801) 555-0123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgType">Organization Type *</Label>
                  <Select
                    value={partnerForm.organizationType}
                    onValueChange={(value) =>
                      setPartnerForm({ ...partnerForm, organizationType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nonprofit">Non-Profit</SelectItem>
                      <SelectItem value="government">Government Agency</SelectItem>
                      <SelectItem value="school">Educational Institution</SelectItem>
                      <SelectItem value="community">Community Group</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnerMessage">Partnership Opportunity *</Label>
                  <Textarea
                    id="partnerMessage"
                    required
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    placeholder="Describe the volunteer opportunities you can offer..."
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  Submit Partnership Request
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default GetInvolved;
