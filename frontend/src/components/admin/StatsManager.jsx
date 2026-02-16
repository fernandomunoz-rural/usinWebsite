import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { Edit2, Save, X } from 'lucide-react';
import { getStats, updateStat } from '../../utils/cmsStorage';

export const StatsManager = () => {
  const [stats, setStats] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    setStats(getStats());
  };

  const handleUpdate = (id) => {
    if (!formData.value || !formData.label) {
      toast.error('Please fill in all required fields');
      return;
    }
    updateStat(id, formData);
    toast.success('Stat updated successfully!');
    setEditingId(null);
    loadStats();
  };

  const startEdit = (stat) => {
    setEditingId(stat.id);
    setFormData({
      label: stat.label,
      value: stat.value,
      description: stat.description,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Impact Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <Card key={stat.id} className="border-2">
                <CardContent className="p-6">
                  {editingId === stat.id ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Value *</Label>
                        <Input
                          value={formData.value}
                          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                          placeholder="e.g., 1,000+"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Label *</Label>
                        <Input
                          value={formData.label}
                          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                          placeholder="e.g., Active Volunteers"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="e.g., Students making a difference"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleUpdate(stat.id)} className="bg-accent hover:bg-accent/90">
                          <Save size={16} className="mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={cancelEdit}>
                          <X size={16} className="mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-4">
                        <div className={`text-5xl font-bold text-${stat.color} mb-2`}>{stat.value}</div>
                        <div className="text-xl font-semibold text-primary mb-1">{stat.label}</div>
                        <div className="text-sm text-muted-foreground">{stat.description}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(stat)}
                        className="w-full"
                        disabled={editingId && editingId !== stat.id}
                      >
                        <Edit2 size={14} className="mr-2" />
                        Edit
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
