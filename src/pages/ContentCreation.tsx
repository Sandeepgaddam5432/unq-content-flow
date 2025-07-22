import { useState } from 'react';
import { Plus, Wand2, Youtube, Instagram, Clock, Users, Tag, Settings, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAppStore } from '../lib/store';

const contentTypes = [
  { value: 'educational', label: 'Educational', description: 'How-to guides, tutorials, tips' },
  { value: 'entertainment', label: 'Entertainment', description: 'Fun, engaging, viral content' },
  { value: 'tutorial', label: 'Tutorial', description: 'Step-by-step instructions' },
  { value: 'review', label: 'Review', description: 'Product and service reviews' },
  { value: 'lifestyle', label: 'Lifestyle', description: 'Daily life, personal stories' },
  { value: 'business', label: 'Business', description: 'Professional, industry insights' }
];

const targetAudiences = [
  'Content Creators',
  'Entrepreneurs',
  'Students',
  'Professionals',
  'Tech Enthusiasts',
  'Small Business Owners',
  'Marketers',
  'General Audience'
];

const durations = [
  { value: 15, label: '15 seconds', platform: ['instagram'] },
  { value: 30, label: '30 seconds', platform: ['instagram'] },
  { value: 60, label: '1 minute', platform: ['youtube', 'instagram'] },
  { value: 120, label: '2 minutes', platform: ['youtube'] },
  { value: 300, label: '5 minutes', platform: ['youtube'] },
  { value: 600, label: '10 minutes', platform: ['youtube'] },
  { value: 900, label: '15 minutes', platform: ['youtube'] },
  { value: 'custom', label: 'Custom', platform: ['youtube', 'instagram'] }
];

const voiceOptions = [
  { value: 'professional', label: 'Professional', description: 'Clear, authoritative voice' },
  { value: 'friendly', label: 'Friendly', description: 'Warm, conversational tone' },
  { value: 'energetic', label: 'Energetic', description: 'High-energy, enthusiastic' },
  { value: 'calm', label: 'Calm', description: 'Soothing, relaxed delivery' }
];

export default function ContentCreation() {
  const { addContentGeneration, user } = useAppStore();
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    platform: 'youtube' as 'youtube' | 'instagram',
    duration: 300 as number | 'custom',
    customDuration: 300,
    contentType: 'educational',
    targetAudience: 'General Audience',
    voice: 'professional',
    thumbnailStyle: 'modern',
    seoOptimization: true,
    autoPublish: false,
    scheduledAt: '',
    tags: [] as string[],
    channelId: 'default'
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleGenerate = async () => {
    if (!formData.topic.trim()) return;
    
    setIsGenerating(true);
    
    // Create new content generation
    const newGeneration = {
      id: Date.now().toString(),
      topic: formData.topic,
      duration: formData.duration === 'custom' ? formData.customDuration : (formData.duration as number),
      contentType: formData.contentType,
      targetAudience: formData.targetAudience,
      status: 'queued' as const,
      progress: 0,
      channelId: formData.channelId,
      platform: formData.platform,
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    };
    
    addContentGeneration(newGeneration);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      // Reset form
      setFormData({
        topic: '',
        description: '',
        platform: 'youtube',
        duration: 300 as number | 'custom',
        customDuration: 300,
        contentType: 'educational',
        targetAudience: 'General Audience',
        voice: 'professional',
        thumbnailStyle: 'modern',
        seoOptimization: true,
        autoPublish: false,
        scheduledAt: '',
        tags: [],
        channelId: 'default'
      });
    }, 2000);
  };

  const filteredDurations = durations.filter(d => 
    d.platform.includes(formData.platform)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Creation</h1>
          <p className="text-muted-foreground">
            Create engaging video content with AI assistance
          </p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Presets
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Creation Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                AI Content Generator
              </CardTitle>
              <CardDescription>
                Describe your content idea and let AI create engaging videos for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Topic Input */}
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-base font-medium">Content Topic *</Label>
                <Textarea
                  id="topic"
                  placeholder="e.g., 'How to build a successful YouTube channel in 2024' or '5 Instagram reel ideas that go viral'"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Be specific about your topic for better AI results
                </p>
              </div>

              {/* Platform & Duration */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Platform *</Label>
                  <Select 
                    value={formData.platform} 
                    onValueChange={(value: 'youtube' | 'instagram') => handleInputChange('platform', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-500" />
                          YouTube
                        </div>
                      </SelectItem>
                      <SelectItem value="instagram">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-pink-500" />
                          Instagram
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Duration *</Label>
                  <Select 
                    value={formData.duration.toString()} 
                    onValueChange={(value) => handleInputChange('duration', value === 'custom' ? 'custom' as const : parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDurations.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value.toString()}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {duration.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {formData.duration === 'custom' && (
                    <div className="space-y-2 mt-3">
                      <Label className="text-sm">Custom Duration (seconds)</Label>
                      <Slider
                        value={[formData.customDuration]}
                        onValueChange={(value) => handleInputChange('customDuration', value[0])}
                        max={1800}
                        min={15}
                        step={15}
                        className="w-full"
                      />
                      <div className="text-sm text-muted-foreground text-center">
                        {Math.floor(formData.customDuration / 60)}:{(formData.customDuration % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Type & Audience */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Content Type *</Label>
                  <Select 
                    value={formData.contentType} 
                    onValueChange={(value) => handleInputChange('contentType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Target Audience *</Label>
                  <Select 
                    value={formData.targetAudience} 
                    onValueChange={(value) => handleInputChange('targetAudience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {targetAudiences.map((audience) => (
                        <SelectItem key={audience} value={audience}>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {audience}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tags..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddTag}
                    disabled={!currentTag.trim()}
                  >
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Advanced Options */}
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span className="text-base font-medium">Advanced Options</span>
                    <Settings className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  {/* Voice Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Voice Style</Label>
                    <Select 
                      value={formData.voice} 
                      onValueChange={(value) => handleInputChange('voice', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {voiceOptions.map((voice) => (
                          <SelectItem key={voice.value} value={voice.value}>
                            <div>
                              <div className="font-medium">{voice.label}</div>
                              <div className="text-sm text-muted-foreground">{voice.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Settings toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">SEO Optimization</Label>
                        <p className="text-sm text-muted-foreground">Generate SEO-friendly titles and descriptions</p>
                      </div>
                      <Switch 
                        checked={formData.seoOptimization}
                        onCheckedChange={(checked) => handleInputChange('seoOptimization', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Auto-publish</Label>
                        <p className="text-sm text-muted-foreground">Automatically publish when generation is complete</p>
                      </div>
                      <Switch 
                        checked={formData.autoPublish}
                        onCheckedChange={(checked) => handleInputChange('autoPublish', checked)}
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Generation Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generation Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Platform</div>
                <div className="flex items-center gap-2">
                  {formData.platform === 'youtube' ? (
                    <Youtube className="h-4 w-4 text-red-500" />
                  ) : (
                    <Instagram className="h-4 w-4 text-pink-500" />
                  )}
                  <span className="capitalize">{formData.platform}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Duration</div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formData.duration === 'custom' 
                      ? `${Math.floor(formData.customDuration / 60)}:${(formData.customDuration % 60).toString().padStart(2, '0')}`
                      : durations.find(d => d.value === formData.duration)?.label
                    }
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Content Type</div>
                <Badge variant="outline">
                  {contentTypes.find(t => t.value === formData.contentType)?.label}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Target Audience</div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{formData.targetAudience}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                onClick={handleGenerate}
                disabled={!formData.topic.trim() || isGenerating}
                className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Estimated time: 15-30 minutes
              </p>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Be specific about your topic for better results</p>
              <p>• Include target keywords naturally in your description</p>
              <p>• Shorter videos (under 5 min) perform better on most platforms</p>
              <p>• Educational content has higher engagement rates</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}