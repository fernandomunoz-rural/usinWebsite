import React from 'react';
import { GraduationCap, Trees, Home, Heart, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export const Programs = () => {
  const programs = [
    {
      icon: GraduationCap,
      title: 'Create a UISN Chapter at Your School',
      description: 'Start an official UISN chapter on your campus. Access toolkits, branding, and support to lead service initiatives locally and connect with other universities in Utah.',
      frequency: 'Year-round',
      location: 'Your Campus',
      impact: 'Statewide network',
      color: 'secondary',
    },
    {
      icon: Calendar,
      title: 'Host a UISN Service Night',
      description: 'Evening service-focused events including community projects, donation drives, and volunteering. Designed for students with busy schedules - 1–2 hours, low commitment, high impact.',
      frequency: 'Flexible',
      location: 'Your Community',
      impact: 'Quick & impactful',
      color: 'accent',
    },
    {
      icon: Heart,
      title: 'Join the Utah Intercollegiate Service Network',
      description: 'Become part of a statewide student service coalition. Collaborate with students from other colleges, share resources, events, and impact reports.',
      frequency: 'Ongoing',
      location: 'Statewide',
      impact: '15+ universities',
      color: 'secondary',
    },
    {
      icon: Trees,
      title: 'Environmental Action',
      description: 'Lead conservation projects including tree planting, trail maintenance, and community garden development.',
      frequency: 'Monthly',
      location: 'Statewide',
      impact: '10,000+ trees planted',
      color: 'accent',
    },
  ];

  return (
    <section id="programs" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Programs</h2>
          <p className="section-subheading">
            Explore our diverse range of service programs designed to address critical community needs
            while providing meaningful volunteer experiences.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardHeader className={`bg-${program.color}/5 border-b-2 border-${program.color}/20`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`bg-${program.color}/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`text-${program.color}`} size={28} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-primary mb-2">{program.title}</CardTitle>
                        <Badge variant="outline" className={`border-${program.color} text-${program.color}`}>
                          {program.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="text-muted-foreground" size={16} />
                      <span className="text-foreground">
                        <strong>Frequency:</strong> {program.frequency}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="text-muted-foreground" size={16} />
                      <span className="text-foreground">
                        <strong>Location:</strong> {program.location}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How to Join */}
        <div className="bg-muted rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-primary text-center mb-8">How to Join a Program</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <span className="text-3xl font-bold text-secondary">1</span>
              </div>
              <h4 className="text-xl font-semibold text-primary mb-2">Browse Programs</h4>
              <p className="text-muted-foreground">
                Explore our programs and find opportunities that match your interests and schedule.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <span className="text-3xl font-bold text-accent">2</span>
              </div>
              <h4 className="text-xl font-semibold text-primary mb-2">Sign Up</h4>
              <p className="text-muted-foreground">
                Complete the volunteer registration form to get started with your chosen program.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <span className="text-3xl font-bold text-secondary">3</span>
              </div>
              <h4 className="text-xl font-semibold text-primary mb-2">Make an Impact</h4>
              <p className="text-muted-foreground">
                Attend orientation and start making a difference in your community!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
