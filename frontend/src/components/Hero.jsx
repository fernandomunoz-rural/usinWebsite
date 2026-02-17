import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Heart, Users } from 'lucide-react';

export const Hero = () => {
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560220604-1985ebfe28b1?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="mb-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_4f5d1fb5-0761-445e-af74-1ba7e066fe01/artifacts/pqnhsmwe_image.png"
                alt="UISN - Utah Intercollegiate Service Network"
                className="h-24 sm:h-28 lg:h-32 w-auto"
              />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              Building <span className="text-accent">Communities</span> Through <span className="text-secondary">Service</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-xl">
              Join Utah's premier network of college students making a lasting impact through
              meaningful community service and volunteer opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection('#get-involved')}
              >
                Get Involved
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 transition-all duration-300"
                onClick={() => scrollToSection('#programs')}
              >
                Explore Programs
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/20">
              <div>
                <div className="text-4xl font-bold text-accent">9+</div>
                <div className="text-primary-foreground/80 text-sm">Partner Universities</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">1,000+</div>
                <div className="text-primary-foreground/80 text-sm">Active Volunteers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">5,000+</div>
                <div className="text-primary-foreground/80 text-sm">Service Hours</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-xl">
                  <Users className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Connect with Students</h3>
                  <p className="text-muted-foreground text-sm">
                    Network with like-minded students across Utah's universities
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-xl">
                  <Heart className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Make Real Impact</h3>
                  <p className="text-muted-foreground text-sm">
                    Participate in meaningful projects that transform communities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
