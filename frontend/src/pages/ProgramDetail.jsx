import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, MapPin, Send } from 'lucide-react';
import { getPrograms } from '../utils/cmsStorage';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const ProgramDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    reason: '',
    experience: '',
  });

  useEffect(() => {
    const programs = getPrograms();
    const foundProgram = programs.find(p => p.slug === slug || p.id === slug);
    if (foundProgram) {
      setProgram(foundProgram);
    }
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Email notification data
    const emailBody = `
New Application for: ${program.title}

Applicant Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
University: ${formData.university}

Why interested:
${formData.reason}

Relevant Experience:
${formData.experience}
    `;
    
    // Log to console (in production, this would call an API to send email)
    console.log('Sending to: utahintercollegiateservicenetw@gmail.com');
    console.log(emailBody);
    
    toast.success(`Thank you for your interest in ${program.title}! We'll contact you soon.`);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      university: '',
      reason: '',
      experience: '',
    });
  };

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              className="mb-6 text-primary-foreground hover:text-accent hover:bg-primary-foreground/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Programs
            </Button>
            
            <div className="max-w-4xl">
              <Badge className={`mb-4 bg-${program.color} text-${program.color}-foreground`}>
                {program.impact}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl text-primary-foreground/90 mb-6">{program.description}</p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Calendar size={20} className="text-accent" />
                  <span>{program.frequency}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={20} className="text-accent" />
                  <span>{program.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl">
              <CardHeader className="bg-accent/5 border-b">
                <CardTitle className="text-3xl text-primary">Apply for This Program</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Fill out the form below to express your interest. We'll get back to you within 2-3 business days.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@university.edu"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(801) 555-0123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University/College *</Label>
                      <Input
                        id="university"
                        required
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        placeholder="Snow College"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Why are you interested in this program? *</Label>
                    <Textarea
                      id="reason"
                      required
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="Tell us what motivates you to join this program..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Relevant Experience (Optional)</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="Share any relevant experience, skills, or background..."
                      rows={4}
                    />
                  </div>

                  <div className="bg-muted rounded-lg p-6">
                    <h4 className="font-semibold text-primary mb-2">What happens next?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• We'll review your application within 2-3 business days</li>
                      <li>• You'll receive an email with next steps and program details</li>
                      <li>• If selected, we'll schedule an orientation call</li>
                      <li>• Get ready to make an impact!</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                  >
                    Submit Application
                    <Send className="ml-2" size={16} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">Program Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="font-semibold text-primary mb-2">Gain Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop valuable leadership and service skills
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-semibold text-primary mb-2">Build Network</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with students across Utah universities
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">⭐</div>
                  <h3 className="font-semibold text-primary mb-2">Make Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Create meaningful change in your community
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProgramDetail;
