// Core application types for UnQWorkFlow

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  accounts: {
    google?: GoogleAccount;
    youtube?: YouTubeAccount[];
    instagram?: InstagramAccount[];
  };
  preferences: UserPreferences;
}

export interface GoogleAccount {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scopes: string[];
}

export interface YouTubeAccount {
  id: string;
  channelId: string;
  channelTitle: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  thumbnail: string;
  status: 'active' | 'paused' | 'error';
  lastSync: string;
}

export interface InstagramAccount {
  id: string;
  username: string;
  followersCount: number;
  followingCount: number;
  mediaCount: number;
  profilePicture: string;
  status: 'active' | 'paused' | 'error';
  lastSync: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    browser: boolean;
    contentReady: boolean;
    publishingErrors: boolean;
    weeklyReport: boolean;
  };
  defaultSettings: {
    videoDuration: string;
    contentType: string;
    publishingSchedule: string;
    autoPublish: boolean;
  };
}

export interface ContentGeneration {
  id: string;
  topic: string;
  duration: number;
  contentType: string;
  targetAudience: string;
  status: 'queued' | 'generating' | 'processing' | 'completed' | 'failed' | 'paused';
  progress: number;
  channelId: string;
  platform: 'youtube' | 'instagram';
  createdAt: string;
  estimatedCompletion?: string;
  generatedContent?: GeneratedContent;
  errorMessage?: string;
}

export interface GeneratedContent {
  videoUrl?: string;
  thumbnails: string[];
  title: string;
  description: string;
  tags: string[];
  transcript?: string;
  metadata: {
    duration: number;
    resolution: string;
    fileSize: number;
  };
}

export interface ScheduledContent {
  id: string;
  contentId: string;
  channelId: string;
  platform: 'youtube' | 'instagram';
  scheduledAt: string;
  status: 'scheduled' | 'published' | 'failed';
  content: GeneratedContent;
  publishingOptions: {
    visibility: 'public' | 'unlisted' | 'private';
    monetization: boolean;
    notifications: boolean;
  };
}

export interface Analytics {
  channelId: string;
  platform: 'youtube' | 'instagram';
  timeframe: '24h' | '7d' | '30d' | '90d';
  metrics: {
    views: number;
    engagement: number;
    subscribers: number;
    revenue?: number;
    watchTime?: number;
    impressions?: number;
    ctr?: number;
  };
  topContent: {
    id: string;
    title: string;
    views: number;
    engagement: number;
  }[];
  growth: {
    period: string;
    views: number;
    subscribers: number;
  }[];
}

export interface APIKey {
  id: string;
  name: string;
  service: 'google-ai-studio' | 'youtube' | 'instagram';
  keyPreview: string;
  status: 'active' | 'expired' | 'error';
  usageCount: number;
  usageLimit: number;
  createdAt: string;
  lastUsed?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DashboardMetrics {
  totalChannels: number;
  activeGenerations: number;
  publishedToday: number;
  totalViews: number;
  totalSubscribers: number;
  revenue: number;
  queuedContent: number;
  errors: number;
}