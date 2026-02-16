import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { getImpactStories, addImpactStory, updateImpactStory, deleteImpactStory } from '../../utils/cmsStorage';

export const ImpactStoriesManager = () => {
  const [stories, setStories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    setStories(getImpactStories());
  };

  const handleAdd = () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    addImpactStory(formData);
    toast.success('Impact story added successfully!');
    resetForm();
    loadStories();
  };

  const handleUpdate = (id) => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    updateImpactStory(id, formData);
    toast.success('Impact story updated successfully!');
    resetForm();
    loadStories();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this impact story?')) {
      deleteImpactStory(id);
      toast.success('Impact story deleted successfully!');
      loadStories();
    }
  };

  const startEdit = (story) => {
    setEditingId(story.id);
    setFormData({
      title: story.title,
      description: story.description,
      image: story.image,
    });
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
    });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Impact Stories</CardTitle>
          <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId}>
            <Plus size={16} className="mr-2" />
            Add Story
          </Button>
        </CardHeader>
        <CardContent>
          {(isAdding || editingId) && (
            <Card className="mb-6 border-accent">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Story title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Story description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                        Add Story
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

          <div className="space-y-4">
            {stories.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No impact stories yet. Add your first story!</p>
            ) : (
              stories.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">{story.title}</h3>
                        <p className="text-muted-foreground mb-3">{story.description}</p>
                        {story.image && (
                          <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded-lg" />
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(story)}
                          disabled={isAdding || editingId}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(story.id)}
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
