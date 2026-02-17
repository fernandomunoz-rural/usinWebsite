import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Heart, Sparkles } from 'lucide-react';
import { getEvents } from '../utils/cmsStorage';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      const events = await getEvents();
      const foundEvent = events.find(e => e.id === id);
      setEvent(foundEvent);
      setLoading(false);
    };
    loadEvent();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Event Not Found</h1>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse highlights dynamically from event description
  const parseHighlights = (description) => {
    if (!description) return [];
    
    const keywords = [
      { match: /mental health/i, icon: Heart, title: 'Mental Health Awareness', desc: 'Sessions focused on student wellness and mental health support' },
      { match: /community action/i, icon: Users, title: 'Community Actions', desc: 'Hands-on service projects making direct impact in the community' },
      { match: /donation drive/i, icon: Sparkles, title: 'Donation Drives', desc: 'Collecting essential items for those in need' },
      { match: /volunteer.{0,5}gala/i, icon: Users, title: 'Volunteers Gala', desc: 'Celebrating our incredible volunteers and their contributions' },
      { match: /inauguration|launch/i, icon: Sparkles, title: 'Official Inauguration', desc: 'The historic launch event' },
      { match: /workshop/i, icon: Heart, title: 'Workshops', desc: 'Interactive learning sessions' },
      { match: /networking/i, icon: Users, title: 'Networking', desc: 'Connect with fellow students and community members' },
      { match: /training/i, icon: Heart, title: 'Training Sessions', desc: 'Skill-building and development opportunities' },
      { match: /cleanup|clean up/i, icon: Sparkles, title: 'Community Cleanup', desc: 'Making our neighborhoods cleaner and greener' },
      { match: /food (drive|bank)/i, icon: Heart, title: 'Food Drive', desc: 'Collecting food for those in need' },
    ];
    
    const highlights = [];
    keywords.forEach(kw => {
      if (kw.match.test(description)) {
        highlights.push({ icon: kw.icon, title: kw.title, description: kw.desc });
      }
    });
    
    return highlights;
  };

  const highlights = parseHighlights(event.description);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section with Event Image */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {event.image ? (
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-8 left-8 z-20">
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </Button>
          </div>
          
          {/* Event Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <Badge className="mb-4 bg-accent text-accent-foreground text-lg px-4 py-2">
                {formatDate(event.date)}
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
                {event.description}
              </p>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Info Cards */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Info */}
                <Card className="shadow-xl border-t-4 border-secondary">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Event Details</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-xl">
                          <Calendar className="text-secondary" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold text-foreground">{formatDate(event.date)}</p>
                        </div>
                      </div>
                      
                      {event.time && (
                        <div className="flex items-start space-x-4">
                          <div className="bg-accent/10 p-3 rounded-xl">
                            <Clock className="text-accent" size={24} />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-semibold text-foreground">{event.time}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-xl">
                          <MapPin className="text-secondary" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-semibold text-foreground">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activities - Only show if highlights found */}
                {highlights.length > 0 && (
                  <Card className="shadow-xl">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-primary mb-6">What to Expect</h2>
                      <div className="space-y-4">
                        {highlights.map((activity, index) => {
                          const Icon = activity.icon;
                          return (
                            <div 
                              key={index} 
                              className="flex items-start space-x-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <div className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-secondary/10' : 'bg-accent/10'}`}>
                                <Icon className={index % 2 === 0 ? 'text-secondary' : 'text-accent'} size={24} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg text-foreground">{activity.title}</h3>
                                <p className="text-muted-foreground">{activity.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* About This Event */}
                {event.description && (
                  <Card className="shadow-xl">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-primary mb-4">About This Event</h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">{event.description}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Register Card */}
                <Card className="shadow-xl bg-primary text-primary-foreground sticky top-24">
                  <CardContent className="p-8 text-center">
                    <img 
                      src="https://customer-assets.emergentagent.com/job_4f5d1fb5-0761-445e-af74-1ba7e066fe01/artifacts/pqnhsmwe_image.png"
                      alt="UISN Logo"
                      className="h-16 w-auto mx-auto mb-6"
                    />
                    <h3 className="text-2xl font-bold mb-4">Join Us!</h3>
                    <p className="text-primary-foreground/90 mb-6">
                      Be part of something historic. Join UISN's first major event and help us make an impact.
                    </p>
                    <Button 
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6"
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                          document.querySelector('#get-involved')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      Register Now
                    </Button>
                    <p className="text-sm text-primary-foreground/70 mt-4">
                      Free to participate • Open to all Utah college students
                    </p>
                  </CardContent>
                </Card>

                {/* Share Card */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Share This Event</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Spread the word and invite your friends to join us!
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }}
                    >
                      Copy Event Link
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of students from across Utah for a week of service, connection, and community impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8"
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.querySelector('#get-involved')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Sign Up as Volunteer
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
                onClick={() => navigate('/')}
              >
                Learn More About UISN
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
