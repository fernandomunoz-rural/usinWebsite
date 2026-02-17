import React, { useState, useEffect } from 'react';
import { Target, Award, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { getAboutContent } from '../utils/cmsStorage';

export const About = () => {
  const [aboutContent, setAboutContent] = useState({ mission: '', story: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await getAboutContent();
        setAboutContent(content);
      } catch (error) {
        console.error('Failed to load about content:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Connecting college students with meaningful service opportunities to build stronger communities.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Maintaining high standards in every program while fostering leadership and personal growth.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building lasting relationships between students, universities, and local organizations.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Creating new approaches to volunteerism that meet evolving community needs.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">About UISN</h2>
          <p className="section-subheading">
            The Utah Intercollegiate Service Network connects passionate students across Utah's universities
            to create positive change through coordinated volunteer efforts.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="border-l-4 border-secondary bg-card shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-lg flex-shrink-0">
                  <Target className="text-secondary" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Our Mission</h3>
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {aboutContent.mission || 'Loading...'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-accent"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="text-accent" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Story Section */}
        <div className="mt-16 bg-muted rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-primary mb-6">Our Story</h3>
            <p className="text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
              {aboutContent.story || 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
