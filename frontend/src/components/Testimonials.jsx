import React from 'react';
import { Card, CardContent } from './ui/card';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        'Being a UISN Ambassador at SUU has been transformational. I\'ve had the opportunity to lead service initiatives, connect with students across Utah, and make a real difference in our community. The network and support from UServeUtah have been incredible.',
      author: 'Sofia Lopez',
      role: 'SUU UISN Ambassador',
      boldStatement: 'Leading Change Through Service',
    },
    {
      quote:
        'As an international volunteer from France, UISN welcomed me with open arms and gave me a chance to give back to the Utah community while building lifelong friendships. The service projects are meaningful and the impact is real.',
      author: 'Kessy Gohin',
      role: 'Volunteer from France',
      boldStatement: 'Building Bridges Across Borders',
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
            Hear from our ambassadors and volunteers about their experiences with UISN.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/95 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <Quote className="text-accent mb-4" size={32} />
                <p className="text-lg font-bold text-secondary mb-4">
                  "{testimonial.boldStatement}"
                </p>
                <p className="text-foreground/90 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-primary text-lg">{testimonial.author}</div>
                  <div className="text-sm text-accent font-medium mt-1">{testimonial.role}</div>
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
