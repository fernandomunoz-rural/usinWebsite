import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, MapPin, Send } from 'lucide-react';
import { getPrograms, submitForm } from '../utils/cmsStorage';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const ProgramDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  
  // Different forms for different programs
  const [chapterForm, setChapterForm] = useState({
    name: '', email: '', phone: '', university: '', reason: '', experience: '',
  });

  const [eventForm, setEventForm] = useState({
    organizerName: '', email: '', phone: '', university: '',
    eventTitle: '', eventDate: '', eventTime: '', eventLocation: '',
    eventDescription: '', needVolunteers: false, volunteersNeeded: '',
    additionalInfo: '',
  });

  const [networkForm, setNetworkForm] = useState({
    name: '', email: '', phone: '', university: '',
    areasOfInterest: [], availability: [], whyJoin: '',
  });

  const [leadershipForm, setLeadershipForm] = useState({
    name: '', email: '', phone: '', university: '',
    leadershipExperience: '', desiredRole: '', commitment: '',
    skills: '', vision: '', references: '',
  });

  useEffect(() => {
    const loadProgram = async () => {
      const programs = await getPrograms();
      const foundProgram = programs.find(p => p.slug === slug || p.id === slug);
      if (foundProgram) {
        setProgram(foundProgram);
      }
    };
    loadProgram();
  }, [slug]);

  const handleChapterSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm('chapter', chapterForm);
      toast.success('Chapter application submitted! We\'ll contact you soon.');
      setChapterForm({ name: '', email: '', phone: '', university: '', reason: '', experience: '' });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm('event', eventForm);
      toast.success('Event submitted for official support! We\'ll help promote it.');
      setEventForm({
        organizerName: '', email: '', phone: '', university: '',
        eventTitle: '', eventDate: '', eventTime: '', eventLocation: '',
        eventDescription: '', needVolunteers: false, volunteersNeeded: '', additionalInfo: '',
      });
    } catch (error) {
      toast.error('Failed to submit event. Please try again.');
    }
  };

  const handleNetworkSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm('network', networkForm);
      toast.success('Welcome to UISN! We\'ll send you onboarding information.');
      setNetworkForm({ name: '', email: '', phone: '', university: '', areasOfInterest: [], availability: [], whyJoin: '' });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const handleLeadershipSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitForm('leadership', leadershipForm);
      toast.success('Leadership application submitted! We\'ll review and contact you.');
      setLeadershipForm({ name: '', email: '', phone: '', university: '', leadershipExperience: '', desiredRole: '', commitment: '', skills: '', vision: '', references: '' });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const areasOfInterest = [
    'Education & Tutoring', 'Environmental Conservation', 'Community Development',
    'Health & Wellness', 'Leadership & Event Planning', 'Social Justice & Advocacy'
  ];

  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Flexible'];

  if (!program) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-muted-foreground">Loading...</p></div>;
  }

  const renderForm = () => {
    // Create Chapter Form
    if (slug === 'create-chapter') {
      return (
        <form onSubmit={handleChapterSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Full Name *</Label><Input required value={chapterForm.name} onChange={(e) => setChapterForm({...chapterForm, name: e.target.value})} placeholder="John Doe" /></div>
            <div className="space-y-2"><Label>Email *</Label><Input type="email" required value={chapterForm.email} onChange={(e) => setChapterForm({...chapterForm, email: e.target.value})} placeholder="john@university.edu" /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Phone *</Label><Input type="tel" required value={chapterForm.phone} onChange={(e) => setChapterForm({...chapterForm, phone: e.target.value})} placeholder="(801) 555-0123" /></div>
            <div className="space-y-2"><Label>University *</Label><Input required value={chapterForm.university} onChange={(e) => setChapterForm({...chapterForm, university: e.target.value})} placeholder="Snow College" /></div>
          </div>
          <div className="space-y-2"><Label>Why start a UISN chapter? *</Label><Textarea required value={chapterForm.reason} onChange={(e) => setChapterForm({...chapterForm, reason: e.target.value})} rows={4} /></div>
          <div className="space-y-2"><Label>Leadership Experience</Label><Textarea value={chapterForm.experience} onChange={(e) => setChapterForm({...chapterForm, experience: e.target.value})} rows={3} /></div>
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">Submit Application <Send className="ml-2" size={16} /></Button>
        </form>
      );
    }

    // Host Service Event Form
    if (slug === 'service-event') {
      return (
        <form onSubmit={handleEventSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Your Name *</Label><Input required value={eventForm.organizerName} onChange={(e) => setEventForm({...eventForm, organizerName: e.target.value})} /></div>
            <div className="space-y-2"><Label>Email *</Label><Input type="email" required value={eventForm.email} onChange={(e) => setEventForm({...eventForm, email: e.target.value})} /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Phone *</Label><Input type="tel" required value={eventForm.phone} onChange={(e) => setEventForm({...eventForm, phone: e.target.value})} /></div>
            <div className="space-y-2"><Label>University *</Label><Input required value={eventForm.university} onChange={(e) => setEventForm({...eventForm, university: e.target.value})} /></div>
          </div>
          
          <div className="border-t pt-6"><h3 className="text-xl font-bold text-primary mb-4">Event Details</h3></div>
          
          <div className="space-y-2"><Label>Event Title *</Label><Input required value={eventForm.eventTitle} onChange={(e) => setEventForm({...eventForm, eventTitle: e.target.value})} placeholder="Community Clean-Up Day" /></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2"><Label>Date *</Label><Input type="date" required value={eventForm.eventDate} onChange={(e) => setEventForm({...eventForm, eventDate: e.target.value})} /></div>
            <div className="space-y-2"><Label>Time *</Label><Input type="time" required value={eventForm.eventTime} onChange={(e) => setEventForm({...eventForm, eventTime: e.target.value})} /></div>
            <div className="space-y-2"><Label>Duration</Label><Input value={eventForm.eventLocation} onChange={(e) => setEventForm({...eventForm, eventLocation: e.target.value})} placeholder="2 hours" /></div>
          </div>
          <div className="space-y-2"><Label>Location *</Label><Input required value={eventForm.eventLocation} onChange={(e) => setEventForm({...eventForm, eventLocation: e.target.value})} placeholder="City Park, Salt Lake City" /></div>
          <div className="space-y-2"><Label>Event Description *</Label><Textarea required value={eventForm.eventDescription} onChange={(e) => setEventForm({...eventForm, eventDescription: e.target.value})} rows={5} placeholder="Describe what the event is about, what you'll be doing, and why it matters..." /></div>
          
          <div className="space-y-4 bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Checkbox id="needVol" checked={eventForm.needVolunteers} onCheckedChange={(checked) => setEventForm({...eventForm, needVolunteers: checked})} />
              <Label htmlFor="needVol" className="cursor-pointer font-semibold">I need UISN volunteers for this event</Label>
            </div>
            {eventForm.needVolunteers && (
              <div className="space-y-2 ml-6"><Label>How many volunteers? *</Label><Input type="number" required value={eventForm.volunteersNeeded} onChange={(e) => setEventForm({...eventForm, volunteersNeeded: e.target.value})} placeholder="10" /></div>
            )}
          </div>
          
          <div className="space-y-2"><Label>Additional Information</Label><Textarea value={eventForm.additionalInfo} onChange={(e) => setEventForm({...eventForm, additionalInfo: e.target.value})} rows={3} placeholder="Any other details, requirements, or notes..." /></div>
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">Submit Event for Official Support <Send className="ml-2" size={16} /></Button>
        </form>
      );
    }

    // Join Network Form
    if (slug === 'join-network') {
      return (
        <form onSubmit={handleNetworkSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Full Name *</Label><Input required value={networkForm.name} onChange={(e) => setNetworkForm({...networkForm, name: e.target.value})} /></div>
            <div className="space-y-2"><Label>Email *</Label><Input type="email" required value={networkForm.email} onChange={(e) => setNetworkForm({...networkForm, email: e.target.value})} /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Phone *</Label><Input type="tel" required value={networkForm.phone} onChange={(e) => setNetworkForm({...networkForm, phone: e.target.value})} /></div>
            <div className="space-y-2"><Label>University *</Label><Input required value={networkForm.university} onChange={(e) => setNetworkForm({...networkForm, university: e.target.value})} /></div>
          </div>
          
          <div className="space-y-2">
            <Label>Areas of Interest * (Select all that apply)</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {areasOfInterest.map(area => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox id={area} checked={networkForm.areasOfInterest.includes(area)} onCheckedChange={(checked) => {
                    if (checked) setNetworkForm({...networkForm, areasOfInterest: [...networkForm.areasOfInterest, area]});
                    else setNetworkForm({...networkForm, areasOfInterest: networkForm.areasOfInterest.filter(a => a !== area)});
                  }} />
                  <Label htmlFor={area} className="cursor-pointer text-sm">{area}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Availability *</Label>
            <div className="grid grid-cols-2 gap-3">
              {availabilityOptions.map(opt => (
                <div key={opt} className="flex items-center space-x-2">
                  <Checkbox id={opt} checked={networkForm.availability.includes(opt)} onCheckedChange={(checked) => {
                    if (checked) setNetworkForm({...networkForm, availability: [...networkForm.availability, opt]});
                    else setNetworkForm({...networkForm, availability: networkForm.availability.filter(a => a !== opt)});
                  }} />
                  <Label htmlFor={opt} className="cursor-pointer">{opt}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2"><Label>Why do you want to join UISN? *</Label><Textarea required value={networkForm.whyJoin} onChange={(e) => setNetworkForm({...networkForm, whyJoin: e.target.value})} rows={4} /></div>
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">Join the Network <Send className="ml-2" size={16} /></Button>
        </form>
      );
    }

    // Leadership Team Form
    if (slug === 'leadership') {
      return (
        <form onSubmit={handleLeadershipSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Full Name *</Label><Input required value={leadershipForm.name} onChange={(e) => setLeadershipForm({...leadershipForm, name: e.target.value})} /></div>
            <div className="space-y-2"><Label>Email *</Label><Input type="email" required value={leadershipForm.email} onChange={(e) => setLeadershipForm({...leadershipForm, email: e.target.value})} /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Phone *</Label><Input type="tel" required value={leadershipForm.phone} onChange={(e) => setLeadershipForm({...leadershipForm, phone: e.target.value})} /></div>
            <div className="space-y-2"><Label>University *</Label><Input required value={leadershipForm.university} onChange={(e) => setLeadershipForm({...leadershipForm, university: e.target.value})} /></div>
          </div>
          
          <div className="space-y-2"><Label>Leadership Experience *</Label><Textarea required value={leadershipForm.leadershipExperience} onChange={(e) => setLeadershipForm({...leadershipForm, leadershipExperience: e.target.value})} rows={4} placeholder="Describe your previous leadership roles, responsibilities, and achievements..." /></div>
          
          <div className="space-y-2">
            <Label>Desired Role/Position *</Label>
            <Select value={leadershipForm.desiredRole} onValueChange={(value) => setLeadershipForm({...leadershipForm, desiredRole: value})}>
              <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ambassador">Campus Ambassador</SelectItem>
                <SelectItem value="coordinator">Program Coordinator</SelectItem>
                <SelectItem value="marketing">Marketing & Outreach</SelectItem>
                <SelectItem value="events">Events Manager</SelectItem>
                <SelectItem value="partnership">Partnership Liaison</SelectItem>
                <SelectItem value="open">Open to any role</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Time Commitment *</Label>
            <Select value={leadershipForm.commitment} onValueChange={(value) => setLeadershipForm({...leadershipForm, commitment: value})}>
              <SelectTrigger><SelectValue placeholder="Select commitment level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="5-10">5-10 hours/week</SelectItem>
                <SelectItem value="10-15">10-15 hours/week</SelectItem>
                <SelectItem value="15-20">15-20 hours/week</SelectItem>
                <SelectItem value="20+">20+ hours/week</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2"><Label>Key Skills *</Label><Textarea required value={leadershipForm.skills} onChange={(e) => setLeadershipForm({...leadershipForm, skills: e.target.value})} rows={3} placeholder="Leadership, communication, project management, social media, etc." /></div>
          <div className="space-y-2"><Label>Your Vision for UISN *</Label><Textarea required value={leadershipForm.vision} onChange={(e) => setLeadershipForm({...leadershipForm, vision: e.target.value})} rows={4} placeholder="What would you like to accomplish? How do you see UISN growing?" /></div>
          <div className="space-y-2"><Label>References (Optional)</Label><Input value={leadershipForm.references} onChange={(e) => setLeadershipForm({...leadershipForm, references: e.target.value})} placeholder="Name and email of 1-2 references" /></div>
          
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">Apply for Leadership Team <Send className="ml-2" size={16} /></Button>
        </form>
      );
    }

    return <p>Form not found</p>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" className="mb-6 text-primary-foreground hover:text-accent hover:bg-primary-foreground/10" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2" size={20} />Back to Programs
            </Button>
            <div className="max-w-4xl">
              <Badge className={`mb-4 bg-${program.color} text-${program.color}-foreground`}>{program.impact}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl text-primary-foreground/90 mb-6">{program.description}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2"><Calendar size={20} className="text-accent" /><span>{program.frequency}</span></div>
                <div className="flex items-center space-x-2"><MapPin size={20} className="text-accent" /><span>{program.location}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl">
              <CardHeader className="bg-accent/5 border-b">
                <CardTitle className="text-3xl text-primary">
                  {slug === 'service-event' ? 'Submit Your Event for Official Support' : 
                   slug === 'leadership' ? 'Leadership Team Application' :
                   slug === 'join-network' ? 'Join the UISN Network' : 'Apply for This Program'}
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  {slug === 'service-event' ? 'Get UISN promotion, volunteers, and official support for your service event.' :
                   'Fill out the form below and we\'ll get back to you within 2-3 business days.'}
                </p>
              </CardHeader>
              <CardContent className="p-8">{renderForm()}</CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProgramDetail;
