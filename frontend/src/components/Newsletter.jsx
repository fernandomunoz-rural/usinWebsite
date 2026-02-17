import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Mail, Send, Loader2 } from 'lucide-react';
import { submitForm } from '../utils/cmsStorage';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        await submitForm('newsletter', { email });
        toast.success('Thank you for subscribing! Check your email for confirmation.');
        setEmail('');
      } catch (error) {
        toast.error('Failed to subscribe. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card/95 backdrop-blur-sm shadow-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Mail className="text-accent" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Stay Connected</h2>
              <p className="text-muted-foreground text-lg">
                Subscribe to our newsletter for the latest volunteer opportunities, impact stories,
                and community events.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  Subscribe
                  <Send className="ml-2" size={16} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>

            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Weekly</div>
                <div className="text-sm text-muted-foreground">Volunteer Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Monthly</div>
                <div className="text-sm text-muted-foreground">Impact Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Quarterly</div>
                <div className="text-sm text-muted-foreground">Special Events</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
