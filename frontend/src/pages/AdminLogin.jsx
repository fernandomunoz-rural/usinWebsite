import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Lock, User } from 'lucide-react';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple authentication - in production, this would be a real API call
    // Default credentials: admin / uisn2026
    if (username === 'admin' && password === 'uisn2026') {
      sessionStorage.setItem('uisn_admin_auth', 'true');
      toast.success('Login successful! Redirecting...');
      
      // Use window.location.href for better compatibility with deployed sites
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
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
            <img 
              src="https://customer-assets.emergentagent.com/job_a8cb0463-4a45-46b3-a08a-68f031555cae/artifacts/6ww6zppn_image.png"
              alt="UISN Logo"
              className="h-20 w-auto mx-auto mb-4"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Admin Login</CardTitle>
          <p className="text-muted-foreground">Access the Content Management System</p>
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
