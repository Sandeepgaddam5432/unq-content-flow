import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Palette, 
  Link, 
  Bell, 
  Shield, 
  HardDrive, 
  Trash2, 
  Download,
  Upload,
  ExternalLink,
  Check,
  X
} from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    videoGeneration: true,
    publishingQueue: true,
    channelPerformance: false,
    apiUsage: true,
    weeklyReports: true
  });

  const integrations = [
    { 
      platform: 'YouTube Data API', 
      status: 'connected', 
      description: 'Access channel analytics and upload videos',
      connectedAt: '2024-01-15'
    },
    { 
      platform: 'Instagram Graph API', 
      status: 'connected', 
      description: 'Publish content and manage Instagram presence',
      connectedAt: '2024-01-20'
    },
    { 
      platform: 'Google Sheets', 
      status: 'connected', 
      description: 'Export analytics and manage content calendars',
      connectedAt: '2024-02-01'
    },
    { 
      platform: 'Google Drive', 
      status: 'disconnected', 
      description: 'Store and manage generated content files',
      connectedAt: null
    },
    { 
      platform: 'Zapier', 
      status: 'disconnected', 
      description: 'Automate workflows with 3000+ apps',
      connectedAt: null
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'connected' ? (
      <Badge className="bg-success text-success-foreground">
        <Check className="w-3 h-3 mr-1" />
        Connected
      </Badge>
    ) : (
      <Badge variant="secondary">
        <X className="w-3 h-3 mr-1" />
        Not Connected
      </Badge>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and integrations</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/api/placeholder/96/96" />
                <AvatarFallback className="text-lg">SG</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    defaultValue="Sandeep Gaddam" 
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    defaultValue="sandeep@example.com" 
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="focus:ring-primary focus:border-primary h-20"
                  defaultValue="Content creator specializing in AI and technology education. Passionate about making complex topics accessible to everyone."
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Brand Voice Settings */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Brand Voice & Style
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voiceTone">Default Voice Tone</Label>
                <Select defaultValue="professional">
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="entertaining">Entertaining</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentStyle">Content Category</Label>
                <Select defaultValue="education">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="news">News & Updates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brandVoice">Brand Voice Description</Label>
              <Textarea 
                id="brandVoice"
                placeholder="Describe your brand voice and content style preferences..."
                className="focus:ring-primary focus:border-primary h-24"
                defaultValue="Approachable yet authoritative voice that makes AI and technology accessible. Focus on practical applications, real-world examples, and beginner-friendly explanations while maintaining technical accuracy."
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input 
                  id="targetAudience"
                  placeholder="e.g., Beginners in AI and tech"
                  defaultValue="Tech enthusiasts, AI beginners, developers"
                  className="focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contentLength">Preferred Content Length</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (5-10 minutes)</SelectItem>
                    <SelectItem value="medium">Medium (10-20 minutes)</SelectItem>
                    <SelectItem value="long">Long (20+ minutes)</SelectItem>
                    <SelectItem value="mixed">Mixed lengths</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Platform Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            {integrations.map((integration, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{integration.platform}</h4>
                    {getStatusBadge(integration.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{integration.description}</p>
                  {integration.connectedAt && (
                    <p className="text-xs text-muted-foreground">
                      Connected on {integration.connectedAt}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {integration.status === 'connected' ? 'Manage' : 'Connect'}
                  </Button>
                  {integration.status === 'connected' && (
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => {
              const labels = {
                videoGeneration: 'Video generation completed',
                publishingQueue: 'Publishing queue updates',
                channelPerformance: 'Channel performance alerts',
                apiUsage: 'API usage warnings',
                weeklyReports: 'Weekly analytics reports'
              };
              
              return (
                <div key={key} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <p className="font-medium">{labels[key as keyof typeof labels]}</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when important events happen
                    </p>
                  </div>
                  <Switch 
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Two-factor authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Change password</p>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Download your data</p>
                <p className="text-sm text-muted-foreground">Export all your content and analytics</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-xl font-bold">2.4 GB</p>
                <p className="text-xs text-muted-foreground">of 10 GB</p>
              </Card>
              
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Generated Videos</p>
                <p className="text-xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">this month</p>
              </Card>
              
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">API Calls</p>
                <p className="text-xl font-bold">12.5K</p>
                <p className="text-xs text-muted-foreground">this month</p>
              </Card>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Export All Content
              </Button>
              
              <Button variant="outline" className="w-full sm:w-auto">
                Clear Generated Cache
              </Button>
              
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}