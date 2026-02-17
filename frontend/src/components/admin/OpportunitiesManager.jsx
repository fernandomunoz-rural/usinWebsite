import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Save, X, Briefcase } from 'lucide-react';
import { getOpportunities, addOpportunity, updateOpportunity, deleteOpportunity } from '../../utils/cmsStorage';

export const OpportunitiesManager = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    commitment: '',
    skills: '',
  });

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    const data = await getOpportunities();
    setOpportunities(data);
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    const opportunity = {
      ...formData,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
    };
    await addOpportunity(opportunity);
    toast.success('Opportunity added successfully!');
    resetForm();
    loadOpportunities();
  };

  const handleUpdate = async (id) => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    const opportunity = {
      ...formData,
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
    };
    await updateOpportunity(id, opportunity);
    toast.success('Opportunity updated successfully!');
    resetForm();
    loadOpportunities();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      await deleteOpportunity(id);
      toast.success('Opportunity deleted successfully!');
      loadOpportunities();
    }
  };

  const startEdit = (opportunity) => {
    setEditingId(opportunity.id);
    setFormData({
      title: opportunity.title,
      description: opportunity.description,
      category: opportunity.category || '',
      commitment: opportunity.commitment || '',
      skills: Array.isArray(opportunity.skills) ? opportunity.skills.join(', ') : '',
    });
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      commitment: '',
      skills: '',
    });
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Service Opportunities</CardTitle>
          <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId}>
            <Plus size={16} className="mr-2" />
            Add Opportunity
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
                      placeholder="Opportunity title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Opportunity description"
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g., Leadership, Volunteering"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Commitment</Label>
                      <Input
                        value={formData.commitment}
                        onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                        placeholder="e.g., Ongoing, 3 months"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Skills (comma-separated)</Label>
                    <Input
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="e.g., Communication, Teamwork, Leadership"
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
                        Add Opportunity
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

          {/* Opportunities List */}
          <div className="space-y-4">
            {opportunities.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No opportunities yet. Add your first opportunity!</p>
            ) : (
              opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Briefcase size={20} className="text-accent" />
                          <h3 className="text-xl font-bold text-primary">{opportunity.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-3">{opportunity.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.category && (
                            <Badge variant="outline" className="border-accent text-accent">
                              {opportunity.category}
                            </Badge>
                          )}
                          {opportunity.commitment && (
                            <Badge variant="outline">{opportunity.commitment}</Badge>
                          )}
                        </div>
                        {opportunity.skills && opportunity.skills.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm font-semibold text-foreground">Skills: </span>
                            <span className="text-sm text-muted-foreground">
                              {opportunity.skills.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(opportunity)}
                          disabled={isAdding || editingId}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(opportunity.id)}
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
