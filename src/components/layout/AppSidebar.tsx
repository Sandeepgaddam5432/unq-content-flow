import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  Play, 
  Calendar, 
  BarChart3, 
  Key, 
  Settings,
  Youtube,
  Instagram,
  ChevronDown,
  Activity,
  Zap,
  TrendingUp
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '../../lib/store';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

const mainNavItems = [
  { 
    title: 'Dashboard', 
    url: '/', 
    icon: LayoutDashboard,
    exact: true
  },
  { 
    title: 'Channel Management', 
    url: '/channels', 
    icon: Users,
    subItems: [
      { title: 'All Channels', url: '/channels', icon: Users },
      { title: 'YouTube Channels', url: '/channels/youtube', icon: Youtube },
      { title: 'Instagram Accounts', url: '/channels/instagram', icon: Instagram }
    ]
  },
  { 
    title: 'Content Creation', 
    url: '/content-creation', 
    icon: PlusCircle 
  },
  { 
    title: 'Video Generation', 
    url: '/generation', 
    icon: Play,
    badge: 'NEW'
  },
  { 
    title: 'Publishing Queue', 
    url: '/publishing', 
    icon: Calendar 
  },
  { 
    title: 'Analytics & Insights', 
    url: '/analytics', 
    icon: BarChart3,
    subItems: [
      { title: 'Overview', url: '/analytics', icon: TrendingUp },
      { title: 'Channel Performance', url: '/analytics/channels', icon: Activity },
      { title: 'Content Analytics', url: '/analytics/content', icon: BarChart3 }
    ]
  },
  { 
    title: 'API Management', 
    url: '/api-management', 
    icon: Key 
  },
  { 
    title: 'Settings', 
    url: '/settings', 
    icon: Settings 
  }
];

export function AppSidebar() {
  const { open, isMobile } = useSidebar();
  const collapsed = !open;
  const location = useLocation();
  const currentPath = location.pathname;
  const { dashboardMetrics } = useAppStore();
  const [openGroups, setOpenGroups] = useState<string[]>(['channels', 'analytics']);

  const isActive = (path: string, exact = false) => {
    if (exact) return currentPath === path;
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string, exact = false) => {
    const active = isActive(path, exact);
    return active 
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium border-r-2 border-sidebar-primary' 
      : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground';
  };

  const toggleGroup = (groupKey: string) => {
    setOpenGroups(prev => 
      prev.includes(groupKey) 
        ? prev.filter(g => g !== groupKey)
        : [...prev, groupKey]
    );
  };

  return (
    <Sidebar 
      className={collapsed ? 'w-16' : 'w-64'}
      collapsible="icon"
    >
      <SidebarContent className="gap-2 p-2">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-3 py-4 mb-2">
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/ac903849-8136-4b0b-8646-60a26c3121b4.png" 
              alt="UnQWorkFlow" 
              className="w-8 h-8"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sidebar-primary text-lg">UnQWorkFlow</span>
              <span className="text-xs text-sidebar-foreground/60">AI Content Platform</span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {!collapsed && dashboardMetrics && (
          <div className="px-3 mb-4">
            <div className="bg-sidebar-accent/30 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sidebar-foreground/70">Active</span>
                <Badge variant="secondary" className="text-xs">
                  {dashboardMetrics.activeGenerations}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-sidebar-foreground/70">Channels</span>
                <span className="font-medium text-sidebar-primary">
                  {dashboardMetrics.totalChannels}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible 
                      open={openGroups.includes(item.title.toLowerCase().replace(' ', '-'))}
                      onOpenChange={() => toggleGroup(item.title.toLowerCase().replace(' ', '-'))}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`${getNavClassName(item.url)} justify-between`}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {!collapsed && <span>{item.title}</span>}
                          </div>
                          {!collapsed && (
                            <ChevronDown className={`h-4 w-4 transition-transform ${
                              openGroups.includes(item.title.toLowerCase().replace(' ', '-')) 
                                ? 'rotate-180' 
                                : ''
                            }`} />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!collapsed && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <NavLink
                                    to={subItem.url}
                                    className={({ isActive }) =>
                                      isActive
                                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                        : 'hover:bg-sidebar-accent/50'
                                    }
                                  >
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.exact}
                        className={getNavClassName(item.url, item.exact)}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge variant="outline" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!collapsed && (
          <div className="mt-auto p-3">
            <div className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}