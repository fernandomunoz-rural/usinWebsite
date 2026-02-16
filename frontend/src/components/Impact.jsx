import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { getStats, getImpactStories } from '../utils/cmsStorage';

export const Impact = () => {
  const [stats, setStats] = useState([]);
  const [impactStories, setImpactStories] = useState([]);

  useEffect(() => {
    setStats(getStats());
    setImpactStories(getImpactStories().filter(s => s.active));
  }, []);

  // Icon mapping
  const iconMap = {
    Users,
    Clock,
    Heart,
    TrendingUp,
  };

  return (
    <section id="impact" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Impact</h2>
          <p className="section-subheading">
            Together, we're creating measurable change in communities across Utah.
            See the difference your involvement can make.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Heart;
            return (
              <Card
                key={stat.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${stat.color}/10 rounded-2xl mb-4`}>
                    <Icon className={`text-${stat.color}`} size={32} />
                  </div>
                  <div className={`text-4xl font-bold text-${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-lg font-semibold text-primary mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Impact Stories */}
        <div>
          <h3 className="text-3xl font-bold text-primary text-center mb-10">Impact Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {impactStories.map((impact) => (
              <Card
                key={impact.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={impact.image}
                    alt={impact.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-3">{impact.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{impact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Be Part of the Change</h3>
            <p className="text-xl mb-6 opacity-90">
              Your time and energy can transform lives. Join us in making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#get-involved')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Volunteer Today
              </button>
              <button
                onClick={() => document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
