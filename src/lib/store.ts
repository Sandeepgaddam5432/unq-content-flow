import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, ContentGeneration, ScheduledContent, Notification, DashboardMetrics } from '../types';

interface AppState {
  // User & Authentication
  user: User | null;
  isAuthenticated: boolean;
  
  // UI State
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  
  // Data State
  dashboardMetrics: DashboardMetrics | null;
  contentGenerations: ContentGeneration[];
  scheduledContent: ScheduledContent[];
  notifications: Notification[];
  
  // Loading States
  isLoading: {
    dashboard: boolean;
    generations: boolean;
    channels: boolean;
    analytics: boolean;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setDashboardMetrics: (metrics: DashboardMetrics) => void;
  addContentGeneration: (generation: ContentGeneration) => void;
  updateContentGeneration: (id: string, updates: Partial<ContentGeneration>) => void;
  removeContentGeneration: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (key: keyof AppState['isLoading'], loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      sidebarCollapsed: false,
      theme: 'system',
      dashboardMetrics: null,
      contentGenerations: [],
      scheduledContent: [],
      notifications: [],
      isLoading: {
        dashboard: false,
        generations: false,
        channels: false,
        analytics: false,
      },

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setTheme: (theme) => set({ theme }),
      setDashboardMetrics: (dashboardMetrics) => set({ dashboardMetrics }),
      
      addContentGeneration: (generation) =>
        set((state) => ({
          contentGenerations: [generation, ...state.contentGenerations]
        })),
      
      updateContentGeneration: (id, updates) =>
        set((state) => ({
          contentGenerations: state.contentGenerations.map((gen) =>
            gen.id === id ? { ...gen, ...updates } : gen
          )
        })),
      
      removeContentGeneration: (id) =>
        set((state) => ({
          contentGenerations: state.contentGenerations.filter((gen) => gen.id !== id)
        })),
      
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications]
        })),
      
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, read: true } : notif
          )
        })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      setLoading: (key, loading) =>
        set((state) => ({
          isLoading: { ...state.isLoading, [key]: loading }
        }))
    }),
    {
      name: 'unqworkflow-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
);

// Mock data generators for development
export const generateMockMetrics = (): DashboardMetrics => ({
  totalChannels: 12,
  activeGenerations: 5,
  publishedToday: 23,
  totalViews: 1247892,
  totalSubscribers: 45672,
  revenue: 3247.89,
  queuedContent: 18,
  errors: 2
});

export const generateMockGenerations = (): ContentGeneration[] => [
  {
    id: '1',
    topic: 'How to Build a Successful YouTube Channel in 2024',
    duration: 600,
    contentType: 'educational',
    targetAudience: 'content creators',
    status: 'generating',
    progress: 67,
    channelId: 'ch1',
    platform: 'youtube',
    createdAt: new Date().toISOString(),
    estimatedCompletion: new Date(Date.now() + 15 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    topic: '5 Instagram Reel Ideas That Go Viral',
    duration: 30,
    contentType: 'entertainment',
    targetAudience: 'social media managers',
    status: 'queued',
    progress: 0,
    channelId: 'ch2',
    platform: 'instagram',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    topic: 'AI Tools for Content Creation - Complete Guide',
    duration: 480,
    contentType: 'tutorial',
    targetAudience: 'entrepreneurs',
    status: 'completed',
    progress: 100,
    channelId: 'ch1',
    platform: 'youtube',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    generatedContent: {
      videoUrl: '/placeholder-video.mp4',
      thumbnails: ['/placeholder-thumb1.jpg', '/placeholder-thumb2.jpg'],
      title: 'AI Tools for Content Creation - Complete Guide',
      description: 'Discover the best AI tools for creating engaging content...',
      tags: ['AI', 'Content Creation', 'Tools', 'Tutorial'],
      metadata: {
        duration: 480,
        resolution: '1920x1080',
        fileSize: 2.4 * 1024 * 1024 * 1024
      }
    }
  }
];

export const generateMockNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'success',
    title: 'Content Generation Complete',
    message: 'Your video "AI Tools for Content Creation" is ready for review',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/content-creation'
  },
  {
    id: '2',
    type: 'warning',
    title: 'API Usage Alert',
    message: 'You\'ve used 80% of your monthly API quota',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/api-management'
  },
  {
    id: '3',
    type: 'info',
    title: 'New Channel Connected',
    message: 'Successfully connected @TechTips Instagram account',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true
  }
];