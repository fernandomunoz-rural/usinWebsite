import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Save, X, Calendar as CalendarIcon, Image } from 'lucide-react';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../utils/cmsStorage';

export const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    registrationLink: '',
    image: '',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.date || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    await addEvent(formData);
    toast.success('Event added successfully!');
    resetForm();
    loadEvents();
  };

  const handleUpdate = async (id) => {
    if (!formData.title || !formData.date || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    await updateEvent(id, formData);
    toast.success('Event updated successfully!');
    resetForm();
    loadEvents();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
      toast.success('Event deleted successfully!');
      loadEvents();
    }
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      registrationLink: event.registrationLink || '',
      image: event.image || '',
    });
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      registrationLink: '',
      image: '',
    });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Events</CardTitle>
          <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId}>
            <Plus size={16} className="mr-2" />
            Add Event
          </Button>
        </CardHeader>
        <CardContent>
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <Card className="mb-6 border-accent">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Event Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Event title"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="e.g., 9:00 AM - 3:00 PM"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Event location"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Event description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Registration Link</Label>
                    <Input
                      type="url"
                      value={formData.registrationLink}
                      onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex space-x-2">
                    {editingId ? (
                      <Button onClick={() => handleUpdate(editingId)} className="bg-accent hover:bg-accent/90">
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    ) : (
                      <Button onClick={handleAdd} className="bg-accent hover:bg-accent/90">
                        <Plus size={16} className="mr-2" />
                        Add Event
                      </Button>
                    )}
                    <Button variant="outline" onClick={resetForm}>
                      <X size={16} className="mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Events List */}
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No events yet. Add your first event!</p>
            ) : (
              events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CalendarIcon size={20} className="text-accent" />
                          <h3 className="text-xl font-bold text-primary">{event.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-foreground">
                          <span className="bg-muted px-2 py-1 rounded">
                            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                          </span>
                          {event.time && (
                            <span className="bg-muted px-2 py-1 rounded">
                              <strong>Time:</strong> {event.time}
                            </span>
                          )}
                          <span className="bg-muted px-2 py-1 rounded">
                            <strong>Location:</strong> {event.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(event)}
                          disabled={isAdding || editingId}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(event.id)}
                          disabled={isAdding || editingId}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
