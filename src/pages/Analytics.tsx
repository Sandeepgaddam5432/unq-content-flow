import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, Heart, Eye, Calendar, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const chartData = [
    { name: 'Jan', views: 4000, subscribers: 240, revenue: 1200 },
    { name: 'Feb', views: 3000, subscribers: 139, revenue: 900 },
    { name: 'Mar', views: 2000, subscribers: 980, revenue: 1400 },
    { name: 'Apr', views: 2780, subscribers: 390, revenue: 1600 },
    { name: 'May', views: 1890, subscribers: 480, revenue: 1100 },
    { name: 'Jun', views: 2390, subscribers: 380, revenue: 1300 },
  ];

  const platformData = [
    { name: 'YouTube', value: 60, color: '#FF0000' },
    { name: 'Instagram', value: 30, color: '#E4405F' },
    { name: 'TikTok', value: 10, color: '#000000' }
  ];

  const topContent = [
    {
      id: 1,
      title: "AI Tutorial: Getting Started with Machine Learning",
      thumbnail: "/api/placeholder/60/34",
      views: "150,000",
      likes: "5,200",
      comments: "320",
      revenue: "$1,200",
      publishedAt: "2 days ago",
      growth: "+12%"
    },
    {
      id: 2,
      title: "Quick Tips: Prompt Engineering Best Practices",
      thumbnail: "/api/placeholder/60/34",
      views: "140,000",
      likes: "4,800",
      comments: "270",
      revenue: "$1,100",
      publishedAt: "4 days ago",
      growth: "+8%"
    },
    {
      id: 3,
      title: "Deep Dive: Neural Network Architecture",
      thumbnail: "/api/placeholder/60/34",
      views: "130,000",
      likes: "4,600",
      comments: "250",
      revenue: "$1,000",
      publishedAt: "1 week ago",
      growth: "-2%"
    },
    {
      id: 4,
      title: "AI News Weekly Roundup",
      thumbnail: "/api/placeholder/60/34",
      views: "120,000",
      likes: "4,400",
      comments: "200",
      revenue: "$900",
      publishedAt: "1 week ago",
      growth: "+5%"
    },
    {
      id: 5,
      title: "Beginner's Guide to Python for AI",
      thumbnail: "/api/placeholder/60/34",
      views: "110,000",
      likes: "4,200",
      comments: "150",
      revenue: "$800",
      publishedAt: "2 weeks ago",
      growth: "+15%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your content performance and audience insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold text-foreground">2.4M</p>
            </div>
            <Eye className="w-8 h-8 text-primary" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <p className="text-sm text-success">+12% from last month</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Subscribers</p>
              <p className="text-2xl font-bold text-foreground">45.2K</p>
            </div>
            <Users className="w-8 h-8 text-success" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <p className="text-sm text-success">+8% from last month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold text-foreground">$12,450</p>
            </div>
            <DollarSign className="w-8 h-8 text-success" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <p className="text-sm text-success">+15% from last month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Engagement</p>
              <p className="text-2xl font-bold text-foreground">8.9%</p>
            </div>
            <Heart className="w-8 h-8 text-destructive" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <p className="text-sm text-destructive">-2% from last month</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Views & Subscribers</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="subscribers" stroke="hsl(var(--success))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Distribution */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Platform Distribution</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <span className="text-muted-foreground">{platform.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Content Table */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Top Performing Content</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <div className="space-y-3">
              {topContent.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                    <img src={item.thumbnail} alt="Thumbnail" className="w-16 h-9 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.publishedAt}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.views}</p>
                    <p className="text-sm text-muted-foreground">views</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.likes}</p>
                    <p className="text-sm text-muted-foreground">likes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.comments}</p>
                    <p className="text-sm text-muted-foreground">comments</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.revenue}</p>
                    <Badge variant={item.growth.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                      {item.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {topContent.map((item, index) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                  <img src={item.thumbnail} alt="Thumbnail" className="w-16 h-9 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.publishedAt}</p>
                  </div>
                  <Badge variant={item.growth.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                    {item.growth}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views:</span>
                    <span className="font-medium">{item.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes:</span>
                    <span className="font-medium">{item.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comments:</span>
                    <span className="font-medium">{item.comments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-medium">{item.revenue}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}