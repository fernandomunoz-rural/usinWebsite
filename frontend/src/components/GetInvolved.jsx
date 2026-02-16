import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { UserPlus, Building2, DollarSign, Calendar } from 'lucide-react';

export const GetInvolved = () => {
  const [activeTab, setActiveTab] = useState('volunteer');
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    program: '',
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

  const [donationAmount, setDonationAmount] = useState('50');

  const programs = [
    'Education Initiative',
    'Environmental Action',
    'Housing for All',
    'Health & Wellness',
  ];

  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Flexible'];

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    // Mock submission - in a real app, this would send to backend
    toast.success('Thank you for signing up! We\'ll contact you soon with more information.');
    setVolunteerForm({
      name: '',
      email: '',
      phone: '',
      university: '',
      program: '',
      availability: [],
      message: '',
    });
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your interest! Our partnerships team will reach out shortly.');
    setPartnerForm({
      organizationName: '',
      contactName: '',
      email: '',
      phone: '',
      organizationType: '',
      message: '',
    });
  };

  const handleDonation = () => {
    toast.success(`Thank you for your ${donationAmount === 'custom' ? 'generous' : '$' + donationAmount} donation commitment! Redirecting to payment...`);
  };

  const tabs = [
    { id: 'volunteer', label: 'Volunteer', icon: UserPlus },
    { id: 'partner', label: 'Partner', icon: Building2 },
    { id: 'donate', label: 'Donate', icon: DollarSign },
  ];

  return (
    <section id="get-involved" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Get Involved</h2>
          <p className="section-subheading">
            There are many ways to support our mission. Whether you want to volunteer, partner with us,
            or make a donation, every contribution makes a difference.
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
                  <Label htmlFor="program">Preferred Program *</Label>
                  <Select
                    value={volunteerForm.program}
                    onValueChange={(value) => setVolunteerForm({ ...volunteerForm, program: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
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

        {/* Donation Section */}
        {activeTab === 'donate' && (
          <Card className="max-w-3xl mx-auto shadow-xl">
            <CardHeader className="bg-secondary/5 border-b">
              <CardTitle className="text-2xl text-primary flex items-center space-x-2">
                <DollarSign className="text-secondary" />
                <span>Make a Donation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Your generous donation helps us provide resources, training, and support to thousands of
                  student volunteers making a difference in Utah communities.
                </p>

                <div className="space-y-4">
                  <Label>Select Donation Amount</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['25', '50', '100', '250'].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className={`p-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                          donationAmount === amount
                            ? 'border-secondary bg-secondary/10 text-secondary'
                            : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setDonationAmount('custom')}
                    className={`w-full p-4 rounded-lg border-2 font-semibold transition-all duration-300 ${
                      donationAmount === 'custom'
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-border hover:border-secondary/50'
                    }`}
                  >
                    Custom Amount
                  </button>
                </div>

                <div className="bg-muted rounded-lg p-6 space-y-3">
                  <h4 className="font-semibold text-primary">Your Impact:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• $25 provides supplies for 10 volunteers</li>
                    <li>• $50 funds a community service project</li>
                    <li>• $100 supports volunteer training programs</li>
                    <li>• $250 sponsors a month of operations</li>
                  </ul>
                </div>

                <Button
                  onClick={handleDonation}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="lg"
                >
                  Proceed to Donation
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  UISN is a registered 501(c)(3) non-profit. All donations are tax-deductible.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default GetInvolved;
