import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProgramsManager } from '../components/admin/ProgramsManager';
import { EventsManager } from '../components/admin/EventsManager';
import { AnnouncementsManager } from '../components/admin/AnnouncementsManager';
import { OpportunitiesManager } from '../components/admin/OpportunitiesManager';
import { LayoutDashboard, Calendar, Megaphone, Briefcase, LogOut, Home } from 'lucide-react';
import { initializeStorage } from '../utils/cmsStorage';

export const AdminDashboard = ({ onLogout }) => {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LayoutDashboard size={28} />
              <div>
                <h1 className="text-2xl font-bold">UISN Admin Dashboard</h1>
                <p className="text-sm text-primary-foreground/80">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => window.location.href = '/'}
              >
                <Home size={16} className="mr-2" />
                View Site
              </Button>
              <Button
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={onLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-accent/10 p-3 rounded-lg">
                <Megaphone className="text-accent" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">Welcome to the CMS</h2>
                <p className="text-muted-foreground">
                  Manage all your content in one place. Updates are instant and require no coding knowledge.
                  Changes made here will immediately reflect on the public website.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="programs" className="flex items-center space-x-2">
              <LayoutDashboard size={16} />
              <span>Programs</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center space-x-2">
              <Megaphone size={16} />
              <span>Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center space-x-2">
              <Briefcase size={16} />
              <span>Opportunities</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="programs">
            <ProgramsManager />
          </TabsContent>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManager />
          </TabsContent>

          <TabsContent value="opportunities">
            <OpportunitiesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
