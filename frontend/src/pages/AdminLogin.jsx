import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Lock, User, Shield } from 'lucide-react';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple authentication - in production, this would be a real API call
    // Default credentials: admin / uisn2026
    if (username === 'admin' && password === 'uisn2026') {
      sessionStorage.setItem('uisn_admin_auth', 'true');
      toast.success('Login successful! Redirecting...');
      
      // Redirect to homepage where admin panel will appear
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      toast.error('Invalid credentials. Try admin / uisn2026');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-secondary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">UISN Council Login</CardTitle>
          <p className="text-muted-foreground">Access the Content Management System</p>
          
          {/* Restricted Access Notice */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-sm">
            <p className="text-foreground font-semibold mb-1">⚠️ Restricted Access</p>
            <p className="text-muted-foreground">
              This portal is exclusively for UISN council members. If you are not part of the 
              UISN council, you may not have access to this area. Please contact the organization 
              administrators if you believe you should have access.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" size="lg">
              Login to Dashboard
            </Button>

            <div className="bg-muted rounded-lg p-4 text-sm">
              <p className="font-semibold text-foreground mb-1">Demo Credentials:</p>
              <p className="text-muted-foreground">
                <strong>Username:</strong> admin<br />
                <strong>Password:</strong> uisn2026
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to website
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
