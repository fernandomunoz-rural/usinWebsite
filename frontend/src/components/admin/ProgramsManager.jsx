import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { getPrograms, addProgram, updateProgram, deleteProgram } from '../../utils/cmsStorage';

export const ProgramsManager = () => {
  const [programs, setPrograms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: '',
    location: '',
    impact: '',
    icon: 'Heart',
    color: 'secondary',
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    setPrograms(getPrograms());
  };

  const handleAdd = () => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    addProgram(formData);
    toast.success('Program added successfully!');
    resetForm();
    loadPrograms();
  };

  const handleUpdate = (id) => {
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    updateProgram(id, formData);
    toast.success('Program updated successfully!');
    resetForm();
    loadPrograms();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteProgram(id);
      toast.success('Program deleted successfully!');
      loadPrograms();
    }
  };

  const startEdit = (program) => {
    setEditingId(program.id);
    setFormData({
      title: program.title,
      description: program.description,
      frequency: program.frequency,
      location: program.location,
      impact: program.impact,
      icon: program.icon || 'Heart',
      color: program.color || 'secondary',
    });
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      frequency: '',
      location: '',
      impact: '',
      icon: 'Heart',
      color: 'secondary',
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const iconOptions = ['GraduationCap', 'Calendar', 'Heart', 'Trees', 'Home', 'Users', 'Briefcase'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Programs</CardTitle>
          <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId}>
            <Plus size={16} className="mr-2" />
            Add Program
          </Button>
        </CardHeader>
        <CardContent>
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <Card className="mb-6 border-accent">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Program title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Impact</Label>
                      <Input
                        value={formData.impact}
                        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                        placeholder="e.g., 1,000+ students"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Program description"
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Input
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        placeholder="e.g., Weekly, Monthly"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Statewide"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((icon) => (
                            <SelectItem key={icon} value={icon}>
                              {icon}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Color</Label>
                      <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="secondary">Red</SelectItem>
                          <SelectItem value="accent">Gold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                        Add Program
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

          {/* Programs List */}
          <div className="space-y-4">
            {programs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No programs yet. Add your first program!</p>
            ) : (
              programs.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-primary">{program.title}</h3>
                          <Badge variant="outline" className={`border-${program.color} text-${program.color}`}>
                            {program.impact}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{program.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-foreground">
                          {program.frequency && (
                            <span className="bg-muted px-2 py-1 rounded">
                              <strong>Frequency:</strong> {program.frequency}
                            </span>
                          )}
                          {program.location && (
                            <span className="bg-muted px-2 py-1 rounded">
                              <strong>Location:</strong> {program.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(program)}
                          disabled={isAdding || editingId}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(program.id)}
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
