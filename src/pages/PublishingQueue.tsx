import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Edit, MoreHorizontal, Plus, Trash2, Youtube, Instagram } from 'lucide-react';

export default function PublishingQueue() {
  const [viewMode, setViewMode] = useState('week');

  const scheduledContent = [
    {
      id: 1,
      title: "AI Tutorial: Getting Started with Machine Learning",
      platform: "youtube",
      thumbnail: "/api/placeholder/120/68",
      scheduledDate: "2024-07-24",
      scheduledTime: "10:00 AM",
      status: "scheduled",
      type: "video"
    },
    {
      id: 2,
      title: "Quick Tips: Prompt Engineering Best Practices",
      platform: "instagram",
      thumbnail: "/api/placeholder/120/68",
      scheduledDate: "2024-07-24",
      scheduledTime: "2:00 PM",
      status: "pending_approval",
      type: "reel"
    },
    {
      id: 3,
      title: "Deep Dive: Neural Network Architecture",
      platform: "youtube",
      thumbnail: "/api/placeholder/120/68",
      scheduledDate: "2024-07-25",
      scheduledTime: "11:30 AM",
      status: "draft",
      type: "video"
    },
    {
      id: 4,
      title: "AI News Weekly Roundup",
      platform: "youtube",
      thumbnail: "/api/placeholder/120/68",
      scheduledDate: "2024-07-26",
      scheduledTime: "9:00 AM",
      status: "scheduled",
      type: "video"
    },
    {
      id: 5,
      title: "Instagram Story: Behind the Scenes",
      platform: "instagram",
      thumbnail: "/api/placeholder/120/68",
      scheduledDate: "2024-07-26",
      scheduledTime: "3:00 PM",
      status: "scheduled",
      type: "story"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: 'Scheduled', className: 'bg-success text-success-foreground' },
      pending_approval: { label: 'Pending', className: 'bg-warning text-warning-foreground' },
      draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
      failed: { label: 'Failed', className: 'bg-destructive text-destructive-foreground' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPlatformIcon = (platform: string) => {
    return platform === 'youtube' ? (
      <Youtube className="w-4 h-4 text-red-500" />
    ) : (
      <Instagram className="w-4 h-4 text-pink-500" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Publishing Queue</h1>
          <p className="text-muted-foreground">Manage and schedule your content across platforms</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Content
        </Button>
      </div>

      {/* Calendar View Toggle */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Content Calendar</h2>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={viewMode === 'today' ? 'default' : 'outline'}
              onClick={() => setViewMode('today')}
            >
              Today
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'week' ? 'default' : 'outline'}
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'month' ? 'default' : 'outline'}
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {Array.from({length: 35}, (_, i) => {
            const day = (i % 30) + 1;
            const hasContent = i % 7 === 0 || i % 11 === 0;
            return (
              <div key={i} className="aspect-square border border-border rounded-lg p-2 hover:bg-accent transition-colors cursor-pointer">
                <div className="text-sm font-medium mb-1">{day}</div>
                {hasContent && (
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-primary rounded"></div>
                    <div className="text-xs text-muted-foreground">{Math.floor(Math.random() * 3) + 1} posts</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Scheduled Content */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Scheduled Content</h3>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <div className="space-y-4">
            {scheduledContent.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <img 
                    src={item.thumbnail} 
                    alt="Thumbnail" 
                    className="w-20 h-11 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {getPlatformIcon(item.platform)}
                      <span className="text-sm text-muted-foreground">
                        {item.scheduledDate} at {item.scheduledTime}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {scheduledContent.map(item => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-3 mb-3">
                <img 
                  src={item.thumbnail} 
                  alt="Thumbnail" 
                  className="w-16 h-9 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-tight mb-1">{item.title}</h4>
                  <div className="flex items-center gap-2">
                    {getPlatformIcon(item.platform)}
                    <span className="text-xs text-muted-foreground capitalize">
                      {item.platform}
                    </span>
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {item.scheduledDate} at {item.scheduledTime}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Scheduled Today</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <Clock className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold text-foreground">2</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center">
              <span className="text-warning-foreground font-bold">!</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}