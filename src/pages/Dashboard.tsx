import { useEffect, useState } from 'react';
import { useAppStore } from '../lib/store';
import { 
  TrendingUp, 
  Users, 
  Play, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  Clock,
  Eye,
  ThumbsUp,
  Youtube,
  Instagram,
  MoreHorizontal,
  Pause,
  PlayCircle,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  className?: string;
}

function MetricCard({ title, value, change, trend, icon: Icon, className = '' }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${getTrendColor()}`}>
            {change} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface GenerationItemProps {
  generation: any;
}

function GenerationItem({ generation }: GenerationItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generating': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generating': return <Clock className="h-3 w-3" />;
      case 'completed': return <PlayCircle className="h-3 w-3" />;
      case 'failed': return <AlertTriangle className="h-3 w-3" />;
      case 'paused': return <Pause className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex-1 space-y-1">
        <p className="font-medium text-sm">{generation.topic}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-xs">
            {generation.platform === 'youtube' ? <Youtube className="h-3 w-3 mr-1" /> : <Instagram className="h-3 w-3 mr-1" />}
            {generation.platform}
          </Badge>
          <span>{generation.duration}s</span>
        </div>
        {generation.status === 'generating' && (
          <Progress value={generation.progress} className="h-1" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Badge 
          variant="secondary" 
          className={`text-xs ${getStatusColor(generation.status)} border-0`}
        >
          {getStatusIcon(generation.status)}
          {generation.status}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Pause</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { dashboardMetrics, contentGenerations, isLoading } = useAppStore();
  const [timeframe, setTimeframe] = useState('7d');

  // Mock data for recent uploads
  const recentUploads = [
    {
      id: '1',
      title: 'AI Tools for Content Creation - Complete Guide',
      platform: 'youtube',
      views: 12.4,
      engagement: 8.2,
      thumbnail: '/placeholder-thumb.jpg',
      publishedAt: '2 hours ago'
    },
    {
      id: '2',
      title: '5 Instagram Reel Ideas That Go Viral',
      platform: 'instagram',
      views: 8.7,
      engagement: 12.5,
      thumbnail: '/placeholder-thumb.jpg',
      publishedAt: '4 hours ago'
    },
    {
      id: '3',
      title: 'YouTube Shorts Strategy 2024',
      platform: 'youtube',
      views: 15.2,
      engagement: 6.8,
      thumbnail: '/placeholder-thumb.jpg',
      publishedAt: '1 day ago'
    }
  ];

  const activeGenerations = contentGenerations.filter(g => 
    ['generating', 'queued', 'processing'].includes(g.status)
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (isLoading.dashboard) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 days
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-hover">
            Create Content
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Channels"
          value={dashboardMetrics?.totalChannels || 0}
          change="+2 new this month"
          trend="up"
          icon={Users}
        />
        <MetricCard
          title="Active Generations"
          value={dashboardMetrics?.activeGenerations || 0}
          change="5 in progress"
          trend="neutral"
          icon={Play}
          className="border-primary/20 bg-primary/5"
        />
        <MetricCard
          title="Published Today"
          value={dashboardMetrics?.publishedToday || 0}
          change="+15% from yesterday"
          trend="up"
          icon={TrendingUp}
        />
        <MetricCard
          title="Total Views"
          value={formatNumber(dashboardMetrics?.totalViews || 0)}
          change="+12.5% growth"
          trend="up"
          icon={Eye}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Subscribers"
          value={formatNumber(dashboardMetrics?.totalSubscribers || 0)}
          change="+8.2% this month"
          trend="up"
          icon={Users}
        />
        <MetricCard
          title="Revenue"
          value={`$${dashboardMetrics?.revenue?.toLocaleString() || 0}`}
          change="+23.1% this month"
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="Queue Status"
          value={`${dashboardMetrics?.queuedContent || 0} pending`}
          change="2 errors to resolve"
          trend="down"
          icon={Calendar}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Generations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              Active Generations
            </CardTitle>
            <CardDescription>
              Real-time status of your content being generated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeGenerations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No active generations</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Start Creating
                </Button>
              </div>
            ) : (
              activeGenerations.slice(0, 3).map((generation) => (
                <GenerationItem key={generation.id} generation={generation} />
              ))
            )}
            {activeGenerations.length > 3 && (
              <div className="text-center pt-2">
                <Button variant="outline" size="sm">
                  View All ({activeGenerations.length})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Recent Uploads
            </CardTitle>
            <CardDescription>
              Performance of your latest published content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage src={upload.thumbnail} alt={upload.title} />
                    <AvatarFallback className="rounded-md">
                      {upload.platform === 'youtube' ? (
                        <Youtube className="h-4 w-4" />
                      ) : (
                        <Instagram className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-medium text-sm line-clamp-1">{upload.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {upload.platform === 'youtube' ? (
                          <Youtube className="h-3 w-3 mr-1" />
                        ) : (
                          <Instagram className="h-3 w-3 mr-1" />
                        )}
                        {upload.platform}
                      </Badge>
                      <span>{upload.publishedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1 text-sm">
                    <Eye className="h-3 w-3" />
                    <span>{upload.views}K</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{upload.engagement}%</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <Button variant="outline" size="sm">
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions to manage your content workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="h-20 flex-col gap-2 bg-primary text-primary-foreground hover:bg-primary-hover">
              <Play className="h-6 w-6" />
              <span className="text-sm">Create Video</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Manage Channels</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule Content</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}