import React from 'react';
import { Card, CardContent } from './ui/card';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'UISN gave me the opportunity to make a real difference while connecting with amazing students from across Utah. The friendships and experiences I gained are invaluable.',
      author: 'Sarah Martinez',
      role: 'University of Utah',
      program: 'Education Initiative',
    },
    {
      quote:
        'Partnering with UISN has brought incredible energy and dedication to our community projects. The students are professional, passionate, and truly committed to service.',
      author: 'Michael Chen',
      role: 'Community Center Director',
      program: 'Partner Organization',
    },
    {
      quote:
        'Through UISN, I discovered my passion for environmental conservation. The leadership skills I developed here have shaped my career path and personal values.',
      author: 'Emily Johnson',
      role: 'BYU',
      program: 'Environmental Action',
    },
    {
      quote:
        'The impact we\'ve seen from UISN volunteers is remarkable. They bring innovation, enthusiasm, and genuine care to every project. We couldn\'t ask for better partners.',
      author: 'David Rodriguez',
      role: 'Habitat for Humanity',
      program: 'Partner Organization',
    },
  ];

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">What People Say</h2>
          <p className="section-subheading">
            Hear from our volunteers and partners about their experiences with UISN.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/95 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <Quote className="text-accent mb-4" size={32} />
                <p className="text-foreground/90 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-primary">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-accent font-medium mt-1">{testimonial.program}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">Ready to create your own story?</p>
          <button
            onClick={() => document.querySelector('#get-involved')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
