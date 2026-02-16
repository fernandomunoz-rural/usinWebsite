import React, { useState } from 'react';
import { LayoutDashboard, X } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProgramsManager } from './admin/ProgramsManager';
import { EventsManager } from './admin/EventsManager';
import { AnnouncementsManager } from './admin/AnnouncementsManager';
import { OpportunitiesManager } from './admin/OpportunitiesManager';
import { StatsManager } from './admin/StatsManager';
import { ImpactStoriesManager } from './admin/ImpactStoriesManager';
import { AboutContentManager } from './admin/AboutContentManager';

export const AdminPanel = ({ onLogout }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Floating Admin Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-accent hover:bg-accent/90 text-accent-foreground p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110"
          title="Open Admin Panel"
        >
          <LayoutDashboard size={24} />
        </button>
      )}

      {/* Admin Panel Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen p-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-6">
              <div className="bg-primary text-primary-foreground rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <LayoutDashboard size={28} />
                    <div>
                      <h1 className="text-2xl font-bold">UISN Admin Panel</h1>
                      <p className="text-sm text-primary-foreground/80">Content Management System</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                      onClick={onLogout}
                    >
                      Logout
                    </Button>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-primary-foreground hover:bg-primary-foreground/10 p-2 rounded-lg transition-colors"
                      title="Close Admin Panel"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto">
              <Tabs defaultValue="programs" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-card">
                  <TabsTrigger value="programs">Programs</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="announcements">News</TabsTrigger>
                  <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="stories">Stories</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
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

                <TabsContent value="stats">
                  <StatsManager />
                </TabsContent>

                <TabsContent value="stories">
                  <ImpactStoriesManager />
                </TabsContent>

                <TabsContent value="about">
                  <AboutContentManager />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
