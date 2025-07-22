import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Youtube, Instagram, Play, Pause, Settings, TrendingUp, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Channel {
  id: string;
  name: string;
  platform: 'youtube' | 'instagram';
  avatar: string;
  subscribers: number;
  videos: number;
  views: number;
  status: 'active' | 'paused' | 'error';
  lastActive: string;
  engagement: number;
  growth: number;
}

const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'TechTips Pro',
    platform: 'youtube',
    avatar: '/placeholder-avatar.jpg',
    subscribers: 125400,
    videos: 342,
    views: 2400000,
    status: 'active',
    lastActive: '2 hours ago',
    engagement: 8.2,
    growth: 12.5
  },
  {
    id: '2',
    name: '@creativestudio',
    platform: 'instagram',
    avatar: '/placeholder-avatar.jpg',
    subscribers: 89300,
    videos: 156,
    views: 1200000,
    status: 'active',
    lastActive: '1 hour ago',
    engagement: 15.7,
    growth: 8.9
  },
  {
    id: '3',
    name: 'Business Insights',
    platform: 'youtube',
    avatar: '/placeholder-avatar.jpg',
    subscribers: 67800,
    videos: 89,
    views: 890000,
    status: 'paused',
    lastActive: '1 day ago',
    engagement: 6.4,
    growth: -2.1
  },
  {
    id: '4',
    name: '@lifestyle_daily',
    platform: 'instagram',
    avatar: '/placeholder-avatar.jpg',
    subscribers: 234500,
    videos: 423,
    views: 3200000,
    status: 'active',
    lastActive: '30 minutes ago',
    engagement: 12.3,
    growth: 18.7
  }
];

function ChannelCard({ channel }: { channel: Channel }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={channel.avatar} alt={channel.name} />
              <AvatarFallback>
                {channel.platform === 'youtube' ? (
                  <Youtube className="h-6 w-6 text-red-500" />
                ) : (
                  <Instagram className="h-6 w-6 text-pink-500" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{channel.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {channel.platform === 'youtube' ? (
                    <Youtube className="h-3 w-3 mr-1" />
                  ) : (
                    <Instagram className="h-3 w-3 mr-1" />
                  )}
                  {channel.platform}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Last active {channel.lastActive}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(channel.status)} variant="secondary">
              {channel.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Channel Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {channel.status === 'active' ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Channel
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Resume Channel
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {formatNumber(channel.subscribers)}
            </div>
            <div className="text-xs text-muted-foreground">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {formatNumber(channel.views)}
            </div>
            <div className="text-xs text-muted-foreground">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {channel.videos}
            </div>
            <div className="text-xs text-muted-foreground">Videos</div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Engagement Rate</span>
            <span className="font-medium">{channel.engagement}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Growth (30d)</span>
            <span className={`font-medium ${channel.growth >= 0 ? 'text-success' : 'text-destructive'}`}>
              {channel.growth >= 0 ? '+' : ''}{channel.growth}%
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover">
            Create Content
          </Button>
          <Button variant="outline" size="sm">
            Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Channels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredChannels = mockChannels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || channel.platform === filterPlatform;
    const matchesStatus = filterStatus === 'all' || channel.status === filterStatus;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const totalMetrics = mockChannels.reduce((acc, channel) => ({
    subscribers: acc.subscribers + channel.subscribers,
    views: acc.views + channel.views,
    videos: acc.videos + channel.videos
  }), { subscribers: 0, views: 0, videos: 0 });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Channel Management</h1>
          <p className="text-muted-foreground">
            Manage your YouTube and Instagram channels in one place
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Connect Channel
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Channels</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockChannels.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockChannels.filter(c => c.platform === 'youtube').length} YouTube, {mockChannels.filter(c => c.platform === 'instagram').length} Instagram
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalMetrics.subscribers)}</div>
            <p className="text-xs text-success">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalMetrics.views)}</div>
            <p className="text-xs text-success">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Channels</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockChannels.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockChannels.filter(c => c.status === 'paused').length} paused
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Channels</CardTitle>
          <CardDescription>
            Monitor and manage all your connected social media channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Channels Grid */}
          <div className={viewMode === 'grid' 
            ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-4'
          }>
            {filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>

          {filteredChannels.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">No channels found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or connect your first channel.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary-hover">
                <Plus className="h-4 w-4 mr-2" />
                Connect Channel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}