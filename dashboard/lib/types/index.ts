// Complete TypeScript types for the social media command center

export type Platform = 'tiktok' | 'facebook' | 'linkedin' | 'threads' | 'youtube' | 'x';

export type ContentStatus = 'idea' | 'drafting' | 'review' | 'approved' | 'scheduled' | 'published' | 'failed';

export type ContentType = 'video' | 'image' | 'carousel' | 'text' | 'story' | 'reel' | 'short' | 'post' | 'article';

export type MetricPeriod = '7d' | '30d' | '90d' | '1y';

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  maxVideoLength?: number; // seconds
  maxCharacters?: number;
  supportsCarousel: boolean;
  supportsStories: boolean;
  supportsLongform: boolean;
  contentTypes: ContentType[];
}

export interface Campaign {
  id: string;
  name: string;
  color: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'planned' | 'completed' | 'paused';
  description?: string;
}

export interface ContentVariant {
  id: string;
  platform: Platform;
  caption: string;
  hashtags: string[];
  mentions: string[];
  mediaUrls: string[];
  platformSpecific: Record<string, unknown>;
  status: ContentStatus;
  scheduledAt?: string;
  publishedAt?: string;
  failureReason?: string;
  metrics?: PlatformMetrics;
}

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  campaignId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo?: string;
  variants: ContentVariant[];
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface PlatformMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  clicks?: number;
  impressions?: number;
  reach?: number;
  engagementRate?: number;
  watchTime?: number; // seconds
  completionRate?: number;
  followers?: number;
  followerGrowth?: number;
}

export interface PlatformAccount {
  id: string;
  platform: Platform;
  handle: string;
  displayName: string;
  followers: number;
  following: number;
  verified: boolean;
  connected: boolean;
  lastSync?: string;
  metrics: PlatformMetrics;
  weeklyMetrics: Array<{ date: string } & PlatformMetrics>;
}

export interface Competitor {
  id: string;
  name: string;
  industry: string;
  platforms: Array<{
    platform: Platform;
    handle: string;
    followers: number;
    weeklyGrowth: number;
    avgEngagement: number;
    postsPerWeek: number;
    topContentType: ContentType;
    recentPosts: Array<{
      id: string;
      type: ContentType;
      caption: string;
      likes: number;
      comments: number;
      shares: number;
      date: string;
    }>;
  }>;
  strengths: string[];
  weaknesses: string[];
}

export interface TrendItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  publishedAt: string;
  url?: string;
  trendScore: number; // 0-100
  platforms: Platform[];
  platformAngles: Record<Platform, {
    angle: string;
    contentType: ContentType;
    hook: string;
    hashtags: string[];
  }>;
  tags: string[];
}

export interface ScheduledItem {
  id: string;
  contentId: string;
  variantId: string;
  platform: Platform;
  scheduledAt: string;
  status: ContentStatus;
  title: string;
  type: ContentType;
  campaignId?: string;
}

export interface AnalyticsOverview {
  period: MetricPeriod;
  totalReach: number;
  totalImpressions: number;
  totalEngagements: number;
  avgEngagementRate: number;
  totalFollowerGrowth: number;
  topPerformingPlatform: Platform;
  topPerformingContent: string;
  platformBreakdown: Record<Platform, PlatformMetrics>;
  dailyMetrics: Array<{
    date: string;
    reach: number;
    impressions: number;
    engagements: number;
  } & Partial<Record<Platform, number>>>;
}

export interface Notification {
  id: string;
  type: 'approval_needed' | 'published' | 'failed' | 'scheduled' | 'comment' | 'milestone';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer' | 'approver';
  avatar?: string;
  email: string;
  initials: string;
}
