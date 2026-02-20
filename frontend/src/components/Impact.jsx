import React from 'react';
import { Card, CardContent } from './ui/card';
import { useCMS } from '../context/CMSContext';

export const Impact = () => {
  const { impactStories: allStories, loading } = useCMS();
  
  // Filter active stories
  const impactStories = allStories.filter(s => s.active);

  if (loading) {
    return (
      <section id="impact" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Impact</h2>
            <p className="section-subheading">Loading impact data...</p>
          </div>
          <h3 className="text-3xl font-bold text-primary text-center mb-10">Impact Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-56 bg-muted-foreground/10 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 w-3/4 bg-muted-foreground/10 animate-pulse rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted-foreground/10 animate-pulse rounded" />
                    <div className="h-4 w-2/3 bg-muted-foreground/10 animate-pulse rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
                    loading="lazy"
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
                Get Involved Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
