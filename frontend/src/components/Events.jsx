import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { getEvents } from '../utils/cmsStorage';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const loadedEvents = await getEvents();
        const activeEvents = loadedEvents.filter(e => e.active);
        // Sort by date
        const sortedEvents = activeEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

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
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Upcoming Events</h2>
            <p className="section-subheading">Loading events...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded mb-3" />
                  <div className="space-y-2 mb-4">
                    <div className="h-4 w-full bg-muted animate-pulse rounded" />
                    <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Upcoming Events</h2>
          <p className="section-subheading">
            Join us at our upcoming service events and make a difference in your community.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                    <CalendarIcon className="text-primary/20" size={80} />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Badge>
                </div>
              </div>

              {/* Event Details */}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2 text-sm">
                    <CalendarIcon className="text-muted-foreground mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-foreground">{formatDate(event.date)}</span>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-start space-x-2 text-sm">
                      <Clock className="text-muted-foreground mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-foreground">{event.time}</span>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="text-muted-foreground mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-foreground">{event.location}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={() => window.location.href = `/event/${event.id}`}
                >
                  See More
                  <ExternalLink className="ml-2" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see an event that fits your schedule?
          </p>
          <button
            onClick={() => document.querySelector('#get-involved')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Sign Up as a Volunteer
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;
