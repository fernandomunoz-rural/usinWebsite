import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Save, X, Megaphone } from 'lucide-react';
import { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../utils/cmsStorage';

export const AnnouncementsManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = () => {
    setAnnouncements(getAnnouncements());
  };

  const handleAdd = () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    addAnnouncement(formData);
    toast.success('Announcement added successfully!');
    resetForm();
    loadAnnouncements();
  };

  const handleUpdate = (id) => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    updateAnnouncement(id, formData);
    toast.success('Announcement updated successfully!');
    resetForm();
    loadAnnouncements();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      deleteAnnouncement(id);
      toast.success('Announcement deleted successfully!');
      loadAnnouncements();
    }
  };

  const startEdit = (announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority || 'medium',
    });
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Announcements</CardTitle>
          <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId}>
            <Plus size={16} className="mr-2" />
            Add Announcement
          </Button>
        </CardHeader>
        <CardContent>
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <Card className="mb-6 border-accent">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Announcement title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Announcement content"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
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
                        Add Announcement
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

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No announcements yet. Add your first announcement!</p>
            ) : (
              announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Megaphone size={20} className="text-accent" />
                          <h3 className="text-xl font-bold text-primary">{announcement.title}</h3>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{announcement.content}</p>
                        <span className="text-sm text-muted-foreground">
                          Posted: {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(announcement)}
                          disabled={isAdding || editingId}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(announcement.id)}
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
