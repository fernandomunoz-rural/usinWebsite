import React, { useState, useEffect } from 'react';
import { GraduationCap, Trees, Home, Heart, Calendar, MapPin, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { getPrograms } from '../utils/cmsStorage';

export const Programs = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    // Load programs from CMS storage
    const loadedPrograms = getPrograms().filter(p => p.active);
    setPrograms(loadedPrograms);
  }, []);

  // Icon mapping
  const iconMap = {
    GraduationCap,
    Trees,
    Home,
    Heart,
    Calendar,
    Users,
    Briefcase,
  };

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
            const Icon = iconMap[program.icon] || Heart;
            return (
              <Card
                key={program.id || index}
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
