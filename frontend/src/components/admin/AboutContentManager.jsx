import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { getAboutContent, saveAboutContent } from '../../utils/cmsStorage';

export const AboutContentManager = () => {
  const [formData, setFormData] = useState({
    mission: '',
    story: '',
  });

  useEffect(() => {
    const content = getAboutContent();
    setFormData(content);
  }, []);

  const handleSave = () => {
    if (!formData.mission || !formData.story) {
      toast.error('Please fill in all fields');
      return;
    }
    saveAboutContent(formData);
    toast.success('About content updated successfully! Refresh the page to see changes.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit About Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Mission Statement</Label>
              <Textarea
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                placeholder="Enter the organization's mission"
                rows={4}
              />
              <p className="text-sm text-muted-foreground">This appears in the Mission section</p>
            </div>

            <div className="space-y-2">
              <Label>Our Story</Label>
              <Textarea
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                placeholder="Tell the organization's story"
                rows={8}
              />
              <p className="text-sm text-muted-foreground">This appears in the Story section. You can use line breaks for paragraphs.</p>
            </div>

            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Mission</h3>
              <p className="text-foreground/90">{formData.mission || 'No mission statement yet'}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Our Story</h3>
              <p className="text-foreground/90 whitespace-pre-line">{formData.story || 'No story yet'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
